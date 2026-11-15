import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Download, Info, Linkedin, Mail, Menu, Play, X } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

const IMG = {
  hero: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2200&q=90",
  strategy: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85",
  campaign: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
  creative: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1000&q=85",
  social: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1000&q=85",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85",
  camera: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85",
};

const profiles = [
  { id: "recruiter", title: "Recruiter", subtitle: "The professional journey", color: "from-red-600 to-orange-500" },
  { id: "brand", title: "Brand / Business", subtitle: "Ideas, campaigns & creative", color: "from-blue-600 to-cyan-400" },
  { id: "creator", title: "Creative People", subtitle: "The person behind the work", color: "from-violet-600 to-pink-500" },
];

const episodes = [
  { no: "S01:E01", role: "Digital Marketing Manager", company: "The Clara Digital", year: "2023", image: IMG.strategy, summary: "Learning how brands communicate, how digital channels work together, and how ideas turn into consistent execution.", tags: ["Digital marketing", "Content planning", "Brand communication"] },
  { no: "S01:E02", role: "Social Media Marketing Manager", company: "PDRL", year: "2024", image: IMG.campaign, summary: "A deeper chapter in social media, campaign execution, email growth and video-led communication.", tags: ["Social media", "Campaigns", "Email marketing"] },
  { no: "S01:E03", role: "Digital Marketing Executive", company: "DESENO Media Agency", year: "2025–2026", image: IMG.creative, summary: "Agency life: multiple briefs, shifting priorities, creative problem-solving and the daily work of making marketing happen.", tags: ["Agency marketing", "Creative direction", "Execution"] },
  { no: "S01:E04", role: "Growth Marketing Lead", company: "Knchan Associates", year: "Joining · 23 Nov 2026", image: IMG.analytics, summary: "The next chapter: bringing strategy, creative thinking and growth execution into a new role.", tags: ["Growth strategy", "Marketing systems", "Leadership"], upcoming: true },
];

const originals = [
  { id: "brand-story", title: "The Brand Story", genre: "Brand strategy · Storytelling", image: IMG.strategy, desc: "Finding the message, tone and point of view that make a brand recognisable.", details: ["Audience and category research", "Brand positioning and communication direction", "Content pillars and narrative development"] },
  { id: "campaign-room", title: "Inside the Campaign Room", genre: "Campaign planning · Distribution", image: IMG.campaign, desc: "Connecting the brief, audience, creative idea and distribution plan.", details: ["Campaign objective and audience definition", "Creative concepts and channel planning", "Performance review and iteration"] },
  { id: "content-studio", title: "The Content Studio", genre: "Social media · Video", image: IMG.creative, desc: "Turning ideas into social-first content people actually want to watch.", details: ["Reels concepts, hooks and scripts", "Creative direction and production planning", "Publishing systems and content calendars"] },
  { id: "social-playbook", title: "Social, Not Just Posting", genre: "Social strategy · Community", image: IMG.social, desc: "Building a social presence with a consistent point of view—not random posts.", details: ["Platform roles and content formats", "Audience engagement and community touchpoints", "Reviewing signals to shape the next post"] },
  { id: "growth-loop", title: "The Growth Loop", genre: "Performance · Analytics", image: IMG.analytics, desc: "Looking at marketing as a connected system rather than isolated channels.", details: ["Paid and organic campaign thinking", "Reporting and performance interpretation", "Creative testing and optimisation"] },
  { id: "behind-lens", title: "Behind the Lens", genre: "Brand shoots · Visual storytelling", image: IMG.camera, desc: "A growing interest in cinematic brand content and visual storytelling.", details: ["Brand shoot concepts", "Shot planning and visual references", "Short-form video production"] },
];

const skills = [
  { title: "Strategy & Growth", items: ["Brand positioning", "Campaign planning", "Audience research", "Growth thinking"] },
  { title: "Creative & Content", items: ["Social media strategy", "Creative direction", "Reels & video concepts", "Brand storytelling"] },
  { title: "Performance & Data", items: ["Meta Ads", "Google Ads", "Marketing reporting", "Conversion thinking"] },
  { title: "Tools & Workflows", items: ["AI-assisted research", "Content production", "Workflow systems", "Creative experimentation"] },
];

function Rail({ title, eyebrow, children, id }) {
  return <section id={id} className="series-rail"><div className="series-rail-head"><div><p className="series-eyebrow">{eyebrow}</p><h2>{title}</h2></div><div className="rail-arrows"><button aria-label="Scroll left" onClick={() => document.getElementById(id + "-track")?.scrollBy({left:-620,behavior:"smooth"})}><ArrowLeft size={17}/></button><button aria-label="Scroll right" onClick={() => document.getElementById(id + "-track")?.scrollBy({left:620,behavior:"smooth"})}><ArrowRight size={17}/></button></div></div><div className="series-track" id={id+"-track"}>{children}</div></section>;
}

function Card({ item, index, onClick }) {
  return <motion.button type="button" onClick={() => onClick(item)} className="series-card" whileHover={{ y:-8, scale:1.025 }} transition={{duration:.22}} aria-label={`Open ${item.title || item.role}`}>
    <div className="series-card-image" style={{backgroundImage:`linear-gradient(0deg,rgba(7,7,10,.94),rgba(7,7,10,.05) 75%),url(${item.image})`}}>
      <span className="series-card-number">{String(index+1).padStart(2,"0")}</span>
      <span className="series-card-play"><Play size={17} fill="currentColor"/></span>
      <div className="series-card-copy"><span>{item.genre || item.no}</span><strong>{item.title || item.role}</strong><small>{item.company || item.desc}</small></div>
    </div>
  </motion.button>;
}

export default function Portfolio() {
  const [stage, setStage] = useState("intro");
  const [profile, setProfile] = useState("recruiter");
  const [selected, setSelected] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    document.title = "Kedar Chashtve | The Series";
    const timer = window.setTimeout(() => setStage((s) => s === "intro" ? "profiles" : s), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  const activeProfile = profiles.find(p=>p.id===profile) || profiles[0];
  const heroLine = useMemo(() => ({
    recruiter: "A marketer shaped by ideas, deadlines and the work behind the numbers.",
    brand: "I help turn business goals into stories, campaigns and meaningful brand experiences.",
    creator: "Part marketer. Part storyteller. Always curious about what makes people stop and look."
  }[profile]), [profile]);

  const enter = (id) => { setProfile(id); setStage("home"); window.scrollTo({top:0,behavior:"instant"}); };
  const openItem = (item) => setSelected(item);

  return <div className="netflix-series">
    <div className="film-grain" aria-hidden="true"/>
    <AnimatePresence>
      {stage !== "home" && <motion.div className="series-gate" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.55}}>
        <motion.div className="series-logo" initial={{letterSpacing:".6em",opacity:0}} animate={{letterSpacing:".22em",opacity:1}} transition={{duration:.8}}>KEDAR<span>FLIX</span></motion.div>
        {stage === "intro" ? <div className="gate-bottom"><span>AN ORIGINAL PORTFOLIO SERIES</span><button onClick={()=>setStage("profiles")}>Skip intro <ArrowRight size={15}/></button></div> :
          <motion.div className="profile-picker" initial={{y:22,opacity:0}} animate={{y:0,opacity:1}}>
            <p className="series-eyebrow">A portfolio by Kedar Chashtve</p><h1>Who's watching?</h1>
            <div className="profile-grid">{profiles.map(p=><button key={p.id} onClick={()=>enter(p.id)} className="profile-option"><span className={`profile-avatar bg-gradient-to-br ${p.color}`}>{p.title.charAt(0)}</span><strong>{p.title}</strong><small>{p.subtitle}</small></button>)}</div>
            <button className="manage-profiles" onClick={()=>enter("recruiter")}>Continue as guest <ArrowRight size={14}/></button>
          </motion.div>}
      </motion.div>}
    </AnimatePresence>

    {stage === "home" && <>
      <header className="series-nav">
        <a href="#home" className="series-wordmark">KEDAR<span>FLIX</span></a>
        <nav className={mobileMenu?"nav-open":""}>
          <a href="#home" onClick={()=>setMobileMenu(false)}>Home</a><a href="#continue" onClick={()=>setMobileMenu(false)}>Continue Watching</a><a href="#originals" onClick={()=>setMobileMenu(false)}>Originals</a><a href="#seasons" onClick={()=>setMobileMenu(false)}>Seasons</a><a href="#about" onClick={()=>setMobileMenu(false)}>About</a>
        </nav>
        <div className="nav-right"><button className="profile-switch" onClick={()=>setStage("profiles")}><span className={`mini-avatar bg-gradient-to-br ${activeProfile.color}`}>{activeProfile.title.charAt(0)}</span><ChevronDown size={14}/></button><button className="mobile-menu" onClick={()=>setMobileMenu(v=>!v)} aria-label="Toggle menu">{mobileMenu?<X/>:<Menu/>}</button></div>
      </header>

      <main>
        <section id="home" className="series-hero" style={{backgroundImage:`linear-gradient(90deg,#07070a 0%,rgba(7,7,10,.86) 31%,rgba(7,7,10,.15) 75%),linear-gradient(0deg,#07070a 0%,transparent 44%),url(${IMG.hero})`}}>
          <div className="hero-vignette"/>
          <motion.div className="hero-content" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
            <div className="hero-kicker"><span className="netflix-n">N</span> ORIGINAL SERIES <span className="hero-separator">|</span> MARKETING · CREATIVE · GROWTH</div>
            <div className="hero-title-lockup"><span className="hero-small-title">THE STORY OF</span><h1>KEDAR<br/><em>CHASHTVE</em></h1></div>
            <div className="hero-meta"><span className="match">FEATURED</span><span>2026</span><span className="maturity">U/A 16+</span><span>4 Chapters</span><span className="hd-mark">HD</span></div>
            <p className="hero-description">{heroLine}</p>
            <div className="hero-buttons"><a className="watch-button" href="#continue"><Play size={18} fill="currentColor"/> Explore the series</a><a className="more-button" href="#about"><Info size={19}/> More Info</a></div>
            <div className="hero-subline"><span>NOW STREAMING</span><span>BASED IN NASHIK, INDIA</span></div>
          </motion.div>
          <div className="hero-age">A STORY STILL IN PROGRESS</div>
        </section>

        <div className="series-body">
          <section id="continue" className="continue-section">
            <div className="continue-heading"><div><p className="series-eyebrow">PICK UP WHERE YOU LEFT OFF</p><h2>Continue Watching <span>for {activeProfile.title}</span></h2></div><a href="#seasons">View journey <ArrowRight size={14}/></a></div>
            <div className="continue-card" style={{backgroundImage:`linear-gradient(90deg,#16161d 0%,rgba(22,22,29,.9) 45%,rgba(22,22,29,.2)),url(${IMG.creative})`}}>
              <div className="continue-progress"><span style={{width:"72%"}}/></div>
              <div className="continue-info"><span className="continue-tag">FEATURED CHAPTER · 2025–2026</span><h3>Life Inside a Marketing Agency</h3><p>Multiple brands. Multiple briefs. One creative brain trying to connect the dots.</p><a href="#seasons" className="continue-play"><Play size={15} fill="currentColor"/> Resume journey</a></div>
            </div>
          </section>

          <Rail id="originals" eyebrow="KEDARFLIX ORIGINALS" title="Stories from the work">
            {originals.map((item,i)=><Card key={item.id} item={item} index={i} onClick={openItem}/>)}
          </Rail>

          <section id="seasons" className="seasons-section">
            <div className="season-heading"><div><p className="series-eyebrow">THE CAREER ANTHOLOGY</p><h2>Seasons of the journey</h2><p>Every role added a different perspective. Here's how the story unfolded.</p></div><div className="season-select">SEASON 01 <ChevronDown size={14}/></div></div>
            <div className="season-list">{episodes.map((ep,i)=><motion.button key={ep.no} className={`episode-row ${ep.upcoming?"upcoming":""}`} onClick={()=>openItem({...ep,title:ep.role,genre:ep.company,desc:ep.summary,details:ep.tags,image:ep.image})} whileHover={{backgroundColor:"rgba(255,255,255,.07)"}}>
              <span className="episode-no">{String(i+1).padStart(2,"0")}</span><div className="episode-thumb" style={{backgroundImage:`url(${ep.image})`}}><span><Play size={13} fill="currentColor"/></span></div><div className="episode-main"><div className="episode-titleline"><strong>{ep.role}</strong><span>{ep.year}</span></div><small>{ep.company} {ep.upcoming?"· NEXT EPISODE":""}</small><p>{ep.summary}</p></div><ArrowRight className="episode-arrow" size={19}/>
            </motion.button>)}</div>
          </section>

          <Rail id="top-picks" eyebrow="BECAUSE YOU WATCHED MARKETING" title="Top picks for your next brief">
            {[
              {title:"The Strategy Room",genre:"Positioning · Planning",image:IMG.analytics,desc:"Start with the problem. Build a plan around people, not platforms.",details:["Research","Positioning","Campaign planning"]},
              {title:"The Creative Cut",genre:"Creative direction · Video",image:IMG.camera,desc:"Ideas deserve a visual language—and a strong first three seconds.",details:["Concepts","Scripts","Visual direction"]},
              {title:"The Distribution Play",genre:"Paid · Organic · Social",image:IMG.social,desc:"Good work needs the right context, channel and audience.",details:["Meta Ads","Google Ads","Social distribution"]},
              {title:"The Numbers Episode",genre:"Analytics · Optimisation",image:IMG.campaign,desc:"Look at the signals, understand what happened, make the next move.",details:["Reporting","Performance review","Iteration"]},
            ].map((item,i)=><Card key={item.title} item={item} index={i} onClick={openItem}/>)}
          </Rail>

          <section id="about" className="about-series">
            <div className="about-image" style={{backgroundImage:`linear-gradient(0deg,rgba(7,7,10,.3),rgba(7,7,10,.05)),url(${IMG.camera})`}}><span>THE PERSON BEHIND THE PLAY BUTTON</span></div>
            <div className="about-copy"><p className="series-eyebrow">A LITTLE ABOUT THE LEAD CHARACTER</p><h2>Not just marketing.<br/><em>A way of seeing things.</em></h2><p>I'm Kedar Chashtve—a marketing professional interested in the space where brand thinking, content, campaigns and visual storytelling meet.</p><p>I enjoy understanding what makes people care, turning that into a clear creative direction, and finding ways to make the work connect across channels. Currently building my next chapter in growth marketing.</p><div className="about-tags"><span>Nashik, India</span><span>Marketing</span><span>Brand content</span><span>Creative thinking</span></div></div>
          </section>

          <section id="skills" className="skills-section"><div className="section-title"><p className="series-eyebrow">THE TOOLKIT</p><h2>Genres I work across</h2></div><div className="skill-grid">{skills.map((s,i)=><div className="skill-panel" key={s.title}><span className="skill-index">0{i+1}</span><h3>{s.title}</h3><ul>{s.items.map(it=><li key={it}><Check size={13}/>{it}</li>)}</ul></div>)}</div></section>

          <section className="resume-banner"><div><p className="series-eyebrow">WANT THE FULL CREDITS?</p><h2>The résumé has the details.</h2><p>Experience, responsibilities and the professional timeline—in one place.</p></div><a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className="resume-button"><Download size={17}/> View résumé <ArrowUpRight size={15}/></a></section>

          <section id="contact" className="final-cta"><p className="series-eyebrow">THE NEXT EPISODE COULD BE OURS</p><h2>Got a good story?<br/><em>Let's make it happen.</em></h2><p>For brand shoots, creative collaborations, marketing roles and interesting conversations.</p><div className="cta-actions"><a href={`mailto:${PROFILE.email}`}><Mail size={16}/> {PROFILE.email}</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={14}/></a></div></section>
        </div>
      </main>
      <footer className="series-footer"><a href="#home" className="series-wordmark">KEDAR<span>FLIX</span></a><span>© {new Date().getFullYear()} Kedar Chashtve. An original, ongoing story.</span><a href="#home">Back to top ↑</a></footer>
    </>}

    <AnimatePresence>{selected && <motion.div className="detail-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}>
      <motion.div className="detail-modal" initial={{y:40,scale:.97,opacity:0}} animate={{y:0,scale:1,opacity:1}} exit={{y:30,opacity:0}} onClick={e=>e.stopPropagation()}>
        <div className="detail-cover" style={{backgroundImage:`linear-gradient(0deg,#16161d,transparent 85%),url(${selected.image})`}}><button className="detail-close" onClick={()=>setSelected(null)}><X size={20}/></button><span className="detail-label">KEDARFLIX ORIGINAL</span><h2>{selected.title || selected.role}</h2></div>
        <div className="detail-content"><div className="detail-actions"><span className="match">FEATURED</span><span>{selected.genre || selected.company}</span></div><p>{selected.desc || selected.summary || selected.tagline}</p><h4>Inside this story</h4><ul>{(selected.details || selected.tags || []).map(d=><li key={d}><Check size={14}/>{d}</li>)}</ul><p className="detail-note">A capability snapshot of my approach and interests. Client-confidential work and unapproved campaign data are intentionally not displayed.</p></div>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </div>;
}
