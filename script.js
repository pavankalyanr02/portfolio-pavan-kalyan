/**
 * Pavan Kalyan R - Personal Portfolio Website Script
 * Monochromatic Premium Theme Interaction Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons if available
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
    
    // ==========================================================================
    // 1. LOADING SCREEN DISMISSAL
    // ==========================================================================
    const loadingScreen = document.getElementById("loading-screen");
    const bodyElement = document.body;

    // Prevent scrolling while loading
    bodyElement.style.overflow = "hidden";

    window.addEventListener("load", () => {
        // Simulate a minor loading transition to ensure all layout elements settle
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add("fade-out");
                // Restore scrolling
                bodyElement.style.overflow = "";
                
                // Remove from layout after fade transition ends
                setTimeout(() => {
                    loadingScreen.style.display = "none";
                }, 400);
            }
        }, 1500); // 1.5s is standard to showcase the loading animation and feel smooth
    });


    // ==========================================================================
    // 2. SCROLL PROGRESS INDICATOR & HEADER SCROLL EFFECT
    // ==========================================================================
    const scrollProgress = document.getElementById("scroll-progress");
    const mainHeader = document.getElementById("main-header");
    const backToTopBtn = document.getElementById("btn-back-to-top");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Progress Bar
        if (docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        // Header Background Dim
        if (scrollTop > 50) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }

        // Back to Top Button visibility
        if (scrollTop > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    // Back to Top Button Event
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // ==========================================================================
    // 3. CUSTOM MOUSE GLOW EFFECT (Desktop Only)
    // ==========================================================================
    const cursorGlow = document.getElementById("cursor-glow");

    if (window.innerWidth > 1024) {
        document.addEventListener("mousemove", (e) => {
            // Smoothly move the glow to follow cursor
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });

        // Interactive scales: scale up cursor when hovering over clickable cards/buttons
        const interactables = document.querySelectorAll("a, button, .glass-card, input, textarea");
        interactables.forEach(item => {
            item.addEventListener("mouseenter", () => {
                cursorGlow.style.width = "450px";
                cursorGlow.style.height = "450px";
            });
            item.addEventListener("mouseleave", () => {
                cursorGlow.style.width = "350px";
                cursorGlow.style.height = "350px";
            });
        });
    }


    // ==========================================================================
    // 4. HAMBURGER MENU & SCROLL CLOSING (Mobile)
    // ==========================================================================
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function toggleMenu() {
        const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
        hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
        hamburgerBtn.classList.toggle("active");
        navMenu.classList.toggle("active");
        
        // Prevent body scroll when menu is active on mobile
        if (!isExpanded) {
            bodyElement.style.overflow = "hidden";
        } else {
            bodyElement.style.overflow = "";
        }
    }

    hamburgerBtn.addEventListener("click", toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                toggleMenu();
            }
        });
    });


    // ==========================================================================
    // 5. HERO TYPEWRITER ANIMATION
    // ==========================================================================
    const typewriterSpan = document.getElementById("typewriter");
    const roles = [
        "Aspiring Software Developer",
        "MCA Student at RNSIT",
        "Java & Python Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove character
            typewriterSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // Deleting is faster
        } else {
            // Add character
            typewriterSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90; // Standard typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Full role typed. Wait before deleting.
            typingSpeed = 2000; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Role deleted. Move to next role.
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Small delay before typing next
        }

        setTimeout(handleTypewriter, typingSpeed);
    }

    // Start typing loop
    setTimeout(handleTypewriter, 1800);


    // ==========================================================================
    // 6. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ==========================================================================
    const scrollRevealElements = document.querySelectorAll(".scroll-reveal");

    const revealObserverOptions = {
        threshold: 0.12, // Element is 12% in view before triggering
        rootMargin: "0px 0px -50px 0px" // Slight offset to look professional
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ==========================================================================
    // 7. ACTIVE NAVIGATION LINK HIGH-LIGHT ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll("main > section");
    
    const activeLinkObserverOptions = {
        threshold: 0.35, // Trigger when 35% of the section is visible
        rootMargin: "-20% 0px -40% 0px"
    };

    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, activeLinkObserverOptions);

    sections.forEach(section => {
        activeLinkObserver.observe(section);
    });


    // ==========================================================================
    // 8. ACHIEVEMENT COUNTERS ANIMATION (Count Up)
    // ==========================================================================
    const counterNumbers = document.querySelectorAll(".counter-number");
    const achievementsSection = document.getElementById("achievements");
    let hasCounted = false;

    function startCounterAnimation() {
        counterNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            const duration = 2000; // Total count duration in ms
            const stepTime = Math.max(Math.floor(duration / target), 30);
            let current = 0;

            const timer = setInterval(() => {
                current++;
                counter.textContent = current + "+";
                if (current >= target) {
                    counter.textContent = target + "+";
                    clearInterval(timer);
                }
            }, stepTime);
        });
    }

    if (achievementsSection) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    hasCounted = true;
                    startCounterAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counterObserver.observe(achievementsSection);
    }


    // ==========================================================================
    // 9. INTERACTIVE 3D TILT EFFECT FOR CARDS (Desktop Only)
    // ==========================================================================
    const tiltCards = document.querySelectorAll("[data-tilt]");

    if (window.innerWidth > 992) {
        tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                
                // Calculate position relative to card boundaries
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Center position offset
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Rotation calculation: limit angle to +/- 8deg
                const rotateY = ((x - centerX) / centerX) * 8;
                const rotateX = -((y - centerY) / centerY) * 8;

                // Apply rotation transform
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                // Reset card transform smoothly
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
            });
        });
    }


    // ==========================================================================
    // 10. CONTACT FORM HANDLING (Direct Mailto Link Construction)
    // ==========================================================================
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("form-name").value.trim();
            const subject = document.getElementById("form-subject").value.trim() || "Portfolio Inquiry";
            const message = document.getElementById("form-message").value.trim();

            // Formulate standard mailto link
            let body = `Hello Pavanram,\n\n${message}`;
            if (name) {
                body += `\n\nBest regards,\n${name}`;
            }

            const mailtoUrl = `mailto:pavankalyanr02@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open the default mail client
            window.location.href = mailtoUrl;
        });
    }

    // ==========================================================================
    // 12. TOAST NOTIFICATION SYSTEM & RESUME DOWNLOAD
    // ==========================================================================
    const resumeBtn = document.getElementById("btn-download-resume");
    
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }

    function showToast(message, iconClass = "fa-solid fa-circle-check") {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Force reflow and show
        toast.offsetHeight;
        toast.classList.add("show");

        // Hide and remove
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3000);
    }

    if (resumeBtn) {
        resumeBtn.addEventListener("click", () => {
            showToast("Resume Download Started", "fa-solid fa-download");
        });
    }
});
