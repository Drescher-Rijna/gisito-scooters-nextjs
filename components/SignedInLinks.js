import React, { useState } from 'react';
import { useAuth } from '../global/AuthContext';

const SignedInLinks = () => {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();

    async function handleLogout() {
        setError("")
        try {
          await logout()
        } catch {
          setError("Failed to log out")
        }
    }

    return (
        <ul id="signedin-links">
            <li>
                Profil
            </li>
            <li onClick={handleLogout}>
                Log ud
            </li>
        </ul>
    )
}

export default SignedInLinks;