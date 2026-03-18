const formats = ['HTML', 'React', 'Tailwind']

function Toolbar({ format, onFormatChange, onCopy, onRegen, onNew, copied }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-2 bg-[#141414]/90 backdrop-blur-md border border-[#2a2a2a] rounded-full font-mono text-[11px]">
      <button
        type="button"
        onClick={onRegen}
        className="text-[#FF4500] hover:bg-[#FF4500]/10 px-3 py-1 rounded-full"
      >
        Regen
      </button>

      <div className="w-px h-4 bg-[#2a2a2a]" />

      {formats.map((item) => {
        const isActive = format === item

        return (
          <button
            key={item}
            type="button"
            onClick={() => onFormatChange?.(item)}
            className={`px-2 py-1 rounded-full hover:text-[#f0ede6] cursor-pointer ${
              isActive ? 'text-[#FF4500]' : 'text-[#444]'
            }`}
          >
            {item}
          </button>
        )
      })}

      <div className="w-px h-4 bg-[#2a2a2a]" />

      <button
        type="button"
        onClick={onCopy}
        className={`px-3 py-1 rounded-full hover:text-[#f0ede6] ${
          copied ? 'text-green-400' : 'text-[#444]'
        }`}
      >
        Copy
      </button>

      <button
        type="button"
        onClick={onNew}
        className="text-[#444] px-3 py-1 rounded-full hover:text-[#f0ede6]"
      >
        New
      </button>
    </div>
  )
}

export default Toolbar
