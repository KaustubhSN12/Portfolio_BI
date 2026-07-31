document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Header scroll state ---------- */
    const header = document.getElementById("site-header");

    const onScrollHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScrollHeader);
    onScrollHeader();

    /* ---------- Mobile nav toggle ---------- */
    const navToggle = document.getElementById("navToggle");
    const siteNav = document.getElementById("site-nav");

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = siteNav.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        siteNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                siteNav.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 130;
            const height = section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    /* ---------- Scroll reveal ---------- */
    const revealItems = document.querySelectorAll(
        ".section-title,.about-text,.stat-card,.skill-box,.project-card,.timeline-item,.cert-card,.contact,.skills-column,.github-panel"
    );

    function reveal() {
        const trigger = window.innerHeight * 0.87;
        revealItems.forEach(item => {
            if (item.getBoundingClientRect().top < trigger) {
                item.classList.add("show");
            }
        });
    }
    window.addEventListener("scroll", reveal);
    reveal();

    /* ---------- Animated number counters (stat cards + hero KPI tiles) ---------- */
    function animateNumber(el, target, prefix = "", suffix = "", duration = 1400) {
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);
            el.textContent = prefix + value.toLocaleString("en-IN") + suffix;

            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = prefix + target.toLocaleString("en-IN") + suffix;
        }
        requestAnimationFrame(tick);
    }

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            if (el.dataset.done) return;
            el.dataset.done = "true";

            if (el.classList.contains("stat-card")) {
                const h2 = el.querySelector("h2");
                const target = parseInt(h2.dataset.target, 10);
                animateNumber(h2, target);
            }

            if (el.classList.contains("kpi-tile")) {
                const valueEl = el.querySelector(".kpi-value");
                const target = parseInt(el.dataset.target, 10);
                const prefix = el.dataset.prefix || "";
                const suffix = el.dataset.suffix || "";
                animateNumber(valueEl, target, prefix, suffix, 1600);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll(".stat-card, .kpi-tile").forEach(el => counterObserver.observe(el));

    /* ---------- Skill meter fill on scroll ---------- */
    const meterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const fill = entry.target;
            if (fill.dataset.done) return;
            fill.dataset.done = "true";
            fill.style.width = fill.dataset.pct + "%";
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".meter-fill").forEach(fill => meterObserver.observe(fill));

    /* ---------- Hero mini bar chart ---------- */
    const barChart = document.getElementById("heroBarChart");
    if (barChart) {
        const heights = [42, 68, 55, 90, 60, 78]; // illustrative demo values
        heights.forEach(h => {
            const bar = document.createElement("div");
            bar.className = "bar";
            barChart.appendChild(bar);
        });

        const barObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const bars = barChart.querySelectorAll(".bar");
                bars.forEach((bar, i) => {
                    setTimeout(() => { bar.style.height = heights[i] + "%"; }, i * 90);
                });
                barObserver.disconnect();
            });
        }, { threshold: 0.4 });

        barObserver.observe(barChart);
    }

    /* ---------- Typing animation for hero eyebrow ---------- */
    const heroTag = document.querySelector(".hero-tag");
    if (heroTag) {
        const text = heroTag.dataset.type || heroTag.textContent.trim();
        heroTag.textContent = "";
        let i = 0;

        (function type() {
            if (i < text.length) {
                heroTag.textContent += text.charAt(i++);
                setTimeout(type, 45);
            }
        })();
    }

    /* ---------- Tilt effect on interactive cards ---------- */
    document.querySelectorAll(".project-card, .skill-box, .stat-card, .cert-card, .timeline-content").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 8;
            const rotateX = ((y / rect.height) - 0.5) * -8;
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    /* ---------- Contact form (Formspree, AJAX submit) ---------- */
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const action = contactForm.getAttribute("action") || "";
            if (action.includes("YOUR_FORM_ID")) {
                formStatus.textContent = "Contact form isn't wired up yet — add your Formspree form ID in index.html.";
                formStatus.className = "form-status error";
                return;
            }

            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalLabel = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending...";
            formStatus.textContent = "";
            formStatus.className = "form-status";

            try {
                const response = await fetch(action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    formStatus.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
                    formStatus.className = "form-status success";
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Something went wrong sending that. Try emailing me directly instead.";
                    formStatus.className = "form-status error";
                }
            } catch (err) {
                formStatus.textContent = "Network error — try emailing me directly instead.";
                formStatus.className = "form-status error";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalLabel;
            }
        });
    }

    /* ---------- Dashboard screenshot lightbox (project pages) ---------- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (lightbox && lightboxImg) {
        document.querySelectorAll(".shot img").forEach(img => {
            img.addEventListener("click", () => {
                if (img.closest(".shot").classList.contains("shot-missing")) return;
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add("open");
            });
        });

        const closeLightbox = () => lightbox.classList.remove("open");

        if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightbox();
        });
    }

    /* ---------- Certificate lightbox ---------- */
    const certLightbox = document.getElementById("certLightbox");
    const certLightboxImg = document.getElementById("certLightboxImg");
    const certLightboxCaption = document.getElementById("certLightboxCaption");
    const certLightboxClose = document.getElementById("certLightboxClose");

    if (certLightbox && certLightboxImg) {
        const openCertLightbox = (card) => {
            const imgSrc = card.dataset.certImg;
            if (!imgSrc) return;
            certLightboxImg.src = imgSrc;
            certLightboxImg.alt = card.dataset.certTitle || "Certificate";
            certLightboxCaption.textContent = card.dataset.certTitle || "";
            certLightbox.classList.add("open");
        };

        document.querySelectorAll(".cert-card[data-cert-img]").forEach(card => {
            card.addEventListener("click", () => openCertLightbox(card));
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCertLightbox(card);
                }
            });
        });

        const closeCertLightbox = () => certLightbox.classList.remove("open");

        if (certLightboxClose) certLightboxClose.addEventListener("click", closeCertLightbox);
        certLightbox.addEventListener("click", (e) => {
            if (e.target === certLightbox) closeCertLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && certLightbox.classList.contains("open")) closeCertLightbox();
        });
    }

    /* ---------- Scroll to top button ---------- */
    const topBtn = document.getElementById("scrollTop");
    if (topBtn) {
        window.addEventListener("scroll", () => {
            topBtn.style.display = window.scrollY > 500 ? "block" : "none";
        });

        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

});
