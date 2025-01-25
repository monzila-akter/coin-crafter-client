import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase_config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()
    const axiosSecurePublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }
    

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    
     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
         
        if(currentUser) {
           const userInfo = {email: currentUser.email}
           axiosSecurePublic.post("/jwt", userInfo)
           .then(res => {
            if(res.data.token){
                localStorage.setItem('access-token', res.data.token)
                setUser(currentUser);
                setLoading(false);
            }
           })
        }else{
            localStorage.removeItem('access-token');
            setUser(currentUser);
            setLoading(false);
        }
         
        });

        return () => {
            return unsubscribe();
        }

    }, [axiosSecurePublic])
    
 
    const authInfo = {
       user,
       loading ,
       createUser,
       signIn,
       googleSignIn,
       logOut,
       updateUserProfile
    }

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
};

export default AuthProvider;