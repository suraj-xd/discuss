import Link from "next/link";
import { useState } from "react"
export default function Notification({ type, doc }) {
    let mention = false;
    let comment = false;
    let upvote = false;
    let friend = false;
    if (type == 'mention') mention = true;
    else if (type == 'upvote') upvote = true;
    else if (type == 'friend') friend = true;
    else comment = true;
    return (
        <>
            {comment &&
            <Link href={doc.data().link}>
                <div>

                    <a class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="flex-shrink-0">
                            <img class="rounded-full w-11 h-11 z-0" src={doc.data().photoURL} />
                            <div class="z-50 flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-800">
                                <img className='bg-white p-[2px] rounded-full' src='https://cdn.iconscout.com/icon/premium/png-512-thumb/comment-3730466-3110427.png?f=avif&w=512' />
                                {/* <svg class="w-3 h-3  text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> */}
                            </div>
                        </div>
                        <div class="w-full pl-3">
                            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">{`${doc.data().displayName} `}</span>{doc.data().message}</div>
                            <div class="text-xs text-blue-600 dark:text-blue-500">{new Date(doc.data().timestamp?.toDate()).toLocaleString()}</div>
                        </div>
                    </a>
                </div>
            </Link>
} 
            {mention && 
                <Link href={doc.data().link}>
                <div>

                    <a class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="flex-shrink-0">
                            <img class="rounded-full w-11 h-11 z-0" src={doc.data().photoURL} />
                            <div class="z-50 flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-800">
                                <img className='bg-gray-500 rounded-full p-1' src='https://cdn-icons-png.flaticon.com/512/8517/8517943.png' />
                                {/* <svg class="w-3 h-3  text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> */}
                            </div>
                        </div>
                        <div class="w-full pl-3">
                            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">{`${doc.data().displayName} `}</span>{doc.data().message}</div>
                            <div class="text-xs text-blue-600 dark:text-blue-500">{new Date(doc.data().timestamp?.toDate()).toLocaleString()}</div>
                        </div>
                    </a>
                </div>
            </Link>}
            {upvote && 
                <Link href={doc.data().link}>
                <div>

                    <a class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="flex-shrink-0">
                            <img class="rounded-full w-11 h-11 z-0" src={doc.data().photoURL} />
                            <div class="z-50 flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-800">
                                <img className='bg-green-500 rounded-full' src='https://cdn-icons-png.flaticon.com/512/992/992703.png' />
                                {/* <svg class="w-3 h-3  text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> */}
                            </div>
                        </div>
                        <div class="w-full pl-3">
                            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">{`${doc.data().displayName} `}</span>{doc.data().message}</div>
                            <div class="text-xs text-blue-600 dark:text-blue-500">{new Date(doc.data().timestamp?.toDate()).toLocaleString()}</div>
                        </div>
                    </a>
                </div>
            </Link>}
            
            {friend &&
                <Link href={doc.data().link}>
                <div>

                    <a class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="flex-shrink-0">
                            <img class="rounded-full w-11 h-11 z-0" src={doc.data().photoURL} />
                            <div class="z-50 flex items-center  justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-gray-400 rounded-full dark:border-gray-800">
                                <img className='bg-gray-200 rounded-full p-1' src='https://cdn-icons-png.flaticon.com/512/7887/7887065.png' />
                                {/* <svg class="w-3 h-3  text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> */}
                            </div>
                        </div>
                        <div class="w-full pl-3">
                            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">{`${doc.data().displayName} `}</span>{doc.data().message}</div>
                            <div class="text-xs text-blue-600 dark:text-blue-500">{new Date(doc.data().timestamp?.toDate()).toLocaleString()}</div>
                        </div>
                    </a>
                </div>
            </Link>}
            

        </>
    )
}