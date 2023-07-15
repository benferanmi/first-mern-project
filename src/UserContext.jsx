import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    const [ready, setReady] = useState(false)
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
      
      useEffect(() => {
        if (token && !user) {
            const api = axios.create({
                baseURL: 'http://localhost:4000/profile',
              });
          
              api.interceptors.request.use((config) => {
                if (token) {
                  config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
              });

          api.get('/').then(({ data }) => {
            setUser(data);
            setReady(true);
            console.log(data);
          })
          .catch(error => {
            console.error('Error fetching profile:', error);
          });
        }
      }, [token, user]);
      

    //  useEffect(() =>  {
    //     if(!user) {
    //         axios.get('/profile').then(({data}) =>{
    //             setUser(data);
    //             setReady(true);
    //             console.log(data)
    //         })
    //     }
    //  }, [user]);

    return (
        <UserContext.Provider value={{user,setUser, ready}}>
        {children}
        </UserContext.Provider>
        );
}