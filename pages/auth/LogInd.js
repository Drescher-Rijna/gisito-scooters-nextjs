import React, { useRef, useState } from "react"
import { useRouter } from 'next/router'
import { useAuth } from "../../global/AuthContext"
import Link from 'next/link'
import Head from 'next/head'

const LogInd = () => {
    const router = useRouter()
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            console.log(emailRef.current.value);
            router.push('/');
        } catch {
            setError("Failed to log in, you may have written an incorrect email or password");
        }

        setLoading(false)
    }

    return (
        <div className="logind-container">
            <Head>
                <title>Gisito Scooters - Log Ind</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h2>Log Ind</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>E-mail</label>
                <input type="email" ref={emailRef} required />

                <label>Password</label>
                <input type="password" ref={passwordRef} required />

                <button type="submit" disabled={loading} >Log Ind</button>
                {error != "" ? <p>{error}</p> : ""}
            </form>
        </div>
    )
}

export default LogInd;