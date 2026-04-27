import { ChatWallDisplay } from './chat-wall-display'
import { ContactForm } from './chatbox'

export const ChatSection = () => {
  return (
    <section className="w-full p-6">
      <p className="text-lg font-style flex items-center justify-center mb-3">
        Leave a message
      </p>
      <div className="grid grid-cols gap-6 items-start">
        <ContactForm />
        <ChatWallDisplay />
      </div>
    </section>
  )
}
