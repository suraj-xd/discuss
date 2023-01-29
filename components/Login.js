import { auth, firestore, googleAuthProvider } from '@lib/firebase';

function Login() {
    const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
    return (
        <div className="cursor-pointer">

            <div className="flex items-center justify-center h-screen">

                <h1
                    className="p-5 m-2 w-25  mainfont  bg-black  text-white text-center  cursor-pointer"
                    onClick={signInWithGoogle}
                >
                    Login
                </h1>
                <h4
                    className="m-2 pl-3"

                >
                    using
                </h4>
                <div className="inline-flex p-3 m-2 cursor-pointer border-2 rounded-full">
                    <img className="h-9 w-9 m-1"
                        src="https://cdn-icons-png.flaticon.com/512/104/104093.png"
                        height={400}
                        width={400}
                        objectFit="contain"
                        onClick={signInWithGoogle}
                    ></img>
                    
                </div>

            </div>
        </div>
    );
}

export default Login;
