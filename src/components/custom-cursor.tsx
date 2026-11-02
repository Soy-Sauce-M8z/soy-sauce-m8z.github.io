import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [data-cursor="pointer"]'
const TEXT_FIELDS = 'input, textarea, select, [contenteditable="true"]'
const RING_RADIUS = 34
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

type CursorMode = 'default' | 'pointer' | 'text'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [mode, setMode] = useState<CursorMode>('default')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Only mouse and trackpad devices get the custom cursor. Touch screens keep
    // their native cursor so taps, drags and the on-screen caret behave normally.
    const isTouchDevice =
      navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    setEnabled(true)
    const root = document.documentElement
    // The custom cursor replaces the system cursor everywhere on desktop.
    root.classList.add('cursor-none')

    const move = (event: MouseEvent) => {
      if (frame.current) return
      const { clientX, clientY } = event
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0
        if (wrapperRef.current) {
          wrapperRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
        }
      })
      setHidden(false)
    }

    const over = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      if (target.closest(TEXT_FIELDS)) {
        // Keep the native caret cursor for typing.
        root.classList.remove('cursor-none')
        setMode('text')
        return
      }

      root.classList.add('cursor-none')
      setMode(target.closest(INTERACTIVE) ? 'pointer' : 'default')
    }

    const leave = () => {
      setHidden(true)
      setMode('default')
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
      if (frame.current) window.cancelAnimationFrame(frame.current)
      root.classList.remove('cursor-none')
    }
  }, [])

  if (!enabled) return null

  const isPointer = mode === 'pointer'
  const isText = mode === 'text'

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] block"
      data-testid="custom-cursor"
      data-state={hidden || isText ? 'hidden' : 'visible'}
      data-mode={mode}
    >
      <div className={`custom-cursor ${hidden || isText ? 'is-hidden' : ''}`}>
        <div
          className={`spin-slow absolute inset-0 transition-[opacity,transform] duration-300 ease-out ${
            isPointer ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <svg viewBox="0 0 100 100" className="size-full">
            <defs>
              <path
                id="cursor-ring"
                d={`M50,50 m-${RING_RADIUS},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 -${RING_RADIUS * 2},0`}
              />
            </defs>
            <text
              className="fill-ink/80 font-sans text-[9px] font-bold uppercase"
              textLength={RING_LENGTH}
              lengthAdjust="spacing"
            >
              <textPath href="#cursor-ring">scroll · scroll · scroll ·</textPath>
            </text>
          </svg>
        </div>
        <svg
          viewBox="0 0 24 24"
          className={`absolute top-1/2 left-1/2 size-[18px] -translate-x-1/2 -translate-y-1/2 transition-[transform,width,height] duration-200 ease-out ${
            isPointer ? 'scale-[1.35]' : 'scale-100'
          }`}
        >
          <path
            d="M5 3l14 8.5-6.2 1.4L9.9 19 5 3z"
            className={`stroke-ink transition-colors duration-200 ${isPointer ? 'fill-tan' : 'fill-paper'}`}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
