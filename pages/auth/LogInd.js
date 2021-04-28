import React, { useRef, useState } from "react"
import { useRouter } from 'next/router'
import { useAuth } from "../../global/AuthContext"
import Link from 'next/link'

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
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        console.log(emailRef.current.value)
        router.push('/')
        } catch {
        setError("Failed to log in")
        }

        setLoading(false)
    }

    return (
        <div className="logind-container">
            <h2>Log Ind</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label>E-mail</label>
                <input type="email" ref={emailRef} required />

                <label>Password</label>
                <input type="password" ref={passwordRef} required />

                <button type="submit" disabled={loading} >Log Ind</button>
            </form>
            <div className="auth-link">
                Har ikke en bruger? Opret dig nu
            </div>
        </div>
    )
}

export default LogInd;