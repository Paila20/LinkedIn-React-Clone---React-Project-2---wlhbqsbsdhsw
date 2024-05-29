import React, {createContext, useContext, useEffect, useState} from 'react';


export const MyContext= createContext();


export const  AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState({});
    const [logintoken, setLoginToken] = useState(false);
    const [darkmode ,setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode(prevMode => !prevMode);
  };
    
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        if (Object.keys(userData).length > 0) {
         
          setCurrentUser(userData);
        } 
    }, [])
    
    useEffect(()=>{
 
     },[currentUser])

    useEffect(()=>{
      if(typeof (localStorage.getItem('token')) === 'string'){
        setLoginToken(true);
      }
    },[])

 
  return (
    <MyContext.Provider value ={{currentUser, setCurrentUser, logintoken, setLoginToken, darkmode, setDarkMode, toggleDarkMode}}>
        {children}
      
    </MyContext.Provider>
  )
}


 export const UseAuthContext= () => {
    return useContext(MyContext);
 }


 