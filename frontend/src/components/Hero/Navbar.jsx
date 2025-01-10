import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="w-full border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 items-center ">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 text-white">
            <span className="font-bold">Doc-O-Drop</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between space-x-6 text-sm text-white font-medium">
          <div className="flex items-center space-x-6">
            <Link href="/" className="transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link href="/ai-yoga" className="transition-colors hover:text-foreground/80">
              AI Yoga
            </Link>
            <Link href="/appointments" className="transition-colors hover:text-foreground/80">
              Appointments
            </Link>
            <Link href="/records" className="transition-colors hover:text-foreground/80">
              Records
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80">
              Contact
            </Link>
          </div>
          <Button variant="default">Login</Button>
        </nav>
      </div>
    </header>
  )
}

