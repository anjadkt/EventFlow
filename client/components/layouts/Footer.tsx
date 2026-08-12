
export default function Footer() {
  return (
    <footer className=" fixed bottom-0 w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Event<span className="text-indigo-500">Flow</span>
                <span className="text-indigo-500">.</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Seamlessly host, manage, and discover events. EventFlow empowers creators and communities to connect through unforgettable experiences.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/events" className="text-slate-400 hover:text-white transition-colors">
                  Browse Events
                </a>
              </li>
              <li>
                <a href="/create-event" className="text-slate-400 hover:text-white transition-colors">
                  Host an Event
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-slate-400 hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="/popular" className="text-slate-400 hover:text-white transition-colors">
                  Trending Topics
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/help" className="text-slate-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/guides" className="text-slate-400 hover:text-white transition-colors">
                  Organizer Guides
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Stay Updated
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get the latest event news and organizer tips sent to your inbox.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-sm text-white bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg shadow-sm active:scale-[0.98] transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-2 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} EventFlow, Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-slate-400 transition-colors">
              Terms
            </a>
            <a href="/cookies" className="hover:text-slate-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}