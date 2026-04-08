export const HoverArrowIndicator = () => (
  <div className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  </div>
)
