import PostFeed from '@components/PostFeed';
import Metatags from '@components/Metatags';
import Footer from '@components/Footer';
import TrendingPostFeed from '@components/TrendingPostFeed';

import { firestore, fromMillis, postToJSON } from '@lib/firebase';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import debounce from 'lodash.debounce';
import NewComp from './NewComp';

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  const postsQuery2 = firestore
    .collectionGroup('trending')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(5);

  const postsAdmin = (await postsQuery2.get()).docs.map(postToJSON);

  return {
    props: { posts , postsAdmin }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);

    }
  };
  useEffect(() => {
    const onScroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (postsEnd == false)
          getMorePosts();
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [posts])

  return (
    <>
      <main>
        <Metatags title="Discuss | crackDSA" description="Latest Blogs about Coding, DSA, Development" />

        <NewComp posts={posts} postsAdmin={props.postsAdmin}/>
        {/* <TrendingPostFeed posts={posts} />
        <PostFeed posts={posts} /> */}



        {/* {!loading && !postsEnd && <button onClick={getMorePosts}>Load More</button>} */}
        {/* <Loader show={loading} /> */}
        {postsEnd && <p className='text-center '>You have reached the End! 🕸️</p>}

      </main>
      <Footer />
    </>
  );
}
