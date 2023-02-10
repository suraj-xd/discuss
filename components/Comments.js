import { auth, getUserWithUsername } from '@lib/firebase';

import firebase from "firebase";
import { useContext, useRef } from 'react';
import { UserContext } from '@lib/context';
import { useCollection } from 'react-firebase-hooks/firestore';
import Demo from '@components/Demo';

import toast from 'react-hot-toast';
import Replies from './Replies';
// Allows user to heart or like a post
export default function Comments({ postRef }) {

    //
    const name = useRef();
    const { user, username } = useContext(UserContext);
    const [realtimePosts, loading, error] = useCollection(
        postRef.collection('comments').orderBy("timestamp", "desc")
    );

    async function handleSubmit(e) {
        e.preventDefault();
        if (username == null) {
            toast.error("You need to be Logged In!");
            return;
        }
        if (name.current.value == "") {
            toast.error("Not A Valid Comment");
            return;
        }
        const uid = auth.currentUser.uid;
        // Comment
        await postRef.collection('comments').add({
            uid,
            comment: name.current.value,
            username: username,
            photoURL: user?.photoURL || '/hacker.png',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        //  Comment Notification
        const commenter = window.location.href.split('/')[3];
        if (commenter != username) {
            const userRef = await getUserWithUsername(commenter);
            await userRef.ref.collection('notifications').add({
                type: "comment",
                val: name.current.value,
                user: username,
                photoURL: user?.photoURL,
                message: `commented on your post!`,
                link: window.location.pathname,
                displayName:user?.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        // Mention Notifcation
        let tags = name.current.value.split(' ').filter(v => v.startsWith('@'));
        if (tags.length >= 1) {
            tags.map(async (tag) => {
                tag = tag.substr(1,tag.length-1);
                if (tag != username) {

                    await getUserWithUsername(tag).then((doc)=>{
                        if(!doc) return;
                            doc.ref.collection('notifications').add({
                                type: "mention",
                                val: name.current.value,
                                user: username,
                                photoURL: user?.photoURL,
                                displayName:user?.displayName,
                                message: `mentioned you in a comment on this post!`,
                                link: window.location.pathname,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        
                            })
                    });
                }
            })
        }
        e.target.reset();
    }

    return (

        <>


            <li className='cardCommentInput p-3 m-3 bg-white'>
                <form onSubmit={handleSubmit}>
                    <span className='flex'>

                        {username && <img className='rounded-full p-1 ' width={45} height={40} src={user?.photoURL || '/hacker.png'} />}
                        <input placeholder='Type your views..' className='text-base border-black rounded bg-gray-200 p-3 m-0' ref={name} />
                    </span>
                    <button className='bg-blue-600 text-white p-3 pr-6 pl-6' type="submit">Comment</button>
                </form>
            </li>
            <br></br>
            <ul>
                {(realtimePosts?.size > 0) ? <h1 className='p-4 pt-0'>{realtimePosts?.size} Comment{realtimePosts?.size == 1 ? "" : "s"}</h1> : <p className='text-center text-gray-600'>No comments here! Be the first one to comment.</p>}
                {

                    !loading && realtimePosts?.docs.map((doc) => {
                        return (
                            <>
                                <li key={Math.random()} className='ml-3 mr-3 border-t-2 border-gray-200 '>



                                    <Demo
                                        username={doc.data()?.username}
                                        photoURL={doc.data()?.photoURL || '/hacker.png'}
                                        comment={doc.data()?.comment}
                                        timestamp={doc.data()?.timestamp}
                                        replyFlag={false}
                                    />
                                    <Replies currentUser={doc.data()?.username} commentRef={postRef.collection('comments').doc(doc.id)} />
                                    <hr></hr>
                                </li>
                            </>



                        )
                    })
                }
            </ul>


        </>
    );
}
