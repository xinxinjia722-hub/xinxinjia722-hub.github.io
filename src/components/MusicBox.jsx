import { Music2, Pause, Play, RotateCcw, Volume2, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function MusicBox({ audioRef, playing, setPlaying, volume, setVolume, closed, setClosed, error }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    const update = () => setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    const handleEnded = () => setPlaying(false)
    audio.addEventListener('timeupdate', update)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioRef, setPlaying])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        if (audio.ended) audio.currentTime = 0
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }

  const replay = async () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  if (closed) {
    return (
      <button className="music-reopen icon-button" onClick={() => setClosed(false)} aria-label="打开音乐盒" title="打开音乐盒">
        <Music2 size={18} />
      </button>
    )
  }

  return (
    <aside className="music-box" aria-label="XIN'S SPACE 音乐盒">
      <header>
        <span><Music2 size={15} /> XIN'S SPACE 音乐盒</span>
        <span className="music-box-actions"><button className="icon-button" onClick={replay} aria-label="重播音乐" title="重播音乐"><RotateCcw size={12} /></button><button className="icon-button" onClick={() => setClosed(true)} aria-label="关闭音乐盒" title="关闭音乐盒"><X size={14} /></button></span>
      </header>
      <div className={`mini-disc ${playing ? 'is-playing' : ''}`}><i /></div>
      <div className="music-copy">
        <b>玫瑰花的葬礼</b>
        <span>{error || (playing ? '正在播放 // ONLINE' : '等待进入空间后播放')}</span>
        <div className="music-progress"><i style={{ width: `${progress}%` }} /></div>
      </div>
      <button className="icon-button music-toggle" onClick={toggle} aria-label={playing ? '暂停' : '播放'} title={playing ? '暂停' : '播放'}>
        {playing ? <Pause size={17} /> : <Play size={17} />}
      </button>
      <label className="volume-control" title="音量">
        <Volume2 size={15} />
        <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
      </label>
    </aside>
  )
}
