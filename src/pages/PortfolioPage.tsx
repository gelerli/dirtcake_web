import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import "@fontsource-variable/inter";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import styles from "./cihangelerli/CihanGelerliPage.module.css";
import { prefetchImage } from "../portfolio/images";
import type { PortfolioData, PortfolioProject } from "../portfolio/types";
import { PortfolioImage } from "./PortfolioImage";

function smoothBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function prefetchProject(project: PortfolioProject) {
  project.gallery.slice(0, 2).forEach((image) => prefetchImage(image.src));
}

function Gallery({
  categoryLabel,
  galleryUi,
  project,
}: {
  categoryLabel: string;
  galleryUi: PortfolioData["ui"]["gallery"];
  project: PortfolioProject;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<Array<HTMLElement | null>>([]);
  const maxIndex = project.gallery.length - 1;
  const regionLabel = galleryUi.regionLabel.replace(
    "{category}",
    categoryLabel,
  );
  const imagePosition = galleryUi.imagePosition
    .replace("{current}", String(activeIndex + 1))
    .replace("{total}", String(project.gallery.length));

  function scrollToIndex(index: number) {
    const viewport = viewportRef.current;
    const slide = slidesRef.current[index];
    if (!viewport || !slide) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const slideStart =
      slide.getBoundingClientRect().left -
      viewport.getBoundingClientRect().left +
      viewport.scrollLeft;
    viewport.scrollTo({
      left: Math.min(slideStart, maxScroll),
      behavior: smoothBehavior(),
    });
    setActiveIndex(index);
  }

  function updateActiveIndex() {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (maxScroll <= 0) return;
    if (viewport.scrollLeft >= maxScroll - 1) {
      setActiveIndex(maxIndex);
      return;
    }

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slidesRef.current.forEach((slide, index) => {
      if (!slide) return;
      const slideStart =
        slide.getBoundingClientRect().left -
        viewport.getBoundingClientRect().left +
        viewport.scrollLeft;
      const targetScroll = Math.min(slideStart, maxScroll);
      const distance = Math.abs(viewport.scrollLeft - targetScroll);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex((currentIndex) =>
      currentIndex === nearestIndex ? currentIndex : nearestIndex,
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (maxIndex < 1) return;
    event.preventDefault();

    const nextIndex =
      event.key === "ArrowRight"
        ? Math.min(activeIndex + 1, maxIndex)
        : Math.max(activeIndex - 1, 0);
    scrollToIndex(nextIndex);
  }

  return (
    <div className={styles.gallery}>
      <div
        className={styles.galleryViewport}
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label={regionLabel}
        aria-roledescription="carousel"
        onScroll={updateActiveIndex}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.galleryTrack}>
          {project.gallery.map((image, index) => (
            <figure
              className={styles.gallerySlide}
              key={`${project.id}-gallery-${index}`}
              ref={(element) => {
                slidesRef.current[index] = element;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={galleryUi.imagePosition
                .replace("{current}", String(index + 1))
                .replace("{total}", String(project.gallery.length))}
            >
              <PortfolioImage
                src={image.src}
                alt={image.alt}
                eager={index === 0}
                onLoad={updateActiveIndex}
              />
            </figure>
          ))}
        </div>
      </div>
      {maxIndex > 0 && (
        <div className={styles.progress}>
          <span
            className={styles.progressIndicator}
            style={{
              left: `${(activeIndex / project.gallery.length) * 100}%`,
              width: `${100 / project.gallery.length}%`,
            }}
            aria-hidden="true"
          />
          <input
            className={styles.progressInput}
            type="range"
            min={0}
            max={maxIndex}
            step={1}
            value={activeIndex}
            aria-label={galleryUi.rangeLabel}
            aria-valuetext={imagePosition}
            onChange={(event) =>
              scrollToIndex(Number(event.currentTarget.value))
            }
          />
        </div>
      )}
      <span className={styles.visuallyHidden} aria-live="polite">
        {imagePosition}
      </span>
    </div>
  );
}

export default function PortfolioPage({
  portfolio,
}: {
  portfolio: PortfolioData;
}) {
  const [selectedProject, setSelectedProject] = useState<{
    categoryId: string;
    projectId: string;
  } | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = portfolio.seo.title;
    return () => {
      document.title = previousTitle;
    };
  }, [portfolio.seo.title]);

  function selectProject(categoryId: string, projectId: string) {
    setSelectedProject((currentSelection) =>
      currentSelection?.categoryId === categoryId &&
      currentSelection.projectId === projectId
        ? null
        : { categoryId, projectId },
    );
  }

  function handleThumbnailRailKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    event.currentTarget.scrollBy({
      left: event.key === "ArrowRight" ? 240 : -240,
      behavior: smoothBehavior(),
    });
  }

  return (
    <div className={styles.page} id="top">
      <header className={styles.header}>
        <a
          className={styles.wordmark}
          href="#top"
          aria-label={portfolio.identity.name}
        >
          {portfolio.identity.nameLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </a>
        <span className={styles.headerDivider} aria-hidden="true" />
        <nav
          className={styles.navigation}
          aria-label={portfolio.ui.navigation.portfolio}
        >
          <a href="#portfolio">{portfolio.ui.navigation.portfolio}</a>
          <a
            href={portfolio.ui.navigation.getInTouchUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {portfolio.ui.navigation.getInTouch}
          </a>
        </nav>
        <span className={styles.headerCorner} aria-hidden="true" />
      </header>

      <main>
        <section className={styles.hero} aria-label={portfolio.identity.name}>
          <div className={styles.heroInterior}>
            <div className={styles.identity}>
              <h1>
                {portfolio.identity.nameLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className={styles.roles}>
                {portfolio.identity.roles.map((role, index) => (
                  <span className={styles.roleItem} key={role}>
                    {index > 0 && (
                      <span className={styles.roleSeparator} aria-hidden="true">
                        {portfolio.identity.roleSeparator}
                      </span>
                    )}
                    {role}
                  </span>
                ))}
              </p>
              <p className={styles.introduction}>
                {portfolio.identity.introduction}
              </p>
            </div>

            <span className={styles.columnDivider} aria-hidden="true" />

            <section className={styles.about} aria-labelledby="about-heading">
              <h2 id="about-heading">{portfolio.about.heading}</h2>
              <dl className={styles.aboutFacts}>
                {portfolio.about.facts.map((fact) => (
                  <div className={styles.aboutFact} key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
                <div className={`${styles.aboutFact} ${styles.skillsFact}`}>
                  <dt>{portfolio.about.skillsLabel}</dt>
                  <dd>
                    {portfolio.about.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </dd>
                </div>
              </dl>
              <p className={styles.cv}>
                {portfolio.about.cvPrefix}
                <a
                  href={portfolio.about.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {portfolio.about.cvLinkText}
                </a>
              </p>
            </section>

            <span className={styles.columnDivider} aria-hidden="true" />

            <section
              className={styles.onlinePresence}
              id="online-presence"
              aria-labelledby="online-heading"
            >
              <h2 id="online-heading">{portfolio.onlinePresence.heading}</h2>
              <ul>
                {portfolio.onlinePresence.links.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={link.icon} alt="" aria-hidden="true" />
                      <span className={styles.socialCopy}>
                        <span className={styles.socialLabel}>{link.label}</span>
                        <span className={styles.socialDescription}>
                          {link.description}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section
          className={styles.portfolio}
          id="portfolio"
          aria-label={portfolio.ui.navigation.portfolio}
        >
          {portfolio.categories.map((category, categoryIndex) => {
            const categorySelection =
              selectedProject?.categoryId === category.id
                ? (category.projects.find(
                    (project) => project.id === selectedProject.projectId,
                  ) ?? null)
                : null;
            const isExpanded = categorySelection !== null;

            const railLabel = portfolio.ui.gallery.thumbnailRailLabel.replace(
              "{category}",
              category.label,
            );

            return (
              <section
                className={`${styles.category} ${isExpanded ? styles.categoryExpanded : ""}`}
                key={category.id}
                aria-labelledby={`category-${category.id}`}
              >
                <div className={styles.categoryIntro}>
                  <h2 id={`category-${category.id}`}>{category.label}</h2>
                  <p>{category.description}</p>
                </div>
                <div className={styles.categoryContent}>
                  <div
                    className={styles.thumbnails}
                    role="group"
                    aria-label={railLabel}
                    tabIndex={0}
                    onKeyDown={handleThumbnailRailKeyDown}
                  >
                    {category.projects.map((project, index) => {
                      const isSelected =
                        selectedProject?.categoryId === category.id &&
                        selectedProject.projectId === project.id;

                      return (
                        <button
                          className={`${styles.thumbnail} ${isSelected ? styles.thumbnailSelected : ""} ${isExpanded && !isSelected ? styles.thumbnailDimmed : ""}`}
                          type="button"
                          key={project.id}
                          aria-pressed={isSelected}
                          onClick={() => selectProject(category.id, project.id)}
                          onPointerEnter={() => prefetchProject(project)}
                          onFocus={() => prefetchProject(project)}
                        >
                          <PortfolioImage
                            src={project.thumbnail.src}
                            alt={project.thumbnail.alt}
                            eager={categoryIndex === 0 && index < 4}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
                {categorySelection ? (
                  <div className={styles.expandedProject}>
                    {categorySelection.gallery.length ? (
                      <Gallery
                        key={categorySelection.id}
                        categoryLabel={category.label}
                        galleryUi={portfolio.ui.gallery}
                        project={categorySelection}
                      />
                    ) : null}
                    <section
                      className={styles.projectInfo}
                      aria-labelledby={`project-${categorySelection.id}`}
                      aria-live="polite"
                    >
                      <h3 id={`project-${categorySelection.id}`}>
                        {categorySelection.title}
                      </h3>
                      {categorySelection.subtitle?.trim() ? (
                        <p className={styles.projectSubtitle}>
                          {categorySelection.subtitle}
                        </p>
                      ) : null}
                      {categorySelection.link?.label.trim() &&
                      categorySelection.link.url.trim() ? (
                        <a
                          className={styles.projectLink}
                          href={categorySelection.link.url}
                          target={
                            /^https?:\/\//i.test(categorySelection.link.url)
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            /^https?:\/\//i.test(categorySelection.link.url)
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {categorySelection.link.label}
                        </a>
                      ) : null}
                      {categorySelection.description?.trim() ? (
                        <p className={styles.projectDescription}>
                          {categorySelection.description}
                        </p>
                      ) : null}
                    </section>
                  </div>
                ) : null}
              </section>
            );
          })}
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footerCorner} aria-hidden="true" />
        <p className={styles.footerName}>{portfolio.identity.name}</p>
        <p className={styles.footerCopyright}>{portfolio.ui.footerCopyright}</p>
        <ul
          className={styles.footerSocials}
          aria-label={portfolio.onlinePresence.heading}
        >
          {portfolio.onlinePresence.links.map((link) => (
            <li key={link.platform}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <img src={link.icon} alt="" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
