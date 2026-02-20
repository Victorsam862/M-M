/**
 * M&M Styles — App.jsx
 * Luxury Event Planning & Decoration — Abuja, Nigeria
 *
 * EmailJS keys:
 *   Service ID:  service_oai19oi
 *   Template ID: template_5yoz7uv
 *   Public Key:  H_xGDByxw8GyI06yX
 *   To Email:    samsonvictor863@gmail.com
 */

import { useState, useEffect, useRef } from "react";

/* ── EmailJS config ── */
const EJS_SERVICE  = "service_oai19oi";
const EJS_TEMPLATE = "template_5yoz7uv";
const EJS_PUBKEY   = "H_xGDByxw8GyI06yX";

/* ── Load & initialise EmailJS SDK once ── */
function useEmailJS() {
  useEffect(() => {
    if (window.emailjs) {
      window.emailjs.init({ publicKey: EJS_PUBKEY });
      return;
    }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => window.emailjs.init({ publicKey: EJS_PUBKEY });
    document.head.appendChild(s);
  }, []);
}

/* ── SEO head ── */
export function SEOHead() {
  useEffect(() => {
    document.title = "M&M Styles \u2013 Luxury Event Planning & Decoration in Abuja, Nigeria";
    const m = (n, c, p = false) => {
      const a = p ? "property" : "name";
      let el = document.querySelector(`meta[${a}="${n}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(a, n); document.head.appendChild(el); }
      el.setAttribute("content", c);
    };
    m("description", "M&M Styles offers bespoke event planning, luxury wedding decoration, birthday party styling, and corporate event management in Abuja, Nigeria.");
    m("robots", "index, follow");
    m("og:title", "M&M Styles \u2013 Luxury Event Planning in Abuja", true);
    m("og:type",  "website", true);
  }, []);
  return null;
}

/* ── IntersectionObserver hook ── */
function useInView(threshold = 0.12) {
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ════════════════════════════
   DATA
════════════════════════════ */
const SERVICES = [
  { icon:"🎊", title:"Event Planning & Coordination",  featured:false,
    desc:"Full-scale planning and management from initial concept through flawless execution.",
    features:["Vendor sourcing & management","Day-of coordination","Budget planning & tracking","Full event run-of-show"] },
  { icon:"💐", title:"Decoration & Styling",            featured:true,
    desc:"Custom décor for weddings, birthdays, bridal showers, engagements, and kids' events.",
    features:["Floral arrangements & centrepieces","Table linen & chair styling","Arch & backdrop design","Ambient lighting & candles"] },
  { icon:"🎭", title:"Themed Setups",                   featured:false,
    desc:"Creative theme design tailored to each unique celebration.",
    features:["Concept development","Custom props & installations","Colour palette curation","Printed stationery & signage"] },
  { icon:"🏛️", title:"Corporate Event Styling",         featured:false,
    desc:"Elegant, branded décor for product launches, conferences, and award ceremonies.",
    features:["Brand-aligned décor","Stage & backdrop design","Corporate gifting & packaging","Networking space styling"] },
  { icon:"🗂️", title:"Consultation & Event Strategy",   featured:false,
    desc:"Personalised one-on-one planning sessions to map out every detail of your event.",
    features:["Vision board creation","Vendor recommendations","Event timeline drafting","Budget optimisation advice"] },
  { icon:"🎈", title:"Kids' Party Styling",              featured:false,
    desc:"Whimsical, colourful, and utterly magical celebrations for your little ones.",
    features:["Character themed setups","Balloon columns & arches","Candy & dessert tables","Activity zone decoration"] },
];

const TEAM = [
  { initials:"EA", role:"Lead Creative Director", name:"Eniola Adegoroye",
    bio:"With over 8 years of experience in luxury event styling and decoration, Eniola is the creative force behind M&M Styles. Her eye for detail and passion for storytelling through design have graced hundreds of Abuja's most memorable celebrations.",
    exp:"8+ Years Experience", color:"linear-gradient(135deg,#c9a84c,#9d7a30)", photo:"./pictures/miss mm.jpg",  alt:"Eniola Adegoroye – Lead Creative Director" },
  { initials:"OO", role:"Event Coordinator",       name:"Oluwatobi Ola",
    bio:"Oluwatobi is the organisational heartbeat of M&M Styles. With 5+ years coordinating seamless events across Abuja and beyond, she ensures every timeline is met and every client feels completely at ease.",
    exp:"5+ Years Experience", color:"linear-gradient(135deg,#c9897b,#a06558)", photo:"./pictures/mr mm.avif",   alt:"Oluwatobi Ola – Event Coordinator" },
  { initials:"TA", role:"Business Patron",          name:"Temi Adegoroye",
    bio:"With a decade of business expertise, Temi provides strategic direction and industry wisdom that elevates M&M Styles into a brand that delivers truly transformative experiences.",
    exp:"10+ Years Expertise", color:"linear-gradient(135deg,#2d6a4f,#1b4332)", photo:"./pictures/mc mm.avif",   alt:"Temi Adegoroye – Business Patron" },
];

const PORTFOLIO = [
  { id:1, cat:"wedding",   large:false, title:"Golden Opulence Wedding",    desc:"An 800-guest ceremony adorned in gold leaf, ivory draping, and cascading florals.", bg:"linear-gradient(135deg,#1a1a1a,#2d2d2d,#c9a84c)" },
  { id:2, cat:"birthday",  large:false, title:"Glamour Gala 50th",          desc:"A Hollywood-themed 50th birthday with red carpet entrance and sequined centrepieces.", bg:"linear-gradient(135deg,#4a1a1a,#8b3a3a,#c9897b)" },
  { id:3, cat:"wedding",   large:true,  title:"Garden Rose Bridal Shower",  desc:"A romantic pastel garden soirée with fresh floral arches and personalised favours.", bg:"linear-gradient(135deg,#1a2d1a,#2d6a4f,#40916c)" },
  { id:4, cat:"corporate", large:false, title:"Corporate Product Launch",   desc:"Sleek, branded décor — structured staging, lush greenery walls, illuminated displays.", bg:"linear-gradient(135deg,#1a1a2d,#2d2d5a,#4a4a8a)" },
  { id:5, cat:"kids",      large:false, title:"Unicorn Wonderland",         desc:"A magical unicorn-themed birthday with rainbow balloon columns and a candy table.", bg:"linear-gradient(135deg,#2d1a2d,#8b3a8b,#c97bc9)" },
  { id:6, cat:"birthday",  large:false, title:"Emerald Elegance 40th",      desc:"A sophisticated emerald and gold themed celebration blending botanical art deco styling.", bg:"linear-gradient(135deg,#1a2d1a,#9d7a30,#c9a84c)" },
];

const TESTIMONIALS = [
  { big:true,  initials:"AF", author:"Amaka & Femi O.", event:"Wedding, Abuja 2024",      text:"M&M Styles completely exceeded our expectations. Our wedding was absolutely breathtaking — every single detail was perfect. Guests are still talking about the floral installations and golden arch backdrop months later." },
  { big:false, initials:"CH", author:"Chidinma H.",     event:"Birthday Party, 2024",     text:"I trusted M&M Styles with my mum's 60th and they delivered pure magic. The room was transformed beyond what I imagined. Tobi kept me calm all day — I didn't have to worry about a thing!" },
  { big:false, initials:"TK", author:"Tunde K., CEO",   event:"Corporate Launch, 2023",   text:"Our company's product launch was styled impeccably. The décor was on-brand, sophisticated, and made a lasting impression on all our stakeholders. We'll be using M&M Styles for all future events!" },
  { big:false, initials:"NJ", author:"Ngozi J.",        event:"Kids' Party, 2024",        text:"My daughter's unicorn party was literally out of a fairytale! Every child was in awe. M&M Styles understood exactly what I wanted and delivered it with such care and creativity." },
];

const PACKAGES = [
  { tier:"Starter", name:"Essentials",     featured:false,
    desc:"Perfect for intimate celebrations seeking beautiful styling on a focused budget.",
    features:["Décor & styling setup","Up to 50 guests","1 consultation session","Centrepieces & table linen","Backdrop / arch design"] },
  { tier:"Premium", name:"Signature",      featured:true,
    desc:"Our most popular package for weddings, milestone birthdays, and premium celebrations.",
    features:["Full event planning & coordination","Up to 200 guests","3 consultation sessions","Custom themed décor","Floral installations","Vendor management","Day-of coordination"] },
  { tier:"Elite",   name:"Luxury Bespoke", featured:false,
    desc:"An entirely bespoke experience with no limits — for clients who demand the absolute pinnacle of luxury.",
    features:["Unlimited planning sessions","200+ guests welcome","Custom concept & mood board","Premium floral & draping","Full vendor sourcing team","On-site creative director","Post-event breakdown"] },
];

/* ════════════════════════════
   SHARED UI PIECES
════════════════════════════ */
const btnBase = { display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", borderRadius:2, fontSize:"0.85rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", textDecoration:"none", transition:"all .35s ease", fontFamily:"'Jost',sans-serif", cursor:"pointer" };
const GoldBtn        = ({href,children}) => <a href={href} style={{...btnBase, background:"linear-gradient(135deg,#c9a84c,#9d7a30)", color:"#0a0a0a", boxShadow:"0 4px 20px rgba(201,168,76,.4)"}}>{children}</a>;
const OutlineBtn     = ({href,children}) => <a href={href} style={{...btnBase, background:"transparent", border:"1px solid rgba(255,255,255,.5)", color:"#fff"}}>{children}</a>;
const OutlineGoldBtn = ({href,children}) => <a href={href} style={{...btnBase, background:"transparent", border:"1px solid #c9a84c", color:"#c9a84c"}}>{children}</a>;

function SectionHeader({ tag, title, sub, light }) {
  return (
    <div style={{ textAlign:"center", maxWidth:680, margin:"0 auto 60px" }}>
      <span style={{ display:"inline-block", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color: light?"#e4c97b":"#c9a84c", padding:"6px 14px", border:`1px solid ${light?"rgba(255,255,255,.3)":"rgba(201,168,76,.5)"}`, borderRadius:50, background: light?"rgba(255,255,255,.08)":"rgba(201,168,76,.06)", fontFamily:"'Jost',sans-serif" }}>{tag}</span>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:400, lineHeight:1.2, margin:"12px 0 16px", color: light?"#faf8f3":"#1a1a1a" }}>{title}</h2>
      <p  style={{ color: light?"rgba(250,248,243,.6)":"#4a4a4a", fontSize:"1.05rem", fontWeight:300, fontFamily:"'Jost',sans-serif" }}>{sub}</p>
    </div>
  );
}
function Tag({ children }) {
  return <span style={{ display:"inline-block", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"#c9a84c", padding:"6px 14px", border:"1px solid rgba(201,168,76,.5)", borderRadius:50, background:"rgba(201,168,76,.06)", fontFamily:"'Jost',sans-serif", marginBottom:4 }}>{children}</span>;
}

/* ════════════════════════════
   FORM SUB-COMPONENTS
════════════════════════════ */
const iStyle = { padding:"13px 16px", border:"1px solid rgba(0,0,0,.12)", borderRadius:2, fontSize:"0.9rem", color:"#1a1a1a", background:"#faf8f3", width:"100%", fontFamily:"'Jost',sans-serif", outline:"none", transition:"all .3s ease" };
const lStyle = { fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#1a1a1a", display:"block", marginBottom:6, fontFamily:"'Jost',sans-serif" };

function FField({ label, ...p }) {
  return <div style={{ marginBottom:16 }}><label htmlFor={p.id} style={lStyle}>{label}</label><input {...p} style={iStyle} /></div>;
}
function FTextarea({ label, ...p }) {
  return <div style={{ marginBottom:16 }}><label htmlFor={p.id} style={lStyle}>{label}</label><textarea {...p} rows={4} style={{ ...iStyle, resize:"vertical", minHeight:120 }} /></div>;
}
function FSelect({ label, options, ...p }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label htmlFor={p.id} style={lStyle}>{label}</label>
      <select {...p} style={{ ...iStyle, WebkitAppearance:"none" }}>
        <option value="" disabled>Select an option</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
function FRow({ children }) { return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>{children}</div>; }

/* ════════════════════════════
   SECTIONS
════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["home","about","services","portfolio","testimonials","contact"];
  return (
    <nav aria-label="Main Navigation" style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, padding: scrolled?"14px 0":"24px 0", background: scrolled?"rgba(10,10,10,.97)":"transparent", backdropFilter: scrolled?"blur(20px)":"none", borderBottom: scrolled?"1px solid rgba(201,168,76,.2)":"none", transition:"all .35s ease" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <a href="#home" style={{ display:"flex", flexDirection:"column", lineHeight:1, gap:1, textDecoration:"none" }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:600, color:"#c9a84c", letterSpacing:"0.05em" }}>M&amp;M</span>
          <span style={{ fontSize:"0.55rem", fontWeight:600, letterSpacing:"0.35em", textTransform:"uppercase", color:"#faf8f3" }}>STYLES</span>
        </a>
        <ul style={{ display:"flex", alignItems:"center", gap:36, listStyle:"none", margin:0, padding:0 }}>
          {links.map(l => (
            <li key={l}><a href={`#${l}`} style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.8rem", fontWeight: l==="contact"?600:500, letterSpacing:"0.1em", textTransform:"uppercase", color: l==="contact"?"#0a0a0a":"rgba(255,255,255,.8)", textDecoration:"none", padding: l==="contact"?"10px 22px":undefined, background: l==="contact"?"linear-gradient(135deg,#c9a84c,#9d7a30)":"none", borderRadius: l==="contact"?"2px":undefined }}>
              {l==="home"?"Home":l.charAt(0).toUpperCase()+l.slice(1)}
            </a></li>
          ))}
        </ul>
      </div>
      {open && (
        <div style={{ position:"fixed", top:0, right:0, width:"min(320px,90vw)", height:"100vh", background:"rgba(10,10,10,.98)", backdropFilter:"blur(20px)", display:"flex", flexDirection:"column", padding:"100px 2rem 2rem", gap:24, borderLeft:"1px solid rgba(201,168,76,.2)", zIndex:999 }}>
          {links.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} style={{ color:"#c9a84c", fontSize:"1rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", textDecoration:"none" }}>{l==="home"?"Home":l.charAt(0).toUpperCase()+l.slice(1)}</a>)}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding:"120px 0 80px", background:"#0a0a0a" }} aria-label="Hero">
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 70% 40%,rgba(201,168,76,.12) 0%,transparent 60%),radial-gradient(ellipse 50% 50% at 20% 80%,rgba(45,106,79,.1) 0%,transparent 50%)" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(201,168,76,.15) 1px,transparent 1px)", backgroundSize:"40px 40px", maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)", WebkitMaskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)" }} />
      <div style={{ position:"relative", zIndex:1, maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.8rem", fontWeight:500, letterSpacing:"0.25em", textTransform:"uppercase", color:"#c9a84c", marginBottom:20, animation:"fadeInUp .8s ease .2s both" }}>Abuja's Premier Event Stylists</p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(3rem,7vw,6rem)", fontWeight:300, lineHeight:1.0, color:"#faf8f3", marginBottom:24, animation:"fadeInUp .8s ease .4s both" }}>
          Crafting<br/><em style={{ fontStyle:"italic", color:"#c9a84c", fontWeight:400 }}>Unforgettable</em><br/>Events &amp; Luxury<br/>Experiences
        </h1>
        <p style={{ fontSize:"clamp(1rem,2vw,1.15rem)", color:"rgba(250,248,243,.65)", fontWeight:300, maxWidth:550, marginBottom:40, animation:"fadeInUp .8s ease .6s both", fontFamily:"'Jost',sans-serif" }}>Bespoke Event Styling, Decoration &amp; Celebration Management in Abuja, Nigeria</p>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:60, animation:"fadeInUp .8s ease .8s both" }}>
          <GoldBtn href="#services">Explore Our Services</GoldBtn>
          <OutlineBtn href="#contact">Book a Consultation</OutlineBtn>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:32, animation:"fadeInUp .8s ease 1s both" }}>
          {[["500+","Events Styled"],["8+","Years Experience"],["100%","Client Satisfaction"]].map(([n,l],i) => (
            <span key={l} style={{ display:"contents" }}>
              {i>0 && <div style={{ width:1, height:40, background:"rgba(201,168,76,.3)" }} />}
              <div style={{ display:"flex", flexDirection:"column" }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:400, color:"#c9a84c", lineHeight:1 }}>{n}</span>
                <span style={{ fontSize:"0.72rem", color:"rgba(255,255,255,.5)", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:4, fontFamily:"'Jost',sans-serif" }}>{l}</span>
              </div>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ background:"#111111", padding:"100px 0" }} aria-label="Services">
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
        <SectionHeader tag="What We Offer" title="Tailored Services for Every Celebration" sub="From intimate gatherings to grand spectacles, our full-service offerings ensure a seamless, stunning experience." light />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
          {SERVICES.map((s,i) => (
            <Reveal key={s.title} delay={i*.08}>
              <article style={{ background: s.featured?"rgba(201,168,76,.05)":"rgba(255,255,255,.03)", border:`1px solid ${s.featured?"rgba(201,168,76,.4)":"rgba(201,168,76,.12)"}`, borderRadius:6, padding:"36px 28px", height:"100%", position:"relative" }}>
                {s.featured && <span style={{ display:"inline-block", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#0a0a0a", background:"#c9a84c", padding:"4px 12px", borderRadius:50, marginBottom:12, fontFamily:"'Jost',sans-serif" }}>Most Popular</span>}
                <div style={{ fontSize:"2.5rem", marginBottom:16 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:400, color:"#faf8f3", marginBottom:12 }}>{s.title}</h3>
                <p style={{ fontSize:"0.9rem", color:"rgba(250,248,243,.6)", lineHeight:1.7, marginBottom:20, fontWeight:300, fontFamily:"'Jost',sans-serif" }}>{s.desc}</p>
                <ul style={{ listStyle:"none", margin:"0 0 24px", padding:0 }}>
                  {s.features.map(f => <li key={f} style={{ fontSize:"0.82rem", color:"rgba(250,248,243,.7)", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,.05)", display:"flex", alignItems:"center", gap:8, fontFamily:"'Jost',sans-serif", fontWeight:300 }}><span style={{ color:"#c9a84c", fontSize:"0.6rem" }}>✦</span>{f}</li>)}
                </ul>
                <a href="#contact" style={{ fontSize:"0.8rem", fontWeight:600, letterSpacing:"0.08em", color:"#c9a84c", textTransform:"uppercase", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6, fontFamily:"'Jost',sans-serif" }}>Enquire Now →</a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ background:"#f2ede3", padding:"100px 0", position:"relative", overflow:"hidden" }} aria-label="About">
      <div style={{ position:"absolute", right:-100, top:"50%", transform:"translateY(-50%)", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
        <SectionHeader tag="Our Story" title="Creative Visionaries Behind Every Detail" sub="M&M Styles is led by passionate professionals who live and breathe event design. Our team brings together creativity, strategy, and meticulous attention to detail." />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:32, marginBottom:60 }}>
          {TEAM.map((m,i) => (
            <Reveal key={m.name} delay={i*.1}>
              <article style={{ background:"#fff", border:"1px solid rgba(201,168,76,.2)", borderRadius:6, overflow:"hidden" }}>
                <div style={{ width:"100%", height:320, background:m.color, position:"relative", overflow:"hidden" }}>
                  <img src={m.photo} alt={m.alt} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }} onError={e => { e.target.style.display="none"; }} />
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:"4rem", fontWeight:300, color:"rgba(255,255,255,.9)", pointerEvents:"none" }}>{m.initials}</div>
                </div>
                <div style={{ padding:28 }}>
                  <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#c9a84c", marginBottom:6, fontFamily:"'Jost',sans-serif" }}>{m.role}</p>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontWeight:400, color:"#1a1a1a", marginBottom:12 }}>{m.name}</h3>
                  <p style={{ fontSize:"0.88rem", color:"#4a4a4a", lineHeight:1.75, fontWeight:300, marginBottom:16, fontFamily:"'Jost',sans-serif" }}>{m.bio}</p>
                  <span style={{ display:"inline-block", fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", background:"rgba(201,168,76,.1)", color:"#9d7a30", padding:"5px 14px", borderRadius:50, border:"1px solid rgba(201,168,76,.5)", fontFamily:"'Jost',sans-serif" }}>{m.exp}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ textAlign:"center", padding:"48px", background:"#0a0a0a", borderRadius:6, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-20, left:40, fontFamily:"'Cormorant Garamond',serif", fontSize:"12rem", color:"rgba(201,168,76,.08)", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>"</div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.2rem,2.5vw,1.8rem)", fontStyle:"italic", fontWeight:300, color:"#faf8f3", lineHeight:1.6, maxWidth:800, margin:"0 auto 16px", position:"relative", zIndex:1 }}>
              "We don't just decorate spaces — we create worlds where your most precious memories are made."
            </p>
            <p style={{ fontSize:"0.75rem", color:"#c9a84c", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:500, position:"relative", zIndex:1, fontFamily:"'Jost',sans-serif" }}>— M&M Styles Creative Philosophy</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("all");
  const cats = ["all","wedding","birthday","corporate","kids"];
  const items = filter==="all" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat===filter);
  return (
    <section id="portfolio" style={{ background:"#faf8f3", padding:"100px 0" }} aria-label="Portfolio">
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
        <SectionHeader tag="Our Work" title="A Gallery of Beautiful Celebrations" sub="Each event is a unique story. Here are some of the unforgettable experiences we've had the honour of creating." />
        <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap", marginBottom:48 }}>
          {cats.map(c => <button key={c} onClick={() => setFilter(c)} style={{ padding:"10px 22px", fontSize:"0.78rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", border:`1px solid ${filter===c?"#c9a84c":"rgba(0,0,0,.12)"}`, borderRadius:50, background: filter===c?"#c9a84c":"transparent", color: filter===c?"#0a0a0a":"#4a4a4a", cursor:"pointer", fontFamily:"'Jost',sans-serif" }}>{c.charAt(0).toUpperCase()+c.slice(1)}</button>)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {items.map((p,i) => (
            <Reveal key={p.id} delay={i*.06} style={{ gridColumn: p.large?"span 2":undefined }}>
              <div style={{ borderRadius:6, overflow:"hidden", border:"1px solid rgba(201,168,76,.2)" }}>
                <div style={{ background:p.bg, height: p.large?280:240, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:"4rem", opacity:.3, color:"#fff" }}>✦</span>
                </div>
                <div style={{ padding:24, background:"#fff" }}>
                  <span style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#c9a84c", display:"block", marginBottom:6, fontFamily:"'Jost',sans-serif" }}>{p.cat.charAt(0).toUpperCase()+p.cat.slice(1)}</span>
                  <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontWeight:400, color:"#1a1a1a", marginBottom:8 }}>{p.title}</h4>
                  <p style={{ fontSize:"0.83rem", color:"#4a4a4a", lineHeight:1.65, fontWeight:300, fontFamily:"'Jost',sans-serif" }}>{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" style={{ background:"#f2ede3", padding:"100px 0" }} aria-label="Testimonials">
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
        <SectionHeader tag="Client Love" title="What Our Clients Say" sub="We measure our success by the joy on our clients' faces." />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:24 }}>
          {TESTIMONIALS.map((t,i) => (
            <Reveal key={i} delay={i*.08} style={{ gridColumn: t.big?"span 2":undefined }}>
              <blockquote style={{ background: t.big?"#0a0a0a":"#fff", border:"1px solid rgba(201,168,76,.2)", borderRadius:6, padding:36 }}>
                <div style={{ fontSize:"1rem", color:"#c9a84c", letterSpacing:2, marginBottom:16 }}>★★★★★</div>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: t.big?"1.2rem":"1.05rem", fontStyle:"italic", fontWeight:300, color: t.big?"#faf8f3":"#1a1a1a", lineHeight:1.7, marginBottom:24 }}>"{t.text}"</p>
                <footer style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#c9a84c,#9d7a30)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.8rem", fontWeight:700, color:"#0a0a0a", flexShrink:0, fontFamily:"'Jost',sans-serif" }}>{t.initials}</div>
                  <div>
                    <strong style={{ display:"block", color: t.big?"#faf8f3":"#1a1a1a", marginBottom:2, fontFamily:"'Jost',sans-serif" }}>{t.author}</strong>
                    <span style={{ fontSize:"0.78rem", color: t.big?"rgba(255,255,255,.6)":"#4a4a4a", fontFamily:"'Jost',sans-serif" }}>{t.event}</span>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="booking" style={{ background:"#1e1e1e", padding:"100px 0" }} aria-label="Packages">
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
        <SectionHeader tag="Packages" title="Choose Your Celebration Package" sub="We offer curated packages to suit every vision and budget. All packages can be fully customised." light />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24, alignItems:"start" }}>
          {PACKAGES.map((pkg,i) => (
            <Reveal key={pkg.name} delay={i*.1}>
              <div style={{ background: pkg.featured?"rgba(201,168,76,.08)":"rgba(255,255,255,.04)", border:`1px solid ${pkg.featured?"#c9a84c":"rgba(201,168,76,.15)"}`, borderRadius:6, padding:"40px 32px", position:"relative", boxShadow: pkg.featured?"0 20px 60px rgba(201,168,76,.15)":"none" }}>
                {pkg.featured && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:"#c9a84c", color:"#0a0a0a", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", padding:"5px 18px", borderRadius:50, whiteSpace:"nowrap", fontFamily:"'Jost',sans-serif" }}>Best Value</div>}
                <p style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#c9a84c", marginBottom:8, fontFamily:"'Jost',sans-serif" }}>{pkg.tier}</p>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:400, color:"#faf8f3", marginBottom:14 }}>{pkg.name}</h3>
                <p style={{ fontSize:"0.88rem", color:"rgba(250,248,243,.6)", lineHeight:1.7, marginBottom:28, fontWeight:300, fontFamily:"'Jost',sans-serif" }}>{pkg.desc}</p>
                <ul style={{ listStyle:"none", margin:"0 0 32px", padding:0 }}>
                  {pkg.features.map(f => <li key={f} style={{ fontSize:"0.85rem", color:"rgba(250,248,243,.75)", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,.05)", fontWeight:300, fontFamily:"'Jost',sans-serif" }}>{f}</li>)}
                </ul>
                {pkg.featured ? <GoldBtn href="#contact">Request a Quote</GoldBtn> : <OutlineGoldBtn href="#contact">Request a Quote</OutlineGoldBtn>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   CONTACT — EmailJS → samsonvictor863@gmail.com
════════════════════════════════════════════════ */
function Contact() {
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState("");

  useEmailJS(); /* load & init SDK */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const f         = e.target;
    const fromName  = f.from_name.value.trim();
    const fromEmail = f.from_email.value.trim();
    const phone     = f.phone.value.trim();
    const eventType = f.event_type.value;

    if (!fromName || !fromEmail || !phone || !eventType) {
      f.reportValidity();
      return;
    }

    setSending(true);

    const params = {
      from_name:  fromName,
      from_email: fromEmail,
      phone:      phone,
      event_type: eventType,
      event_date: f.event_date.value       || "Not specified",
      venue:      f.venue.value.trim()     || "Not specified",
      services:   f.services.value         || "Not specified",
      message:    f.message.value.trim()   || "No additional details provided.",
      to_email:   "samsonvictor863@gmail.com",
    };

    try {
      await window.emailjs.send(EJS_SERVICE, EJS_TEMPLATE, params);
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please reach us on WhatsApp or at info@mmstyles.events.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ background:"#faf8f3", padding:"100px 0" }} aria-label="Contact">
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:80, alignItems:"start" }}>

          {/* Info column */}
          <div>
            <Tag>Get in Touch</Tag>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:400, color:"#1a1a1a", margin:"16px 0", lineHeight:1.2 }}>Let's Create Something Beautiful</h2>
            <p style={{ color:"#4a4a4a", fontWeight:300, lineHeight:1.75, marginBottom:36, fontFamily:"'Jost',sans-serif" }}>Ready to start planning your dream event? Reach out to us and let's turn your vision into reality.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:32 }}>
              {[
                { icon:"📞", label:"Call Us",     val:"+234 809 463 8790",   href:"tel:+2348094638790" },
                { icon:"✉️", label:"Email Us",    val:"info@mmstyles.events", href:"mailto:info@mmstyles.events" },
                { icon:"💬", label:"WhatsApp Us", val:"+234 809 463 8790",   href:"https://wa.me/2348094638790" },
                { icon:"📍", label:"Based In",    val:"Abuja, Nigeria",       href:null },
              ].map(item => (
                <a key={item.label} href={item.href||undefined} style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 20px", background:"#fff", border:"1px solid rgba(201,168,76,.2)", borderRadius:6, textDecoration:"none" }}>
                  <span style={{ fontSize:"1.5rem" }}>{item.icon}</span>
                  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                    <strong style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#1a1a1a", fontFamily:"'Jost',sans-serif" }}>{item.label}</strong>
                    <span style={{ fontSize:"0.9rem", color:"#4a4a4a", fontFamily:"'Jost',sans-serif" }}>{item.val}</span>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              {[{ href:"https://www.facebook.com/mmstyles.events/", label:"Facebook" }, { href:"https://www.instagram.com/mmstyles_corporateeventsng/", label:"Instagram" }].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ padding:"12px 20px", fontSize:"0.78rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", border:"1px solid rgba(201,168,76,.5)", borderRadius:2, color:"#9d7a30", background:"rgba(201,168,76,.05)", textDecoration:"none", fontFamily:"'Jost',sans-serif" }}>{s.label}</a>
              ))}
            </div>
          </div>

          {/* Form column */}
          <div style={{ background:"#fff", border:"1px solid rgba(201,168,76,.2)", borderRadius:6, padding:"48px 40px", boxShadow:"0 8px 40px rgba(0,0,0,.08)" }}>
            {sent ? (
              <div style={{ textAlign:"center", padding:"60px 20px" }}>
                <div style={{ fontSize:"3rem", color:"#c9a84c", marginBottom:20 }}>✦</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:400, color:"#1a1a1a", marginBottom:12 }}>Thank You!</h3>
                <p style={{ color:"#4a4a4a", fontWeight:300, fontFamily:"'Jost',sans-serif" }}>Your enquiry has been received. Our team will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:400, color:"#1a1a1a", marginBottom:28, paddingBottom:20, borderBottom:"1px solid rgba(201,168,76,.2)" }}>Request a Consultation</h3>

                <FRow>
                  <FField label="Full Name *"    type="text"  name="from_name"  id="from_name"  placeholder="Your full name"  required autoComplete="name" />
                  <FField label="Phone Number *" type="tel"   name="phone"       id="phone"       placeholder="+234..."         required autoComplete="tel"  />
                </FRow>
                <FField label="Email Address *"  type="email" name="from_email" id="from_email" placeholder="you@example.com"  required autoComplete="email" />
                <FRow>
                  <FSelect label="Event Type *" name="event_type" id="event_type" required
                    options={["Wedding","Birthday Party","Bridal Shower","Kids' Party","Corporate Event","Engagement Party","Other"]} />
                  <FField label="Event Date" type="date" name="event_date" id="event_date" />
                </FRow>
                <FField   label="Venue / Location"      type="text" name="venue"    id="venue"    placeholder="Venue name or area in Abuja" />
                <FSelect  label="Services Interested In" name="services" id="services"
                  options={["Event Planning & Coordination","Decoration & Styling Only","Themed Setup","Corporate Event Styling","Consultation Session","Full Luxury Package"]} />
                <FTextarea label="Event Details & Vision" name="message" id="message"
                  placeholder="Tell us about your dream event — theme, colours, guest count, any special requirements..." />

                {error && <p style={{ color:"#e07070", fontSize:"0.82rem", marginBottom:12, padding:"10px 14px", background:"rgba(224,112,112,.08)", border:"1px solid rgba(224,112,112,.3)", borderRadius:4, fontFamily:"'Jost',sans-serif" }}>{error}</p>}

                <button type="submit" disabled={sending} style={{ width:"100%", padding:"16px", fontFamily:"'Jost',sans-serif", fontSize:"0.85rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", background: sending?"rgba(201,168,76,.6)":"linear-gradient(135deg,#c9a84c,#9d7a30)", color:"#0a0a0a", border:"none", borderRadius:2, cursor: sending?"not-allowed":"pointer", transition:"all .3s ease", boxShadow:"0 4px 20px rgba(201,168,76,.4)" }}>
                  {sending ? "Sending…" : "Send Enquiry ✦"}
                </button>
                <p style={{ textAlign:"center", fontSize:"0.75rem", color:"#8a8a8a", marginTop:14, fontFamily:"'Jost',sans-serif" }}>We typically respond within 24 hours. Your information is kept strictly confidential.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#0a0a0a", padding:"80px 0 30px", borderTop:"1px solid rgba(201,168,76,.2)" }} role="contentinfo">
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.5fr", gap:48, marginBottom:60 }}>
          <div>
            <div style={{ display:"flex", flexDirection:"column", lineHeight:1, gap:2, marginBottom:16 }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:600, color:"#c9a84c" }}>M&amp;M</span>
              <span style={{ fontSize:"0.55rem", fontWeight:600, letterSpacing:"0.35em", textTransform:"uppercase", color:"#faf8f3" }}>STYLES</span>
            </div>
            <p style={{ fontSize:"0.88rem", color:"rgba(255,255,255,.5)", lineHeight:1.75, fontWeight:300, maxWidth:260, marginBottom:20, fontFamily:"'Jost',sans-serif" }}>Crafting unforgettable events &amp; luxury experiences in Abuja, Nigeria.</p>
            <div style={{ display:"flex", gap:10 }}>
              {[{ href:"https://www.facebook.com/mmstyles.events/", label:"FB" }, { href:"https://www.instagram.com/mmstyles_corporateeventsng/", label:"IG" }].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ width:36, height:36, borderRadius:"50%", border:"1px solid rgba(201,168,76,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.7rem", fontWeight:700, color:"#c9a84c", textDecoration:"none" }}>{s.label}</a>
              ))}
            </div>
          </div>
          {[
            { title:"Quick Links", links:[["Home","#home"],["About Us","#about"],["Services","#services"],["Portfolio","#portfolio"],["Contact","#contact"]] },
            { title:"Services",    links:[["Wedding Planning","#services"],["Event Decoration","#services"],["Themed Setups","#services"],["Corporate Events","#services"],["Kids' Parties","#services"]] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#faf8f3", marginBottom:20, fontFamily:"'Jost',sans-serif" }}>{col.title}</h4>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {col.links.map(([l,h]) => <li key={l} style={{ marginBottom:10 }}><a href={h} style={{ fontSize:"0.85rem", color:"rgba(255,255,255,.5)", fontWeight:300, textDecoration:"none", fontFamily:"'Jost',sans-serif" }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 style={{ fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#faf8f3", marginBottom:20, fontFamily:"'Jost',sans-serif" }}>Contact</h4>
            {[{ href:"tel:+2348094638790", l:"+234 809 463 8790" }, { href:"mailto:info@mmstyles.events", l:"info@mmstyles.events" }].map(c => (
              <p key={c.l} style={{ fontSize:"0.85rem", color:"rgba(255,255,255,.5)", marginBottom:8, fontWeight:300 }}>
                <a href={c.href} style={{ color:"rgba(255,255,255,.5)", textDecoration:"none", fontFamily:"'Jost',sans-serif" }}>{c.l}</a>
              </p>
            ))}
            <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,.5)", marginBottom:8, fontWeight:300, fontFamily:"'Jost',sans-serif" }}>Abuja, Nigeria</p>
            <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,.3)", fontWeight:300, fontFamily:"'Jost',sans-serif" }}>Mon – Sat: 9am – 6pm</p>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", paddingTop:28, textAlign:"center" }}>
          <p style={{ fontSize:"0.78rem", color:"rgba(255,255,255,.3)", lineHeight:1.6, fontWeight:300, fontFamily:"'Jost',sans-serif" }}>&copy; 2025 M&amp;M Styles. All rights reserved. | Luxury Event Planning Abuja Nigeria</p>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════
   GLOBAL CSS + MAIN APP
════════════════════════════ */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:#faf8f3;overflow-x:hidden;-webkit-font-smoothing:antialiased}
  @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  a{text-decoration:none}
  ul{list-style:none}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:#0a0a0a}
  ::-webkit-scrollbar-thumb{background:#9d7a30;border-radius:3px}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;

export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return (
    <>
      <SEOHead />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </>
  );
}