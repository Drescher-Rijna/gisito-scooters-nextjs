import Link from 'next/link'

const SignedOutLinks = () => {

    return (
        <ul id="signedout-links">
            <li>
                <Link href="/auth/LogInd">
                    Log Ind
                </Link>
            </li>
            <li>
                <Link href="/auth/Opret">
                    Opret Bruger
                </Link>
            </li>
        </ul>
    )
}

export default SignedOutLinks;