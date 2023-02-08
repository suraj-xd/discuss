import PostContent from '@components/PostContent';
import Comments from '@components/Comments';
import Metatags from '@components/Metatags';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  
  
  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }
  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });
  
  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost,loading] = useDocumentData(postRef);
  const post = realtimePost || props.post;
  

  return (
    <>
    {!post?.title ? <h1 className='text-center pt-8'>Invalid Request!🪦</h1> : <>
    <main className=''>
      <Metatags title={post.title} description={post.title} />

    {loading ? "Loading..." : 
      <section>
        <PostContent post={post}  postRef={postRef}/>
      </section>}
    </main>
      <Comments postRef={postRef} />
      <br></br><br></br>
        </>}  
    </>
);
}
