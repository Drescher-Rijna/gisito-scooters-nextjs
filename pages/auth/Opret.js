import React, { useRef, useState } from "react"
import { Link } from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from "../../global/AuthContext"
import Head from 'next/head'

const Opret = () => {
        const router = useRouter()
        const fullNameRef = useRef()
        const emailRef = useRef()
        const passwordRef = useRef()
        const passwordConfirmRef = useRef()
        const { signup } = useAuth();
        const [error, setError] = useState("")
        const [loading, setLoading] = useState(false)

        async function handleSubmit(e) {
            e.preventDefault()

            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError("Passwords do not match")
            }

            try {
                setError("")
                setLoading(true)
                await signup(emailRef.current.value, passwordRef.current.value, fullNameRef.current.value)
                router.push('/auth/LogInd')
            } catch {
                setError("Failed to create an account")
            }

            setLoading(false)
        }

    return (
        <div className="OpretBruger-container">
            <Head>
                <title>Gisito Scooters - Opret Dig</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h2>Opret en bruger</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>Fornavn og Efternavn</label>
                <input type="text" ref={fullNameRef} required />

                <label>E-mail</label>
                <input type="email" ref={emailRef} required />

                <label>Password</label>
                <input type="password" ref={passwordRef} required />

                <label>Bekræft Password</label>
                <input type="password" ref={passwordConfirmRef} required />

                <button disabled={loading} type="submit">
                    Opret Dig
                </button>
            </form>
            <div className="auth-link">
                Har allerede en bruger? 
            </div>
        </div>
    )
}

export default Opret;