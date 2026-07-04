import { useCounter } from '../../hooks/useCounter'

export default function Counter({ end, suffix = '', label }) {
  const { count, ref } = useCounter(end, 2000, suffix)

  return (
    <div ref={ref} className="text-center glass-card rounded-2xl p-6 gradient-border">
      <p className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
        {count}
        {suffix}
      </p>
      <p className="text-muted text-sm">{label}</p>
    </div>
  )
}
