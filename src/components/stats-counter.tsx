'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  value: string
  label: string
}

function parseValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { num: 0, suffix: value, isNumeric: false }
  return { num: parseInt(match[1]), suffix: match[2], isNumeric: true }
}

function StatCard({
  value,
  label,
  cardClass,
  numClass,
  labelClass,
  numColor,
}: Stat & { cardClass: string; numClass: string; labelClass: string; numColor?: string }) {
  const { num, suffix, isNumeric } = parseValue(value)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || !isNumeric) return
    const duration = 2000
    const startTime = performance.now()

    function step(now: number) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * num))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(num)
    }

    requestAnimationFrame(step)
  }, [started, num, isNumeric])

  return (
    <div ref={ref} className={cardClass}>
      <div
        className={numClass}
        style={numColor ? { color: numColor } : undefined}
      >
        {isNumeric ? `${count}${suffix}` : value}
      </div>
      <div className={labelClass}>{label}</div>
    </div>
  )
}

export function StatsCounter({
  stats,
  cardClassName = 'bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-1 transition-transform',
  numClassName = 'text-4xl font-bold text-[#1e3a8a] mb-2',
  labelClassName = 'text-[#2c3e50] font-medium',
  numColor,
}: {
  stats: Stat[]
  cardClassName?: string
  numClassName?: string
  labelClassName?: string
  numColor?: string
}) {
  return (
    <>
      {stats.map((s, i) => (
        <StatCard
          key={i}
          value={s.value}
          label={s.label}
          cardClass={cardClassName}
          numClass={numClassName}
          labelClass={labelClassName}
          numColor={numColor}
        />
      ))}
    </>
  )
}
