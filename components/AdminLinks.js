import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from '../global/AuthContext';
import Link from 'next/link'

const AdminLinks = () => {
    const router = useRouter()
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();

    async function handleLogout() {
        setError("")
        try {
          await logout()
          router.push('/')
        } catch {
          setError("Failed to log out")
        }
    }

    return (
        <ul id="admin-links">
            <li>
                <Link href="/profil">
                    Profil
                </Link>
            </li>
            <li onClick={handleLogout}>
                Log ud
            </li>
            <li id="add-product">
                <Link href="/add-products">
                    Tilføj Produkt
                </Link>
            </li>
        </ul>
    )
}

export default AdminLinks;