import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const GoogleLoginButton = () => {
  const [userEmail, setUserEmail] = useState('');
  const GIdOnLoad = dynamic(() => import('./GIdOnLoad'), { ssr: false });
  const GIdSignIn = dynamic(() => import('./GIdSignIn'), { ssr: false });

  useEffect(() => {
    const handleCredentialResponse = (response: any) => {
      const email = response.credential && response.credential.idTokenPayload && response.credential.idTokenPayload.email;
      if (email) {
        setUserEmail(email);
      }
    };

    (window as any).handleCredentialResponse = handleCredentialResponse;
  }, []);

  return (
    <>
      <GIdOnLoad clientId="YOUR_CLIENT_ID" callback={handleCredentialResponse} />
      <GIdSignIn />
      {userEmail && <p>User Email: {userEmail}</p>}
    </>
  );
};

export default GoogleLoginButton;
