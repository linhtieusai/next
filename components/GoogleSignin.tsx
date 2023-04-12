import { useEffect } from 'react';

const GoogleSignInButton: React.FC = () => {
  useEffect(() => {
    // Load the Google Sign-In API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Remove the Google Sign-In API script when unmounting
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <div id="g_id_onload"
        data-client_id="868808932730-mce503fm76m3j4t11nvfjd5p0mll94dd.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3000/login"
        data-auto_prompt="false">
   </div>
   
   <div class="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
   </div>
        `
      }}
      suppressHydrationWarning={true}
    />
  );
};

export default GoogleSignInButton;
