import React from 'react';
import { profile } from './data/profile.js';
import { projects } from './data/projects/index.js';
import ProjectCard, { Pending } from './components/ProjectCard.jsx';

export default function App() {
  const orderedProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Kevin Guachamin, inicio"><span className="monogram" aria-hidden="true">KG<span>.</span></span><span>Kevin Guachamin</span></a>
          <nav aria-label="Navegación principal"><a href="#sobre-mi">Sobre mí</a><a href="#contacto">Contacto <span aria-hidden="true">↗</span></a></nav>
        </div>
      </header>
      <main id="contenido">
        <section className="hero container" id="inicio" aria-labelledby="hero-title">
          <div className="hero-label"><span className="small-line" />PORTAFOLIO / DESARROLLO WEB</div>
          <p className="intro-name">Ingeniero en Tecnologías de la Información</p>
          <h1 id="hero-title">Full Stack<br /><span>Developer.</span></h1>
          <p className="hero-description">Desarrollo de aplicaciones web, APIs y soluciones orientadas a datos.<br />Experiencia en sistemas académicos, plataformas educativas y catálogos digitales.</p>
          <div className="hero-actions"><a className="button" href="#proyectos">Explorar proyectos <span aria-hidden="true">→</span></a></div>
        </section>
        <section className="projects-section" id="proyectos" aria-labelledby="projects-title">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">01 / PROYECTOS</p><h2 id="projects-title">Del sistema a la interfaz.</h2></div><p>Una mirada a cada proyecto:<br />producto, arquitectura y desarrollo.</p></div>
            <div className="project-list">{orderedProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div>
          </div>
        </section>
        <section className="container about-section" id="sobre-mi" aria-labelledby="about-title">
          <div><p className="eyebrow">02 / PERFIL</p><h2 id="about-title">Detrás del desarrollo.</h2><p className="about-copy">{profile.about || <Pending>Presentación personal, trayectoria y enfoque de trabajo pendientes de documentar.</Pending>}</p></div>
          <div className="skills-evidence"><h3>Tecnologías y herramientas</h3><div className="skills-grid">{profile.skills.map((skill) => <div className="skill-group" key={skill.title}><h4>{skill.title}</h4><ul>{skill.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></div>
        </section>
        <section className="contact-section" id="contacto" aria-labelledby="contact-title"><div className="container contact-inner"><div><p className="eyebrow">03 / CONTACTO</p><h2 id="contact-title">Hablemos de desarrollo.</h2><p>Contacto profesional y perfiles.</p></div><div className="contact-links">
          {[
            { label: 'Correo', value: profile.email, href: profile.email && `mailto:${profile.email}` },
            { label: 'LinkedIn', value: 'Perfil profesional', href: profile.linkedin, external: true },
            { label: 'GitHub', value: 'Kevin-Guachis', href: profile.github, external: true },
            { label: 'WhatsApp', value: profile.phone, href: profile.whatsapp, external: true },
          ].filter((contact) => contact.href).map((contact) => <a className="contact-card" key={contact.label} href={contact.href} target={contact.external ? '_blank' : undefined} rel={contact.external ? 'noopener noreferrer' : undefined}><span className="contact-label">{contact.label} <span aria-hidden="true">↗</span></span><span>{contact.value}</span></a>)}
        </div></div></section>
      </main>
      <footer className="container footer"><span>{profile.name} <span className="footer-role">/ {profile.title}</span></span><a href="#inicio">Volver al inicio ↑</a></footer>
    </>
  );
}
