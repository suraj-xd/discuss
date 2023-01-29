import AuthCheck from '@components/AuthCheck';
import PostFeed from '@components/PostFeed';
import { UserContext } from '@lib/context';
import { firestore, auth, serverTimestamp } from '@lib/firebase';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Login from '@components/Login';

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck fallback={<Link href="/enter"><Login/></Link>}>
        <CreateNewPost /><br></br><br></br>
        <PostList />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1 className='font-bold text-gray-500'>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: 'Your Blog Content Goes here..',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success('Post created!');

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form className='bg-gray-300 rounded mt-3 p-5 border-gray-400 border-2' onSubmit={createPost}>
      <input 
        className='rounded bg-gray-200 mt-5 mb-3 pb-5 pt-5   placeholder:text-white placeholder:pl-2 placeholder:font-mono placeholder:font-bold font-mono font-bold text-black'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Write a title"
        // className={styles.input}
      />
      {/* <p>
        <strong>Slug:</strong> {slug}
      </p> */}
      <button type="submit" disabled={!isValid} className="bg-blue-500 font-sans text-xl rounded-none text-white shadow">
        Create New Post
      </button>
    </form>
  );
}
