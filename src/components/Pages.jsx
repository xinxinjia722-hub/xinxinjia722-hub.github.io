import {
  ArrowRight, Award, BookOpen, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  Cpu, ExternalLink, Eye, Film, FolderHeart, FolderOpen, GraduationCap, Heart, ImageOff, Images,
  MapPin, MessageCircle, Monitor, Music2, PackageOpen, Play, Radio, Send, Sparkles,
  Star, ThumbsUp, Trophy, UserRound, Wrench, X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { albums, assets, diaries, guestMessages, moments, profile, profileEducation, profileExperiences, profileSkills, profileTools, stats } from '../data'
import { statusData } from '../statusData'
import { Window } from './Window'

export function HomePage({ onNavigate, onEnter, likeCount, onLike }) {
  return (
    <>
      <section className="hero" id="top">
        <button className={`home-like-button ${likeCount > 5201314 ? 'is-liked' : ''}`} onClick={onLike} aria-label="为主页点赞" aria-live="polite"><Heart size={17} fill={likeCount > 5201314 ? 'currentColor' : 'none'} /><span><b>{likeCount}</b><small>给空间点赞</small></span></button>
        <div className="hero-decoration hero-star-one">✦</div>
        <div className="hero-decoration hero-star-two">★</div>
        <div className="hero-decoration hero-butterfly">ʚɞ</div>
        <div className="hero-copy">
          <p className="online-kicker"><span /> WELCOME TO XIN'S SPACE // ONLINE</p>
          <div className="hero-label">SPACE OWNER</div>
          <h1>{profile.name}</h1>
          <p className="hero-nickname">{profile.nickname}</p>
          <div className="identity-tags">{profile.identity.map((item) => <span key={item}>{item}</span>)}</div>
          <blockquote>“穿越2008的互联网浪漫，<br />加载2026年的未来幻想。”</blockquote>
          <div className="hero-actions">
            <button className="chrome-button chrome-button-primary" onClick={onEnter}><Sparkles size={17} /> <span><b>ENTER XIN'S SPACE</b><small>进入作品空间</small></span></button>
            <button className="chrome-button" onClick={() => onNavigate('guestbook')}><MessageCircle size={17} /> <span><b>LEAVE A MESSAGE</b><small>留言</small></span></button>
          </div>
        </div>
        <div className="digital-bedroom" aria-label="Xin的数字房间">
          <div className="holo-panel holo-panel-top"><span>MEMORY_2008</span><i /><i /><i /></div>
          <div className="room-poster">AI<br />DREAM<br />CACHE</div>
          <div className="crt-shell">
            <div className="crt-screen"><img src={assets.profileAvatar} alt="贾新鑫与卡通人物合影" /><span>OWNER_CAM // XIN</span></div>
            <i className="crt-button" />
          </div>
          <div className="desk-surface"><i className="keyboard" /><i className="compact-disc" /><i className="headphones" /></div>
          <div className="pixel-sticker">★ XIN.EXE READY</div>
          <div className="room-status"><span>AI ENERGY</span><b>88%</b><i><em /></i></div>
        </div>
        <a className="scroll-cue" href="#main-space">SCROLL TO SPACE <span>↓</span></a>
      </section>

      <section className="space-dashboard" id="main-space">
        <aside className="dashboard-left">
          <Window title="Xin's Profile" meta="USER CARD" className="profile-window">
            <div className="profile-avatar"><img src={assets.profileAvatar} alt="贾新鑫空间头像" /><span>ONLINE</span></div>
            <h2>{profile.nickname}</h2>
            <dl>
              <div><dt>姓名</dt><dd>{profile.name}</dd></div>
              <div><dt>身份</dt><dd>AI视觉创作者</dd></div>
              <div><dt>状态</dt><dd className="online-text">● {profile.status}</dd></div>
              <div><dt>等级</dt><dd>{profile.level}</dd></div>
            </dl>
            <p className="profile-signature">{profile.positioning}</p>
            <button className="window-link" onClick={() => onNavigate('profile')}>查看完整档案 <ArrowRight size={14} /></button>
          </Window>
          <Window title="空间装扮" meta="DRESS UP">
            <div className="decoration-grid"><span>Y2K</span><span>2008</span><span>AI</span><span>★</span></div>
            <p className="tiny-copy">当前皮肤：未来粉色数字卧室</p>
          </Window>
        </aside>

        <main className="dashboard-center">
          <Window title="最新动态" meta="XIN'S FEED" className="feed-window">
            <div className="status-composer"><img src={assets.profileAvatar} alt="" /><span>Xin今天在创造什么？</span><button onClick={() => onNavigate('moments')}>发表说说</button></div>
            {moments.slice(0, 3).map((moment) => <MomentItem key={moment.date} moment={moment} compact />)}
            <button className="view-all-button" onClick={() => onNavigate('moments')}>查看全部说说 <ArrowRight size={15} /></button>
          </Window>
          <Window title="置顶日志" meta="PINNED DIARY">
            <article className="pinned-diary">
              <img src="/media/ai/shanxi-architecture-feature.jpg" alt="山西古建建筑细节" />
              <div><span>日志 003 · AIGC CULTURE</span><h2>如果AI遇见山西，会生成什么？</h2><p>传统文化与人工智能相遇的一次数字视觉实验，记录从创意构思到成果呈现的完整探索。</p><button className="window-link" onClick={() => onNavigate('diary')}>进入日志 <BookOpen size={14} /></button></div>
            </article>
          </Window>
        </main>

        <aside className="dashboard-right">
          <Window title="空间统计" meta="SPACE DATA" className="stats-window">
            <div className="stats-grid">{stats.map(([value, label]) => <div key={label}><b>{label === '点赞' ? likeCount : value}</b><span>{label}</span></div>)}</div>
          </Window>
          <Window title="最近访客" meta="VISITORS">
            <div className="visitor-list">
              <Visitor initials="AI" name="AI设计观察员" time="刚刚访问" />
              <Visitor initials="HR" name="互联网HR" time="5分钟前访问" />
              <Visitor initials="文" name="文化探索者" time="今天访问" />
            </div>
          </Window>
          <Window title="时代彩蛋" meta="MEMORY">
            <div className="qq-easter-egg"><b>今日空间幸运数字</b><strong>666</strong><span>踩一踩，好运加载中 ✦</span></div>
          </Window>
        </aside>
      </section>
    </>
  )
}

function Visitor({ initials, name, time }) {
  return <div className="visitor"><i>{initials}</i><span><b>{name}</b><small>{time}</small></span></div>
}

function MomentItem({ moment, compact = false }) {
  return (
    <article className={`moment-item ${compact ? 'moment-compact' : ''}`}>
      <div className="moment-avatar"><img src={assets.profileAvatar} alt="" /><span /></div>
      <div className="moment-main">
        <header><b>{profile.nickname}</b><time>{moment.date}</time></header>
        <span className="mood-tag">{moment.mood}</span>
        <p>{moment.text}</p>
        {moment.image && <img className="moment-image" src={moment.image} alt={moment.mood} />}
        {moment.location && <small className="moment-location"><MapPin size={12} /> {moment.location}</small>}
        <footer><span><ThumbsUp size={13} /> {moment.likes}</span><span><MessageCircle size={13} /> 评论</span><span>来自 XIN'S SPACE</span></footer>
      </div>
    </article>
  )
}

export function DiaryPage() {
  const [selectedId, setSelectedId] = useState(diaries[0].id)
  const [expanded, setExpanded] = useState(true)
  const selected = diaries.find((diary) => diary.id === selectedId) || diaries[0]

  const selectDiary = (id) => {
    setSelectedId(id)
    setExpanded(true)
  }

  return (
    <PageFrame icon={<BookOpen size={21} />} title="Xin的日志" subtitle="一个关于探索、创造与成长的记录" meta="共 06 篇日志">
      <div className="diary-stats-strip" aria-label="日志统计"><div><span>日志</span><b>06</b></div><div><span>时间</span><b>2021 → 2026</b></div><div><span>媒体</span><b>07</b></div></div>

      <div className="diary-workspace">
        <aside className="diary-directory xp-window" aria-label="日志目录">
          <header className="xp-titlebar"><span>日志目录 // DIRECTORY</span><span>06 FILES</span></header>
          <div className="diary-directory-list">
            {diaries.map((diary) => <button className={selected.id === diary.id ? 'is-active' : ''} key={diary.id} onClick={() => selectDiary(diary.id)} aria-current={selected.id === diary.id ? 'page' : undefined}><i>{diary.icon}</i><span><small>{diary.number}</small><b>{diary.title}</b><em>{diary.period || diary.type}</em></span><strong>›</strong></button>)}
          </div>
        </aside>

        <article className={`diary-reader xp-window ${expanded ? 'is-expanded' : ''}`} key={selected.id}>
          <header className="xp-titlebar"><span>{selected.number} // {selected.period || 'PROJECT ARCHIVE'}</span><div className="diary-meta"><span>{selected.icon} ACTIVE</span><span>TXT + MEDIA</span></div></header>
          <div className="diary-reader-head">
            <div className="diary-reader-title"><span>{selected.type}</span><h2>{selected.title}</h2>{selected.organization && <p>{selected.organization}</p>}{selected.period && <time><CalendarDays size={13} /> {selected.period}</time>}</div>
            <button className="chrome-button" onClick={() => setExpanded((value) => !value)}>{expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />} {expanded ? '收起日志' : '打开日志'}</button>
          </div>
          <DiaryMedia items={selected.media} title={selected.title} />
          {expanded && <div className="diary-reader-body"><blockquote>{selected.lead}</blockquote><div className="diary-copy">{selected.paragraphs.map((paragraph, index) => <p className={paragraph.endsWith('：') ? 'is-emphasis' : ''} key={`${selected.id}-${index}`}>{paragraph}</p>)}</div>{selected.achievement && <div className="diary-achievement"><Trophy size={20} /><span><small>ACHIEVEMENT UNLOCKED</small><b>{selected.achievement}</b></span></div>}<section className="diary-unlocks"><header><Sparkles size={16} /><span><b>解锁能力</b><small>SKILL CACHE UPDATED</small></span></header><div>{selected.skills.map((skill) => <span key={skill}>★ {skill}</span>)}</div></section></div>}
        </article>
      </div>
    </PageFrame>
  )
}

function DiaryMedia({ items, title }) {
  const [failed, setFailed] = useState({})

  return (
    <div className={`diary-media ${items.length > 1 ? 'is-gallery' : ''}`}>
      {items.map((item, index) => {
        if (failed[index]) return <div className="diary-media-error" key={item.src}><ImageOff size={24} /><b>媒体缓存读取失败</b><span>{item.alt}</span></div>
        if (item.type === 'video') return <DiaryVideo item={item} title={title} key={item.src} onError={() => setFailed((value) => ({ ...value, [index]: true }))} />
        return <figure className="diary-photo" key={item.src}><img src={item.src} alt={item.alt} loading="lazy" onError={() => setFailed((value) => ({ ...value, [index]: true }))} /><figcaption>PHOTO {String(index + 1).padStart(2, '0')} // {item.alt}</figcaption></figure>
      })}
    </div>
  )
}

function DiaryVideo({ item, title, onError }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const mimeType = item.src.toLowerCase().endsWith('.m4v') ? 'video/x-m4v' : 'video/mp4'

  const play = async () => {
    try {
      await videoRef.current?.play()
    } catch {
      onError()
    }
  }

  return (
    <figure className="diary-video">
      <header><Film size={14} /><span>VIDEO CACHE // {title}</span><em>{playing ? 'PLAYING' : 'READY'}</em></header>
      <div><video ref={videoRef} controls playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={onError}><source src={item.src} type={mimeType} /></video>{!playing && <button onClick={play} aria-label={`播放${title}`}><Play size={24} fill="currentColor" /></button>}</div>
      <figcaption>{item.alt}</figcaption>
    </figure>
  )
}

export function MomentsPage() {
  const [filter, setFilter] = useState('all')
  const [liked, setLiked] = useState({})
  const [selectedMemory, setSelectedMemory] = useState(null)
  const visibleStatuses = useMemo(() => statusData.filter((item) => {
    if (filter === 'photos') return item.image
    if (filter === 'create') return item.category === 'create' || item.category === 'ai'
    return true
  }), [filter])

  const toggleLike = (id) => setLiked((current) => ({ ...current, [id]: !current[id] }))

  return (
    <PageFrame icon={<Radio size={21} />} title="Xin的说说" subtitle="多年以后，重新打开自己的互联网青春存档" meta="STATUS ARCHIVE // ONLINE">
      <div className="status-workspace">
        <aside className="status-archive xp-window" aria-label="说说档案索引">
          <header className="xp-titlebar"><span>档案索引</span><span>08 FILES</span></header>
          <div className="status-archive-body"><b>MEMORY DIRECTORY</b><p>这里保存日常、片场与AI实验留下的碎片。</p><div className="status-archive-tree"><span>2026 / SUMMER</span><i>├─ 日常缓存</i><i>├─ 创作现场</i><i>└─ AI实验</i></div><small>READ-ONLY PERSONAL CACHE</small></div>
        </aside>

        <section className="status-feed xp-window">
          <header className="xp-titlebar"><span>说说时间轴 // STATUS TIMELINE</span><div className="status-feed-meta"><span>{visibleStatuses.length.toString().padStart(2, '0')} RECORDS</span><span>SCROLL TO LOAD</span></div></header>
          <div className="status-filter-bar" role="toolbar" aria-label="说说筛选"><span>VIEW MODE</span><button className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')} aria-pressed={filter === 'all'}>全部记录</button><button className={filter === 'photos' ? 'is-active' : ''} onClick={() => setFilter('photos')} aria-pressed={filter === 'photos'}>图片缓存</button><button className={filter === 'create' ? 'is-active' : ''} onClick={() => setFilter('create')} aria-pressed={filter === 'create'}>创作信号</button></div>
          <div className="status-timeline">{visibleStatuses.map((status, index) => <StatusEntry key={status.id} status={status} index={index} liked={liked[status.id]} onLike={() => toggleLike(status.id)} onOpenMemory={setSelectedMemory} />)}</div>
          {!visibleStatuses.length && <div className="status-empty"><FolderHeart size={24} /><b>没有匹配的旧记录</b><span>换一个筛选方式，继续浏览空间缓存。</span></div>}
        </section>
      </div>

      {selectedMemory && <StatusMemoryModal key={selectedMemory.id} memory={selectedMemory} onClose={() => setSelectedMemory(null)} />}
    </PageFrame>
  )
}

function StatusEntry({ status, index, liked, onLike, onOpenMemory }) {
  const [expanded, setExpanded] = useState(true)
  const [imageFailed, setImageFailed] = useState(false)
  const fileNumber = String(index + 1).padStart(3, '0')

  return (
    <article className={`status-entry ${expanded ? 'is-open' : 'is-collapsed'}`}>
      <div className="status-entry-rail"><time>{status.date}</time><i aria-hidden="true">{status.moodIcon}</i><span aria-hidden="true" /></div>
      <div className="status-entry-window">
        <header className="status-entry-bar"><span>STATUS_{fileNumber}.TXT</span><div><b>{status.moodIcon} {status.mood}</b><small>ARCHIVED</small></div></header>
        <div className="status-entry-body">
          <div className="status-entry-author"><img src={assets.profileAvatar} alt={profile.nickname} /><span><b>{profile.nickname}</b><small>{status.date} · FROM XIN'S SPACE</small></span><button className="status-collapse" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>{expanded ? '收起记录' : '打开记录'}</button></div>
          {expanded && <>
            <p className="status-entry-text">{status.text}</p>
            {status.image && (imageFailed ? <div className="status-image-fallback"><ImageOff size={20} /><b>图片缓存读取失败</b><span>{status.imageAlt}</span></div> : <button className="status-memory-photo" onClick={() => onOpenMemory(status)}><img src={status.image} alt={status.imageAlt} onError={() => setImageFailed(true)} /><span>OPEN MEMORY // 查看旧文件</span></button>)}
            {status.location && <small className="status-entry-location"><MapPin size={12} /> {status.location}</small>}
            <footer className="status-entry-footer"><button className={liked ? 'is-liked' : ''} onClick={onLike} aria-pressed={liked}><Heart size={13} fill={liked ? 'currentColor' : 'none'} /> 赞：{status.likes + (liked ? 1 : 0)}</button><span><Eye size={13} /> 浏览：{status.views}</span><span><MessageCircle size={13} /> 评论：{status.comments}</span><span>来自 XIN'S SPACE</span></footer>
            <div className="status-replies" aria-label="说说评论">{status.replies.map((reply) => <p key={`${status.id}-${reply.author}`}><b>{reply.author}</b><span>{reply.text}</span></p>)}</div>
          </>}
        </div>
      </div>
    </article>
  )
}

function StatusMemoryModal({ memory, onClose }) {
  const [failed, setFailed] = useState(false)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="status-memory-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="status-memory-modal xp-window" role="dialog" aria-modal="true" aria-label={`${memory.date} ${memory.mood}`}>
        <header className="xp-titlebar"><span>MEMORY_FILE // {memory.date}</span><button ref={closeButtonRef} className="icon-button" onClick={onClose} aria-label="关闭旧文件"><X size={15} /></button></header>
        <div className="status-memory-modal-body"><div><small>{memory.moodIcon} {memory.mood}</small><h2>{memory.date}</h2><p>从 XIN'S SPACE 旧电脑中恢复的视觉记忆。</p></div>{failed ? <div className="status-image-fallback"><ImageOff size={23} /><b>文件读取失败</b><span>{memory.imageAlt}</span></div> : <img src={memory.image} alt={memory.imageAlt} onError={() => setFailed(true)} />}</div>
      </section>
    </div>
  )
}

export function AlbumsPage() {
  const [selectedId, setSelectedId] = useState(albums[0].id)
  const [viewer, setViewer] = useState(null)
  const selected = albums.find((album) => album.id === selectedId) || albums[0]

  const openViewer = (index) => setViewer({ album: selected, index })

  return (
    <PageFrame icon={<Images size={21} />} title="Xin的相册" subtitle="时间负责向前，而照片负责替我们记得" meta="ALBUM ARCHIVE // 04 FOLDERS">
      <div className="album-workspace">
        <aside className="album-folders xp-window" aria-label="相册分类">
          <header className="xp-titlebar"><span>相册 // FOLDERS</span><span>{albums.length.toString().padStart(2, '0')} ITEMS</span></header>
          <div className="album-folder-list">{albums.map((album) => <button className={selected.id === album.id ? 'is-active' : ''} key={album.id} onClick={() => setSelectedId(album.id)} aria-current={selected.id === album.id ? 'page' : undefined}><FolderOpen size={18} /><span><b>{album.title}</b><small>{album.english}</small><em>{album.files.length.toString().padStart(2, '0')} FILES</em></span><ChevronRight size={14} /></button>)}</div>
          <div className="album-folder-note"><span>LOCAL PATH</span><b>D:\\XIN_SPACE\\PHOTO</b><small>访问这些文件夹，就像重新打开一台旧电脑。</small></div>
        </aside>

        <section className="album-browser xp-window">
          <header className="xp-titlebar"><span>FOLDER_{selected.index} // {selected.english}</span><div className="album-browser-meta"><span>{selected.files.length.toString().padStart(2, '0')} FILES</span><span>READ / WRITE</span></div></header>
          <div className="album-browser-head"><div><small>{selected.title} / {selected.english}</small><h2>{selected.subtitle}</h2><p>{selected.note}</p></div><div className="album-folder-stamp"><FolderHeart size={21} /><b>ARCHIVE</b><span>{selected.created} — {selected.updated}</span></div></div>
          <div className="album-file-grid">{selected.files.map((photo, index) => <AlbumFileTile key={photo.src} photo={photo} index={index} onOpen={() => openViewer(index)} />)}</div>
        </section>
      </div>
      {viewer && <AlbumImageViewer album={viewer.album} index={viewer.index} onClose={() => setViewer(null)} onChange={(index) => setViewer((current) => ({ ...current, index }))} />}
    </PageFrame>
  )
}

function AlbumFileTile({ photo, index, onOpen }) {
  const [failed, setFailed] = useState(false)
  return <button className="album-file-tile" onClick={onOpen} aria-label={`查看${photo.name}`}><span className="album-file-index">IMG_{String(index + 1).padStart(2, '0')}</span>{failed ? <span className="album-file-fallback"><ImageOff size={20} /><small>FILE ERROR</small></span> : <img src={photo.src} alt={photo.note} loading="lazy" onError={() => setFailed(true)} />}<span className="album-file-caption"><b>{photo.name}</b><small>{photo.created} · {photo.note}</small></span></button>
}

function AlbumImageViewer({ album, index, onClose, onChange }) {
  const photo = album.files[index]
  const [failed, setFailed] = useState(false)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    setFailed(false)
  }, [photo.src])

  useEffect(() => {
    closeButtonRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])
  const previous = () => onChange((index - 1 + album.files.length) % album.files.length)
  const next = () => onChange((index + 1) % album.files.length)

  return (
    <div className="album-viewer-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="album-viewer xp-window" role="dialog" aria-modal="true" aria-label={`${album.title} ${photo.name}`}>
        <header className="xp-titlebar"><span>PHOTO_VIEWER.EXE // {album.english}</span><button ref={closeButtonRef} className="icon-button" onClick={onClose} aria-label="关闭图片查看器"><X size={15} /></button></header>
        <div className="album-viewer-body"><div className="album-viewer-stage">{failed ? <div className="album-file-fallback album-viewer-error"><ImageOff size={30} /><b>IMAGE CACHE ERROR</b><span>无法读取此图片文件</span></div> : <img src={photo.src} alt={photo.note} onError={() => setFailed(true)} />}<div className="album-viewer-controls"><button className="icon-button" onClick={previous} aria-label="上一张图片"><ChevronLeft size={16} /></button><span>{String(index + 1).padStart(2, '0')} / {String(album.files.length).padStart(2, '0')}</span><button className="icon-button" onClick={next} aria-label="下一张图片"><ChevronRight size={16} /></button></div></div><aside className="album-viewer-info"><span className="album-viewer-label">FILE INFORMATION</span><h2>{photo.name}</h2><dl><div><dt>文件夹</dt><dd>{album.title}</dd></div><div><dt>创建时间</dt><dd>{photo.created}</dd></div><div><dt>文件编号</dt><dd>IMG_{String(index + 1).padStart(2, '0')}</dd></div></dl><p>{photo.note}</p><small>来自 XIN'S SPACE 本地相册档案<br />FILE STATUS: READABLE</small></aside></div>
      </section>
    </div>
  )
}

export function GuestbookPage() {
  const [messages, setMessages] = useState(() => {
    try { return [...guestMessages, ...JSON.parse(localStorage.getItem('xin-guestbook') || '[]')] } catch { return guestMessages }
  })
  const [name, setName] = useState('神秘访客')
  const [text, setText] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!text.trim()) return
    const message = { name: name.trim() || '神秘访客', time: '刚刚', text: text.trim() }
    const localMessages = [message, ...messages.filter((item) => !guestMessages.includes(item))]
    localStorage.setItem('xin-guestbook', JSON.stringify(localMessages.slice(0, 12)))
    setMessages((current) => [message, ...current])
    setText('')
  }

  return (
    <PageFrame icon={<MessageCircle size={21} />} title="Xin的留言" subtitle="路过我的数字世界，留下一句话再走吧" meta={`${messages.length} 条留言`}>
      <div className="guestbook-layout">
        <Window title="写新留言" meta="NEW MESSAGE" className="message-form-window">
          <form className="message-form" onSubmit={submit}><label>你的空间昵称<input value={name} maxLength={20} onChange={(event) => setName(event.target.value)} /></label><label>想对 Xin 说<textarea value={text} maxLength={160} onChange={(event) => setText(event.target.value)} placeholder="写下此刻的互联网心情..." /></label><button className="chrome-button chrome-button-primary" type="submit"><Send size={15} /> 发表留言</button></form>
        </Window>
        <Window title="访客留言" meta="MESSAGE WALL" className="message-wall">
          {messages.map((message, index) => <article className="guest-message" key={`${message.name}-${index}`}><i>{String(index + 1).padStart(2, '0')}</i><div><header><b>{message.name}</b><time>{message.time}</time></header><p>{message.text}</p><footer>主人回复 · 点赞 · 留言</footer></div></article>)}
        </Window>
      </div>
    </PageFrame>
  )
}

export function MusicPage({ onStartMusic, playing }) {
  return (
    <PageFrame icon={<Music2 size={21} />} title="Xin的音乐" subtitle="有些歌一响起，就自动回到那个会认真写空间日志的年代" meta={playing ? '正在播放' : '等待播放'}>
      <section className="music-page-scene">
        <div className={`large-disc ${playing ? 'is-playing' : ''}`}><i /><span>XIN<br />2008</span></div>
        <div className="music-page-copy"><p className="eyebrow">NOW PLAYING / LOCAL AUDIO</p><h2>玫瑰花的葬礼</h2><p>许嵩 · 来自本地素材文件。音乐不会自动播放；点击进入空间或下方按钮后开始，并在页面切换时持续播放。</p><button className="chrome-button chrome-button-primary" onClick={onStartMusic}><Music2 size={16} /> {playing ? '音乐正在播放' : '启动空间音乐'}</button></div>
        <div className="equalizer" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--bar': `${20 + ((index * 23) % 70)}%` }} />)}</div>
      </section>
    </PageFrame>
  )
}

export function ProfilePage({ onNavigate }) {
  const [personaOpen, setPersonaOpen] = useState(false)
  const [expandedLog, setExpandedLog] = useState(profileExperiences[0].title)
  const [earned, setEarned] = useState(false)

  return (
    <PageFrame icon={<UserRound size={21} />} title="Xin的档案" subtitle="从像素时代走到生成时代，寻找自己的表达坐标" meta="DIGITAL IDENTITY">
      <div className="profile-identity-grid">
        <Window title="ROLE DISPLAY" meta="XIN.EXE // ONLINE" className="profile-role-window">
          <div className="profile-role-visual"><button className="profile-avatar profile-avatar-button" onClick={() => setPersonaOpen((value) => !value)} aria-label="查看 Xin.exe 角色介绍" aria-expanded={personaOpen}><img src={assets.profileAvatar} alt="贾新鑫数字身份头像" /><span>ONLINE</span></button></div>
          <div className="profile-role-id"><div><b>Xin.exe</b><span>{profile.level}</span></div><em>● ONLINE</em></div>
          <div className="profile-role-meta"><span>主人<b>贾新鑫</b></span><span>身份<b>AIGC内容创作者 / 新媒体运营方向</b></span><span>任务<b>探索AI与文化内容的新表达</b></span></div>
          {personaOpen && <div className="profile-persona-note"><b>数字分身已连接</b><span>桌宠 Xin.exe 正在空间中陪伴浏览，负责把文化观察、内容现场与AI实验，转换成可以继续探索的创意碎片。</span></div>}
          <p className="profile-role-copy">一个住在旧互联网空间里的AI创作者，随身携带相机、芯片和一整套文化灵感缓存。</p>
        </Window>

        <Window title="角色档案" meta="QQ PROFILE CARD" className="profile-facts-window">
          <div className="profile-facts-grid">
            <div><span>昵称</span><b>{profile.nickname}</b></div>
            <div><span>姓名</span><b>{profile.name}</b></div>
            <div><span>电话</span><b>17335073987</b></div>
            <div><span>邮箱</span><b>2693569992@qq.com</b></div>
            <div className="profile-fact-wide"><span>身份标签</span><div className="identity-tags">{profile.identity.map((item) => <em key={item}>{item}</em>)}</div></div>
            <div className="profile-fact-wide"><span>当前状态</span><b className="online-text">ONLINE / 正在探索AI与文化内容创新</b></div>
          </div>
          <blockquote className="profile-motto">“探索文化、内容与AI之间的新连接。”</blockquote>
        </Window>

      </div>

      <div className="profile-archives-grid">
        <Window title="成长轨迹" meta="EDUCATION // CHARACTER ORIGIN" className="profile-education-window">
          <div className="profile-education-list">{profileEducation.map((item) => <article key={item.school}><div className="profile-education-icon"><GraduationCap size={16} /></div><div><time>{item.period}</time><h3>{item.school}</h3><p>{item.program}</p></div></article>)}</div>
          <div className="profile-direction"><span>方向缓存</span><b>文化旅游 / 用户研究 / 项目策划 / 内容传播</b></div>
        </Window>

        <Window title="冒险日志" meta="EXPERIENCE // GROWTH RECORD" className="profile-experience-window">
          <div className="profile-log-list">{profileExperiences.map((item) => { const expanded = expandedLog === item.title; return <article className={`profile-log-entry ${expanded ? 'is-open' : ''}`} key={item.title}><button onClick={() => setExpandedLog(expanded ? '' : item.title)} aria-expanded={expanded}><span className="profile-log-icon">{item.icon}</span><span className="profile-log-main"><time>{item.period}</time><b>{item.title}</b><small>{item.keywords}</small>{expanded && <p>{item.detail}</p>}</span>{expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button></article> })}</div>
          <button className="window-link" onClick={() => onNavigate('diary')}><BookOpen size={14} /> 打开完整项目日志</button>
        </Window>

        <Window title="能力雷达" meta="SKILL RADAR // ACTIVE NODES" className="profile-skills-window">
          <SkillRadar skills={profileSkills} compact />
        </Window>

        <Window title="工具背包" meta="TOOL BOX // EQUIPMENT" className="profile-tools-window">
          <div className="profile-tool-groups">{profileTools.map((group) => <div className="profile-tool-group" key={group.label}><h3><PackageOpen size={14} /> {group.label}</h3><div>{group.items.map((tool) => <span key={tool}>{tool}</span>)}</div></div>)}</div>
        </Window>

        <Window title="荣誉成就" meta="ACHIEVEMENT // UNLOCKED" className="profile-achievement-window">
          <button className={`profile-achievement ${earned ? 'is-earned' : ''}`} onClick={() => setEarned(true)} aria-pressed={earned}><span className="profile-achievement-badge"><Trophy size={25} /></span><span><b>国家级银奖</b><small>中国国际大学生创新大赛 · AI文化创新项目</small><em>{earned ? 'ACHIEVEMENT UNLOCKED' : '点击查看获得记录'}</em></span><Award size={16} /></button>
        </Window>

      </div>
    </PageFrame>
  )
}

function Skill({ name, value }) {
  return <div className="skill-line"><span><b>{name}</b><em>{value}</em></span><i><em style={{ width: value }} /></i></div>
}

function SkillRadar({ skills, compact = false }) {
  const center = { x: 118, y: 104 }
  const radius = 65
  const angleStep = (Math.PI * 2) / skills.length
  const pointAt = (value, index) => {
    const angle = -Math.PI / 2 + index * angleStep
    const distance = radius * (value / 5)
    return { x: center.x + Math.cos(angle) * distance, y: center.y + Math.sin(angle) * distance }
  }
  const pointString = (value) => skills.map((skill, index) => { const point = pointAt(value, index); return `${point.x},${point.y}` }).join(' ')
  const skillPoints = skills.map((skill, index) => pointAt(skill.score, index))

  return <div className={`profile-radar ${compact ? 'is-compact' : ''}`}><svg viewBox="0 0 236 208" role="img" aria-label="能力雷达图"><polygon points={pointString(5)} /><polygon points={pointString(3.75)} /><polygon points={pointString(2.5)} /><polygon points={pointString(1.25)} />{skills.map((skill, index) => { const point = pointAt(5, index); return <line key={`${skill.name}-axis`} x1={center.x} y1={center.y} x2={point.x} y2={point.y} /> })}<polygon className="profile-radar-value" points={skillPoints.map((point) => `${point.x},${point.y}`).join(' ')} />{skills.map((skill, index) => { const point = pointAt(5.65, index); return <text key={skill.name} x={point.x} y={point.y} textAnchor={point.x < center.x - 5 ? 'end' : point.x > center.x + 5 ? 'start' : 'middle'}>{skill.name}</text> })}</svg><div className="profile-radar-legend">{skills.map((skill) => <span key={skill.name}><b>{skill.name}</b><em>{skill.score.toFixed(1)} / 5</em></span>)}</div></div>
}

function PageFrame({ icon, title, subtitle, meta, children }) {
  return (
    <main className="inner-page">
      <header className="page-heading"><div className="page-heading-icon">{icon}</div><div><p>★ XIN'S SPACE ★</p><h1>{title}</h1><span>{subtitle}</span></div><b>{meta}</b></header>
      {children}
    </main>
  )
}
