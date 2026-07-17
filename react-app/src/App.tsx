import { useMemo, useState } from 'react'
import { Threads } from '@/components/ui/threads'

const trustItems = [
  {
    title: 'Made in Britain',
    copy: 'Crafted in the UK at our facility in Sussex',
    icon: '🇬🇧',
  },
  {
    title: 'Family run for 60 years',
    copy: 'Independent since the 1960s, three generations',
    icon: '🏠',
  },
  {
    title: 'Capsules, not tablets',
    copy: 'No binders or fillers that can affect absorption',
    icon: '✦',
  },
]

const quizSteps = [
  {
    key: 'name',
    title: 'Let’s start with your first name',
    subtitle: 'We’ll personalise your recommendation so it feels like it was built for you.',
    type: 'input',
  },
  {
    key: 'goal',
    title: 'What matters most to you right now?',
    subtitle: 'Pick the outcome you want most from your daily plan.',
    type: 'options',
    options: ['Energy', 'Immunity', 'Daily balance'],
  },
  {
    key: 'routine',
    title: 'When do you want to take your supplements?',
    subtitle: 'We’ll shape the timing around your day.',
    type: 'options',
    options: ['Morning', 'Midday', 'Evening'],
  },
  {
    key: 'focus',
    title: 'What’s your main wellness focus?',
    subtitle: 'This helps us tune the final three-capsule regime.',
    type: 'options',
    options: ['Stress support', 'Gut health', 'Liver support', 'Brain focus'],
  },
] as const

const recommendations = {
  Energy: ['Vitamin B12 Complex', 'Ashwagandha', 'Magnesium'],
  Immunity: ['Vitamin C + Zinc', 'Echinacea', 'Vitamin D3'],
  'Daily balance': ['Magnesium', 'Omega 3', 'Vitamin D3'],
}

function App() {
  const [screen, setScreen] = useState<'intro' | 'quiz' | 'results'>('intro')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({
    name: '',
    goal: 'Energy',
    routine: 'Morning',
    focus: 'Stress support',
  })

  const currentStep = quizSteps[stepIndex]
  const progress = ((stepIndex + 1) / quizSteps.length) * 100

  const recommendedItems = useMemo(() => {
    return recommendations[answers.goal as keyof typeof recommendations] ?? recommendations.Energy
  }, [answers.goal])

  const handleStart = () => {
    setScreen('quiz')
    setStepIndex(0)
  }

  const handleNext = () => {
    if (stepIndex === quizSteps.length - 1) {
      setScreen('results')
      return
    }

    setStepIndex((prev) => prev + 1)
  }

  const handleBack = () => {
    if (stepIndex === 0) {
      setScreen('intro')
      return
    }

    setStepIndex((prev) => prev - 1)
  }

  const handleReset = () => {
    setScreen('intro')
    setStepIndex(0)
    setAnswers({
      name: '',
      goal: 'Energy',
      routine: 'Morning',
      focus: 'Stress support',
    })
  }

  const canContinue =
    currentStep.key === 'name' ? answers.name.trim().length > 0 : Boolean(answers[currentStep.key])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f6f7f2] text-[#23281f]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[320px] overflow-hidden">
        <Threads
          className="h-full w-full"
          amplitude={1}
          distance={0.14}
          enableMouseInteraction={false}
          shaderColor={[0.32, 0.45, 0.28]}
        />
      </div>

      <div className="border-b border-[#ece2c8] bg-[#f6efdd] px-4 py-2 text-center text-[12.5px] font-semibold tracking-[0.02em] text-[#37492f] sm:px-6">
        Free shipping on orders over £40 · Pure, capsule-only supplements · Family-run & British-made since the 1960s
      </div>

      <header className="relative z-10 bg-[#577458] text-white">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleReset} className="cursor-pointer">
              <img
                className="h-[42px] w-auto"
                src="https://gandgvitamins.com/cdn/shop/files/G_GWHITE.png?v=1770371649&width=400"
                alt="G&G Vitamins"
              />
            </button>
          </div>
          <nav className="hidden gap-6 text-[14px] font-semibold md:flex">
            <a href="https://gandgvitamins.com/" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">Vitamins & Supplements</a>
            <a href="https://gandgvitamins.com/pages/who-we-are" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">Why G&G?</a>
            <a href="https://gandgvitamins.com/" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">Professionals</a>
          </nav>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-[1120px] px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
        {screen === 'intro' ? (
          <div className="mx-auto max-w-[820px] text-center">
            <img
              className="mx-auto mb-5 h-[82px] w-auto"
              src="https://gandgvitamins.com/cdn/shop/files/GG_Green_Logo.png?v=1777383793&width=280"
              alt="G&G"
            />
            <div className="mb-4 text-[13px] font-bold uppercase tracking-[0.14em] text-[#577458]">
              Personalised Supplement Finder
            </div>
            <h1 className="mx-auto max-w-[780px] text-[clamp(34px,6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.01em] text-[#23281f]">
              Find the three supplements your body has been asking for.
            </h1>
            <p className="mx-auto mt-5 max-w-[650px] text-[clamp(17px,2.4vw,20px)] text-[#6d7268]">
              Answer a few quick questions and we&apos;ll build your personalised daily regime. The right G&G capsules, at the right time of day, with a plan you can actually stick to.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="flex w-screen flex-col items-center gap-3">
                <div className="relative h-[180px] w-full overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden" />
                </div>

                <button
                  type="button"
                  onClick={handleStart}
                  className="relative z-10 flex h-[68px] items-center justify-center rounded-full bg-[#577458] px-7 py-3 text-base font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#435c40]"
                >
                  Build my regime →
                </button>
              </div>
            </div>

            <div className="mx-auto mt-8 flex max-w-[760px] flex-wrap items-stretch justify-center rounded-[22px] bg-[#577458] p-3 text-white shadow-[0_12px_35px_rgba(55,73,47,0.16)]">
              {trustItems.map((item, index) => (
                <div key={item.title} className="flex min-w-[210px] flex-1 items-center gap-3 px-4 py-3 text-left">
                  <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 text-lg">{item.icon}</span>
                  <div>
                    <div className="text-[16px] font-extrabold">{item.title}</div>
                    <div className="text-[12.5px] font-semibold opacity-85">{item.copy}</div>
                  </div>
                  {index < trustItems.length - 1 ? <div className="hidden h-full w-px bg-white/20 sm:block" /> : null}
                </div>
              ))}
            </div>

            <div className="mt-6 text-[12px] leading-[1.55] text-[#6d7268]">
              This tool offers general wellbeing guidance, not medical advice. Your regime is designed by our in-house nutritionists and vitamin specialists — please consult your GP if pregnant, taking medication or managing a health condition.
            </div>
          </div>
        ) : null}

        {screen === 'quiz' ? (
          <div className="mx-auto max-w-[780px] rounded-[28px] border border-[#d9dfd2] bg-white/90 p-5 shadow-[0_18px_50px_rgba(55,73,47,0.12)] backdrop-blur sm:p-8">
            <div className="mb-6">
              <div className="h-3 overflow-hidden rounded-full bg-[#edf1e6]">
                <div className="h-full rounded-full bg-[#577458] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-[13px] font-semibold text-[#6d7268]">
                <span className="text-[15px] font-extrabold text-[#577458]">Step {stepIndex + 1} of {quizSteps.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            <div className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#577458]">Personalised supplement finder</div>
            <h2 className="text-[clamp(24px,4vw,34px)] font-extrabold leading-tight text-[#23281f]">{currentStep.title}</h2>
            <p className="mt-2 text-[16px] text-[#6d7268]">{currentStep.subtitle}</p>

            {currentStep.type === 'input' ? (
              <div className="mt-6">
                <input
                  value={answers.name}
                  onChange={(event) => setAnswers((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-[18px] border-2 border-[#dce3d6] bg-white px-5 py-4 text-[20px] font-semibold text-[#23281f] outline-none transition focus:border-[#577458] focus:ring-4 focus:ring-[#577458]/10"
                  placeholder="Type your first name"
                />
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap gap-3">
                {currentStep.options.map((option) => {
                  const isSelected = answers[currentStep.key] === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [currentStep.key]: option }))}
                      className={`rounded-full border px-5 py-3 text-[15px] font-semibold transition ${
                        isSelected
                          ? 'border-[#577458] bg-[#577458] text-white shadow-[0_8px_20px_rgba(55,73,47,0.18)]'
                          : 'border-[#d7ddd1] bg-[#f9fbf7] text-[#23281f] hover:border-[#577458] hover:bg-[#edf3ea]'
                      }`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-full border border-[#d7ddd1] bg-white px-5 py-3 text-[14px] font-semibold text-[#37492f] transition hover:border-[#577458] hover:text-[#577458]"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
                className="rounded-full bg-[#577458] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#435c40] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {stepIndex === quizSteps.length - 1 ? 'View my regime →' : 'Continue →'}
              </button>
            </div>
          </div>
        ) : null}

        {screen === 'results' ? (
          <div className="mx-auto max-w-[880px] rounded-[28px] border border-[#d9dfd2] bg-white/90 p-5 shadow-[0_18px_50px_rgba(55,73,47,0.12)] backdrop-blur sm:p-8">
            <div className="text-center">
              <div className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#577458]">Your personalised regime</div>
              <h2 className="text-[clamp(28px,5vw,42px)] font-extrabold leading-tight text-[#23281f]">
                {answers.name ? `${answers.name}, your plan is ready.` : 'Your plan is ready.'}
              </h2>
              <p className="mx-auto mt-3 max-w-[680px] text-[16px] text-[#6d7268]">
                Based on your {answers.goal.toLowerCase()} focus and a {answers.routine.toLowerCase()} routine, we’ve built a clean three-capsule regime tailored to your goals.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {recommendedItems.map((item, index) => (
                <div key={item} className="rounded-[20px] border border-[#d7ddd1] bg-[#f7f9f4] p-4">
                  <div className="mb-3 inline-flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#577458] text-[14px] font-extrabold text-white">
                    {index + 1}
                  </div>
                  <div className="text-[18px] font-extrabold text-[#23281f]">{item}</div>
                  <div className="mt-1 text-[13px] font-semibold text-[#6d7268]">
                    Designed to support a {answers.focus.toLowerCase()} routine.
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full bg-[#577458] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#435c40]"
              >
                Start again
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="rounded-full border border-[#d7ddd1] bg-white px-6 py-3 text-[14px] font-semibold text-[#37492f] transition hover:border-[#577458] hover:text-[#577458]"
              >
                Back to questions
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default App
