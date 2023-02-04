import { SaveIcon, StarIcon ,BookmarkIcon } from "@heroicons/react/solid";

import { UserContext } from "@lib/context";
import { firestore, auth } from "../lib/firebase";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useCollection, useCollectionOnce } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";

// UI component for user profile
export default function UserProfile({ user }) {

  const uid = auth?.currentUser?.uid;
  const { username } = useContext(UserContext);
  const [isFriend, setFriend] = useState(false);
  const [realtimePosts] = useCollection(firestore.collection("users").doc(uid).collection('friends'));

  useEffect(() => {
    setFriend(false);
    realtimePosts?.docs.map((doc) => {

      if (doc.data().username == user.username) {
        setFriend(true);
        return;
      }
    }, [realtimePosts])
  })
  async function submit() {
    if (isFriend) {
      const friendsRef = await firestore.collection('users').doc(uid).collection('friends');
      friendsRef.get().then((doc) => {
        doc?.docs?.map((doc) => {
          if (doc.data().username == user.username) {
            doc.ref.delete();
            toast("Removed from Friendlist!",{"icon":"🗑️"})
            return;
          }
        })
      })
      
    } else {
      await firestore.collection('users').doc(uid).collection('friends').add({
        username: user.username,
        photoURL: user.photoURL,
        displayName: user.displayName
      });
      toast(`${user.displayName} and you are friends now!`,{"icon":"🫱🏼‍🫲🏻"})
    }
  }


  return (
    <div className="box-center ">
      <img src={user.photoURL || '/hacker.png'} className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <span className="flex justify-center items-center">
        <h1 className="font-sans font-bold text-gray-800 mt-3">{user.displayName || 'Anonymous User'}</h1>
        <span className={isFriend ? "text-yellow-400" : "text-white"}>
          {user.username != username && <StarIcon onClick={submit} className="icon  shadow-xl shadow-black bg-gray-800 hover:bg-gray-500" />}
        </span>

      </span>
      <span className="flex cursor-pointer ">

          {user.username == username && <>
          <Link href={"/admin/info/friends"}>
            <p className="mt-2 bg-white border-b-2 border-blue-700 hover:bg-gray-100 hover:scale-105 transition-all ease-in p-2 rounded-md shadow-lg text-gray-800">My friends ⭐</p>
          </Link>
          </>}
      </span>
      {/* {user.username != username ? (isFriend ? <button onClick={deleteUser}>Delete User</button> : <button onClick={addUser}>Add User</button>) : <></>} */}
    </div>
  );
}
