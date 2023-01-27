import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import AuthCheck from './AuthCheck';
import HeartButton from './HeartButton';

import { UserContext } from '@lib/context';

import { useContext } from 'react';

// UI component for main post content
export default function PostContent({ post, postRef }) {
  const { user: currentUser } = useContext(UserContext);
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();
  return (
    <div className="card">
      <h1 className='font-sans font-bold'>{post?.title}</h1>
      <span className="text-sm ">
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </Link>{' '}
        on {createdAt.toISOString()}
      </span><br></br><br></br>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
      {/* // experimental */}
      <br></br>
      <hr></hr>

      <div className='flex'><br></br>
        <h1 className='font-mono text-gray-800'>
          <strong>{post.heartCount || 0} 
          </strong>

        </h1>

        <AuthCheck
          fallback={
            <Link href="/enter">
          <img src={'/upicon.png'} className="icon downicon bg-green-400" />
            </Link>
          }
          >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>

              <button>Edit</button>

          </Link>
        )}
      </div>
    </div>
  );
}
