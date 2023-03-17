export const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5*60)*1000;
    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5*60) * 1000; 
        localStorage.setItem("tokenId", newAuthRes.token.trim(" "))
    };
    setTimeout(refreshToken, refreshTiming);
    };