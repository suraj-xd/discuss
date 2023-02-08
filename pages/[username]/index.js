import { getUserWithUsername, postToJSON } from '@lib/firebase';
import UserProfile from '@components/UserProfile';
import Metatags from '@components/Metatags';
import PostFeed from '@components/PostFeed';
import {
  LogoutIcon
} from "@heroicons/react/solid";
import { UserContext } from '@lib/context';
import { useRouter } from 'next/router';
import { auth } from '@lib/firebase';
import { useState , useContext} from 'react';
import AuthCheck from '@components/AuthCheck';
export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  const { use, username } = useContext(UserContext);

  const router = useRouter();
  const signOut = () => {
    auth.signOut();
    router.reload();
  }
  return (
    <main className='bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 '>
      <Metatags title={user.username} description={`${user.username}'s public profile`} />
      <UserProfile user={user} />
      
      <PostFeed posts={posts} />
      <br></br><hr></hr>
        {(username != user.username) ? <></> :
          <span className='flex'>
          <p className='font-bold ml-4 mt-8'>Sign Out</p>
          <LogoutIcon onClick={signOut} className='bg-gray-400 text-white icon' />

          </span>
          }
    </main>
  );
}
