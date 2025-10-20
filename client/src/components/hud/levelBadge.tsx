export default function LevelBadge({ level }: { level: number }) {
  return (
    <div className="px-3 py-1 bg-green-500 text-white rounded-full font-bold shadow">
      Level {level}
    </div>
  )
}
