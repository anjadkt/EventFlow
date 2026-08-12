
export function ButtonLoader () {

    return (
        <div className="inline-flex items-center justify-center bg-indigo-600 rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed">
            <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
        </div>
    )
    
}

export default function ScreenLoader() {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
        <span className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />

        <p className="mt-4 text-sm font-medium tracking-widest uppercase text-slate-300 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }