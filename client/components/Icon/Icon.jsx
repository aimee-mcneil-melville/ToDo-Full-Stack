import React from 'react'

const Icon = (props) => {
  const style = props.style || 'music'
  const { clickFunction } = props
  const glyphs = [
    { key: 'music', icon: 'music' },
    { key: 'user', icon: 'user' },
    { key: 'edit', icon: 'pencil-alt' },
    { key: 'delete', icon: 'trash-alt' },
    { key: 'play', icon: 'play' }
  ]
  const glyph = glyphs.find(glyph => glyph.key === style)

  return (
    <button className={`icon icon--${style}`} onClick={clickFunction}>
      <span className={`icon__glyph fa fa-${glyph.icon}`}></span>
    </button>
  )
}

export default Icon
