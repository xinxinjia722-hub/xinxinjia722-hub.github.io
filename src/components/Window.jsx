export function Window({ title, meta, className = '', children, actions }) {
  return (
    <section className={`xp-window ${className}`.trim()}>
      <header className="xp-titlebar">
        <div className="xp-titlebar-copy">
          <span className="window-led" />
          <b>{title}</b>
          {meta && <small>{meta}</small>}
        </div>
        <div className="window-actions" aria-hidden="true">
          <i>_</i><i>□</i><i>×</i>
        </div>
        {actions}
      </header>
      <div className="xp-content">{children}</div>
    </section>
  )
}
