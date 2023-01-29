import Link from 'next/link';

export default function Custom404() {
  return (

    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-3  font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl  text-center font-semibold md:text-3xl font-gray-500 ">Ain't the right place for ya kid!</p>
          <iframe className='p-4' src="https://giphy.com/embed/tcZSrZEOwCrLy" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/imgur-flaming-incident-tcZSrZEOwCrLy"></a></p>
          <br></br>

      

        </div>
          <Link href="/">
          <a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded block bg-pink-200  dark:bg-violet-400 dark:text-gray-900">Get Back to homepage</a>
      </Link>
      </div>
    </section>
    
  );
}
