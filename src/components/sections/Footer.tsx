export function Footer() {
  return (
    <footer className="bg-ink border-t border-haze/10 px-5 sm:px-8 md:px-10 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-haze/50 font-light text-xs sm:text-sm">
        <div>
          © 2026 Kumar Shivam · Built with{' '}
          <span className="hero-heading font-medium">vibe coding</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="/Kumar_Shivam_Resume.pdf"
            download
            className="hover:text-haze transition-colors uppercase tracking-widest"
          >
            Resume ↓
          </a>
          <a
            href="https://linkedin.com/in/kumar-shivam-"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-haze transition-colors uppercase tracking-widest"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/shivam5600"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-haze transition-colors uppercase tracking-widest"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
