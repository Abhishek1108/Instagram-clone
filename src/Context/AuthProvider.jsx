
import React, { useEffect, useState } from 'react';
import { firebaseAuth } from '../Config/firebase';
 export const AuthContext=React.createContext();

export function AuthProvider({children}){
    const[currentUser,setCurrentUser]=useState(null);
    const [loading, setLoading] = useState(true)
    const [showModal,setShowModal]=useState('false');

    function login(email,password){
        console.log("inside login")
        return firebaseAuth.signInWithEmailAndPassword(email,password);

    }

    function signOut(){
        return firebaseAuth.signOut();
    }

    function signup(email,password){
       return firebaseAuth.createUserWithEmailAndPassword(email,password);
    }

    useEffect(()=>{
        
       firebaseAuth.onAuthStateChanged((user)=>{
        console.log("inside auth change ", user);
          setCurrentUser(user);
          setLoading(false);
       });
    },[]);

    

    let authCredentials={   
       currentUser:currentUser,
        signOut:signOut,
        login:login,
        signup:signup,
        setModal:setShowModal,
        showModal:showModal

    };

    return (<AuthContext.Provider value={authCredentials}>
        {console.log("inside auth provider")}
        {!loading && children}
        </AuthContext.Provider>);

};
