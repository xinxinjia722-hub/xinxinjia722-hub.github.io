import { Coffee, Droplets, Sun, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { assets, profile } from '../data'

const lifeActions = [
  { label: '喝水', icon: Droplets, state: 'drink', duration: 1600, active: '喝水中', done: '补充完毕' },
  { label: '晒太阳', icon: Sun, state: 'sunbathe', duration: 2200, active: '晒太阳中', done: '晒够啦，继续探索。' },
]

const getTone = () => {
  const hour = new Date().getHours()
  if (hour >= 7 && hour < 18) return 'day'
  if (hour >= 18 && hour < 23) return 'dusk'
  return 'night'
}

export function PixelXin({ compact = false, pose = 'idle', state = 'idle', cue = 'none', look = 'center', tone = 'day' }) {
  return (
    <div className={`pixel-xin pixel-xin-${pose} pixel-xin-state-${state} pixel-xin-cue-${cue} pixel-xin-look-${look} pixel-xin-tone-${tone} ${compact ? 'pixel-xin-compact' : ''}`} aria-label="小Xin同学 Xin.exe 数字伙伴">
      <img className="pixel-xin-image" src={assets.xinExeCharacter} alt="小Xin同学像素数字分身" draggable="false" />
      <span className="pixel-xin-prop" aria-hidden="true" />
    </div>
  )
}

export function XinCompanion() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [petState, setPetState] = useState('idle')
  const [cue, setCue] = useState('none')
  const [look, setLook] = useState('center')
  const [tone, setTone] = useState(getTone)
  const [message, setMessage] = useState('正在发呆')
  const stateRef = useRef('idle')
  const launcherRef = useRef(null)
  const lastInteractionRef = useRef(Date.now())
  const actionTimerRef = useRef(null)
  const cueTimerRef = useRef(null)
  const idleTimerRef = useRef(null)
  const scrollTimerRef = useRef(null)
  const eventTimerRef = useRef(null)
  const clickCountRef = useRef(0)
  const dragRef = useRef({ active: false, pointerId: null, offsetX: 0, offsetY: 0, startX: 0, startY: 0, moved: false })
  const suppressClickRef = useRef(false)

  const showCue = useCallback((nextCue, duration = 900, nextMessage = '') => {
    setCue(nextCue)
    if (nextMessage) setMessage(nextMessage)
    window.clearTimeout(cueTimerRef.current)
    cueTimerRef.current = window.setTimeout(() => setCue('none'), duration)
  }, [])

  const maybeBubble = useCallback(() => {
    if (stateRef.current === 'idle' && Math.random() < 0.38) showCue('inspiration', 1300, '灵感冒泡')
  }, [showCue])

  const transitionToIdle = useCallback((nextMessage = '正在发呆', bubble = true) => {
    stateRef.current = 'idle'
    setPetState('idle')
    setCue('none')
    setMessage(nextMessage)
    window.clearTimeout(eventTimerRef.current)
    if (bubble) eventTimerRef.current = window.setTimeout(maybeBubble, 1200)
  }, [maybeBubble])

  const startAction = useCallback((nextState, duration, activeMessage, doneMessage, persistent = false) => {
    if (stateRef.current !== 'idle') return false
    lastInteractionRef.current = Date.now()
    stateRef.current = nextState
    setPetState(nextState)
    setCue('none')
    setMessage(activeMessage)
    window.clearTimeout(actionTimerRef.current)
    if (!persistent) actionTimerRef.current = window.setTimeout(() => transitionToIdle(doneMessage), duration)
    return true
  }, [transitionToIdle])

  const handleRest = () => {
    lastInteractionRef.current = Date.now()
    if (stateRef.current === 'rest') {
      transitionToIdle('醒来了', false)
      return
    }
    startAction('rest', 0, '休息中', '', true)
  }

  const handleLifeAction = (action) => startAction(action.state, action.duration, action.active, action.done)

  const handleLauncherClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    lastInteractionRef.current = Date.now()
    if (stateRef.current === 'rest') transitionToIdle('醒来了', false)
    if (stateRef.current === 'idle') {
      clickCountRef.current += 1
      const response = clickCountRef.current % 2 ? 'Hi，欢迎来到 XIN\'S SPACE！' : '小Xin同学向你挥挥手。'
      showCue('wave', 720, response)
    }
    setOpen((value) => !value)
  }

  const handlePointerDown = (event) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return
    const companion = launcherRef.current?.parentElement
    if (!companion) return
    const rect = companion.getBoundingClientRect()
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const handlePointerMove = (event) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return
    if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5) drag.moved = true
    if (!drag.moved) return
    const companion = launcherRef.current?.parentElement
    const rect = companion?.getBoundingClientRect()
    const width = rect?.width || 240
    const height = rect?.height || 210
    const left = Math.max(8, Math.min(window.innerWidth - width - 8, event.clientX - drag.offsetX))
    const top = Math.max(8, Math.min(window.innerHeight - height - 8, event.clientY - drag.offsetY))
    setPosition({ left, top })
  }

  const finishDrag = (event) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return
    suppressClickRef.current = drag.moved
    dragRef.current.active = false
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  useEffect(() => {
    const timer = window.setInterval(() => setTone(getTone()), 60000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const keepInViewport = () => {
      setPosition((current) => {
        if (!current) return current
        const rect = launcherRef.current?.parentElement?.getBoundingClientRect()
        return {
          left: Math.max(8, Math.min(current.left, window.innerWidth - (rect?.width || 240) - 8)),
          top: Math.max(8, Math.min(current.top, window.innerHeight - (rect?.height || 210) - 8)),
        }
      })
    }
    window.addEventListener('resize', keepInViewport)
    return () => window.removeEventListener('resize', keepInViewport)
  }, [])

  useEffect(() => {
    let cancelled = false
    const scheduleIdleCue = () => {
      const delay = 8000 + Math.random() * 12000
      idleTimerRef.current = window.setTimeout(() => {
        if (cancelled) return
        if (stateRef.current === 'idle') {
          const quietFor = Date.now() - lastInteractionRef.current
          if (quietFor > 45000) {
            const longIdleCue = ['stretch', 'stretch', 'rest'][Math.floor(Math.random() * 3)]
            if (longIdleCue === 'rest') startAction('rest', 0, '休息中', '', true)
            else startAction('stretch', 2300, '伸个懒腰', '正在发呆')
          } else {
            const idleCue = ['blink', 'double-blink', 'look-left', 'look-right', 'hair'][Math.floor(Math.random() * 5)]
            showCue(idleCue, idleCue === 'double-blink' ? 650 : 900)
          }
        }
        scheduleIdleCue()
      }, delay)
    }
    scheduleIdleCue()
    return () => {
      cancelled = true
      window.clearTimeout(idleTimerRef.current)
    }
  }, [showCue, startAction])

  useEffect(() => {
    const handleMouseMove = (event) => {
      const element = launcherRef.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const near = event.clientX >= rect.left - 150 && event.clientX <= rect.right + 150 && event.clientY >= rect.top - 150 && event.clientY <= rect.bottom + 150
      const nextLook = !near ? 'center' : event.clientX < rect.left + rect.width / 2 ? 'left' : 'right'
      setLook((value) => value === nextLook ? value : nextLook)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    const handleScroll = () => {
      lastInteractionRef.current = Date.now()
      if (stateRef.current !== 'idle') return
      showCue('balance', 420)
      window.clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = window.setTimeout(maybeBubble, 280)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.clearTimeout(scrollTimerRef.current)
    }
  }, [maybeBubble, showCue])

  useEffect(() => () => {
    window.clearTimeout(actionTimerRef.current)
    window.clearTimeout(cueTimerRef.current)
    window.clearTimeout(idleTimerRef.current)
    window.clearTimeout(scrollTimerRef.current)
    window.clearTimeout(eventTimerRef.current)
  }, [])

  const status = petState === 'drink' ? '喝水中' : petState === 'sunbathe' ? '晒太阳中' : petState === 'rest' ? '休息中' : cue === 'inspiration' ? '灵感冒泡' : message

  return (
    <aside className={`xin-companion tone-${tone} ${open ? 'is-open' : ''} ${dragging ? 'is-dragging' : ''}`} style={position ? { left: position.left, top: position.top, right: 'auto', bottom: 'auto' } : undefined}>
      {open && (
        <section className="xin-dialog xp-window" role="dialog" aria-modal="true" aria-label="小Xin同学 Xin.exe 数字伙伴">
          <header className="xp-titlebar">
            <span>小Xin同学 // Xin.exe</span>
            <button className="icon-button" onClick={() => setOpen(false)} aria-label="收起小Xin同学"><X size={14} /></button>
          </header>
          <div className="xin-dialog-body">
            <div className="xin-status-card">
              <div><b>小Xin同学</b><span>Xin.exe · {profile.level}</span></div>
              <em>● ONLINE</em>
            </div>
            <p className="xin-welcome">{status}</p>
            <div className="xin-life-actions" aria-label="小Xin同学生活互动">
              {lifeActions.map(({ label, icon: Icon, ...action }) => <button key={label} onClick={() => handleLifeAction(action)}><Icon size={14} /> {label}</button>)}
              <button onClick={handleRest}><Coffee size={14} /> {petState === 'rest' ? '唤醒' : '休息'}</button>
            </div>
          </div>
        </section>
      )}
      <button ref={launcherRef} className="xin-launcher" onClick={handleLauncherClick} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={finishDrag} onPointerCancel={finishDrag} aria-expanded={open} aria-label="打开或拖动小Xin同学数字伙伴" title="点击互动，拖动可移动位置">
        <PixelXin pose={cue === 'wave' ? 'wave' : 'idle'} state={petState} cue={cue} look={look} tone={tone} />
        <span><b>小Xin同学</b><small>Xin.exe · {status}</small></span>
      </button>
    </aside>
  )
}
