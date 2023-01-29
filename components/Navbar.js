import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@lib/context';
import { auth } from '@lib/firebase';

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  
  return (
    <nav className="navbar">
      <ul>
        <li className='flex '>
          <Link href="/">
              <button  className='bg-black'> <span className=' text-white font-mono text-md '>DISCUSS</span>
              <span className='text-blue-300 font-sans pl-1 pb-1 text-base font-extrabold'> .crackDSA</span>
              </button>  
          
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            
            <li className='absolute right-16 mr-1 font-mono '>
              <Link href="/admin">
                <h3 className='bg-black text-white p-3 hover:bg-gray-800 shadow-sm shadow-blue-400  rounded-b-xl cursor-pointer'>
                  ✒️ <span className=  'hidden sm:inline'>Write Posts</span> 
                </h3>
                {/* <button className="btn-blue">Write Posts</button> */}
              </Link>
            </li>
            <li className='absolute right-3 '>
              <Link href={`/${username}`}>
                <img src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="rounded-none bg-purple-500  text-white mainfont font-light">Get in 😶‍🌫️</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
