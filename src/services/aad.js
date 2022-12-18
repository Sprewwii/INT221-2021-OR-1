import {UserAgentApplication} from "msal";

var msalConfig = {
    auth: {
        clientId: "6df66ab5-3379-4874-b6b0-d8578169a582",
        authority: "https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d",
        redirectURI: "http://localhost:3000/or1/"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie:true
    }
}

var requestObj ={
    scopes: ["user.read"]
}

var myMSALobj = new UserAgentApplication(msalConfig);

var login = async() => {
    var authResponse = await myMSALobj.loginPopup(requestObj);
    console.dir(authResponse)

    let tokenResponse = await myMSALobj.acquireTokenSilent(requestObj);
    console.dir(tokenResponse)
    // SUSUNAAAAA ILY
    if(tokenResponse.accessToken) {
        localStorage.setItem("token",localStorage.getItem("msal.6df66ab5-3379-4874-b6b0-d8578169a582.idtoken"))}
    // if(tokenResponse.accessToken) localStorage.setItem("token",tokenResponse.accessToken)
    return authResponse.account;
}

export default {login}; 