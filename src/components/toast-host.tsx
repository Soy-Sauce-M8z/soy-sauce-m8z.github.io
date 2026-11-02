import { useEffect, useRef, useState } from 'react'
import { subscribeToToasts } from '../lib/toast'

type Toast = { id: number; message: string }

export function ToastHost() {
  const [toast, setToast] = useState<Toast | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToToasts((message) => {
      setToast({ id: Date.now(), message })
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setToast(null), 6500)
    })

    return () => {
      unsubscribe()
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  if (!toast) return null

  return (
    <div
      className="fixed inset-x-3 bottom-4 z-[70] flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6"
      role="status"
      aria-live="polite"
      data-testid="toast"
    >
      <div className="toast-in flex w-full max-w-md items-start gap-3 rounded-full border border-ink bg-ink px-5 py-3.5 text-paper shadow-[0_18px_40px_-18px_rgba(20,14,10,0.55)] sm:w-auto">
        <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-tan" aria-hidden="true" />
        <p className="font-sans text-sm leading-snug">{toast.message}</p>
        <button
          type="button"
          onClick={() => setToast(null)}
          className="-mr-1 ml-1 shrink-0 rounded-sm px-1 text-paper/60 transition-colors hover:text-tan"
          aria-label="Dismiss notification"
        >
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
