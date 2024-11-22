import { useState, useEffect } from 'react'

function AnimatedTag({ position, className }) {

  return (
    <div
      className={`bg-white absolute grid place-items-center font-bold rounded-lg z-10 animate-move ${className}`}
      style={{
        left: position.start.left,
        top: position.start.top,
        bottom: position.start.bottom,
        right: position.start.right,
        width: position.start.width,
        height: position.start.height,
        "--move-x": `${position?.end.x - position?.start.x}px`,
        "--move-y": `${position?.end.y - position?.start.y}px`,
      }}
      >
        { position.content }
    </div>
  )
}

export default AnimatedTag