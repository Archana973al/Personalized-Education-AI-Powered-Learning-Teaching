import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>Quiz Not Found</h2>
      <p>Could not find the requested quiz</p>
      <Link href="/dashboard" className="btn btn-primary">
        Return to Dashboard
      </Link>
    </div>
  )
}