import React, { useEffect } from "react"
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import FacebookLogin from 'react-facebook-login';


const Home = () => {


    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: "248700853010-reevvit72s9tm8jsljajveqe9ggrpd5v.apps.googleusercontent.com",
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const refreshTokenSetup = (res) => {
        // Timing to renew access token
        let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

        const refreshToken = async () => {
            const newAuthRes = await res.reloadAuthResponse();
            refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
            console.log('newAuthRes:', newAuthRes);
            // saveUserToken(newAuthRes.access_token);  <-- save new token
            localStorage.setItem('authToken', newAuthRes.id_token);

            // Setup the other timer after the first one
            setTimeout(refreshToken, refreshTiming);
        };

        // Setup first refresh timer
        setTimeout(refreshToken, refreshTiming);
    };

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj, res);
        alert(
            `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        );
        //refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
        );
    };

    const onSuccessLogout = () => {
        console.log('Logout made successfully');
        alert('Logout made successfully ✌');
    };


    const responseFacebook = (response) => {
        console.log('response-google-login', response);
    }

    const logoutFB = (e) => {
        e.preventDefault();
        window.FB.logout(function() {
            // user is now logged out
            console.log('loggedout')
          });
    }


    return (
        <div>
            {/* <GoogleLogin
                clientId="356657623994-pgf3goe468lv0frs3tsobb3up7dfveis.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                //isSignedIn={true}

            />
            <GoogleLogout
                clientId="356657623994-pgf3goe468lv0frs3tsobb3up7dfveis.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={onSuccessLogout}
            ></GoogleLogout> */}

            <FacebookLogin
                appId="1289975068506068"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
            />

           <button onClick={logoutFB}>Logout</button>

        </div>
    )
}

export default Home