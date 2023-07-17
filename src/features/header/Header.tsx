import { FunctionalComponent } from 'preact'
import { Link } from 'preact-router'

interface Props {
    isAuthenticated: boolean
}

export const Header: FunctionalComponent<Props> = ({ isAuthenticated }) => {
    return (
        <header class="flex justify-between items-center bg-white bg-gray p-4 shadow-md mb-4 rounded">
            <Link href="/" class="text-blue-500 text-lg font-bold">EchoTrace</Link>
            <nav class="space-x-4">
                {isAuthenticated ? (
                    <Link href="/profile" class="text-blue-500 no-underline hover:underline">Profile</Link>
                ) : (
                    <>
                        <Link href="/login" class="text-blue-500 no-underline hover:underline">Login</Link>
                        <Link href="/register" class="text-blue-500 no-underline hover:underline">Register</Link>
                    </>
                )}
            </nav>
        </header>
    )
}