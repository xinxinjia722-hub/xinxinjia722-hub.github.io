import { RotateCcw, Save, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { assets } from '../data'
import { PixelXin } from './XinCompanion'

const SIZE = 420
const CELL = 21
const TYPES = [
  { key: 'architecture', emoji: '◆', label: '传统文化纹样', color: '#58d7ff' },
  { key: 'paper', emoji: '★', label: '创意星星', color: '#ff4fa8' },
  { key: 'heritage', emoji: '✦', label: 'AI能量', color: '#ffd866' },
  { key: 'energy', emoji: '▣', label: '灵感芯片', color: '#a68cff' },
]

const RESULT_CARDS = [
  { name: '三晋星轨纹', source: '山西古建花窗', badge: 'Xin.exe 星轨探索者', keywords: ['秩序', '流动', '未来民艺'] },
  { name: '霓虹剪纸芯', source: '民间剪纸构图', badge: 'Xin.exe 灵感采样员', keywords: ['留白', '叙事', '数字民俗'] },
  { name: '云上花窗纹', source: '传统建筑装饰', badge: 'Xin.exe 文化寻路者', keywords: ['结构', '光影', '空间记忆'] },
  { name: 'AI回声碎片', source: '生成式视觉实验', badge: 'Xin.exe AI共创者', keywords: ['想象', '重组', '人机协作'] },
  { name: '旧网页星尘', source: '2008互联网记忆', badge: 'Xin.exe 记忆收藏家', keywords: ['像素', '怀旧', '再连接'] },
]

const newFood = () => ({
  x: Math.floor(Math.random() * (SIZE / CELL)),
  y: Math.floor(Math.random() * (SIZE / CELL)),
  type: TYPES[Math.floor(Math.random() * TYPES.length)],
})

export function SnakeGame({ open, onClose }) {
  const canvasRef = useRef(null)
  const playerImageRef = useRef(null)
  const snakeRef = useRef([{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }])
  const directionRef = useRef({ x: 1, y: 0 })
  const queuedDirectionRef = useRef({ x: 1, y: 0 })
  const foodRef = useRef(newFood())
  const collectedRef = useRef({ architecture: 0, paper: 0, heritage: 0, energy: 0 })
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [tick, setTick] = useState(0)
  const [result, setResult] = useState(null)
  const [saved, setSaved] = useState(false)
  const lastResultIndexRef = useRef(-1)

  useEffect(() => {
    if (!open) return undefined
    const image = new Image()
    image.src = assets.xinExeCharacter
    image.onload = () => {
      playerImageRef.current = image
      setTick((value) => value + 1)
    }
    return () => {
      image.onload = null
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  const reset = useCallback(() => {
    snakeRef.current = [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }]
    directionRef.current = { x: 1, y: 0 }
    queuedDirectionRef.current = { x: 1, y: 0 }
    foodRef.current = newFood()
    collectedRef.current = { architecture: 0, paper: 0, heritage: 0, energy: 0 }
    setScore(0)
    setResult(null)
    setSaved(false)
    setRunning(true)
    setTick((value) => value + 1)
  }, [])

  const finish = useCallback(() => {
    const collected = { ...collectedRef.current }
    const total = Object.values(collected).reduce((sum, value) => sum + value, 0)
    const level = total >= 12 ? 'S+' : total >= 7 ? 'A' : total >= 3 ? 'B+' : 'C'
    let variantIndex = Math.floor(Math.random() * RESULT_CARDS.length)
    if (RESULT_CARDS.length > 1 && variantIndex === lastResultIndexRef.current) {
      variantIndex = (variantIndex + 1 + Math.floor(Math.random() * (RESULT_CARDS.length - 1))) % RESULT_CARDS.length
    }
    lastResultIndexRef.current = variantIndex
    const variant = RESULT_CARDS[variantIndex]
    setRunning(false)
    setResult({
      collected,
      score,
      card: { ...variant, level },
    })
  }, [score])

  useEffect(() => {
    if (!open || !running) return undefined
    const timer = window.setInterval(() => {
      directionRef.current = queuedDirectionRef.current
      const snake = [...snakeRef.current]
      const head = {
        x: snake[0].x + directionRef.current.x,
        y: snake[0].y + directionRef.current.y,
      }
      const hitWall = head.x < 0 || head.y < 0 || head.x >= SIZE / CELL || head.y >= SIZE / CELL
      const hitSelf = snake.some((cell) => cell.x === head.x && cell.y === head.y)
      if (hitWall || hitSelf) {
        finish()
        return
      }
      snake.unshift(head)
      const food = foodRef.current
      if (head.x === food.x && head.y === food.y) {
        collectedRef.current[food.type.key] += food.type.key === 'energy' ? 3 : 1
        setScore((value) => value + (food.type.key === 'energy' ? 30 : 10))
        foodRef.current = newFood()
      } else {
        snake.pop()
      }
      snakeRef.current = snake
      setTick((value) => value + 1)
    }, 125)
    return () => window.clearInterval(timer)
  }, [finish, open, running])

  useEffect(() => {
    if (!open) return undefined
    const keyMap = {
      ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
    }
    const handleKey = (event) => {
      const next = keyMap[event.key]
      if (!next) return
      event.preventDefault()
      const current = directionRef.current
      if (next.x + current.x !== 0 || next.y + current.y !== 0) queuedDirectionRef.current = next
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.fillStyle = '#090a12'
    context.fillRect(0, 0, SIZE, SIZE)
    context.strokeStyle = 'rgba(93, 220, 255, .08)'
    context.lineWidth = 1
    for (let index = 0; index <= SIZE; index += CELL) {
      context.beginPath(); context.moveTo(index, 0); context.lineTo(index, SIZE); context.stroke()
      context.beginPath(); context.moveTo(0, index); context.lineTo(SIZE, index); context.stroke()
    }
    snakeRef.current.forEach((cell, index) => {
      if (index === 0 && playerImageRef.current?.complete) {
        context.imageSmoothingEnabled = false
        context.drawImage(playerImageRef.current, cell.x * CELL - 7, cell.y * CELL - 9, CELL + 14, CELL + 14)
        return
      }
      context.fillStyle = index === 0 ? '#ff4fa8' : index % 2 ? '#85e7ff' : '#b9a5ff'
      context.fillRect(cell.x * CELL + 2, cell.y * CELL + 2, CELL - 4, CELL - 4)
      if (index === 0) {
        context.fillStyle = '#15131e'
        context.fillRect(cell.x * CELL + 6, cell.y * CELL + 7, 3, 3)
        context.fillRect(cell.x * CELL + 13, cell.y * CELL + 7, 3, 3)
      }
    })
    const food = foodRef.current
    context.shadowBlur = 14
    context.shadowColor = food.type.color
    context.fillStyle = food.type.color
    context.fillRect(food.x * CELL + 4, food.y * CELL + 4, CELL - 8, CELL - 8)
    context.shadowBlur = 0
    context.fillStyle = '#fff'
    context.font = '12px sans-serif'
    context.textAlign = 'center'
    context.fillText(food.type.emoji, food.x * CELL + CELL / 2, food.y * CELL + 15)
  }, [open, tick])

  const steer = (x, y) => {
    const current = directionRef.current
    if (x + current.x !== 0 || y + current.y !== 0) queuedDirectionRef.current = { x, y }
  }

  const saveCard = () => {
    const cards = JSON.parse(localStorage.getItem('xin-pattern-cards') || '[]')
    localStorage.setItem('xin-pattern-cards', JSON.stringify([...cards, result.card]))
    setSaved(true)
  }

  if (!open) return null
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="game-window xp-window" role="dialog" aria-modal="true" aria-label="Xin.exe 纹样捕获计划">
        <header className="xp-titlebar">
          <span>《Xin.exe：纹样捕获计划》</span>
          <button className="icon-button" onClick={onClose} aria-label="关闭游戏"><X size={15} /></button>
        </header>
        <div className="game-layout">
          <div className="game-stage">
            <div className="game-hud"><b>创意值 {score}</b><span>{running ? 'SYSTEM // EXPLORING' : 'SYSTEM // READY'}</span></div>
            <canvas ref={canvasRef} width={SIZE} height={SIZE} />
            <div className="mobile-controls" aria-label="方向控制">
              <button onClick={() => steer(0, -1)}>↑</button>
              <span><button onClick={() => steer(-1, 0)}>←</button><button onClick={() => steer(0, 1)}>↓</button><button onClick={() => steer(1, 0)}>→</button></span>
            </div>
          </div>
          <aside className="game-info">
            {!running && !result && <><div className="game-character-intro"><PixelXin compact /><div><p className="eyebrow">XIN.EXE // PLAYER ONE</p><h2>捕获文化碎片</h2></div></div><p>使用方向键或 WASD 控制 Xin.exe。收集古建纹样、创意星星、传统文化碎片和 AI 能量球。</p><button className="chrome-button" onClick={reset}><GamepadIcon /> 开始探索</button></>}
            {running && <><p className="eyebrow">COLLECTION CACHE</p><h2>正在探索...</h2>{TYPES.map((type) => <div className="collection-line" key={type.key}><span>{type.emoji} {type.label}</span><b>× {collectedRef.current[type.key]}</b></div>)}<p className="game-tip">撞到边界后，本次探索会自然结束，不会失败。</p></>}
            {result && <div className="system-result"><p className="eyebrow">SYSTEM MESSAGE</p><h2>本次探索结束！</h2><div className="result-list"><span>◆ 传统文化纹样 ×{result.collected.architecture}</span><span>★ 创意星星 ×{result.collected.paper}</span><span>✦ AI能量 ×{result.collected.heritage}</span><span>▣ 灵感芯片 ×{result.collected.energy}</span></div><p>正在生成你的 Xin.exe 成就徽章...</p><article className="pattern-card"><small>XIN.EXE ACHIEVEMENT BADGE</small><b>{result.card.badge}</b><span>纹样奖励：{result.card.name}</span><span>文化来源：{result.card.source}</span><span>AI重构等级：{result.card.level}</span><span>设计关键词：{result.card.keywords.join(' / ')}</span></article><div className="game-result-actions"><button className="chrome-button" onClick={saveCard} disabled={saved}><Save size={15} /> {saved ? '已保存' : '保存到我的收藏'}</button><button className="ghost-button" onClick={reset}><RotateCcw size={15} /> 再来一次</button></div></div>}
          </aside>
        </div>
      </section>
    </div>
  )
}

function GamepadIcon() {
  return <span aria-hidden="true">✦</span>
}
