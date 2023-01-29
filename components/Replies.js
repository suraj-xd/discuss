import { auth } from '@lib/firebase';
import firebase from "firebase";
import { useContext,  useRef, useState } from 'react';
import { UserContext } from '@lib/context';
import { useCollection} from 'react-firebase-hooks/firestore';
import Demo from '@components/Demo';

import toast from 'react-hot-toast';
// Allows user to heart or like a post
export default function Replies({ commentRef, currentUser }) {
    //
    const [isreply, setReply] = useState(false);

    const name = useRef();
    const { user, username } = useContext(UserContext);
    const [realtimePosts, loading, error] = useCollection(
        commentRef.collection('replies').orderBy("timestamp", "desc")
    );





    async function handleSubmit(e) {
        e.preventDefault();
        if (username == null) {
            toast.error("You need to be Logged In!");
            return;
        }
        if (name.current.value == "") {
            toast.error("Not A Valid Reply");
            return;
        }
        const uid = auth.currentUser.uid;
        const da = await commentRef.collection('replies').add({
            uid,
            reply: name.current.value,
            username: username,
            photoURL: user?.photoURL || '/hacker.png',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        e.target.reset();
    }

    return (

        <>

            
            <ul className='object-right ml-10'>
            
                {
                   !loading &&  realtimePosts?.docs.map((doc) => {
                        return (
                            <li >

                                <Demo
                                    username={doc.data()?.username}
                                    photoURL={doc.data()?.photoURL || '/hacker.png'}
                                    comment={doc.data()?.reply}
                                    timestamp={doc.data()?.timestamp}
                                    replyFlag = {true}
                                />

                            </li>
                        )
                    })
                }
                
                {!isreply &&
                    <a className='absolute right-5 rounded border-gray-300 bg-gray-900 text-white text-sm m-2 p-1 pl-3 pr-3 ' onClick={() => { setReply(true) }}>Reply</a>
                }
                <li className='ease-in'>
                    <br></br>
                    {isreply &&
                        <form onSubmit={handleSubmit}>
                            <input className='rounded font-mono font-bold text-base'  type="text" ref={name} />
                            <button className="rounded border-gray-300 bg-gray-900 text-white text-sm p-3 pl-5 pr-5" type="submit">Reply</button>
                        </form>

                    }
                </li>
            </ul>


        </>
    );
}
