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
                callback: (response) => {
                    const credential = response.credential;
                    onSuccess(credential);

                    console.log(response);
                }
            });
            window.google.accounts.id.renderButton(g_sso.current, {
                theme: 'filled_blue',
                size: 'large',
                type: 'standard',
                shape: 'rectangular',
                logo_alignment: 'left',
            });
        }
    }, [g_sso.current , onSuccess]);


    return (<div ref={g_sso} />);
}


export default GoogleSSO 