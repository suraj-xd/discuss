import { auth, firestore, googleAuthProvider } from '@lib/firebase';
import { UserContext } from '@lib/context';
import Metatags from '@components/Metatags';
import Link from 'next/link';
import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import Login from '@components/Login';
import { toast } from 'react-hot-toast';
export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      <Metatags title="Login with Google" description="Login for Discuss.crackDSA" />
      {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      {/* <button className="btn-google" onClick={signInWithGoogle}>
        <img src={'/google.png'} width="30px" /> Sign in with Google
      </button> */}
      <Login />
      {/* <button onClick={() => auth.signInAnonymously()}>
        Sign in Anonymously
      </button> */}
    </>
  );
}

// Sign out button
function SignOutButton() {
  const router = useRouter();
  toast.success("Welcome!")
  router.push('/');
  return (
    <Link href={`/`}>
      <h1 className='text-center font-mono ' >Redirectering to Home Page..⏳.</h1>
    </Link>
  )

}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <>
      {/* !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>

      ) */}
      <>
        <form class="w-full max-w-sm m-auto flex h-screen    "  onSubmit={onSubmit}>
          <div class="flex items-center   py-2 ">

            <span className='bg-white border-1 border-gray-50  p-5 rounded-xl shadow-md shadow-gray-400'>

            <input spellcheck="false" value={formValue} onChange={onChange} class="text-black caret-yellow-900 appearance-none bg-gray-200 rounded-sm placeholder:text-black font-sans font-bold lowercasenpm run dev pl-2 border-none w-full  mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="username" aria-label="Full name"></input>
            <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
            <button type="submit" disabled={!isValid} class="flex-shrink-0 bg-black hover:bg-gray-600   text-sm  text-white py-1 px-2 rounded" >
            Choose
            </button>
            </span>
              
          </div>
        </form>
      </>
    </>
  );
}

function UsernameMessage({ username, isValid, loading }) {
  
  if (loading) {
    return <p className='font-mono text-sm  font-semibold pt-2 text-gray-400 pr-1'>Checking...</p>;
  } else if (isValid) {
    return <p className="font-mono text-sm font-semibold pt-2 text-green-400"> <span className='font-sans font-bold text-blue-400'>@{username}</span> is available!</p>;
  } else if (username && !isValid) {
    return <p className="font-mono text-sm  font-semibold pt-2 text-red-400">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
