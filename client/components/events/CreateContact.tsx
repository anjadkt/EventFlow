
export default function CreateContact () {

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-white">Contact & Support</h2>
        <p className="text-sm text-slate-400">How attendees can reach out with queries.</p>
      </div>
      <div className="max-w-2xl space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
            Organizer Email
          </label>
          <input
            type="email"
            placeholder="organizer@domain.com"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
      </div>
    </div>
  )
}