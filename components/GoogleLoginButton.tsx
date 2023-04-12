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

  (window as any).handleCredentialResponse = handleCredentialResponse;

  return (
    <>
      <GIdOnLoad clientId="6984088107-b74m2a42votop2kk4hrhfosri34r10d3.apps.googleusercontent.com" callback={handleCredentialResponse} />
      <GIdSignIn />
      {userEmail && <p>User Email: {userEmail}</p>}
    </>
  );
};

export default GoogleLoginButton;
