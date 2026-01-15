import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "./AuthContex";
import { auth } from "../Firebase/firebase.config";
import { useEffect, useState } from "react";
import useAxios from "../Hooks/UseAxios";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [donors, setDonors] = useState([]);
    const axiosInstance = useAxios()

    // Load donors
    useEffect(() => {
        axiosInstance.get("/users")
            .then((res) => setDonors(res.data))
            .catch((err) => console.error(err));
    }, [axiosInstance]);

    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).finally(() =>
            setLoading(false)
        );
    };

    // login user
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() =>
                setLoading(false)
            );
    };

    // sign in with google
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }


    // logout
    const logout = () => {
        setLoading(true);
        return signOut(auth).finally(() => setLoading(false));
    };

    // preserve logged user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            setUser(CurrentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // update user profile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile).then(() => {
            setUser({
                ...auth.currentUser,
                ...profile,
            });
        });
    };

    // get user role
    useEffect(() => {
        if (!user) return
        axiosInstance.get(`/role/${user?.email}`)
            .then((res) => setUserInfo(res.data))
            .catch(console.error)
    }, [user, axiosInstance])

    const authData = {
        loading,
        createUser,
        login,
        user,
        setUser,
        updateUserProfile,
        logout,
        donors,
        userInfo,
        googleLogin
    }

    return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
