export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden">
      <div className="bg-blue-500 h-4 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
    </div>
  )
}
