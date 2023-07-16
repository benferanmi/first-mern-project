import {useEffect, useState} from 'react'

function GetTokenFormCookie() {
    const [token, setToken] = useState(null)
    const getTokenFromCookie = () => {
        const cookies = document.cookie.split(';');
      
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
      
          // Check if the cookie starts with "token="
          if (cookie.startsWith('token=')) {
            const token = cookie.split('=')[1];
            return token;
          }
        }
      
        return null; // Token not found in cookies
      };
    
      useEffect(() => {
        const recoveredToken = getTokenFromCookie();
        setToken(recoveredToken);
        console.log(recoveredToken);
      }, []);

    return {token}
}

export default GetTokenFormCookie;