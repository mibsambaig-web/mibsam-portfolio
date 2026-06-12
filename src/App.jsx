import { useState, useEffect } from 'react'

const LOGO_IMG = "/assets/logo.png"
const SETUP_IMG = "/assets/setup.jpg"
const RESUME_PDF = "/assets/Resume.pdf"   


// ── CSS Variables injected globally
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    :root {
      --bg: #0A0A0A; --surface: #141414; --surface2: #1A1A1A;
      --border: #222; --text: #F0F0F0; --text2: #A3A3A3;
      --accent: #00D4FF; --accent2: #7B61FF;
      --accent-glow: rgba(0,212,255,0.15);
      --font-display: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }
    [data-theme="light"] {
      --bg: #F8F9FA; --surface: #FFFFFF; --surface2: #F0F1F3;
      --border: #E0E0E0; --text: #171717; --text2: #525252;
      --accent: #00A8CC; --accent2: #5F3DC4;
      --accent-glow: rgba(0,168,204,0.12);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; transition: background 0.3s, color 0.3s; }
    ::selection { background: var(--accent); color: #000; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
    a { color: var(--accent); text-decoration: none; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
    @keyframes gradientShift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
    @keyframes pulseGlow { 0%,100% { box-shadow:0 0 10px var(--accent-glow); } 50% { box-shadow:0 0 30px var(--accent-glow); } }
    .fadeUp { animation: fadeUp 0.8s ease both; }
    @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: block !important; } }
  `}</style>
)

function SectionLabel({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'8px', color:'var(--accent)', fontSize:'11px', fontWeight:700, letterSpacing:'0.15em', marginBottom:'14px', fontFamily:'var(--font-display)' }}>
      <span style={{ width:'24px', height:'1px', background:'var(--accent)', display:'block' }} />
      {children.toUpperCase()}
    </div>
  )
}

function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = ['About','Projects','Skills','Experience','Contact']
  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : 'none', transition:'all 0.4s', padding:'0 clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px' }}>
        <a href="#home" style={{ display:'flex', alignItems:'center', gap:'10px', color:'var(--text)' }}>
          <img src={LOGO_IMG} alt="MB" style={{ width:'34px', height:'34px', borderRadius:'8px', objectFit:'cover' }} />
          <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'15px' }}>Mibsam Baig</span>
        </a>
        <div className="desktop-nav" style={{ display:'flex', alignItems:'center', gap:'28px' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color:'var(--text2)', fontSize:'14px', transition:'color 0.3s' }}
              onMouseEnter={e=>e.target.style.color='var(--accent)'}
              onMouseLeave={e=>e.target.style.color='var(--text2)'}
            >{l}</a>
          ))}
          <button onClick={toggleTheme} style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'50px', padding:'7px 14px', cursor:'pointer', color:'var(--text)', fontFamily:'var(--font-body)', fontSize:'12px' }}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display:'none', background:'none', border:'none', color:'var(--text)', fontSize:'22px', cursor:'pointer' }}>☰</button>
      </div>
      {menuOpen && (
        <div style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', padding:'20px', display:'flex', flexDirection:'column', gap:'16px' }}>
          {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMenuOpen(false)} style={{ color:'var(--text2)', fontSize:'15px' }}>{l}</a>)}
          <button onClick={toggleTheme} style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'8px', padding:'10px', cursor:'pointer', color:'var(--text)', fontFamily:'var(--font-body)', width:'fit-content' }}>
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const [typed, setTyped] = useState('')
  const phrases = ['Full-Stack Developer','AI Engineer','Problem Solver','Remote-Ready']
  const [pi, setPi] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = phrases[pi]
    let t
    if (!del && typed.length < cur.length) t = setTimeout(() => setTyped(cur.slice(0,typed.length+1)), 80)
    else if (!del && typed.length === cur.length) t = setTimeout(() => setDel(true), 2000)
    else if (del && typed.length > 0) t = setTimeout(() => setTyped(typed.slice(0,-1)), 40)
    else { setDel(false); setPi((pi+1)%phrases.length) }
    return () => clearTimeout(t)
  }, [typed, del, pi])

  return (
    <section id="home" style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'100px clamp(20px,5vw,80px) 60px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)', backgroundSize:'60px 60px', opacity:0.25, maskImage:'radial-gradient(ellipse at center,black 20%,transparent 75%)', zIndex:0 }} />
      <div style={{ position:'absolute', top:'15%', right:'8%', width:'350px', height:'350px', background:'radial-gradient(circle,rgba(0,212,255,0.07) 0%,transparent 70%)', borderRadius:'50%', animation:'float 7s ease-in-out infinite', zIndex:0 }} />
      <div style={{ position:'absolute', bottom:'15%', left:'5%', width:'280px', height:'280px', background:'radial-gradient(circle,rgba(123,97,255,0.07) 0%,transparent 70%)', borderRadius:'50%', animation:'float 9s ease-in-out infinite reverse', zIndex:0 }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1, width:'100%' }} className="fadeUp">
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(0,212,255,0.08)', border:'1px solid rgba(0,212,255,0.25)', borderRadius:'50px', padding:'6px 16px', marginBottom:'24px' }}>
          <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', display:'block', animation:'pulseGlow 2s infinite' }} />
          <span style={{ color:'var(--accent)', fontSize:'12px', fontWeight:600 }}>Available for Remote Work</span>
        </div>

        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(38px,7vw,78px)', lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'16px' }}>
          Muhammad<br />
          <span style={{ background:'linear-gradient(135deg,var(--accent),var(--accent2))', backgroundSize:'200%', animation:'gradientShift 4s ease infinite', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Mibsam Baig</span>
        </h1>

        <div style={{ display:'flex', alignItems:'center', gap:'4px', marginBottom:'24px', height:'38px' }}>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'clamp(16px,2.5vw,24px)', color:'var(--text2)', fontWeight:500 }}>{typed}</span>
          <span style={{ width:'2px', height:'26px', background:'var(--accent)', borderRadius:'1px', animation:'blink 1s infinite' }} />
        </div>

        <p style={{ color:'var(--text2)', fontSize:'clamp(14px,1.8vw,17px)', maxWidth:'500px', marginBottom:'40px', fontWeight:300, lineHeight:1.75 }}>
          I build apps that think. From full-stack web apps to AI-powered tools — I ship real products that solve real problems.
        </p>

        <div style={{ display:'flex', gap:'14px', flexWrap:'wrap', marginBottom:'48px' }}>
          <a href="#projects" style={{ background:'var(--accent)', color:'#000', padding:'13px 30px', borderRadius:'8px', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'14px', boxShadow:'0 0 20px var(--accent-glow)', transition:'all 0.3s' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 0 40px var(--accent-glow)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 0 20px var(--accent-glow)'}}>
            View My Work
          </a>
          <a 
  href={RESUME_PDF} 
  download="Muhammad_Mibsam_Baig_Resume.pdf"
  style={{ background:'transparent', color:'var(--text)', padding:'13px 30px', borderRadius:'8px', fontFamily:'var(--font-display)', fontWeight:600, fontSize:'14px', border:'1px solid var(--border)', transition:'all 0.3s' }}
  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)'}}
  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text)'}}
>
  Download Resume
</a>
        </div>

        <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
          {[['GitHub','https://github.com/mibsambaig-web'],['LinkedIn','https://linkedin.com/in/muhammad-mibsam-baig'],['Fiverr','https://fiverr.com/s/KegAVw4'],['Upwork','#contact']].map(([label,url])=>(
            <a key={label} href={url} target="_blank" rel="noreferrer" style={{ color:'var(--text2)', fontSize:'13px', fontWeight:500, letterSpacing:'0.04em', transition:'color 0.3s' }}
              onMouseEnter={e=>e.target.style.color='var(--accent)'}
              onMouseLeave={e=>e.target.style.color='var(--text2)'}>{label}</a>
          ))}
        </div>
      </div>
    </section>
  )
}
function About() {
  return (
    <section id="about" style={{ padding:'100px clamp(20px,5vw,80px)', background:'var(--surface)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <SectionLabel>About Me</SectionLabel>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'60px', alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,4vw,40px)', fontWeight:800, lineHeight:1.2, marginBottom:'24px' }}>
              Building the future,<br/><span style={{ color:'var(--accent)' }}>one commit at a time.</span>
            </h2>
            <p style={{ color:'var(--text2)', lineHeight:1.85, marginBottom:'16px', fontSize:'15px' }}>
              I'm Mibsam — a 20-year-old CS student from Karachi, Pakistan. Self-driven full-stack developer who taught himself to build complete web apps and AI-powered tools from scratch, while maintaining a 3.38 GPA.
            </p>
            <p style={{ color:'var(--text2)', lineHeight:1.85, marginBottom:'32px', fontSize:'15px' }}>
              I specialize in MERN stack development and AI integration. Currently seeking remote opportunities where I can ship real products that actually matter.
            </p>
            <div style={{ display:'flex', gap:'28px', flexWrap:'wrap' }}>
              {[['3.38','GPA'],['8+','Projects'],['2','Clients'],['20','Years Old']].map(([num,label])=>(
                <div key={label} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:800, color:'var(--accent)' }}>{num}</div>
                  <div style={{ color:'var(--text2)', fontSize:'11px', letterSpacing:'0.1em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', inset:'-2px', borderRadius:'16px', background:'linear-gradient(135deg,var(--accent),var(--accent2))', opacity:0.6, zIndex:0 }} />
            <img src={SETUP_IMG} alt="My Setup" style={{ width:'100%', borderRadius:'14px', objectFit:'cover', maxHeight:'380px', position:'relative', zIndex:1, display:'block' }} />
            <div style={{ position:'absolute', bottom:'16px', left:'16px', zIndex:2, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(10px)', border:'1px solid rgba(0,212,255,0.3)', borderRadius:'8px', padding:'8px 14px' }}>
              <span style={{ color:'var(--accent)', fontSize:'12px', fontWeight:600 }}>⌨ My Setup — Karachi, PK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const projects = [
  { title:'AI Customer Support Chatbot', desc:'Full-stack chatbot with conversation memory, system prompts, and clean chat bubble UI. Built with Flask and React.', tags:['Flask','React','OpenRouter API','AI'], github:'https://github.com/mibsambaig-web/ai-chatbot', live:null, ai:true },
  { title:'PDF Q&A App', desc:'Upload any PDF and ask questions. AI answers based on document content using RAG with chunk splitting.', tags:['Flask','React','RAG','AI','PDF'], github:'https://github.com/mibsambaig-web/pdf-qa', live:null, ai:true },
  { title:'AI Interview Coach', desc:'Paste a job description, get tailored interview questions, answer them, and receive detailed AI feedback.', tags:['Flask','React','OpenRouter API','AI'], github:'https://github.com/mibsambaig-web/ai-interview-coach', live:null, ai:true },
  { title:'Clinic Booking App', desc:'Full-stack dental clinic appointment management dashboard. Live and deployed on Vercel and Railway.', tags:['React','Node.js','PostgreSQL','Express'], github:'https://github.com/mibsambaig-web/clinic-booking', live:'https://clinic-booking-git-main-mibsambaig-webs-projects.vercel.app', ai:false },
  { title:'Weather App', desc:'Responsive weather app with real-time data from live API and dynamic UI updates.', tags:['React','JavaScript','API'], github:null, live:'https://mibsam-weather-app.netlify.app', ai:false },
  { title:'BKK by Erum', desc:'Real client website designed and deployed. Professional business site built to client specifications.', tags:['React','CSS','Client Project'], github:null, live:'https://bkk-by-erum.netlify.app', ai:false },
  { title:'To-Do List App', desc:'Full-stack task management app with Node.js backend and PostgreSQL database.', tags:['React','Node.js','PostgreSQL'], github:null, live:'https://todolistprojectmmb.netlify.app/', ai:false },
  { title:'Real-Time Collaborative Editor', desc:'Google Docs-style collaborative editor where multiple users can type simultaneously with live sync. Features colored user badges and instant WebSocket updates.', tags:['React','Node.js','Socket.io'], github:'https://github.com/mibsambaig-web/collaborative-editor', live:null, ai:false },
  { title:'WhatsApp AI Chatbot', desc:'AI-powered WhatsApp chatbot that handles customer queries automatically 24/7. Built with Flask, Twilio sandbox, and OpenRouter AI.', tags:['Flask','Twilio','OpenRouter API','AI'], github:'https://github.com/mibsambaig-web/whatsapp-bot', live:null, ai:true }
]

function Projects() {
  return (
    <section id="projects" style={{ padding:'100px clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <SectionLabel>Projects</SectionLabel>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,4vw,40px)', fontWeight:800, marginBottom:'48px' }}>
          Things I've <span style={{ color:'var(--accent)' }}>shipped</span>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'24px' }}>
          {projects.map((p,i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, i }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ background:'var(--surface)', border:`1px solid ${hovered?'var(--accent)':'var(--border)'}`, borderRadius:'16px', padding:'28px', transition:'all 0.3s', transform:hovered?'translateY(-4px)':'translateY(0)', boxShadow:hovered?'0 20px 40px rgba(0,212,255,0.08)':'none', position:'relative', overflow:'hidden', animation:`fadeUp 0.6s ease ${i*0.08}s both` }}>
      {p.ai && (
        <div style={{ position:'absolute', top:'16px', right:'16px', background:'rgba(0,212,255,0.08)', border:'1px solid rgba(0,212,255,0.3)', borderRadius:'50px', padding:'3px 10px', color:'var(--accent)', fontSize:'10px', fontWeight:700, letterSpacing:'0.08em' }}>AI PROJECT</div>
      )}
      <h3 style={{ fontFamily:'var(--font-display)', fontSize:'16px', fontWeight:700, marginBottom:'12px', paddingRight: p.ai?'90px':'0' }}>{p.title}</h3>
      <p style={{ color:'var(--text2)', fontSize:'13px', lineHeight:1.75, marginBottom:'20px' }}>{p.desc}</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'24px' }}>
        {p.tags.map(tag=>(
          <span key={tag} style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'6px', padding:'4px 10px', fontSize:'11px', color:'var(--text2)', fontWeight:500 }}>{tag}</span>
        ))}
      </div>
      <div style={{ display:'flex', gap:'16px' }}>
        {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ color:'var(--accent)', fontSize:'13px', fontWeight:600 }}>⌥ GitHub</a>}
        {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ color:'var(--text2)', fontSize:'13px', fontWeight:600 }}>↗ Live Demo</a>}
        {!p.github && !p.live && <span style={{ color:'var(--text2)', fontSize:'12px', opacity:0.4 }}>Coming soon</span>}
      </div>
    </div>
  )
}

function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React.js", level: 88 },
        { name: "JavaScript (ES6+)", level: 85 },
        { name: "HTML5 & CSS3", level: 90 },
        { name: "Tailwind CSS", level: 85 }
      ]
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", level: 82 },
        { name: "Express.js", level: 80 },
        { name: "PostgreSQL", level: 72 },
        { name: "REST APIs", level: 83 },
        { name: "Python / Flask", level: 78 }
      ]
    },
    {
      title: "AI & Integration",
      skills: [
        { name: "AI Integration", level: 75 },
        { name: "LangChain & RAG", level: 78 },
        { name: "LLM APIs (OpenRouter)", level: 80 }
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "Docker", level: 70 },
        { name: "Vercel / Railway / Netlify", level: 82 }
      ]
    }
  ]

  return (
    <section id="skills" style={{ padding: '100px clamp(20px,5vw,80px)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>Skills</SectionLabel>
        
        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(26px,4vw,40px)', 
          fontWeight: 800, 
          marginBottom: '48px',
          lineHeight: 1.1
        }}>
          Technologies I <span style={{ color: 'var(--accent)' }}>mastered</span>
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '32px' 
        }}>
          {skillCategories.map((category, index) => (
            <div key={index} style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '32px',
              transition: 'all 0.4s'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '24px',
                color: 'var(--accent)'
              }}>
                {category.title}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                      <span style={{ color: 'var(--text)' }}>{skill.name}</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{skill.level}%</span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'var(--border)',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${skill.level}%`,
                        background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                        borderRadius: '999px',
                        transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <p style={{ 
            color: 'var(--text2)', 
            fontSize: '13px', 
            letterSpacing: '0.1em',
            marginBottom: '20px'
          }}>
            LANGUAGES
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '40px',
            fontSize: '17px',
            fontWeight: 500
          }}>
            <span>English — Fluent</span>
            <span>Urdu — Native</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const experiences = [
    {
      role: "Freelance Full-Stack Developer",
      company: "Fiverr & Upwork",
      period: "2024 — Present",
      location: "Remote",
      points: [
        "Delivered high-quality business websites and web applications to international clients",
        "Built and shipped multiple AI-powered tools using React, Flask, and LLM APIs",
        "Maintained consistent 5-star ratings with strong client communication",
        "Currently charging $15/hr on Upwork"
      ]
    },
    {
      role: "Full-Stack Developer",
      company: "Personal Projects & Client Work",
      period: "2023 — Present",
      location: "Karachi, Pakistan",
      points: [
        "Developed and deployed 8+ full-stack applications including AI Chatbot, PDF Q&A System, and Clinic Booking Dashboard",
        "Specialized in MERN stack and Python/Flask backends with seamless AI integration",
        "Successfully deployed production applications on Vercel, Railway, and Netlify",
        "Built real-time features, REST APIs, and database architectures from scratch"
      ]
    }
  ]

  return (
    <section id="experience" style={{ padding: '100px clamp(20px,5vw,80px)', background: 'var(--surface2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>Experience</SectionLabel>
        
        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(26px,4vw,40px)', 
          fontWeight: 800, 
          marginBottom: '48px',
          lineHeight: 1.1
        }}>
          Where I've <span style={{ color: 'var(--accent)' }}>made impact</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {experiences.map((exp, index) => (
            <div key={index} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '36px',
              transition: 'all 0.4s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '20px', 
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}>
                    {exp.role}
                  </h3>
                  <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '15px' }}>
                    {exp.company}
                  </p>
                </div>
                <div style={{ textAlign: 'right', color: 'var(--text2)', fontSize: '14px', lineHeight: 1.5 }}>
                  <div>{exp.period}</div>
                  <div>{exp.location}</div>
                </div>
              </div>

              <ul style={{ 
                color: 'var(--text2)', 
                lineHeight: 1.8, 
                paddingLeft: '20px',
                fontSize: '15px'
              }}>
                {exp.points.map((point, i) => (
                  <li key={i} style={{ marginBottom: '10px' }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Opens default email client with pre-filled message
    const subject = `Portfolio Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:mibsambaig@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Optional: Reset form
    form.reset();
    alert("✅ Message ready! Opening your email client...");
  };

  return (
    <section id="contact" style={{ padding: '100px clamp(20px,5vw,80px)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>Contact Me</SectionLabel>
        
        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(26px,4vw,40px)', 
          fontWeight: 800, 
          marginBottom: '24px',
          lineHeight: 1.1
        }}>
          Let's build something<br /> 
          <span style={{ color: 'var(--accent)' }}>great together</span>
        </h2>

        <p style={{ 
          color: 'var(--text2)', 
          fontSize: '17px', 
          maxWidth: '520px', 
          marginBottom: '50px',
          lineHeight: 1.7
        }}>
          I'm currently open to remote opportunities, freelance projects, and interesting collaborations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px' }}>
          
          {/* Contact Info */}
          <div>
            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '20px', 
              marginBottom: '24px',
              color: 'var(--accent)'
            }}>
              Get in touch
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <a href="mailto:mibsambaig@gmail.com" style={{ 
                display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text2)', textDecoration: 'none', fontSize: '15px'
              }}>
                ✉️ mibsambaig@gmail.com
              </a>

              <a href="tel:+923452217430" style={{ 
                display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text2)', textDecoration: 'none', fontSize: '15px'
              }}>
                📞 +92 345 2217430
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text2)', fontSize: '15px' }}>
                📍 Karachi, Pakistan
              </div>
            </div>
          </div>

          {/* Working Form */}
          <div style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '40px',
            height: 'fit-content'
          }}>
            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '18px', 
              marginBottom: '20px'
            }}>
              Send me a message
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                required
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  color: 'var(--text)',
                  fontSize: '15px'
                }}
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                required
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  color: 'var(--text)',
                  fontSize: '15px'
                }}
              />
              <textarea 
                name="message"
                placeholder="Your Message..." 
                rows="5"
                required
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  color: 'var(--text)',
                  fontSize: '15px',
                  resize: 'vertical'
                }}
              />
              <button 
                type="submit"
                style={{
                  background: 'var(--accent)',
                  color: '#000',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  marginTop: '8px',
                  transition: 'all 0.3s'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  const toggleTheme = () => setTheme(t => t==='dark'?'light':'dark')
  return (
    <>
      <GlobalStyles />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  )
}