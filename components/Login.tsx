"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { UserCard } from "../app/userCard";
import GoogleLoginButton from './GoogleLoginButton';
import { GoogleAuth } from 'google-auth-library';

export default function Login() {

    useEffect(() => {
        const auth = new GoogleAuth({
          client_id: '868808932730-mce503fm76m3j4t11nvfjd5p0mll94dd.apps.googleusercontent.com',
        });
        auth.then(() => {
          const signInOptions = {
            context: 'signin',
            ux_mode: 'popup',
            callback: testCallBack,
            prompt: 'select_account',
            scope: 'email',
          };
          auth.attachClickHandler(
            document.getElementById('google-login-button'),
            signInOptions,
            () => {},
            (error) => {
              console.error(error);
            }
          );
        });
      }, []);

    // get session from nextAuth
    const { data: session } = useSession();
    console.log(session);
    // useSession uses React Context
    // if the user exists -> show a Sign Out button and their information
    if(session) {
        return (
            <>
               
                <button onClick={() => signOut()} type="button" className="btn btn-primary">Sign Out of Google</button>
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