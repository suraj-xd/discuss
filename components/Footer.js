export default function Footer() {

    return (

        <footer class="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-gray-900">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="https://crackdsa.com/" class="flex items-center mb-4 sm:mb-0">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" /> */}
                    <span class="self-center text-2xl  whitespace-nowrap dark:text-white text-bold">crack<strong className="text-extrabold text-blue-700">DSA</strong> </span>
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    {/* <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li> */}
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 underline">Rules</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">©  <a href="https://crackdsa.com/" class="hover:underline">crackDSA</a>. All Rights Reserved.
            </span>
            
        </footer>

    )
}