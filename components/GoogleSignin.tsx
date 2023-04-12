import { useEffect } from 'react';

declare global {
  interface Window {
    gapi: any;
    handleCredentialResponse: (response: any) => void;
  }
}

type GIdOnLoadProps = {
  clientId: string;
  callback: (response: any) => void;
  autoSelect?: boolean;
};

const GIdOnLoad = ({ clientId, callback, autoSelect = true }: GIdOnLoadProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
    //   window.gapi.load('auth2', () => {
    //     window.gapi.auth2.init({
    //       client_id: clientId,
    //     });
    //     window.handleCredentialResponse = callback;
    //   });

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
      });
    };
    document.body.appendChild(script);
  }, [clientId, callback, autoSelect]);

  return <div id="g_id_onload" data-client_id={clientId} data-callback="handleCredentialResponse" data-auto_select={autoSelect} />;
};

type GIdSignInProps = {
  type?: string;
  size?: string;
  theme?: string;
  text?: string;
  shape?: string;
  logoAlignment?: string;
};

const GIdSignIn = ({ type = 'standard', size = 'large', theme = 'outline', text = 'signin_with', shape = 'rectangular', logoAlignment = 'left' }: GIdSignInProps) => {
  return (
    <div
      className="g_id_signin"
      data-type={type}
      data-size={size}
      data-theme={theme}
      data-text={text}
      data-shape={shape}
      data-logo_alignment={logoAlignment}
    />
  );
};

export { GIdOnLoad, GIdSignIn };