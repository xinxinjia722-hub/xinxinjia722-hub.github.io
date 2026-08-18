import { useEffect, useMemo, useRef, useState } from 'react'

const bootLines = [
  '你醒了。',
  '现在是2008年的夏天。',
  '你打开了一台旧电脑。',
  '一个尚未被遗忘的互联网空间正在重新启动。',
  '旧时代的记忆仍在闪烁，',
  '新的创意正在加载。',
  "Welcome to XIN'S SPACE。",
]

const starSeeds = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  top: `${(index * 61 + 11) % 100}%`,
  delay: `${(index % 9) * 0.35}s`,
  duration: `${3.4 + (index % 5) * 0.8}s`,
  size: `${index % 4 === 0 ? 3 : 2}px`,
}))

export function IntroScreen({ exiting, onEnter }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [visibleText, setVisibleText] = useState('')
  const [ready, setReady] = useState(false)
  const audioContextRef = useRef(null)
  const totalCharacters = useMemo(() => bootLines.reduce((total, line) => total + line.length, 0), [])
  const typedCharacters = bootLines.slice(0, lineIndex).join('').length + visibleText.length
  const progress = Math.min(100, (typedCharacters / totalCharacters) * 100)

  const playTypewriterSound = (character) => {
    const context = audioContextRef.current
    if (!context || context.state !== 'running') return
    const now = context.currentTime
    const punctuation = /[。！？,.，]/.test(character)
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(punctuation ? 112 : 178 + Math.random() * 42, now)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(punctuation ? 0.035 : 0.022, now + 0.002)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (punctuation ? 0.055 : 0.032))
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(now)
    oscillator.stop(now + (punctuation ? 0.06 : 0.038))
  }

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return undefined
    const context = new AudioContext()
    audioContextRef.current = context
    const unlockAudio = () => {
      if (context.state === 'suspended') context.resume().catch(() => {})
    }
    unlockAudio()
    window.addEventListener('pointerdown', unlockAudio, { passive: true })
    window.addEventListener('keydown', unlockAudio)
    return () => {
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      audioContextRef.current = null
      context.close().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (lineIndex >= bootLines.length) {
      setReady(true)
      return undefined
    }

    const line = bootLines[lineIndex]
    if (visibleText.length < line.length) {
      const timer = window.setTimeout(() => {
        const nextCharacter = line[visibleText.length]
        setVisibleText(line.slice(0, visibleText.length + 1))
        playTypewriterSound(nextCharacter)
      }, 34)
      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => {
      setVisibleText('')
      setLineIndex((value) => value + 1)
    }, lineIndex === bootLines.length - 1 ? 520 : 390)
    return () => window.clearTimeout(timer)
  }, [lineIndex, visibleText])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && ready && !exiting) onEnter()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [exiting, onEnter, ready])

  return (
    <div className={`intro-screen ${exiting ? 'is-exiting' : ''}`} role="dialog" aria-label="XIN'S SPACE 启动界面">
      <div className="intro-stars" aria-hidden="true">
        {starSeeds.map((star, index) => <i key={index} style={{ '--left': star.left, '--top': star.top, '--delay': star.delay, '--duration': star.duration, '--size': star.size }} />)}
      </div>
      <div className="intro-scanlines" aria-hidden="true" />
      <div className="intro-noise" aria-hidden="true" />
      <main className="intro-console">
        <header className="intro-console-bar">
          <span><i /> XIN'S SPACE // OLD COMPUTER CONNECTION</span>
          <b>MEMORY 2008</b>
        </header>
        <div className="intro-terminal">
          <div className="intro-status"><span>●</span> INTERNET SPACE RECONNECTING...</div>
          <div className="intro-copy" aria-live="polite">
            {bootLines.slice(0, lineIndex).map((line) => <p key={line}>{line}</p>)}
            {lineIndex < bootLines.length && <p>{visibleText}<span className="intro-cursor" aria-hidden="true" /> </p>}
          </div>
          <div className={`intro-prompt ${ready ? 'is-ready' : ''}`}>
            <button type="button" onClick={onEnter} disabled={!ready || exiting}>PRESS ENTER TO ENTER SPACE <span>↵</span></button>
            {!ready && <small>LOADING MEMORY CACHE // {Math.round(progress)}%</small>}
            {ready && <small>PRESS ENTER OR CLICK TO CONTINUE</small>}
          </div>
        </div>
        <footer className="intro-console-footer">
          <div className="intro-pixel-loader"><i style={{ width: `${progress}%` }} /></div>
          <span>CRT LINK: 56K · SIGNAL STABLE · STARFIELD ONLINE</span>
        </footer>
      </main>
    </div>
  )
}
