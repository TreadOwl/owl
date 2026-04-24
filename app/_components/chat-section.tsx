import { ChatWallDisplay } from './chat-wall-display'
import { ContactForm } from './chatbox'

export const ChatSection = () => {
  return (
    <section className="w-full p-6">
      <p className="text-lg font-style flex items-center justify-center mb-3">
        Feel free to leave a message for me :3
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ChatWallDisplay />
        <ContactForm />
      </div>
    </section>
  )
}
