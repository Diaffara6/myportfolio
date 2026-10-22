import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Languages,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";
import { copy, experienceIds, profile, projects, type Language } from "./data";

const sectionIds = ["home", "about", "skills", "projects", "experience", "education", "contact"];

function App() {
  const [language, setLanguage] = useState<Language>("fr");
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.pageDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.pageTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.pageDescription);
  }, [language, t.pageDescription, t.pageTitle]);

  const links = sectionIds.map((id, index) => ({ id, label: t.nav[index] }));
  const socials = [
    { label: t.email, value: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={16} /> },
    { label: t.phone, value: profile.phone, href: `tel:${profile.phone}`, icon: <Phone size={16} /> },
    { label: t.githubLabel, value: "github.com/Diaffara6", href: profile.github, icon: <Code2 size={16} /> },
    ...(profile.linkedin ? [{ label: t.linkedin, value: profile.linkedin, href: profile.linkedin, icon: <ArrowUpRight size={16} /> }] : []),
  ];

  return (
    <div className={dark ? "site theme-dark" : "site"}>
      <a className="skip-link" href="#main">{language === "fr" ? "Aller au contenu" : "Skip to content"}</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" aria-label={profile.name}>
            <span className="wordmark-mark">YD<span>.</span></span>
            <span className="wordmark-copy">{profile.name}</span>
          </a>
          <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}>
            {links.map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <button className="text-toggle theme-toggle" type="button" onClick={() => setDark(!dark)} aria-label={dark ? t.lightTheme : t.darkTheme} aria-pressed={dark}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="language-switch" role="group" aria-label={language === "fr" ? "Langue" : "Language"}>
              <button type="button" className={language === "fr" ? "active" : ""} aria-pressed={language === "fr"} onClick={() => setLanguage("fr")}>FR</button>
              <span>/</span>
              <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
            </div>
            <a className="header-cv" href={profile.cvUrl} target="_blank" rel="noreferrer" aria-label={t.cv}><span>{t.cv}</span><ArrowUpRight size={14} /></a>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.closeMenu : t.openMenu} aria-expanded={menuOpen}>
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero section-shell" id="home">
          <div className="hero-main">
            <div className="hero-eyebrow"><span className="eyebrow-line" />{t.eyebrow}</div>
            <p className="hero-name">{profile.name}</p>
            <p className="hero-role">{profile.title[language]} <span>·</span> {profile.focus}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-text">{t.heroText}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{t.projectsCta}<ArrowRight size={16} /></a>
              <a className="button button-quiet" href="#contact">{t.contact}<ArrowUpRight size={15} /></a>
            </div>
            <div className="hero-location"><span className="location-dot" />{profile.location[language]}<span className="location-separator">/</span>{t.availability}</div>
          </div>

          <aside className="hero-index" aria-label={t.overview}>
            <div className="index-top"><span>YD / 01</span><span>{t.overview}</span></div>
            <div className="index-intro">
              <span className="index-symbol"><Code2 size={23} /></span>
              <p>{profile.title[language]}</p>
            </div>
            <div className="index-bottom">
              {t.overviewItems.map(([number, text]) => (
                <div className="index-row" key={number}><span>{number}</span><p>{text}</p></div>
              ))}
              <div className="index-footer">
                <span>Python <i /> Django <i /> REST API</span>
                <a className="index-cv" href={profile.cvUrl} target="_blank" rel="noreferrer">{t.cv}<ArrowDownRight size={16} /></a>
              </div>
            </div>
          </aside>
          <a className="scroll-note" href="#about"><ArrowDownRight size={14} />{language === "fr" ? "Défiler pour découvrir" : "Scroll to explore"}</a>
        </section>

        <section className="profile-section section-shell section-padding" id="about">
          <SectionHeading label={t.aboutLabel} title={t.aboutTitle} />
          <div className="profile-layout">
            <div className="profile-copy">{t.aboutText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <aside className="approach-note">
              <span>{t.approachLabel}</span>
              <p>{t.approachText}</p>
              <ArrowDownRight size={20} aria-hidden="true" />
            </aside>
          </div>
        </section>

        <section className="skills-section section-padding" id="skills">
          <div className="section-shell">
            <SectionHeading label={t.skillsLabel} title={t.skillsTitle} />
            <div className="skills-list">
              {t.skills.map((group, index) => (
                <article className="skill-row" key={group.category}>
                  <span className="row-number">0{index + 1}</span>
                  <h3>{group.category}</h3>
                  <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                  <span className={`skill-status ${group.level}`}>{group.level === "used" ? t.used : t.learning}</span>
                </article>
              ))}
            </div>
            <div className="languages-note">
              <Languages size={16} />
              <span>{t.languagesLabel}</span>
              <b>{t.french}</b><i>{t.native}</i>
              <span className="language-divider">/</span>
              <b>{t.english}</b><i>{t.intermediate}</i>
            </div>
          </div>
        </section>

        <section className="projects-section section-shell section-padding" id="projects">
          <SectionHeading label={t.projectsLabel} title={t.projectsTitle} />
          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project-row accent-${project.accent}`} key={project.id}>
                <div className="project-index"><span>0{index + 1}</span><i /></div>
                <div className="project-content">
                  <div className="project-heading">
                    <div><h3>{t[project.title]}</h3><p>{t[project.context]}</p></div>
                    <span className="project-period">{t[project.period]}</span>
                  </div>
                  <p className="project-contribution">{t[project.contribution]}</p>
                  <div className="project-bottom">
                    <div className="project-stack">{t[project.stack].map((item) => <span key={item}>{item}</span>)}</div>
                    {project.links.length > 0 && (
                      <div className="project-links">
                        {project.links.map((link) => (
                          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                            {link.label[language]}<ArrowUpRight size={13} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section section-padding" id="experience">
          <div className="section-shell">
            <SectionHeading label={t.experienceLabel} title={t.experienceTitle} description={t.experienceIntro} />
            <div className="timeline">
              {t.experienceItems.map((item, index) => (
                <article className="timeline-item" key={experienceIds[index]}>
                  <span className="timeline-date">{item.period}</span>
                  <span className="timeline-marker" />
                  <div><h3>{item.role}</h3><p>{item.detail}</p></div>
                </article>
              ))}
            </div>
            <div className="service-note"><BriefcaseBusiness size={17} /><div><strong>{t.serviceTitle}</strong><p>{t.serviceText}</p></div></div>
          </div>
        </section>

        <section className="education-section section-shell section-padding" id="education">
          <div className="education-mark"><GraduationCap size={23} /></div>
          <div className="education-content">
            <SectionHeading label={t.educationLabel} title={t.educationTitle} />
            <div className="education-details">
              <div><h3>{t.degree}</h3><p>{t.university}</p></div>
              <div><span className="honors">{t.honors}</span><p>{t.equivalency}</p></div>
            </div>
          </div>
        </section>

        <section className="contact-section section-padding" id="contact">
          <div className="section-shell contact-layout">
            <div>
              <SectionHeading label={t.contactLabel} title={t.contactTitle} description={t.contactText} />
              <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={16} /></a>
            </div>
            <div className="social-list">
              {socials.map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("https:") ? "_blank" : undefined} rel={item.href.startsWith("https:") ? "noreferrer" : undefined}>
                  <span>{item.icon}{item.label}</span><strong>{item.value}<ArrowUpRight size={14} /></strong>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <a className="wordmark footer-wordmark" href="#home"><span className="wordmark-mark">YD<span>.</span></span><span className="wordmark-copy">{profile.name}</span></a>
          <span>{t.footerRole}</span>
          <div className="footer-right"><span>© {new Date().getFullYear()}</span><a href="#home">{t.top}<ArrowUpRight size={13} /></a></div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default App;
