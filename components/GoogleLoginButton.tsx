import { useState } from 'react';
import dynamic from 'next/dynamic';
import { GIdOnLoad, GIdSignIn } from './GoogleSignin';

const GoogleLoginButton = () => {
  const [userEmail, setUserEmail] = useState('');

  const handleCredentialResponse = (response: any) => {
    const email = response.credential && response.credential.idTokenPayload && response.credential.idTokenPayload.email;
    if (email) {
      setUserEmail(email);
    }
  };

  window.handleCredentialResponse = handleCredentialResponse;

  return (
    <>
      <GIdOnLoad clientId="868808932730-mce503fm76m3j4t11nvfjd5p0mll94dd.apps.googleusercontent.com" callback={handleCredentialResponse} />
      <GIdSignIn />
      {userEmail && <p>User Email: {userEmail}</p>}
    </>
  );
};

export default GoogleLoginButton;
