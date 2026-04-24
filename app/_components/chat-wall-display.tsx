import Link from 'next/link'
import { ChatWall } from '@/lib/chat'

export async function ChatWallDisplay() {
  const messages = await ChatWall()

  return (
    <div className="flex flex-col max-h-[250px] overflow-y-auto w-full space-y-2 scrollbar-thin">
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 4px; }
        @media (prefers-color-scheme: dark) {
          .scrollbar-thin::-webkit-scrollbar-thumb { background: #3f3f46; }
        }
      `}</style>
      {messages?.length === 0 && (
        <p className="flex justify-center animate-pulse">No messages yet!</p>
      )}
      {messages?.map((msg) =>
        msg.website ? (
          <Link
            key={msg.id}
            href={`http://${msg.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-zinc-900/30 border border-white/5 hover:bg-zinc-800/80 transition-colors group"
          >
            <p className="font-medium text-lg text-white">{msg.message}</p>

            <div className="text-sm text-white group-hover:text-gray-300">
              — {msg.name}
              <span className="ml-4">{msg.website}</span>
              {msg.email && <span className="ml-4 group-hover:underline">{msg.email}</span>}
            </div>
          </Link>
        ) : (
          <div
            key={msg.id}
            className="p-2 rounded-lg bg-zinc-900/30 border border-white/5 hover:bg-zinc-800/80 transition-colors group"
          >
            <p className="font-medium text-lg text-white">{msg.message}</p>

            <div className="text-sm text-white group-hover:text-gray-300">
              — {msg.name}
              {msg.email && <span className="ml-4 group-hover:underline">{msg.email}</span>}
            </div>
          </div>
        ),
      )}
    </div>
  )
}
