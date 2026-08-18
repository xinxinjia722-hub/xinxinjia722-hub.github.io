import { useEffect, useRef } from 'react'

export function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let frame = 0
    let animationId = 0
    const pointer = { x: -1000, y: -1000 }
    let stars = []
    let particles = []

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      stars = Array.from({ length: Math.min(190, Math.floor((width * height) / 8500)) }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.25,
        alpha: Math.random() * 0.65 + 0.2,
        speed: Math.random() * 0.012 + 0.004,
        phase: index,
      }))
      particles = Array.from({ length: Math.min(72, Math.floor(width / 22)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.8 + 0.8,
        hue: Math.random() > 0.48 ? 326 : 192,
      }))
    }

    const draw = () => {
      frame += 1
      context.clearRect(0, 0, width, height)
      const wash = context.createRadialGradient(width * 0.72, height * 0.14, 0, width * 0.72, height * 0.14, width * 0.7)
      wash.addColorStop(0, 'rgba(11, 204, 255, 0.08)')
      wash.addColorStop(0.42, 'rgba(255, 40, 157, 0.055)')
      wash.addColorStop(1, 'rgba(5, 6, 13, 0)')
      context.fillStyle = wash
      context.fillRect(0, 0, width, height)

      stars.forEach((star) => {
        const alpha = star.alpha + Math.sin(frame * star.speed + star.phase) * 0.22
        context.beginPath()
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(236, 246, 255, ${Math.max(0.05, alpha)})`
        context.fill()
      })

      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < -20) particle.x = width + 20
          if (particle.x > width + 20) particle.x = -20
          if (particle.y < -20) particle.y = height + 20
          if (particle.y > height + 20) particle.y = -20
          const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y)
          if (pointerDistance < 130) {
            particle.x += (particle.x - pointer.x) * 0.004
            particle.y += (particle.y - pointer.y) * 0.004
          }
        }
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.shadowBlur = 12
        context.shadowColor = `hsla(${particle.hue}, 100%, 65%, .8)`
        context.fillStyle = `hsla(${particle.hue}, 100%, 72%, .62)`
        context.fill()
        context.shadowBlur = 0

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance < 112) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(154, 224, 255, ${(1 - distance / 112) * 0.1})`
            context.stroke()
          }
        }
      })
      animationId = requestAnimationFrame(draw)
    }

    const handlePointer = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }
    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointer)
    }
  }, [])

  return <canvas className="starfield" ref={canvasRef} aria-hidden="true" />
}

export function SparkleTrail() {
  useEffect(() => {
    let last = 0
    const spawn = (x, y, strong = false) => {
      const particle = document.createElement('span')
      particle.className = strong ? 'cursor-spark cursor-spark-strong' : 'cursor-spark'
      particle.textContent = Math.random() > 0.55 ? '✦' : '·'
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`
      particle.style.setProperty('--spark-x', `${(Math.random() - 0.5) * (strong ? 90 : 34)}px`)
      particle.style.setProperty('--spark-y', `${-20 - Math.random() * (strong ? 75 : 32)}px`)
      document.body.appendChild(particle)
      window.setTimeout(() => particle.remove(), 850)
    }
    const move = (event) => {
      if (Date.now() - last < 85) return
      last = Date.now()
      spawn(event.clientX, event.clientY)
    }
    const click = (event) => {
      for (let index = 0; index < 8; index += 1) spawn(event.clientX, event.clientY, true)
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('click', click)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('click', click)
    }
  }, [])
  return null
}
