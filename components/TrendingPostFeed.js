import Link from 'next/link';
import toast from 'react-hot-toast';
export default function PostFeed({ posts, admin }) {
  const newPostArray = [];
  posts.map(post => {
    if(post?.trending) newPostArray.push(post);
  })
  return newPostArray ? newPostArray.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}
function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div style={{"margin":"5px","backgroundColor":"#002D62"}} className="card m-w-content mr-2 bg-[blue] text-xs sm:text-base border-blue-200 hover:border-l-4 shadow-md shadow-gray-300 cursor-pointer">
      <Link href={`/${post.username}`}>
        <a className='font-light text-white'>
          <strong>By <span className='text-blue-400 text-xs sm:text-base font-bold'>@{post.username}</span> </strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <span >
          <h1 className='border-l-2 text-base sm:text-xl text-white   border-green-400 pl-2 mt-2 mainfont'>
            <a className='' >{post.title}</a>
          </h1 >
          <p style={{ "width": "60%" }} className='p-2 overflow-hidden whitespace-nowrap text-gray-300 '>Dannie Vinther digs into a way of deal. some other demo text.
          </p>
          <ul className='decoration-none flex mr-2  '>
            <li className='bg-blue-100 m-2 rounded-lg p-1 text-xs text-gray-800 '>#leetcode</li>
            <li className='bg-blue-100 m-2 rounded-lg p-1 text-xs text-gray-800'>#editorial</li>
            <li className='bg-blue-100 m-2 rounded-lg p-1 text-xs text-gray-800'>#coding</li>

            <span className="push-left flex text-white"> {post.heartCount || 0} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 011.06 0L12 17.69l3.22-3.22a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
              Upvote</span>
          </ul>
        </span>
      </Link>

      <footer className=''>

      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>

          {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue p-2 pr-3 pl-3">Edit</button>
            </h3>
          </Link>
        </>
      )}
      
    </div>
  );
}
