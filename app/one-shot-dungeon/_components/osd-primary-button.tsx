export function OsdPrimaryButton({ onClick, children, className }: { onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`font-old text-2xl w-full flex items-center justify-center border-2 border-b-4 border-white bg-white text-black p-2 hover:bg-zinc-300 hover:border-zinc-300 cursor-pointer transition-none uppercase tracking-widest${className ? ` ${className}` : ''}`}
    >
      {children}
    </button>
  )
}
