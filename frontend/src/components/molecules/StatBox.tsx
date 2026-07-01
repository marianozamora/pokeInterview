type StatBoxProps = {
  label: string
  value: string | number
  unit?: string
  className?: string
}

export function StatBox({ label, value, unit, className = '' }: StatBoxProps) {
  return (
    <div className={`flex flex-col items-center bg-gray-50 rounded-xl px-6 py-4 ${className}`}>
      <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">{label}</span>
      <span className="text-2xl font-bold text-gray-800 mt-1">
        {value}
        {unit && <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>}
      </span>
    </div>
  )
}
