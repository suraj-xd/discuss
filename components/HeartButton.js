import { firestore, auth, increment } from '@lib/firebase';
import {  useDocument } from 'react-firebase-hooks/firestore';
// Allows user to heart or like a post

export default function Heart({ postRef }) {

  const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);
  // Create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });
    await batch.commit();
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
