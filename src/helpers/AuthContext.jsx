import React, {createContext, useContext, useEffect, useState} from 'react';


export const MyContext= createContext();


export const  AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        if (Object.keys(userData).length > 0) {
         
          setCurrentUser(userData);
        } 
    }, [])
    useEffect(()=>{

    },[currentUser])
  return (
    <MyContext.Provider value ={{currentUser, setCurrentUser}}>
        {children}
      
    </MyContext.Provider>
  )
}


 export const UseAuthContext= () => {
    return useContext(MyContext);
 }


 