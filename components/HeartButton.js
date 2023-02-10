import { UserContext } from '@lib/context';
import { firestore, auth, increment, getUserWithUsername } from '@lib/firebase';
import { useContext, useState } from 'react';
import firebase from "firebase";
import { useDocument } from 'react-firebase-hooks/firestore';
// Allows user to heart or like a post
export default function Heart({ postRef ,post}) {

  const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);
  const { user, username } = useContext(UserContext);
  // Create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });
    await batch.commit();
    const commenter = window.location.href.split('/')[3];
    const userRef = await getUserWithUsername(commenter);
      const msg = (post?.heartCount==0) ? "upvoted your post" : `and ${post?.heartCount} others upvoted your post`;
      await userRef.ref.collection('notifications').add({
        type: "upvote",
        user: username,
        photoURL: user?.photoURL,
        message: msg,
        link: window.location.pathname,
        displayName: user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = firestore.batch();
    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };




  return (

    <>
      {heartDoc?.exists ? (
        <img src={'/upicon.png'} onClick={removeHeart} className="card-img-center downicon bg-green-400 p-1" />
        // <ArrowNarrowUpIcon  onClick={removeHeart} className='icon text-white  bg-green-400'/>
      ) : (
        <img src={'/upicon.png'} onClick={addHeart} className="card-img-center upicon bg-gray-300 " />

      )}
    </>
  );
}
