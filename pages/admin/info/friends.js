import { firestore, auth } from "../../../lib/firebase";
import Link from "next/link";
import { useCollection } from "react-firebase-hooks/firestore"
export default function Friends() {
    const uid = auth?.currentUser?.uid;
    const [realtimeFriends, loading] = useCollection(firestore.collection("users").doc(uid).collection('friends'))

    return (
        <>

            {loading ? "Loading" :
                <span className="flex justify-center items-center ">

                    <div class="w-full  max-w-md p-2 bg-white border border-gray-200 mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4 border-b-2 border-gray-300">

                        
                            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mb-2">{(realtimeFriends?.docs.length > 0) ? realtimeFriends?.docs.length : <></>} Friend{(realtimeFriends?.docs.length==1) ? <></> : "s"}</h5>

                        </div>
                        {(realtimeFriends?.docs.length ==0) ? <p className='text-center text-gray-600'>No Users to Display. Try Adding New Friends! 🤝</p> : <></> }
                        {realtimeFriends?.docs.map((doc) => {
                            return (

                                <>
                                <Link href={`/${doc.data().username}`}>
                                    <div class="flow-root cursor-pointer">
                                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700 border-2 m-1 rounded">
                                            <li class="py-3 sm:py-4">
                                                <div class="flex items-center space-x-4">
                                                    <div class="flex-shrink-0">
                                                        <img class="w-8 h-8 ml-3 rounded-full" src={doc.data().photoURL} ></img>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {doc.data().displayName}
                                                        </p>
                                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {doc.data().username}
                                                        </p>
                                                    </div>
                                                    {/* <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $320
                                        </div> */}
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                        </Link>
                                </>
                            )
                        })}
                    </div>
                </span>
            }
        </>
    )
}