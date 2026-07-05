"use client"
import { Button } from "@/components/ui/button"
import { ShieldX, ArrowLeft, LogIn, Home } from "lucide-react"
import { Link } from "react-router-dom"

export function UnauthorizedContent() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Icon Container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-card border border-border flex items-center justify-center">
              <ShieldX className="w-12 h-12 text-destructive" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
              <span className="text-destructive-foreground text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-4">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            Error 401
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
          Access Denied
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed text-pretty">
          You don&apos;t have permission to access this page. Please sign in with an authorized account or contact your administrator.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button asChild size="lg" className="gap-2">
            <Link to="/auth?mode=login">
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to={'/'}>
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-sm text-muted-foreground">
              Need help?
            </span>
          </div>
        </div>

        {/* Help Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="/support"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact Support
          </Link>
          <Link
            href="/help"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Help Center
          </Link>
          <button
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            Go Back
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground">
          If you believe this is an error, please contact your system administrator.
        </p>
      </footer>
    </main>
  )
}
