import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from './Firebase';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, password, fullName) {
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return db.collection("users").doc(cred.user.uid).set({
                email: email,
                fullName: fullName
            })
        });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe
    }, []);
    

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;