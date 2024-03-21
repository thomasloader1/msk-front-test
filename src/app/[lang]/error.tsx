'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    let apiURL = process.env.NEXT_PUBLIC_PUBLIC_URL;
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Server Error: ", error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <p>Api url: {apiURL}</p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}