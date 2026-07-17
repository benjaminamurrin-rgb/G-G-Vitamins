import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Threads } from '@/components/ui/threads'
import './regime.css'
import {
  STORE,
  BUNDLE_DISCOUNT,
  DISCOUNT_CODE,
  AGE_MIN,
  AGE_MAX,
  AGE_DEFAULT,
  bandFor,
  ICONS,
  CHECK,
  UNION_JACK,
  WA_GLYPH,
  SLOTS,
  PRODUCTS,
  ADDONS,
  DIFFERENCE,
  WHY,
  TAKING_MAP,
  STEPS,
  HERO_CHIPS,
  cap,
  listPhrase,
  ratingFor,
} from './data'
import type { Answers, Option, Product, Step } from './data'

const GREEN_LOGO = 'https://gandgvitamins.com/cdn/shop/files/GG_Green_Logo.png?v=1777383793&width=280'
const GREEN_LOGO_SM = 'https://gandgvitamins.com/cdn/shop/files/GG_Green_Logo.png?v=1777383793&width=160'
const WHITE_LOGO = 'https://gandgvitamins.com/cdn/shop/files/G_GWHITE.png?v=1770371649&width=400'

const LOADING_MSGS = [
  'Matching your goals to the G&G range',
  'Filtering for pure, capsule-only formulas',
  'Timing each capsule around your day',
  'Finalising your personalised regime',
]

/* Injects a static SVG markup string (icons, flag, etc.) */
function Raw({ html, className }: { html: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

function MedicalNote({ text, className }: { text: string; className?: string }) {
  return (
    <p className={`medical-note${className ? ' ' + className : ''}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      {text}
    </p>
  )
}

/* Representative star rating that links out to the product's real reviews */
function StarRow({ item, className }: { item: { slug: string }; className?: string }) {
  const r = ratingFor(item.slug)
  const pct = (r.rating / 5) * 100
  return (
    <a
      className={`stars-link${className ? ' ' + className : ''}`}
      href={`${STORE}/products/${item.slug}#reviews`}
      target="_blank"
      rel="noopener noreferrer"
      title={`Read ${r.reviews} reviews on gandgvitamins.com`}
    >
      <span className="stars" aria-label={`${r.rating.toFixed(1)} out of 5`}>
        <span className="s-back">★★★★★</span>
        <span className="s-front" style={{ width: `${pct}%` }}>★★★★★</span>
      </span>
      <b>{r.rating.toFixed(1)}</b>
      <span className="s-count">({r.reviews})</span>
    </a>
  )
}

function ProductCard({ p, i, jiggle }: { p: Product; i: number; jiggle: boolean }) {
  const sl = SLOTS[p.slot]
  return (
    <div className="product">
      <div className="p-img">
        <span className="p-num">{i + 1}</span>
        <img
          className={jiggle ? 'jiggle' : undefined}
          src={p.img}
          alt={p.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>
      <div className="p-body">
        <div className="p-head">
          <div className="p-head-main">
            <div className="p-cat">{p.cat}</div>
            <h3 className="p-name">{p.name}</h3>
            <div className="p-size">{p.size}</div>
          </div>
          <div className="p-rating"><StarRow item={p} /></div>
        </div>
        <div className="p-why">{p.blurb}</div>
        <div className="p-timing">
          <Raw html={ICONS[sl.icon]} />
          <div><b>{sl.label} · {p.food}</b>{p.tip}</div>
        </div>
        <div className="p-foot">
          <span className="p-price">£{p.price}</span>
          <a className="p-link" href={`${STORE}/products/${p.slug}`} target="_blank" rel="noopener noreferrer">
            View product<span className="p-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState<'intro' | 'quiz' | 'loading' | 'results'>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [diet, setDiet] = useState<'none' | 'vegetarian' | 'vegan'>('none')
  const [name, setName] = useState('')
  const [picks, setPicks] = useState<Product[]>([])
  const [addonSel, setAddonSel] = useState<Set<number>>(new Set())
  const [diffIndex, setDiffIndex] = useState(0)
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0)
  const [pct, setPct] = useState(0)
  const [jiggleIdx, setJiggleIdx] = useState(-1)

  // Email capture form
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [formName, setFormName] = useState('')
  const [consent, setConsent] = useState(true)
  const [formErr, setFormErr] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [successTitle, setSuccessTitle] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const navDirRef = useRef(1)
  const shownPctRef = useRef(0)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const steps = useMemo(() => STEPS.filter((s) => !s.when || s.when(answers)), [answers])
  const clampedStep = Math.min(step, steps.length - 1)

  const optionsFor = (s: Step): Option[] =>
    typeof s.options === 'function' ? s.options(answers) : s.options || []

  function scrollTop() {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function hasAnswer(s: Step) {
    if (s.type === 'name') return name.trim().length > 0
    // The age step also requires a female/male choice before continuing
    if (s.type === 'slider') return answers[s.id] != null && (!s.sex || answers.sex != null)
    const sel = answers[s.id]
    if (s.type === 'multi') return s.optional ? true : ((sel as string[]) || []).length > 0
    return !!sel
  }

  function titleFor(s: Step) {
    const n = name.trim()
    return n && s.pt ? s.pt.replace('{name}', n) : s.title
  }

  function progressInfo(idx: number) {
    const total = steps.length
    const s = steps[idx]
    const qTotal = total - 1
    if (s.type === 'name') {
      shownPctRef.current = 7
      return { fill: 7, stepLabel: 'Let’s get started', pctLabel: '' }
    }
    const raw = Math.round((idx / qTotal) * 100)
    const pct = navDirRef.current < 0 ? raw : Math.max(raw, shownPctRef.current)
    shownPctRef.current = pct
    return { fill: pct, stepLabel: `Step ${idx} of ${qTotal}`, pctLabel: pct + '%' }
  }

  function onNameChange(v: string) {
    setName(v.replace(/[^\p{L}\p{M} .'-]/gu, '').replace(/\s{2,}/g, ' ').slice(0, 24))
  }

  function onAge(v: string) {
    const age = Math.max(AGE_MIN, Math.min(AGE_MAX, Math.round(+v) || AGE_DEFAULT))
    setAnswers((a) => ({ ...a, age }))
  }

  function select(s: Step, value: string) {
    navDirRef.current = 0
    if (s.type === 'multi') {
      setAnswers((a) => {
        const cur = [...((a[s.id] as string[]) || [])]
        const i = cur.indexOf(value)
        if (i >= 0) cur.splice(i, 1)
        else {
          if (cur.length >= (s.max || Infinity)) return a
          cur.push(value)
        }
        return { ...a, [s.id]: cur }
      })
    } else {
      setAnswers((a) => {
        const next: Answers = { ...a, [s.id]: value }
        if (s.id === 'experience' && value === 'beginner') {
          delete next.alreadyTaking
          delete next.concerns
        }
        return next
      })
    }
  }

  function next() {
    const s = steps[clampedStep]
    if (!hasAnswer(s)) return
    navDirRef.current = 1
    if (clampedStep < steps.length - 1) {
      setStep(clampedStep + 1)
      setDiffIndex((i) => i + 1)
      scrollTop()
    } else {
      finish()
    }
  }

  function back() {
    if (clampedStep > 0) {
      navDirRef.current = -1
      setStep(clampedStep - 1)
      scrollTop()
    }
  }

  function start() {
    setStep(0)
    setDiffIndex(0)
    navDirRef.current = 1
    shownPctRef.current = 0
    setScreen('quiz')
    scrollTop()
  }

  function recommend(): Product[] {
    const points: Record<string, number> = {}
    const add = (sc: Record<string, number>) => {
      for (const [k, v] of Object.entries(sc)) points[k] = (points[k] || 0) + v
    }
    steps.forEach((s) => {
      const opts = optionsFor(s)
      if (s.type === 'single') {
        const o = opts.find((x) => x.value === answers[s.id])
        if (o && o.scores) add(o.scores)
      } else if (s.type === 'multi') {
        ;((answers[s.id] as string[]) || []).forEach((val) => {
          const o = opts.find((x) => x.value === val)
          if (o && o.scores) add(o.scores)
        })
      } else if (s.type === 'slider') {
        const band = bandFor((answers[s.id] as number) ?? AGE_DEFAULT)
        if (band) add(band.scores)
      }
    })

    const sex = (answers.sex as string) || ''
    const taken = new Set<string>()
    if (answers.experience === 'experienced') {
      ;((answers.alreadyTaking as string[]) || []).forEach((k) =>
        (TAKING_MAP[k] || []).forEach((slug) => taken.add(slug)),
      )
    }
    const d = diet
    const eligible = (p: Product) =>
      !(p.exclude && p.exclude.includes(d)) &&
      !taken.has(p.slug) &&
      !(p.sex && sex && p.sex !== sex)

    const scored = PRODUCTS.filter(eligible)
      .map((p) => {
        let score = 0
        p.tags.forEach((t) => {
          if (points[t]) score += points[t]
        })
        if (d === 'vegan' && p.tags.includes('vegan')) score += 6
        if (sex === 'female' && (p.tags.includes('womens') || p.sex === 'female')) score += 5
        if (sex === 'male' && (p.tags.includes('mens') || p.sex === 'male')) score += 5
        return { p, score }
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)

    const chosen: Product[] = []
    const cats = new Set<string>()
    for (const x of scored) {
      if (chosen.length >= 3) break
      if (cats.has(x.p.cat)) continue
      chosen.push(x.p)
      cats.add(x.p.cat)
    }
    if (chosen.length < 3) {
      for (const x of scored) {
        if (chosen.length >= 3) break
        if (!chosen.includes(x.p)) chosen.push(x.p)
      }
    }
    if (chosen.length < 3) {
      for (const p of PRODUCTS) {
        if (chosen.length >= 3) break
        if (!eligible(p)) continue
        if (!chosen.includes(p)) chosen.push(p)
      }
    }
    return chosen.slice(0, 3)
  }

  function finish() {
    setPicks(recommend())
    setAddonSel(new Set())
    setLoadingMsgIndex(0)
    setSubmitted(false)
    setFormName(name)
    setScreen('loading')
    scrollTop()
  }

  function toggleAddon(v: number) {
    setAddonSel((prev) => {
      const n = new Set(prev)
      if (n.has(v)) n.delete(v)
      else n.add(v)
      return n
    })
  }

  function buildCartUrl() {
    const items = picks.map((p) => `${p.variant}:1`)
    addonSel.forEach((v) => items.push(`${v}:1`))
    return `${STORE}/cart/${items.join(',')}?discount=${DISCOUNT_CODE}`
  }

  function leadCount() {
    let extra = 0
    try {
      extra = JSON.parse(localStorage.getItem('gng_leads') || '[]').length
    } catch {
      /* ignore */
    }
    return 1240 + extra
  }

  function submitEmail() {
    const em = email.trim()
    const ph = phone.trim()
    const nm = formName.trim()
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)
    const phoneOk = ph.replace(/\D/g, '').length >= 7
    if (!emailOk && !phoneOk) {
      setFormErr('Add your email or mobile number so we can send your regime.')
      return
    }
    setFormErr('')
    const lead = {
      name: nm,
      email: em,
      phone: ph,
      consent,
      diet,
      answers,
      bundle: picks.map((p) => ({ name: p.name, variant: p.variant, price: p.price })),
      addons: [...addonSel]
        .map((v) => {
          const a = ADDONS.find((x) => x.variant === v)
          return a ? { name: a.name, variant: a.variant, price: a.price } : null
        })
        .filter(Boolean),
      cart: buildCartUrl(),
      at: new Date().toISOString(),
    }
    try {
      const leads = JSON.parse(localStorage.getItem('gng_leads') || '[]')
      leads.push(lead)
      localStorage.setItem('gng_leads', JSON.stringify(leads))
    } catch {
      /* ignore */
    }

    let where: string
    if (emailOk && phoneOk) where = `send it to ${em} and text it to ${ph}`
    else if (emailOk) where = `send it to ${em}`
    else where = `text it to ${ph}`

    setSuccessTitle(nm ? `Thanks, ${nm}, your regime is on its way!` : 'Your regime is on its way!')
    setSuccessMsg(
      `We've saved your personalised plan and we'll ${where}. You're number ${leadCount().toLocaleString()} in the G&G community. Welcome.`,
    )
    setSubmitted(true)
  }

  function restart() {
    setScreen('intro')
    setStep(0)
    setAnswers({})
    setDiet('none')
    setName('')
    setPicks([])
    setAddonSel(new Set())
    setDiffIndex(0)
    setJiggleIdx(-1)
    setEmail('')
    setPhone('')
    setFormName('')
    setConsent(true)
    setFormErr('')
    setSubmitted(false)
    navDirRef.current = 1
    shownPctRef.current = 0
    scrollTop()
  }

  // Rotate the "G&G difference" callout while the quiz is on screen
  useEffect(() => {
    if (screen !== 'quiz') return
    const id = window.setInterval(() => setDiffIndex((i) => i + 1), 6500)
    return () => window.clearInterval(id)
  }, [screen])

  // Loading screen: ~10s while the wave bar fills; % and messages track elapsed time
  useEffect(() => {
    if (screen !== 'loading') return
    const DURATION = 10000
    const started = Date.now()
    setPct(0)
    setLoadingMsgIndex(0)
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - started
      setPct(Math.min(100, Math.round((elapsed / DURATION) * 100)))
      setLoadingMsgIndex(Math.min(LOADING_MSGS.length - 1, Math.floor(elapsed / (DURATION / LOADING_MSGS.length))))
    }, 80)
    const done = window.setTimeout(() => {
      setPct(100)
      setScreen('results')
      scrollTop()
    }, DURATION)
    return () => {
      window.clearInterval(tick)
      window.clearTimeout(done)
    }
  }, [screen])

  // Seed the age slider with its default the moment its step is reached
  // (mirrors the original, so Continue is enabled without touching the slider)
  useEffect(() => {
    const s = steps[clampedStep]
    if (screen === 'quiz' && s?.type === 'slider' && answers[s.id] == null) {
      setAnswers((a) => ({ ...a, [s.id]: AGE_DEFAULT }))
    }
  }, [screen, clampedStep, steps, answers])

  // Keep the name input focused when the name step is shown
  useEffect(() => {
    if (screen === 'quiz' && steps[clampedStep]?.type === 'name') {
      const el = nameInputRef.current
      if (el) {
        el.focus()
        el.setSelectionRange(el.value.length, el.value.length)
      }
    }
  }, [screen, clampedStep, steps])

  // Gently jiggle a product image every so often on the results screen
  useEffect(() => {
    if (screen !== 'results' || picks.length === 0) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let n = 0
    const id = window.setInterval(() => {
      const idx = n % picks.length
      n++
      setJiggleIdx(idx)
      window.setTimeout(() => setJiggleIdx(-1), 650)
    }, 15000)
    return () => window.clearInterval(id)
  }, [screen, picks.length])

  // ----- Derived values for the results screen -----
  const addonList = useMemo(() => {
    const inBundle = new Set(picks.map((p) => p.variant))
    return ADDONS.filter((a) => !inBundle.has(a.variant)).slice(0, 3)
  }, [picks])

  const regimeItems = useMemo(() => {
    const items = picks.map((p) => ({ name: p.name, slot: p.slot, food: p.food, tip: p.tip }))
    addonSel.forEach((v) => {
      const a = ADDONS.find((x) => x.variant === v)
      if (a) items.push({ name: a.name, slot: a.slot, food: a.food, tip: a.tip })
    })
    return items.sort((x, y) => SLOTS[x.slot].rank - SLOTS[y.slot].rank)
  }, [picks, addonSel])

  const printItems = useMemo(() => {
    const items = picks.map((p) => ({ name: p.name, cat: p.cat, dose: p.dose, slot: p.slot, food: p.food }))
    addonSel.forEach((v) => {
      const a = ADDONS.find((x) => x.variant === v)
      if (a) items.push({ name: a.name, cat: a.cat || 'Add-on', dose: a.dose, slot: a.slot, food: a.food })
    })
    return items.sort((x, y) => SLOTS[x.slot].rank - SLOTS[y.slot].rank)
  }, [picks, addonSel])

  const goalStep = STEPS.find((s) => s.id === 'goals') as Step
  const goalOpts = optionsFor(goalStep)
  const goals = ((answers.goals as string[]) || []).map((v) => {
    const o = goalOpts.find((x) => x.value === v)
    return o ? o.label.toLowerCase() : v
  })
  const resultsIntro = goals.length
    ? `Built around your goals (${listPhrase(goals)}), here are the three pure, capsule-only G&G formulas we'd start you on, each timed around your day.`
    : `Here are the three pure, capsule-only G&G formulas we'd start you on, each timed around your day.`

  const regular =
    picks.reduce((s, p) => s + p.price, 0) +
    [...addonSel].reduce((s, v) => {
      const a = ADDONS.find((x) => x.variant === v)
      return s + (a ? a.price : 0)
    }, 0)
  const discounted = Math.round(regular * (1 - BUNDLE_DISCOUNT))
  const save = regular - discounted
  const validDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
  const fullDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const nm = name.trim()

  return (
    <>
      <div className="announce">
        <span>Free shipping on orders over £40</span>
        <span>Pure, capsule-only supplements</span>
        <span>Family-run &amp; British-made since the 1960s</span>
      </div>

      <header className="site">
        <div className="nav">
          <button className="brand" onClick={restart} aria-label="G&G Vitamins — start again">
            <img className="logo-img" src={WHITE_LOGO} alt="G&G Vitamins" />
          </button>
          <nav className="nav-links">
            <a href="https://gandgvitamins.com/" target="_blank" rel="noreferrer">Vitamins &amp; Supplements</a>
            <a href="https://gandgvitamins.com/pages/who-we-are" target="_blank" rel="noreferrer">Why G&amp;G?</a>
            <a href="https://gandgvitamins.com/" target="_blank" rel="noreferrer">Professionals</a>
            <span className="demo-pill">Prototype</span>
          </nav>
        </div>
      </header>

      <main>
        {screen === 'intro' && (
          <section className="screen-anim">
            <div className="hero">
              <img className="hero-logo" src={GREEN_LOGO} alt="G&G" />

              <span className="eyebrow">Personalised Supplement Finder</span>
              <h1>
                Find the <span className="hl-3">3</span> supplements your{' '}
                <span className="ul-word">
                  body
                  <svg className="ul-draw" viewBox="0 0 120 20" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M3,14 C20,8 40,7 58,10 C74,12 92,15 117,9" />
                  </svg>
                </span>{' '}
                has been asking for.
              </h1>
              <p className="lead">
                Answer a few quick questions and we'll build your personalised daily regime. The right G&G capsules, at the
                right time of day, with a plan you can actually stick to.
              </p>
              <div className="cta-wrap">
                <div className="cta-wave">
                  <Threads
                    amplitude={1.1}
                    distance={0.3}
                    enableMouseInteraction={false}
                    shaderColor={[0.32, 0.45, 0.28]}
                  />
                </div>
                <button className="btn btn-primary btn-hero" onClick={start}>
                  Build my regime <span className="btn-arrow">→</span>
                </button>
              </div>

              <div className="trust-band">
                <div className="trust-item">
                  <Raw className="trust-flag" html={UNION_JACK} />
                  <div className="trust-txt">
                    <b>Made in Britain</b>
                    <span>Crafted in the UK at our facility in Sussex</span>
                  </div>
                </div>
                <div className="trust-sep" />
                <div className="trust-item">
                  <Raw className="trust-ic" html={ICONS.home} />
                  <div className="trust-txt">
                    <b>Family run for 60 years</b>
                    <span>Independent since the 1960s, three generations</span>
                  </div>
                </div>
                <div className="trust-sep" />
                <div className="trust-item">
                  <Raw className="trust-ic" html={ICONS.capsule} />
                  <div className="trust-txt">
                    <b>Capsules, not tablets</b>
                    <span>No binders or fillers that can affect absorption</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                {HERO_CHIPS.map((c) => (
                  <div className="chip-card" key={c.label}>
                    <Raw html={ICONS[c.icon]} />
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>

              <MedicalNote text="This tool offers general wellbeing guidance to help you choose supplements for your goals — it isn't medical advice. Your regime is built by our in-house nutritionists and vitamin specialists. If you're pregnant, breastfeeding or taking medication, check with your doctor or pharmacist first." />
            </div>
          </section>
        )}

        {screen === 'quiz' && (() => {
          const s = steps[clampedStep]
          const prog = progressInfo(clampedStep)
          const total = steps.length
          const opts = s.type === 'single' || s.type === 'multi' ? optionsFor(s) : []
          const hasHints = opts.some((o) => o.hint)
          const sel = answers[s.id]
          const age = s.type === 'slider' ? ((answers[s.id] as number) ?? AGE_DEFAULT) : AGE_DEFAULT
          const agePct = ((age - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100
          const d = DIFFERENCE[diffIndex % DIFFERENCE.length]
          return (
            <section className="screen-anim">
              <div className="quiz-wrap">
                <div className="progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: prog.fill + '%' }} />
                  </div>
                  <div className="progress-meta">
                    <span className="progress-step">{prog.stepLabel}</span>
                    <span className="progress-pct">{prog.pctLabel}</span>
                  </div>
                </div>

                <h2 className="step-title">{titleFor(s)}</h2>
                <p className="step-sub">{s.sub}</p>
                {s.type === 'multi' && (
                  <div className="step-hint">{s.optional ? 'Select any that apply' : `Select up to ${s.max}`}</div>
                )}

                {s.type === 'name' ? (
                  <div className="options name-step">
                    <div className="name-field">
                      <input
                        ref={nameInputRef}
                        type="text"
                        maxLength={24}
                        autoComplete="given-name"
                        spellCheck={false}
                        placeholder="Type your first name"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            next()
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : s.type === 'slider' ? (
                  <div className="options slider-step">
                    <div className="age-slider">
                      <div className="age-value">
                        <b>{age >= AGE_MAX ? AGE_MAX + '+' : age}</b>
                        <span>years</span>
                      </div>
                      <input
                        type="range"
                        min={AGE_MIN}
                        max={AGE_MAX}
                        step={1}
                        value={age}
                        style={{ '--fill': agePct + '%' } as CSSProperties}
                        onChange={(e) => onAge(e.target.value)}
                        aria-label="Your age"
                      />
                      <div className="age-scale">
                        <span>{AGE_MIN}</span>
                        <span>{AGE_MAX}+</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`options${hasHints ? ' has-hints' : ''}`}>
                    {opts.map((o) => {
                      const on =
                        s.type === 'multi' ? ((sel as string[]) || []).includes(o.value) : sel === o.value
                      return (
                        <button
                          key={o.value}
                          className={`option${on ? ' selected' : ''}`}
                          onClick={() => select(s, o.value)}
                        >
                          <span className="opt-check"><Raw html={CHECK} /></span>
                          {o.hint ? (
                            <span className="opt-label">
                              <span>{o.label}</span>
                              <span className="opt-hint">{o.hint}</span>
                            </span>
                          ) : (
                            <span>{o.label}</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}

                {s.sex && (
                  <div className="diet-row">
                    <div className="diet-label">Please choose one — it tailors your recommendations.</div>
                    <div className="segmented">
                      {['female', 'male'].map((sx) => (
                        <button
                          key={sx}
                          className={answers.sex === sx ? 'active' : ''}
                          onClick={() => setAnswers((a) => ({ ...a, sex: sx }))}
                        >
                          {cap(sx)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {s.diet && (
                  <div className="diet-row">
                    <div className="diet-label">Any dietary preference? We'll tailor your capsules to suit.</div>
                    <div className="segmented">
                      {(['none', 'vegetarian', 'vegan'] as const).map((dd) => (
                        <button key={dd} className={diet === dd ? 'active' : ''} onClick={() => setDiet(dd)}>
                          {dd === 'none' ? 'No preference' : cap(dd)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="difference">
                  <Raw className="d-icon" html={ICONS[d.icon]} />
                  <div className="d-body">
                    <div className="d-tag">The G&G difference</div>
                    <div className="d-fade" key={diffIndex}>
                      <h4>{d.title}</h4>
                      <p>{d.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="quiz-nav">
                  {clampedStep > 0 && (
                    <button className="btn btn-ghost" onClick={back}>
                      ← Back
                    </button>
                  )}
                  <button className="btn btn-primary" onClick={next} disabled={!hasAnswer(s)}>
                    {clampedStep === total - 1 ? 'See my regime' : 'Continue'} <span className="btn-arrow">→</span>
                  </button>
                </div>

                <MedicalNote text="General wellbeing guidance to support your goals, built with our in-house nutritionists and vitamin specialists. If you're pregnant, breastfeeding or taking medication, check with your doctor or pharmacist first." />
              </div>
            </section>
          )
        })()}

        {screen === 'loading' && (
          <section className="screen-anim">
            <div className="analyzing">
              <h2>{nm ? `Building your regime, ${nm}…` : 'Building your personalised regime…'}</h2>
              <div className="load-shell">
                <div className="load-bar">
                  <div className="load-fill" style={{ width: `${Math.max(4, pct)}%` }}>
                    <div className="load-wave">
                      <Threads
                        amplitude={1.5}
                        distance={0.16}
                        enableMouseInteraction={false}
                        shaderColor={[0.86, 0.93, 0.82]}
                      />
                    </div>
                    <div className="load-shimmer" />
                  </div>
                </div>
                <div className="load-pct">{pct}%</div>
              </div>
              <p>{LOADING_MSGS[loadingMsgIndex]}</p>
            </div>
          </section>
        )}

        {screen === 'results' && (
          <section className="screen-anim">
            <div className="results-head">
              <span className="eyebrow">Your Personalised Bundle</span>
              <h1>{nm ? `${nm}, here’s your daily three` : 'Your G&G daily three'}</h1>
              <p>{resultsIntro}</p>
            </div>

            <div className="bundle">
              {picks.map((p, i) => (
                <ProductCard key={p.variant} p={p} i={i} jiggle={jiggleIdx === i} />
              ))}
            </div>

            <div className="addons">
              <h3>Popular add-ons</h3>
              <p className="sub">
                Complete your regime with a best-seller. Optional, and dropped straight into your basket if you want it.
              </p>
              <div className="addon-grid">
                {addonList.map((a) => {
                  const on = addonSel.has(a.variant)
                  return (
                    <div key={a.variant} className={`addon${on ? ' selected' : ''}`} onClick={() => toggleAddon(a.variant)}>
                      <span className="addon-badge">Best seller</span>
                      <div className="addon-img">
                        <img src={a.img} alt={a.name} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                      </div>
                      <div className="addon-info">
                        <b>{a.name}</b>
                        <span className="a-size">{a.size}</span>
                        <div className="a-blurb">{a.blurb}</div>
                        <div className="addon-rating" onClick={(e) => e.stopPropagation()}>
                          <StarRow item={a} className="addon-stars" />
                        </div>
                      </div>
                      <div className="addon-right">
                        <span className="addon-price">£{a.price}</span>
                        <span className="addon-toggle">{on ? 'Added ✓' : 'Add +'}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="summary-bar">
              <div className="offer-lead">
                <span className="offer-badge">★ Exclusive bundle saving</span>
                <small className="tot-label">
                  {addonSel.size
                    ? `Your bundle + ${addonSel.size} add-on${addonSel.size > 1 ? 's' : ''}`
                    : 'Your personalised bundle'}
                </small>
                <div className="offer-price-row">
                  <span className="reg-price">£{regular}</span>
                  <b className="bundle-total">£{discounted}</b>
                  <span className="offer-save">Save £{save} · {Math.round(BUNDLE_DISCOUNT * 100)}% off</span>
                </div>
                <div className="offer-valid">Offer valid today only · {validDate}</div>
              </div>
              <div className="offer-cta">
                <div className="ship">
                  {discounted >= 40 ? '✓ Includes free UK shipping' : `£${40 - discounted} more for free UK shipping`}
                </div>
                <a className="btn btn-primary" href={buildCartUrl()} target="_blank" rel="noopener noreferrer">
                  Claim my 15% bundle <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>

            <MedicalNote
              className="results-medical-note"
              text="This personalised regime is general wellbeing guidance built around your goals by our in-house nutritionists and vitamin specialists — it isn't medical advice. If you're pregnant, breastfeeding or taking medication, please check with your doctor or pharmacist first."
            />

            <div className="why-strip">
              <h3>Why your G&G regime is different</h3>
              <p className="lead">
                Most supplements on the high street are pressed into tablets that need binders, fillers and coatings just to
                hold together. G&G does it differently.
              </p>
              <div className="why-grid">
                {WHY.map((w) => (
                  <div className="why-item" key={w.title}>
                    <Raw className="wi-ic" html={ICONS[w.icon]} />
                    <b>{w.title}</b>
                    <span>{w.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="regime">
              <h3>Your daily regime</h3>
              <p className="sub">A simple rhythm designed around your day. Take each capsule at the time it works best.</p>
              <div className="timeline">
                {regimeItems.map((it, idx) => {
                  const sl = SLOTS[it.slot]
                  return (
                    <div className="slot" key={idx}>
                      <div className="slot-time">
                        <Raw className="dot" html={ICONS[sl.icon]} />
                        <b>{sl.label}</b>
                      </div>
                      <div className="slot-body">
                        <div className="item">{it.name}</div>
                        <div className="note">{it.food}. {it.tip}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="capture">
              {!submitted ? (
                <div>
                  <h3>Email or text me my regime</h3>
                  <p>We'll send your personalised plan and timings straight to you so you always have it to hand.</p>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="First name (optional)"
                      autoComplete="given-name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="you@email.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="Mobile number — or text it to me (optional)"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="channel-note">
                    <Raw html={WA_GLYPH} /> Prefer WhatsApp? Drop your number and we'll text your plan.
                  </div>
                  <label className="consent">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> Keep me updated
                    with G&G tips &amp; offers
                  </label>
                  <div className="err">{formErr}</div>
                  <button className="btn btn-primary" style={{ marginTop: 6 }} onClick={submitEmail}>
                    Send me my regime
                  </button>
                </div>
              ) : (
                <div className="success">
                  <img className="check" src={GREEN_LOGO_SM} alt="G&G" />
                  <h3>{successTitle}</h3>
                  <p>{successMsg}</p>
                </div>
              )}
            </div>

            <div className="results-actions">
              <button className="btn btn-ghost" onClick={() => window.print()}>Print / save as PDF</button>
              <button className="btn btn-ghost" onClick={restart}>Start again</button>
            </div>
          </section>
        )}
      </main>

      <section id="printSheet" className="print-only">
        <div className="ps-head">
          <img className="ps-logo" src={GREEN_LOGO} alt="G&G Vitamins" />
          <div className="ps-title">
            <h1>{nm ? `${nm}’s G&G Daily Regime` : 'Your G&G Daily Regime'}</h1>
            <div className="ps-date">{fullDate}</div>
          </div>
        </div>
        <p className="ps-intro">
          Your personalised daily supplement plan — how many to take, when in the day, and whether to take each one with
          food.
        </p>
        <div>
          {printItems.map((it, i) => {
            const sl = SLOTS[it.slot]
            return (
              <div className="ps-row" key={i}>
                <span className="ps-num">{i + 1}</span>
                <div className="ps-main">
                  <span className="ps-cat">{it.cat}</span>
                  <b>{it.name}</b>
                </div>
                <div className="ps-right">
                  <div className="ps-dose">{it.dose}</div>
                  <div className="ps-when">{sl.label} · {it.food}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="ps-foot">
          Pure, capsule-only formulas · No binders or fillers · Family-run &amp; British-made since the 1960s ·
          gandgvitamins.com
        </div>
      </section>

      <footer className="site">
        Prototype for stakeholder review. A concept demo, not a live G&G product. Product names, timings, pricing and
        imagery referenced from{' '}
        <a href="https://gandgvitamins.com/" target="_blank" rel="noreferrer">gandgvitamins.com</a>. Supplements are not a
        substitute for a varied diet or medical advice.
      </footer>
    </>
  )
}

export default App
