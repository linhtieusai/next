import { useRef, useEffect } from 'react';
declare const window: any;

// declare global {
//     interface Window {
//       handleCredentialResponse: (response: any) => void;
//     }
//   }

  
const GoogleSSO = ({ onSuccess }) => {
    const g_sso = useRef(null);

    useEffect(() => {
        if (g_sso.current) {
            window.google.accounts.id.initialize({
                client_id: "868808932730-mce503fm76m3j4t11nvfjd5p0mll94dd.apps.googleusercontent.com",
                callback: onSuccess
            });
            window.google.accounts.id.renderButton(g_sso.current, {
                theme: 'outline',
                size: 'large',
                type: 'standard',
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'left',
                width: '220',
            });
        }
    }, [g_sso.current , onSuccess]);


    return (<div ref={g_sso} />);
}


export default GoogleSSO 