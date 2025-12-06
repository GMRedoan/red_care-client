import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContex";
import { auth } from "../Firebase/firebase.config";
import { useEffect, useState } from "react";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // sign in 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    }

    // log in
    const Login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));

    }

    // log out
    const logout = () => {
        setLoading(true)
        return signOut(auth)
            .finally(() => setLoading(false));

    }

    // preserve the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            setUser(CurrentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    // show info
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
            .then(() => {
                setUser({
                    ...auth.currentUser,
                    ...profile
                })
            })
    }

    const authData = {
        loading,
        createUser,
        Login,
        user,
        setUser,
        updateUserProfile,
        logout
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;