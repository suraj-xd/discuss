import { firestore,auth } from '@lib/firebase';

import { useCollection } from 'react-firebase-hooks/firestore';

import Notification from "@components/Notification";
import toast from 'react-hot-toast';


export default function notifications() {

    const uid = auth?.currentUser?.uid;
    const [realtimeNotifications, loading] = useCollection(firestore.collection("users").doc(uid).collection('notifications').limit(10));
    // type, photoURL, link, user, message
    async function clearNotification(){
        if(realtimeNotifications?.docs.length ==0) return;
        const ref = await firestore.collection('users').doc(uid).collection('notifications');
        ref.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
              ref.doc(doc.id).delete()
            })
          })   
        toast("Woof!",{"icon":"🧹"})
    }
    return (
        <>
        <div className='flex justify-center items-center'>

            <div id="dropdownNotification" class="z-20 mt-5 mb-5 h-screen  w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
                <div className='flex justify-between items-center'>

                <div class="block px-4 py-2  text-xl font-bold text-center text-gray-700 rounded-t-lg ">
                    Notifications
                </div>
                    <div onClick={clearNotification} class="cursor-pointer block px-4 py-2 hover:bg-gray-100 text-md  rounded-2xl mr-1 text-center  text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white">
                    Clear All
                </div>
                </div>
                <div class="divide-y overflow-y-scroll hide-scroll-bar  h-screen divide-gray-100 dark:divide-gray-700">
                {(realtimeNotifications?.docs.length ==0) ? <p className='text-center text-gray-600 mt-5'>You Have 0 Notifications 🔔</p> : <></> }

                    {
                        realtimeNotifications?.docs.map((doc) => {
                            return (
                                <Notification type={doc.data().type} doc={doc}/>
                            )
                        })
                    }
                </div>
                {/* <a href="#" class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                    <div class="inline-flex items-center ">
                        <svg class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                        View all
                    </div>
                </a> */}
                
            </div>
        </div>

        </>
    )
}