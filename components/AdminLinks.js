import React, { useState } from 'react';
import { useAuth } from '../global/AuthContext';

const AdminLinks = () => {
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
        <ul id="admin-links">
            <li>
                Profil
            </li>
            <li onClick={handleLogout}>
                Log ud
            </li>
            <li id="add-product">
                Tilføj Produkt
            </li>
        </ul>
    )
}

export default AdminLinks;