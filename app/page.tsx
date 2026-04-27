import { ChatSection } from './_components/chat-section'
import { HeroSection } from './_components/hero-section'
import { OsdSection } from './_components/osd-section'
import { Spacer } from './_components/spacer'

export default function Home() {
  return (
    <div className="bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <HeroSection />
        <ChatSection />
      </div>
      <Spacer />
      <OsdSection />
    </div>
  )
}
