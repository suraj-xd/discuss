import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import AuthCheck from './AuthCheck';
import HeartButton from './HeartButton';

import { UserContext } from '@lib/context';

import { useContext } from 'react';

// UI component for main post content
export default function PostContent({ post, postRef }) {
  const { user: currentUser } = useContext(UserContext);
  return (
    <div className="card">
      <h1 className=''>{post?.title}</h1>
      <span className="text-sm border-b-2  border-dotted border-gray-400">
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </Link>{' '}
        on {new Date(post.createdAt?.toDate()).toLocaleString()}
      </span><br></br>
      <div className='mt-2 bg-blue-50 p-1 rounded'>

        <ReactMarkdown >{post?.content}</ReactMarkdown>
      </div>
      {/* // experimental */}

      <br></br>

      <div className='flex'>
        <h1 className='font-mono text-yellow-500'>
          <strong className='flex'>{post.heartCount || 0}  <span className='mt-3 text-gray-600'>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 011.06 0L12 17.69l3.22-3.22a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06z" clip-rule="evenodd" />
          </svg></span>
          </strong>

        </h1>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <img src={'/upicon.png'} className="card-img-center downicon p-1" />
            </Link>
          }
        >
          <HeartButton postRef={postRef} post={post} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>

            <button className='mr-0 p-2 text-sm bg-blue-400 text-white'>Edit</button>

          </Link>
        )}
      </div>
    </div>
  );
}
