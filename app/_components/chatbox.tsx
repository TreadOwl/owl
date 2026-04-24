'use client'

import { useState } from 'react'
import { sendMessage } from '@/lib/chat'

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const res = await sendMessage(formData)

    if (res?.error) {
      setStatus(res.error)
    } else {
      setStatus('Message sent!')
    }
  }

  return (
    <form
      action={handleSubmit}
      className="group flex flex-col gap-2 p-2 hover:bg-zinc-800/80 bg-zinc-900/50 border border-white/10 transition-all duration-300 backdrop-blur-md w-full"
    >
      <input
        name="name"
        placeholder="Your name*"
        required
        className="w-full border-b border-white/10 outline-none"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
        <input
          name="email"
          placeholder="Email (optional)"
          className="w-full border-b border-white/10 outline-none"
        />
        <input
          name="website"
          placeholder="Website (optional)"
          className="w-full border-b border-white/10 outline-none"
        />
      </div>
      <textarea
        name="message"
        placeholder="Message...*"
        required
        className="w-full border-b border-white/10 outline-none"
      />

      <input name="bot-field" className="hidden" />

      <button
        type="submit"
        className="flex justify-center p-3 min-w-24 bg-black border border-white/10 transition-colors hover:cursor-pointer"
      >
        Send
      </button>

      {status && <p className="flex justify-center text-sm w-full p-2 bg-zinc-800/80">{status}</p>}
    </form>
  )
}
