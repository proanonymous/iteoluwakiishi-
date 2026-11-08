import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Menu,
  Moon,
  Palette,
  Sparkles,
  X,
  Sun,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Check,
  Github,
  Linkedin,
  Globe,
  Send,
  MousePointer2,
  Braces,
  ShoppingBag,
  PanelsTopLeft,
  Zap,
  ExternalLink,
} from 'lucide-react';

const projects = [
  { n: '01', title: 'Source Five', type: 'Web project', tag: 'Websites', year: '2026', desc: 'A live web project showcasing a focused digital experience and responsive interface.', stack: ['Web design', 'Responsive UI', 'Frontend'], visual: 'source-five', label: 'SOURCE FIVE / WEBSITE', url: 'https://source-five-mocha.vercel.app/', outcome: 'Explore the live Source Five website.' },
  { n: '02', title: 'EMCARE', type: 'Pharmacy & stores', tag: 'Commerce', year: '2026', desc: 'A pharmacy and stores web experience built around product discovery and an accessible shopping journey.', stack: ['E-commerce', 'Product UI', 'Responsive design'], visual: 'emcare', label: 'EMCARE / STORES', url: 'https://emcare-coral.vercel.app/', outcome: 'Explore the live EMCARE website.' },
  { n: '03', title: 'QUOTIFY', type: 'Quote platform', tag: 'Web apps', year: '2026', desc: 'A quote-focused web application with a dedicated live experience.', stack: ['Web app', 'Interactive UI', 'Frontend'], visual: 'quotify', label: 'QUOTIFY / QUOTES', url: 'https://quotify3.vercel.app/', outcome: 'Explore the live QUOTIFY application.' },
  { n: '04', title: 'ACFBI', type: 'Organisation website', tag: 'Websites', year: '2026', desc: 'A live organisational website designed to present information in a clear, accessible format.', stack: ['Website design', 'Responsive layout', 'Frontend'], visual: 'acfbi', label: 'ACFBI / WEBSITE', url: 'https://proanonymous.github.io/acfbi/', outcome: 'Explore the live ACFBI website.' },
  { n: '05', title: 'FCE Model School', type: 'School website', tag: 'Websites', year: '2026', desc: 'A school-focused digital platform presenting the institution and its online information.', stack: ['Education', 'Web design', 'Responsive UI'], visual: 'fce-school', label: 'FCE MODEL SCHOOL', url: 'https://proanonymous.github.io/fcemss/', outcome: 'Explore the live FCE Model School website.' },
  { n: '06', title: 'Dé Kraft Essentials', type: 'E-commerce store', tag: 'Commerce', year: '2026', desc: 'An online storefront for handcrafted bags and accessories, with a product-led shopping experience.', stack: ['E-commerce', 'Storefront UI', 'Responsive design'], visual: 'dekraft', label: 'DÉ KRAFT / ESSENTIALS', url: 'https://dekraft-delta.vercel.app/', outcome: 'Explore the live Dé Kraft Essentials store.' },
];
const services = [
  {
    n: '01',
    icon: PanelsTopLeft,
    title: 'Website design',
    text: 'Distinctive, responsive interfaces shaped around your brand and the people using it.',
  },
  {
    n: '02',
    icon: Code2,
    title: 'Frontend development',
    text: 'Clean, accessible interfaces built to feel fast, fluid, and intuitive on every screen.',
  },
  {
    n: '03',
    icon: Braces,
    title: 'Backend development',
    text: 'Practical PHP functionality, server-side workflows, and database-connected experiences.',
  },
  {
    n: '04',
    icon: ShoppingBag,
    title: 'E-commerce',
    text: 'Thoughtful product journeys and storefront experiences designed to help customers buy confidently.',
  },
  {
    n: '05',
    icon: Layers3,
    title: 'Website redesign',
    text: 'A sharper visual system, clearer navigation, and a more useful experience for your audience.',
  },
  {
    n: '06',
    icon: Zap,
    title: 'Interactive experiences',
    text: 'Purposeful interactions and motion that bring digital products to life without getting in the way.',
  },
];
const skills = [
  { name: 'HTML', value: 100, group: 'FRONTEND' },
  { name: 'CSS', value: 90, group: 'FRONTEND' },
  { name: 'JavaScript', value: 75, group: 'FRONTEND' },
  { name: 'PHP', value: 80, group: 'BACKEND' },
  { name: 'Photoshop', value: 55, group: 'DESIGN' },
];
const filters = ['All', 'Websites', 'Commerce', 'Web apps'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(() => {
    try {
      return localStorage.getItem('yusuf-portfolio-theme') === 'light';
    } catch {
      return false;
    }
  });
  const [filter, setFilter] = useState('All');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [website, setWebsite] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'Website design',
    details: '',
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    try {
      localStorage.setItem('yusuf-portfolio-theme', light ? 'light' : 'dark');
    } catch {
      // The theme still works when browser storage is unavailable.
    }
  }, [light]);

  const closeMenu = () => setMenuOpen(false);
  const visibleProjects = projects.filter(
    p => filter === 'All' || p.tag === filter
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('kiishiyusuf@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:kiishiyusuf@gmail.com';
    }
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError('');
    setSent(false);
    if (submitting) return;
    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim();
    const cleanDetails = form.details.trim();
    if (!cleanName || !cleanEmail || cleanDetails.length < 10) {
      setSubmitError('Please complete every field and write at least 10 characters about your project.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          projectType: form.type,
          message: cleanDetails,
          website,
        }),
      });
      if (!response.ok) throw new Error('Contact submission failed');
      setSent(true);
      setForm({ name: '', email: '', type: 'Website design', details: '' });
      setWebsite('');
    } catch {
      setSubmitError('Your message could not be submitted right now. Please try again or email kiishiyusuf@gmail.com directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />
      <header className="topbar">
        <a
          href="#home"
          className="brand"
          onClick={closeMenu}
          aria-label="Yusuf Iteoluwakiishi home"
        >
          <span className="brand-mark">
            Y<span>.</span>
          </span>
          <span className="brand-name">
            YUSUF ITEOLUWAKIISHI<small>DESIGN × DEVELOPMENT</small>
          </span>
        </a>
        <nav
          className={menuOpen ? 'nav-links open' : 'nav-links'}
          aria-label="Main navigation"
        >
          {['About', 'Services', 'Work', 'Skills'].map(item => (
            <a key={item} href={'#' + item.toLowerCase()} onClick={closeMenu}>
              {item}
            </a>
          ))}
          <a href="#contact" className="nav-contact" onClick={closeMenu}>
            Let's talk <ArrowUpRight size={14} />
          </a>
        </nav>
        <div className="top-actions">
          <button
            className="theme-toggle"
            onClick={() => setLight(v => !v)}
            aria-label={
              light ? 'Switch to dark theme' : 'Switch to light theme'
            }
          >
            {light ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> AVAILABLE FOR WEB DESIGN WORK{' '}
              <span className="eyebrow-line" />
            </div>
            <p className="hero-pretitle">
              Independent web designer & developer
            </p>
            <h1>
              Ideas into
              <br />
              <span className="gradient-text">digital impact.</span>
            </h1>
            <p className="hero-description">
              I’m Yusuf — I design and build thoughtful digital experiences
              where <strong>good design meets purposeful code.</strong>
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <ArrowUpRight size={17} />
              </a>
              <a className="button button-quiet" href="#contact">
                Start a project <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-cross">✳</span> Thoughtfully designed.
              Carefully built. <span className="footnote-divider" /> Based in
              Abeokuta, NG.
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Abstract glass artwork representing design and code"
          >
            <div className="art-orbit orbit-a" />
            <div className="art-orbit orbit-b" />
            <div className="art-glass art-back">
              <span className="art-label">CREATIVE SYSTEMS / 001</span>
              <div className="art-grid" />
            </div>
            <div className="art-glass art-main">
              <div className="art-topline">
                <span>YI®</span>
                <span>INDEPENDENT / 2026</span>
              </div>
              <div className="art-symbol">
                <span className="symbol-ring" />
                <span className="symbol-core" />
                <span className="symbol-spark">✳</span>
              </div>
              <div className="art-bottom">
                <div>
                  <span className="art-caption">DESIGN WITH INTENT</span>
                  <strong>
                    Make it mean
                    <br />
                    something.
                  </strong>
                </div>
                <div className="art-arrow">
                  <ArrowDownRight size={23} />
                </div>
              </div>
            </div>
            <div className="floating-chip chip-code">
              <Code2 size={15} />
              <span>Clean code</span>
              <i />
            </div>
            <div className="floating-chip chip-design">
              <Palette size={15} />
              <span>Clear design</span>
              <i />
            </div>
            <div className="art-coordinate">
              07°09' N<br />
              03°20' E
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={15} />
          </a>
        </section>

        <div className="ticker" aria-label="Design, develop, deliver">
          <div className="ticker-track">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>
                DESIGN WITH INTENT <b>✳</b> DEVELOP WITH CARE <b>✳</b> DELIVER
                WITH IMPACT <b>✳</b>
              </span>
            ))}
          </div>
        </div>

        <section className="section-wrap about-section" id="about">
          <div className="section-kicker">
            <span>01 / A LITTLE ABOUT ME</span>
            <span className="kicker-rule" />
          </div>
          <div className="about-grid">
            <div>
              <h2>
                Design-minded.
                <br />
                <span className="muted-heading">Code-driven.</span>
              </h2>
            </div>
            <div className="about-copy">
              <p className="large-copy">
                I turn ideas into digital experiences that look considered, feel
                intuitive, and work the way people expect.
              </p>
              <p>
                From focused brochure websites to richer e-commerce experiences,
                I bring design thinking and practical development together to
                make the web more useful — one project at a time.
              </p>
              <a className="text-link" href="#contact">
                A project on your mind? <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="stat-grid">
            <div className="stat-card glass">
              <span className="stat-number">
                21<span>+</span>
              </span>
              <span className="stat-label">PROJECTS COMPLETED</span>
              <span className="stat-detail">Experience through making</span>
            </div>
            <div className="stat-card glass">
              <span className="stat-number">05</span>
              <span className="stat-label">CERTIFICATE SUBJECTS</span>
              <span className="stat-detail">
                A foundation for lifelong learning
              </span>
            </div>
            <div className="stat-card glass">
              <span className="stat-number">04</span>
              <span className="stat-label">CORE WEB TECHNOLOGIES</span>
              <span className="stat-detail">From structure to server-side</span>
            </div>
            <div className="stat-note">
              <Sparkles size={19} />
              <p>
                Curiosity is part of the process. Every project is a chance to
                make something clearer, smarter, and more human.
              </p>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-wrap">
            <div className="section-kicker">
              <span>02 / WHAT I DO</span>
              <span className="kicker-rule" />
            </div>
            <div className="section-heading-row">
              <h2>
                Useful by design.
                <br />
                <span className="muted-heading">Beautiful by nature.</span>
              </h2>
              <p>
                From first sketch to final interaction, I help ideas find their
                place on the web.
              </p>
            </div>
            <div className="service-grid">
              {services.map(s => {
                const Icon = s.icon;
                return (
                  <article className="service-card glass" key={s.n}>
                    <div className="service-card-top">
                      <span>{s.n}</span>
                      <Icon size={21} strokeWidth={1.5} />
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <div className="service-card-line" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-wrap work-section" id="work">
          <div className="section-kicker">
            <span>03 / SELECTED WORK</span>
            <span className="kicker-rule" />
          </div>
          <div className="section-heading-row work-heading">
            <div>
              <h2>
                Made with purpose.
                <br />
                <span className="muted-heading">Built to matter.</span>
              </h2>
              <p className="work-subtitle">
                A glimpse into my approach to digital experiences.
              </p>
            </div>
            <span className="work-count">PORTFOLIO / 2026</span>
          </div>
          <div className="filter-row" role="group" aria-label="Filter projects">
            {filters.map(f => (
              <button
                key={f}
                className={filter === f ? 'filter-pill active' : 'filter-pill'}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map(p => (
              <article className="project-card" key={p.n}>
                <div className={'project-visual ' + p.visual}>
                  <svg className="project-art" viewBox="0 0 900 560" role="img" aria-label={p.title + ' custom project artwork'} preserveAspectRatio="xMidYMid slice">
                    {p.n === '01' && (
                      <g>
                        <rect width="900" height="560" fill="#101c2b" />
                        <path d="M0 110H900M0 220H900M0 330H900M0 440H900M150 0V560M300 0V560M450 0V560M600 0V560M750 0V560" stroke="#263d51" strokeWidth="1" />
                        <rect x="82" y="118" width="736" height="326" rx="18" fill="#172b3c" stroke="#3b596d" />
                        <rect x="82" y="118" width="736" height="48" rx="18" fill="#20394d" />
                        <circle cx="111" cy="142" r="6" fill="#ff7c70" /><circle cx="133" cy="142" r="6" fill="#f5c76a" /><circle cx="155" cy="142" r="6" fill="#74d6b0" />
                        <text x="112" y="218" fill="#9bb4c6" fontSize="17" letterSpacing="5">DIGITAL EXPERIENCES / 2026</text>
                        <text x="112" y="286" fill="#f4f8fb" fontSize="66" fontWeight="700">SOURCE FIVE</text>
                        <text x="114" y="330" fill="#9bb4c6" fontSize="22">A sharper way to experience the web.</text>
                        <rect x="114" y="365" width="178" height="42" rx="21" fill="#8ce9f0" /><text x="145" y="392" fill="#102536" fontSize="14" fontWeight="700">EXPLORE PROJECT ↗</text>
                        <path d="M690 240l42 42-42 42-42-42z" fill="#8ce9f0" opacity=".9" />
                      </g>
                    )}
                    {p.n === '02' && (
                      <g>
                        <rect width="900" height="560" fill="#edf4e9" />
                        <circle cx="740" cy="130" r="170" fill="#d5e8d3" />
                        <rect x="72" y="84" width="756" height="390" rx="22" fill="#fbfdf8" stroke="#d7e3d4" />
                        <text x="112" y="145" fill="#2e6548" fontSize="25" fontWeight="700" letterSpacing="3">EMCARE</text>
                        <text x="112" y="183" fill="#7b9181" fontSize="13" letterSpacing="4">HEALTH • CARE • EVERY DAY</text>
                        <text x="112" y="270" fill="#203e31" fontSize="51" fontWeight="700">Care made</text>
                        <text x="112" y="326" fill="#2f8b61" fontSize="51" fontWeight="700">accessible.</text>
                        <rect x="112" y="360" width="158" height="43" rx="21" fill="#2f8b61" /><text x="142" y="388" fill="#fff" fontSize="14" fontWeight="700">SHOP NOW ↗</text>
                        <rect x="590" y="200" width="130" height="180" rx="28" fill="#7dbd91" />
                        <rect x="620" y="165" width="70" height="48" rx="10" fill="#2e6548" />
                        <rect x="606" y="265" width="98" height="62" rx="8" fill="#f5fbef" /><text x="620" y="290" fill="#2e6548" fontSize="14" fontWeight="700">EMCARE</text><text x="620" y="310" fill="#6b8c76" fontSize="9">WELLNESS</text>
                        <circle cx="755" cy="390" r="42" fill="#f0c96e" /><path d="M740 390h30M755 375v30" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                      </g>
                    )}
                    {p.n === '03' && (
                      <g>
                        <rect width="900" height="560" fill="#17265e" />
                        <circle cx="730" cy="70" r="250" fill="#263c91" />
                        <rect x="78" y="78" width="744" height="404" rx="24" fill="#f6f4ee" />
                        <text x="120" y="145" fill="#3047a0" fontSize="24" fontWeight="800" letterSpacing="5">QUOTIFY</text>
                        <text x="120" y="260" fill="#1a2450" fontSize="108" fontWeight="700">“</text>
                        <text x="120" y="310" fill="#1a2450" fontSize="44" fontWeight="700">Words that</text>
                        <text x="120" y="360" fill="#4058b5" fontSize="44" fontWeight="700">stay with you.</text>
                        <path d="M650 180h100M700 130v100" stroke="#e2b65e" strokeWidth="12" strokeLinecap="round" />
                        <text x="122" y="425" fill="#7580a3" fontSize="17" letterSpacing="3">COLLECT • CREATE • SHARE</text>
                      </g>
                    )}
                    {p.n === '04' && (
                      <g>
                        <rect width="900" height="560" fill="#142d35" />
                        <path d="M0 0H900V560H0z" fill="#1c4148" />
                        <circle cx="450" cy="275" r="190" fill="none" stroke="#d2b66f" strokeWidth="2" opacity=".6" />
                        <path d="M450 100l130 65v120c0 100-75 150-130 180-55-30-130-80-130-180V165z" fill="#e8dfc7" />
                        <path d="M450 145l90 45v95c0 65-45 105-90 130-45-25-90-65-90-130v-95z" fill="#2d6a61" />
                        <path d="M405 260h90M450 215v90" stroke="#e8dfc7" strokeWidth="12" strokeLinecap="round" />
                        <text x="450" y="55" textAnchor="middle" fill="#e8dfc7" fontSize="20" letterSpacing="7">ACFBI</text>
                        <text x="450" y="490" textAnchor="middle" fill="#e8dfc7" fontSize="18" letterSpacing="5">COMMUNITY • SERVICE • IMPACT</text>
                      </g>
                    )}
                    {p.n === '05' && (
                      <g>
                        <rect width="900" height="560" fill="#eaf1d9" />
                        <rect x="55" y="58" width="790" height="444" rx="20" fill="#fbfcf6" stroke="#d4dfc2" />
                        <rect x="55" y="58" width="790" height="76" rx="20" fill="#23633e" />
                        <text x="96" y="105" fill="#fff" fontSize="25" fontWeight="700">FCE MODEL SCHOOL</text>
                        <text x="680" y="102" fill="#d8e9c8" fontSize="13">LEARN • LEAD</text>
                        <rect x="96" y="175" width="330" height="240" rx="12" fill="#e6efcf" />
                        <path d="M130 295l145-90 145 90" fill="#d4aa40" /><rect x="158" y="292" width="235" height="105" fill="#2e7049" />
                        <rect x="245" y="330" width="55" height="67" fill="#f4e8c7" /><rect x="180" y="315" width="42" height="38" fill="#c4d8e9" /><rect x="330" y="315" width="42" height="38" fill="#c4d8e9" />
                        <text x="470" y="225" fill="#315b3c" fontSize="17" letterSpacing="3">WELCOME TO</text>
                        <text x="470" y="275" fill="#1f4e32" fontSize="38" fontWeight="700">A place to</text>
                        <text x="470" y="320" fill="#1f4e32" fontSize="38" fontWeight="700">grow & learn.</text>
                        <rect x="470" y="350" width="170" height="42" rx="21" fill="#d4aa40" /><text x="499" y="377" fill="#243e2b" fontSize="13" fontWeight="700">DISCOVER MORE ↗</text>
                      </g>
                    )}
                    {p.n === '06' && (
                      <g>
                        <rect width="900" height="560" fill="#f4eee5" />
                        <path d="M0 0H900V560H0z" fill="#f4eee5" />
                        <text x="90" y="112" fill="#0b2d4a" fontSize="23" fontWeight="700" letterSpacing="4">DÉ KRAFT</text>
                        <text x="90" y="143" fill="#8d7c68" fontSize="13" letterSpacing="6">E S S E N T I A L S</text>
                        <text x="90" y="250" fill="#0b2d4a" fontSize="54" fontWeight="700">Made by hand.</text>
                        <text x="90" y="310" fill="#0b2d4a" fontSize="54" fontWeight="700">Made for you.</text>
                        <text x="94" y="365" fill="#8d7c68" fontSize="17">Thoughtful pieces for everyday style.</text>
                        <path d="M585 230h190l-18 210H603z" fill="#0b2d4a" />
                        <path d="M635 235v-42c0-48 90-48 90 0v42" fill="none" stroke="#d4af37" strokeWidth="13" />
                        <path d="M585 230h190l-18 210H603z" fill="none" stroke="#d4af37" strokeWidth="3" />
                        <circle cx="680" cy="330" r="17" fill="#d4af37" />
                        <text x="90" y="455" fill="#b7a99a" fontSize="14" letterSpacing="4">CRAFTED WITH CARE / 2026</text>
                      </g>
                    )}
                  </svg>
                  <div className="project-visual-top">
                    <span>{p.label}</span>
                    <span>{p.n} / {String(projects.length).padStart(2, '0')}</span>
                  </div>
                  <div className="visual-open">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <div className="project-meta">
                  <div>
                    <span className="project-type">
                      {p.type} <span>·</span> {p.year}</span>
                    <h3>{p.title}</h3>
                  </div>
                  <a className="project-open" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={'Open live ' + p.title + ' project'}>
                    <ArrowUpRight size={19} />
                  </a>
                </div>
                <p className="project-desc">{p.desc}</p>
                <p className="project-outcome">{p.outcome}</p>
                <a className="project-live-link" href={p.url} target="_blank" rel="noopener noreferrer">Explore live project <ExternalLink size={14} /></a>
                <div className="stack-row">
                  {p.stack.map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="project-disclaimer">
            <span>PROJECT NOTES</span> These are personal/portfolio projects. The descriptions focus on product goals and visible features rather than claiming unverified client results.
          </p>
        </section>

        <section className="section-wrap proof-section" id="case-studies">
          <div className="section-kicker">
            <span>04 / PROJECT BREAKDOWN</span>
            <span className="kicker-rule" />
          </div>
          <div className="section-heading-row">
            <h2>Ideas into <span className="muted-heading">working products.</span></h2>
            <p>Three live builds. Different product problems. One focus on clear, usable interfaces.</p>
          </div>
          <div className="proof-grid">
            <article className="proof-card glass"><span className="micro-label">01 / NOVA AI</span><h3>Make AI feel approachable</h3><p>Product focus: a focused assistant workspace with chat history and image-generation capabilities. Design focus: glass surfaces, clear hierarchy, and an uncluttered starting point.</p><a href="https://nova-ai-d40s9i.v2.appdeploy.ai/" target="_blank" rel="noopener noreferrer">View the live build <ArrowUpRight size={15} /></a></article>
            <article className="proof-card glass"><span className="micro-label">02 / GALAXY</span><h3>Give conversations a home</h3><p>Product focus: profiles, direct and group messaging, stories, and AI assistance. Design focus: a distinctive cosmic identity that still keeps everyday actions easy to find.</p><a href="https://galaxy-dopj43.v2.appdeploy.ai/#features" target="_blank" rel="noopener noreferrer">View the live build <ArrowUpRight size={15} /></a></article>
            <article className="proof-card glass"><span className="micro-label">03 / STUDYMATE</span><h3>Make study workflows easier to access</h3><p>Product focus: a dedicated learning and study platform. Design focus: organizing study tools into a clear, approachable experience for learners.</p><a href="https://studymate-g5drz2.v2.appdeploy.ai/" target="_blank" rel="noopener noreferrer">View the live build <ArrowUpRight size={15} /></a></article>
          </div>
        </section>

        <section className="section-wrap testimonial-section" id="testimonials">
          <div className="section-kicker"><span>05 / FEEDBACK</span><span className="kicker-rule" /></div>
          <div className="testimonial-card glass"><Sparkles size={22} /><div><h2>Good work should speak honestly.</h2><p>Client testimonials will appear here when genuine feedback is available and permission to publish it has been granted. No invented reviews or ratings.</p><a className="text-link" href="#contact">Share feedback or discuss a project <ArrowUpRight size={16} /></a></div></div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-wrap">
            <div className="section-kicker">
              <span>04 / MY TOOLKIT</span>
              <span className="kicker-rule" />
            </div>
            <div className="skills-layout">
              <div>
                <h2>
                  The tools behind
                  <br />
                  <span className="muted-heading">the thinking.</span>
                </h2>
                <p className="skills-intro">
                  A practical toolkit for shaping ideas into working digital
                  experiences — with room to keep learning.
                </p>
                <div className="cert-card glass">
                  <div className="cert-icon">
                    <Braces size={22} />
                  </div>
                  <div>
                    <span className="micro-label">CERTIFICATES</span>
                    <p>
                      C++ <span>·</span> HTML <span>·</span> CSS <span>·</span>{' '}
                      PHP <span>·</span> JavaScript
                    </p>
                  </div>
                  <Check size={17} className="cert-check" />
                </div>
              </div>
              <div className="skills-panel glass">
                {skills.map((s, i) => (
                  <div className="skill-item" key={s.name}>
                    <div className="skill-info">
                      <span className="skill-name">{s.name}</span>
                      <span className="skill-group">{s.group}</span>
                      <span className="skill-value">{s.value}%</span>
                    </div>
                    <div className="skill-track">
                      <span
                        style={{
                          width: s.value + '%',
                          animationDelay: i * 90 + 'ms',
                        }}
                      />
                    </div>
                  </div>
                ))}
                <p className="skill-note">Self-reported proficiency levels</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap process-section">
          <div className="section-kicker">
            <span>05 / HOW I WORK</span>
            <span className="kicker-rule" />
          </div>
          <div className="section-heading-row">
            <h2>
              Good work is
              <br />
              <span className="muted-heading">a thoughtful process.</span>
            </h2>
            <p>Clear communication at every step. No mystery, just momentum.</p>
          </div>
          <div className="process-grid">
            {[
              {
                n: '01',
                title: 'Discover',
                text: 'We align on the goal, audience, requirements, and what success should look like.',
              },
              {
                n: '02',
                title: 'Design',
                text: 'I shape the structure, visual direction, and responsive experience before the details.',
              },
              {
                n: '03',
                title: 'Develop',
                text: 'The design becomes a working experience with careful code and real functionality.',
              },
              {
                n: '04',
                title: 'Refine',
                text: 'We test, improve, and polish the details before preparing for launch.',
              },
            ].map(p => (
              <article className="process-step" key={p.n}>
                <span className="process-num">{p.n}</span>
                <div className="process-connector" />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap">
            <div className="section-kicker">
              <span>06 / YOUR NEXT MOVE</span>
              <span className="kicker-rule" />
            </div>
            <div className="contact-grid">
              <div className="contact-copy">
                <span className="contact-overline">
                  <span className="status-dot" /> OPEN TO GOOD PROJECTS
                </span>
                <h2>
                  Have an idea?
                  <br />
                  <span className="gradient-text">Let's make it real.</span>
                </h2>
                <p>
                  Tell me a little about what you're imagining. The best things
                  start with a conversation.
                </p>
                <button className="email-copy" onClick={copyEmail}>
                  <Mail size={18} />
                  <span>kiishiyusuf@gmail.com</span>
                  {copied ? <Check size={16} /> : <ArrowUpRight size={16} />}
                </button>
                {copied && (
                  <span className="copy-feedback" role="status">
                    Email copied to clipboard
                  </span>
                )}
                <div className="contact-details">
                  <div>
                    <MapPin size={16} />
                    <span>Abeokuta, Ogun State, Nigeria</span>
                  </div>
                  <div>
                    <Phone size={16} />
                    <a href="tel:+2349030226152">+234 903 022 6152</a>
                  </div>
                </div>
              </div>
              <form className="contact-form glass" onSubmit={submitForm}>
                <div className="form-heading">
                  <span>LET'S TALK DETAILS</span>
                  <span>01 — 04</span>
                </div>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
                </div>
                <label>
                  Your name
                  <input
                    required
                    autoComplete="name"
                    name="name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="What should I call you?"
                  />
                </label>
                <label>
                  Your email
                  <input
                    required
                    autoComplete="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  What do you have in mind?
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                  >
                    <option>Website design</option>
                    <option>Frontend development</option>
                    <option>Backend development</option>
                    <option>E-commerce</option>
                    <option>Website redesign</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label>
                  Tell me about it
                  <textarea
                    required
                    minLength={10}
                    rows={3}
                    value={form.details}
                    onChange={e =>
                      setForm({ ...form, details: e.target.value })
                    }
                    placeholder="A little about your project, goals, or idea..."
                  />
                </label>
                <button
                  className="button button-primary form-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Sending message…' : 'Send message'} <Send size={16} />
                </button>
                <p className="form-privacy">
                  Your message is submitted securely to this site's backend and stored for follow-up. Please do not include passwords or sensitive personal information.
                </p>
                {submitError && <p className="form-status form-status-error" role="alert">{submitError}</p>}
                {sent && (
                  <p className="form-status" role="status">
                    Thanks — your message was submitted successfully. I’ll follow up using the email address you provided.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer section-wrap">
        <a href="#home" className="brand footer-brand">
          <span className="brand-mark">
            Y<span>.</span>
          </span>
          <span className="brand-name">
            YUSUF ITEOLUWAKIISHI<small>DESIGN × DEVELOPMENT</small>
          </span>
        </a>
        <a className="cv-download" href="/yusuf-iteoluwakiishi-cv.html" download>Download CV <ArrowDown size={15} /></a>
        <span className="footer-note">
          MADE WITH INTENTION <span>✳</span> IN NIGERIA
        </span>
        <span className="footer-copy">
          © {new Date().getFullYear()} Yusuf Iteoluwakiishi
        </span>
        <a className="back-top" href="#home" aria-label="Back to top">
          <ArrowUpRight size={18} />
        </a>
      </footer>
      <a
        className="whatsapp-float"
        href="https://wa.me/2349030226152?text=Hello%20Yusuf%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Yusuf on WhatsApp"
        title="Chat with me on WhatsApp"
      >
        <MessageCircle size={23} strokeWidth={2.2} aria-hidden="true" />
        <span>Let's chat</span>
      </a>
    </div>
  );
}

export default App;
