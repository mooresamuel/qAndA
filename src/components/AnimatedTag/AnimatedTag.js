import { useState, useEffect } from 'react'

function AnimatedTag({ letterPosition }) {

  return (
    <div
      className="bg-white absolute grid place-items-center text-3xl font-bold rounded-lg z-10 animate-move"
      style={{
        left: letterPosition.start.left,
        top: letterPosition.start.top,
        bottom: letterPosition.start.bottom,
        right: letterPosition.start.right,
        width: letterPosition.start.width,
        height: letterPosition.start.height,
        "--move-x": `${letterPosition?.end.x - letterPosition?.start.x}px`,
        "--move-y": `${letterPosition?.end.y - letterPosition?.start.y}px`,
      }}
      >
        { letterPosition.letter }
    </div>
  )
}

export default AnimatedTag