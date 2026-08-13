
export default function CreateGallery() {

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-white">Event Gallery</h2>
        <p className="text-sm text-slate-400">Upload promotional banners and thumbnail images.</p>
      </div>
      <div className="h-48 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-500 transition-all cursor-pointer">
        <p className="text-sm font-medium">Click or drag images here to upload</p>
        <p className="text-xs text-slate-600 mt-1">PNG, JPG or WEBP up to 10MB</p>
      </div>
    </div>
  )
}