export default function Notification({username,postURL,photoURL,message }) {
    return (
        <>

            <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li class="py-3 sm:py-4 pl-4">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <img class="w-8 h-8 rounded-full" src="/hacker.png" alt="Neil image"></img>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Thomas Lean
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                email@flowbite.com
                            </p>
                        </div>
                        {/* <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    $2367
                </div> */}
                    </div>
                </li>
                {/* <Notif/> */}
            </ul>

        </>
    )
}