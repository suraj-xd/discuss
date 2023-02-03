import AuthCheck from "@components/AuthCheck";
import Notification from "@components/Notification";

import Login from "@components/Login";

export default function notifications(){
    
    //
    return (
        <AuthCheck fallback={<span><Login/></span>}>
        <>
        <Notification/>
        </>
        </AuthCheck>
    )
}