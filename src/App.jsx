import { useEffect, useRef, useState } from 'react'
import { HomePage, DiaryPage, AlbumsPage, MomentsPage, GuestbookPage, MusicPage, ProfilePage } from './components/Pages'
import { MusicBox } from './components/MusicBox'
import { SnakeGame } from './components/SnakeGame'
import { SparkleTrail, Starfield } from './components/Starfield'
import { XinCompanion } from './components/XinCompanion'
import { IntroScreen } from './components/IntroScreen'
import { navItems } from './data'

const validRoutes = new Set(navItems.filter((item) => !item.action).map((item) => item.id))

function getInitialRoute() {
  const hashRoute = window.location.hash.replace(/^#\/?/, '')
  const pathRoute = window.location.pathname.replace(/^\/+|\/+$/g, '')
  const route = hashRoute || (pathRoute && pathRoute !== 'index.html' ? pathRoute : '')
  return validRoutes.has(route) ? route : 'home'
}

export default function App() {
  const [route, setRoute] = useState(getInitialRoute)
  const [introVisible, setIntroVisible] = useState(true)
  const [introExiting, setIntroExiting] = useState(false)
  const [likeCount, setLikeCount] = useState(5201314)
  const [gameOpen, setGameOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.46)
  const [musicClosed, setMusicClosed] = useState(() => window.innerWidth <= 720)
  const [musicError, setMusicError] = useState('')
  const audioRef = useRef(null)

  const enterIntro = () => {
    if (introExiting) return
    startMusic()
    setIntroExiting(true)
    window.setTimeout(() => setIntroVisible(false), 720)
  }

  useEffect(() => {
    const handleHash = () => setRoute(getInitialRoute())
    window.addEventListener('hashchange', handleHash)
    return () => {
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (!introVisible) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [introVisible])

  useEffect(() => {
    if (route === 'diary' && window.innerWidth <= 1100) setMusicClosed(true)
  }, [route])

  const navigate = (nextRoute) => {
    if (!validRoutes.has(nextRoute)) return
    window.location.hash = `/${nextRoute}`
    setRoute(nextRoute)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (window.innerWidth > 720) setMusicClosed(false)
    try {
      await audio.play()
      setPlaying(true)
      setMusicError('')
    } catch {
      setPlaying(false)
      setMusicError('浏览器等待再次点击播放')
    }
  }

  const enterSpace = async () => {
    await startMusic()
    document.getElementById('main-space')?.scrollIntoView({ behavior: 'smooth' })
  }

  const page = (() => {
    switch (route) {
      case 'diary': return <DiaryPage />
      case 'albums': return <AlbumsPage />
      case 'moments': return <MomentsPage />
      case 'guestbook': return <GuestbookPage />
      case 'music': return <MusicPage onStartMusic={startMusic} playing={playing} />
      case 'profile': return <ProfilePage onNavigate={navigate} />
      default: return <HomePage onNavigate={navigate} onEnter={enterSpace} likeCount={likeCount} onLike={() => setLikeCount((value) => value + 1)} />
    }
  })()

  return (
    <div className={`app-shell route-${route}`}>
      <Starfield />
      <SparkleTrail />
      {introVisible && <IntroScreen exiting={introExiting} onEnter={enterIntro} />}
      <audio ref={audioRef} src="/media/audio/xin-space.flac" preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setMusicError('当前浏览器无法读取 FLAC')} />
      <header className="site-header">
        <button className="brand" onClick={() => navigate('home')}>★ XIN'S SPACE ★</button>
        <nav aria-label="空间导航">{navItems.map((item) => <button className={route === item.id || (item.action === 'game' && gameOpen) ? 'active' : ''} key={item.id} onClick={() => item.action === 'game' ? setGameOpen(true) : navigate(item.id)}><span>{item.label}</span><i>{item.emoji}</i></button>)}</nav>
        <div className="header-online"><span /> ONLINE · 2026</div>
      </header>
      <div className="page-layer">{page}</div>
      <footer className="site-footer"><b>★ XIN'S SPACE ★</b><span>贾新鑫的个人数字空间 · 2008 MEMORY / 2026 AI FUTURE</span><small>Best viewed with curiosity.</small></footer>
      <XinCompanion />
      <MusicBox audioRef={audioRef} playing={playing} setPlaying={setPlaying} volume={volume} setVolume={setVolume} closed={musicClosed} setClosed={setMusicClosed} error={musicError} />
      <SnakeGame open={gameOpen} onClose={() => setGameOpen(false)} />
    </div>
  )
}
