import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContex";
import { auth } from "../Firebase/firebase.config";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [donors, setDonors] = useState([]);

    // Load donors
    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => setDonors(data))
            .catch((err) => console.error(err));
    }, []);

    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).finally(() =>
            setLoading(false)
        );
    };

    // login user
    const Login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).finally(() =>
            setLoading(false)
        );
    };

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
        axios
            .get(`http://localhost:3000/role/${user.email}`)
            .then((res) => {
                setUserInfo(res.data)
             })
    }, [user])

    const authData = {
        loading,
        createUser,
        Login,
        user,
        setUser,
        updateUserProfile,
        logout,
        donors,
        userInfo
    }

    return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
