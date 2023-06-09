"use client"
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
   
    // get session from nextAuth
    const { data: session } = useSession();
    // useSession uses React Context
    // if the user exists -> show a Sign Out button and their information
    if(session) {
        return (
            <>
               
                <button onClick={() => signOut()} type="button" className="btn btn-primary">Sign Out</button>
                {/* Pass session info to server component */}
                {/* <UserCard user={session?.user}/> */}
            </>
        )
    } else {
        return (
            <>
                  <div>
                    <div id="google-login-button" className="g-id-signin" />
                  </div>
                {/* <button onClick={() => signIn('google')} type="button" className="btn btn-primary">Sign In with Google</button> */}
            </>
        )
    }

    // if a user doesn't exist -> show a Sign In button
}