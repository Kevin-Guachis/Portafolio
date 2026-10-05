import React from 'react';

export function Pending({ children }) {
  return <span className="pending">{children}</span>;
}

function Screenshot({ screenshot, projectName, expandable = false, showCaption = true }) {
  const [failedSrc, setFailedSrc] = React.useState(null);
  if (!screenshot?.src || failedSrc === screenshot.src) {
    return (
      <div className="screenshot-placeholder">
        <span className="image-symbol" aria-hidden="true">▧</span>
        <span>{screenshot?.caption || 'Captura del proyecto pendiente'}</span>
        {screenshot?.caption && <span>Evidencia visual pendiente</span>}
        <small>{projectName}</small>
      </div>
    );
  }
  return (
    <figure className="screenshot">
      {expandable ? <a href={screenshot.src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar ${screenshot.caption} (abre en otra pestaña)`}>
        <img src={screenshot.src} alt={screenshot.alt || `Captura de ${projectName}`} loading="lazy" onError={() => setFailedSrc(screenshot.src)} />
      </a> : <img src={screenshot.src} alt={screenshot.alt || `Captura de ${projectName}`} loading="lazy" width="1440" height="900" onError={() => setFailedSrc(screenshot.src)} />}
      {showCaption && <figcaption>{screenshot.caption || 'Descripción de la captura pendiente.'}</figcaption>}
    </figure>
  );
}

function Detail({ title, content }) {
  return <div className="case-text"><h4>{title}</h4><p>{content || <Pending>Descripción específica pendiente.</Pending>}</p></div>;
}

function ProjectLink({ href, children, ...props }) {
  const external = /^(https?:)?\/\//i.test(href);
  return <a {...props} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{children}</a>;
}

function ProjectLinks({ links, name }) {
  return <div className="project-links">
    {links.production && <ProjectLink className="project-button primary-action" href={links.production} aria-label={`Sistema en producción: ${name}`}>Sistema en producción <span aria-hidden="true">↗</span></ProjectLink>}
    {links.demo && <ProjectLink className={`project-button ${links.production ? '' : 'primary-action'}`} href={links.demo} aria-label={`Demo: ${name}`}>Demo <span aria-hidden="true">↗</span></ProjectLink>}
  </div>;
}

function Architecture({ project, compact = false }) {
  const singleLayer = project.architecture.length === 1;
  return <section className={`architecture-section architecture-featured ${singleLayer ? 'architecture-single' : ''} ${project.architectureDirection === 'vertical' ? 'architecture-vertical' : ''}`} style={{ '--architecture-columns': project.architecture.length }} aria-labelledby={`${project.id}-architecture`}>
    <div className="architecture-heading"><div><h4 className="eyebrow" id={`${project.id}-architecture`}>Arquitectura técnica</h4><p className="architecture-note">{singleLayer ? 'Interfaz y presentación del catálogo.' : 'De la interfaz a la persistencia de datos.'}</p></div><span className="architecture-caption">{singleLayer ? 'CAPA DEL SISTEMA' : 'CLIENTE / API / DATOS'}</span></div>
    <ol className="architecture">
      {project.architecture.map((layer, index) => <li key={layer.label}><span className="layer-label"><span className="layer-index">{String(index + 1).padStart(2, '0')}</span>{layer.label}</span><strong>{layer.technologies}</strong>{!compact && <p>{layer.description}</p>}{index < project.architecture.length - 1 && <span className="architecture-connector" aria-hidden="true">{project.architectureDirection === 'vertical' ? '↓' : '→'}</span>}</li>)}
    </ol>
    {project.architectureNote && <p className="architecture-footnote">{project.architectureNote}</p>}
  </section>;
}

function CaseSections({ project, sections = project.caseSections, prefix = '' }) {
  return <div className="case-sections">
    {sections.map((section) => <section className="case-text case-section" key={section.id} aria-labelledby={`${project.id}-${prefix}${section.id}`}>
      <h4 id={`${project.id}-${prefix}${section.id}`}>{section.title}</h4>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.items && <ul className="case-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
    </section>)}
  </div>;
}

function EvidenceCarousel({ screenshots, projectName, id }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  if (!screenshots.length) return null;
  const active = screenshots[activeIndex];
  const move = (direction) => setActiveIndex((index) => (index + direction + screenshots.length) % screenshots.length);

  return <div className="evidence-carousel" role="region" aria-roledescription="carrusel" aria-label={`Capturas de ${projectName}`}>
    <div id={`${id}-slide`} role="group" aria-roledescription="diapositiva" aria-label={`${activeIndex + 1} de ${screenshots.length}: ${active.caption}`}>
      <Screenshot key={active.id} screenshot={active} projectName={projectName} expandable showCaption={false} />
    </div>
    <div className="carousel-controls">
      <button type="button" className="project-button" onClick={() => move(-1)} aria-controls={`${id}-slide`} disabled={screenshots.length < 2}><span aria-hidden="true">←</span> Anterior</button>
      <span className="carousel-position" role="status" aria-live="polite" aria-atomic="true">{activeIndex + 1} / {screenshots.length} · {active.caption}</span>
      <button type="button" className="project-button" onClick={() => move(1)} aria-controls={`${id}-slide`} disabled={screenshots.length < 2}>Siguiente <span aria-hidden="true">→</span></button>
    </div>
    <div className="carousel-dots" role="group" aria-label="Seleccionar captura">
      {screenshots.map((screenshot, index) => <button type="button" key={screenshot.id} className="carousel-dot" aria-label={`Mostrar ${index + 1}: ${screenshot.caption}`} aria-current={index === activeIndex ? 'true' : undefined} aria-controls={`${id}-slide`} onClick={() => setActiveIndex(index)}><span aria-hidden="true" /></button>)}
    </div>
  </div>;
}

function TechnicalDisclosure({ children }) {
  const [open, setOpen] = React.useState(false);
  return <details className="case-study technical-disclosure" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
    <summary>{open ? 'Ocultar detalles técnicos' : 'Ver detalles técnicos'}<span className="disclosure-icon" aria-hidden="true">{open ? '−' : '+'}</span></summary>
    {children}
  </details>;
}

function CompactCase({ project }) {
  return <>
    <section className="case-body compact-gallery" aria-labelledby={`${project.id}-evidencia`}>
      <h4 id={`${project.id}-evidencia`}>Evidencia visual</h4>
      <p className="architecture-note">Abre las capturas disponibles para ampliarlas.</p>
      <EvidenceCarousel screenshots={project.screenshots.slice(1)} projectName={project.name} id={`${project.id}-evidence`} />
    </section>
    <TechnicalDisclosure>
    <div className="case-body compact-case">
      <section className="case-text" aria-labelledby={`${project.id}-participacion-resumen`}>
        <h4 id={`${project.id}-participacion-resumen`}>Mi participación</h4>
        <p>{project.compactCase.participation}</p>
      </section>
      <section className="case-section" aria-labelledby={`${project.id}-destacados`}>
        <h4 id={`${project.id}-destacados`}>{project.compactCase.modulesTitle || 'Módulos destacados'}</h4>
        <ul className="tags">{project.compactCase.modules.map((module) => <li key={module}>{module}</li>)}</ul>
      </section>
      {project.compactCase.highlights && <div className="case-highlights">{project.compactCase.highlights.map((highlight) => <section className="case-text case-section" key={highlight.id} aria-labelledby={`${project.id}-${highlight.id}`}>
        <h4 id={`${project.id}-${highlight.id}`}>{highlight.title}</h4>
        <p>{highlight.text}</p>
        {highlight.note && <p className="architecture-note">{highlight.note}</p>}
      </section>)}</div>}
    </div>
    <Architecture project={project} compact />
    <div className="case-body compact-case">
      <section className="case-section" aria-labelledby={`${project.id}-stack`}>
        <h4 id={`${project.id}-stack`}>Stack tecnológico</h4>
        <div className="stack-groups">{Object.entries(project.stack).map(([group, technologies]) => <div key={group}><h5>{group}</h5><ul className="tags">{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>)}</div>
      </section>
    </div>
    <div className="case-body compact-case">
      <section className="case-text" aria-labelledby={`${project.id}-proceso`}>
        <h4 id={`${project.id}-proceso`}>Proceso</h4>
        <ol className="process-flow">{project.compactCase.processSteps.map((step, index) => <li key={step}>{index > 0 && <span aria-hidden="true">→</span>}{step}</li>)}</ol>
        <p>{project.compactCase.processSummary}</p>
      </section>
      <section className="case-text case-section" aria-labelledby={`${project.id}-infraestructura`}>
        <h4 id={`${project.id}-infraestructura`}>{project.compactCase.infrastructureTitle || 'Infraestructura'}</h4>
        <p>{project.compactCase.infrastructure}</p>
      </section>
      <section className="case-section" aria-labelledby={`${project.id}-enlaces`}>
        <h4 id={`${project.id}-enlaces`}>Enlaces</h4>
        <ProjectLinks links={project.links} name={project.name} />
      </section>
    </div>
    </TechnicalDisclosure>
  </>;
}

export default function ProjectCard({ project, index }) {
  return (
    <article className={`project-card ${project.featured ? 'featured' : ''}`} id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="project-overview">
        <div className="project-copy">
          <div className="project-meta"><span className="project-number">CASO {String(index + 1).padStart(2, '0')}</span><span className="project-category">{project.featured ? 'Proyecto principal' : project.category}</span></div>
          <h3 id={`${project.id}-title`}>{project.name}</h3>
          <p className="organization">{project.organization}</p>
          <p className="project-summary">{project.summary}</p>
          {project.compactCase ? <p className="project-summary">{project.compactCase.team}</p> : <>
          <ul className="tags overview-tags" aria-label="Tecnologías principales">{Object.values(project.stack).map((technologies) => <li key={technologies[0]}>{technologies[0]}</li>)}</ul>
          <div className="project-facts"><span>Fecha: {project.date || <Pending>pendiente</Pending>}</span><span>Mi rol: {project.role || <Pending>por documentar</Pending>}</span></div>
          <ProjectLinks links={project.links} name={project.name} />
          </>}
        </div>
        <Screenshot screenshot={project.screenshots[0]} projectName={project.name} expandable={Boolean(project.compactCase)} />
      </div>
      {project.compactCase ? <CompactCase project={project} /> : <>
      {project.featured && <Architecture project={project} />}
      <details className="case-study">
        <summary>{project.featured ? 'Explorar el caso de estudio' : 'Explorar arquitectura y caso de estudio'} <span className="expand-icon" aria-hidden="true">+</span></summary>
        {!project.featured && <Architecture project={project} />}
        <div className="case-body">
          <div className="stack-groups">{Object.entries(project.stack).map(([group, technologies]) => <div key={group}><h4>{group}</h4><ul className="tags">{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>)}</div>
          {project.caseSections ? <>
            <CaseSections project={project} />
            <section className="case-section" aria-labelledby={`${project.id}-evidencia`}>
              <h4 id={`${project.id}-evidencia`}>Evidencia visual</h4>
              <p className="architecture-note">Las capturas reales están pendientes de incorporación. La captura principal se mostrará en el resumen del proyecto.</p>
              <div className="evidence-grid">{project.screenshots.slice(1).map((screenshot) => <Screenshot key={screenshot.id} screenshot={screenshot} projectName={project.name} />)}</div>
            </section>
            <section className="case-section" aria-labelledby={`${project.id}-enlaces`}>
              <h4 id={`${project.id}-enlaces`}>Sistema en producción y repositorios</h4>
              <ProjectLinks links={project.links} name={project.name} />
            </section>
          </> : <>
            <div className="case-grid"><Detail title="Contexto y problema" content={project.problem} /><Detail title="Mi contribución" content={project.contribution} /><Detail title="Decisiones técnicas" content={project.decisions} /></div>
            {project.screenshots.slice(1).map((screenshot, i) => <Screenshot key={`${project.id}-${i}`} screenshot={screenshot} projectName={project.name} />)}
          </>}
        </div>
      </details>
      </>}
    </article>
  );
}
