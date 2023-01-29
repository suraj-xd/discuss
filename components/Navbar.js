import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@lib/context';

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  
  return (
    <nav className="navbar">
      <ul>
        <li className='flex '>
          <Link href="/">
              {/* <button  className='bg-black'> <span className=' text-white font-mono text-md '>DISCUSS</span>
              <span className='text-blue-300 font-sans pl-1 pb-1 text-base font-extrabold'> .crackDSA</span>
              </button>   */}
            <a href="https://crackdsa.com/" class="flex items-center mb-4 sm:mb-0 mr-7">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" /> */}
                    <span class="self-center text-2xl  whitespace-nowrap dark:text-white border-4 p-1 rounded-r-md border-blue-900 hover:bg-blue-900 hover:text-white">DISCUSS </span>
                   
                    <span class="self-center text-2xl  whitespace-nowrap dark:text-white text-bold pl-1">crack<strong className="text-extrabold text-blue-700">DSA</strong> </span>
                </a>
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
