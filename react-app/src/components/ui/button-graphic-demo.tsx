import { Threads } from "@/components/ui/threads"

export function ButtonGraphicDemo() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f6f7f2] p-6">
      <div className="relative inline-flex items-center justify-center">
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
          <Threads
            className="h-full w-full"
            amplitude={0.7}
            distance={0.05}
            enableMouseInteraction={false}
            shaderColor={[0.32, 0.45, 0.28]}
          />
        </div>

        <button className="relative z-10 rounded-full bg-[#577458] px-7 py-3 text-base font-semibold text-white shadow-[0_12px_32px_rgba(55,73,47,0.22)] transition hover:-translate-y-0.5 hover:bg-[#435c40]">
          Build my regime →
        </button>
      </div>
    </div>
  )
}
