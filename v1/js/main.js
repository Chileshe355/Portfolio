// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page transition effect
    const pageTransition = document.querySelector('.page-transition');
    
    // Hide loading screen
    if (pageTransition) {
        setTimeout(() => {
            pageTransition.classList.add('revealing');
            
            setTimeout(() => {
                pageTransition.classList.remove('revealing');
            }, 700);
        }, 300);
    }
    
    // Handle links for page transitions
    document.querySelectorAll('a[href^="http"], a[href^="https"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle external links and ignore links that open in new tab/window
            if (this.hostname !== window.location.hostname && !this.target) {
                e.preventDefault();
                
                const href = this.getAttribute('href');
                
                if (pageTransition) {
                    pageTransition.classList.add('loading');
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 600);
                } else {
                    window.location.href = href;
                }
            }
        });
    });
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6c5ce7"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6c5ce7",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Function to handle scroll events
    function handleScroll() {
        // Add shadow to navbar when scrolled
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.97)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        }
        
        // Handle back to top button visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initialize scroll handler
    handleScroll();
    
    // Back to top button click event
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu when clicking a nav item
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
            
            // Scroll to the target section
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact functionality is now handled by mailto link// Enhanced scroll animations that only trigger when elements come into view
    function initScrollAnimations() {
        // Configuration options for the observer
        const observerOptions = {
            threshold: 0.15,        // When 15% of the element is visible
            rootMargin: '0px 0px -50px 0px'  // Slight offset to trigger animations before element is fully in view
        };
        
        // All elements to animate when they come into view
        const animateElements = document.querySelectorAll('.skill-card, .project-card, .about-card, .timeline-item, .section-title, .title-underline, .animated-element');
        
        // Map to store sections and their child elements for group animations
        const sectionMap = new Map();
        
        // Setup the animation classes and initial state
        animateElements.forEach((element, index) => {
            // Add base animated class to ensure proper initial state - makes elements invisible initially
            element.classList.add('animated');
            
            // Find the parent section for this element (if any)
            let parentSection = element.closest('section');
            if (parentSection) {
                if (!sectionMap.has(parentSection.id)) {
                    sectionMap.set(parentSection.id, []);
                }
                sectionMap.get(parentSection.id).push(element);
            }
            
            // If no animation is specified, assign one based on element type and position
            if (!element.dataset.animation) {
                if (element.classList.contains('project-card')) {
                    const position = index % 3;
                    if (position === 0) element.dataset.animation = 'fade-in-left';
                    else if (position === 1) element.dataset.animation = 'fade-in-up';
                    else element.dataset.animation = 'fade-in-right';
                    
                    // Add delay based on position
                    element.dataset.delay = `delay-${(index % 3) + 1}`;
                } 
                else if (element.classList.contains('skill-card')) {
                    const position = index % 3;
                    element.dataset.animation = 'fade-in-scale';
                    element.dataset.delay = `delay-${position + 1}`;
                }
                else if (element.classList.contains('timeline-item')) {
                    element.dataset.animation = 'fade-in-left';
                    element.dataset.delay = `delay-${(index % 4) + 1}`;
                }
                else {
                    // Default animation
                    element.dataset.animation = 'fade-in-up';
                    if (!element.dataset.delay) {
                        element.dataset.delay = 'delay-1';
                    }
                }
            }
        });
        
        // Create the intersection observer
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                // Handle section observations (animate child elements in sequence)
                if (entry.target.tagName === 'SECTION') {
                    const sectionId = entry.target.id;
                    const sectionElements = sectionMap.get(sectionId) || [];
                    
                    if (entry.isIntersecting) {
                        // When section enters viewport, prepare all its elements for animation
                        sectionElements.forEach(element => {
                            // Make element visible but don't start animation yet
                            element.classList.add('animate-ready');
                            
                            // Add a small delay before applying animation classes
                            setTimeout(() => {
                                // Apply animation class
                                if (element.dataset.animation) {
                                    element.classList.add(element.dataset.animation);
                                }
                                
                                // Add delay class if it exists
                                if (element.dataset.delay) {
                                    element.classList.add(element.dataset.delay);
                                }
                            }, 50); // Short delay to ensure the animate-ready class takes effect
                        });
                        
                        // Only observe each section once
                        observer.unobserve(entry.target);
                    }
                }
                // Handle individual element observations
                else if (entry.isIntersecting) {
                    // Element is now visible in viewport
                    const element = entry.target;
                    
                    // Make element visible
                    element.classList.add('animate-ready');
                    
                    // Small delay before starting animation
                    setTimeout(() => {
                        // Apply animation class
                        if (element.dataset.animation) {
                            element.classList.add(element.dataset.animation);
                        }
                        
                        // Add delay class if it exists
                        if (element.dataset.delay) {
                            element.classList.add(element.dataset.delay);
                        }
                    }, 50);
                    
                    // Only animate once by removing from observation after being seen
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        // First observe all sections to trigger grouped animations
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
        
        // Then observe individual elements that aren't in sections or need special handling
        animateElements.forEach(element => {
            if (!element.closest('section')) {
                observer.observe(element);
            }
        });
    }
      // Check for mobile devices and disable heavy animations if needed
    function optimizeForDevice() {
        // Check if it's a mobile device or small screen
        if (window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Add a class to the body to allow specific CSS targeting
            document.body.classList.add('mobile-device');
            
            // Potentially simplify some animations for better performance
            document.querySelectorAll('.animated-element').forEach(el => {
                // For mobile, use simpler animations
                if (el.dataset.animation) {
                    // Keep original animation in a data attribute for reference
                    el.dataset.originalAnimation = el.dataset.animation;
                    el.dataset.animation = 'fade-in-up'; // Use simpler animation on mobile
                }
                
                // Reduce animation delays on mobile
                if (el.dataset.delay) {
                    const delayNum = parseInt(el.dataset.delay.replace('delay-', ''));
                    if (delayNum > 2) {
                        el.dataset.delay = 'delay-2'; // Cap delays at 2 on mobile
                    }
                }
            });
        }
    }
    
    // Handle window resize events for responsive animations
    window.addEventListener('resize', function() {
        // Throttle resize events
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            optimizeForDevice();
        }, 500);
    });
    
    // Run device optimization before animations
    optimizeForDevice();
    
    // Initialize scroll animations - run after a small delay to ensure DOM is ready
    setTimeout(initScrollAnimations, 100);
    // Add typing effect to the hero section text
    const heroText = document.querySelector('.animated-text');
    if (heroText) {
        // Save the original text
        const originalHTML = heroText.innerHTML;
        const highlightElement = heroText.querySelector('.typing-highlight');
        const highlightContent = highlightElement ? highlightElement.innerHTML : '';
        
        // Replace highlight content with a placeholder to restore later
        const textWithoutHighlight = originalHTML.replace(highlightElement ? highlightElement.outerHTML : '', 'Chileshe Khawula');
        
        // Clear the text initially
        heroText.innerHTML = '';
        
        // Typing effect function - handles special placeholder for highlight element
        function typeEffect(element, text, placeholder, highlightText, i = 0) {
            if (i < text.length) {
                // Check if we've hit our highlight placeholder
                if (i + 14 <= text.length && text.substring(i, i + 14) === '###HIGHLIGHT###') {
                    // Start typing the highlight text
                    element.innerHTML += `<span class="typing-highlight"></span>`;
                    const highlightSpan = element.querySelector('.typing-highlight');
                    
                    // Nested function to type the highlighted text
                    function typeHighlight(span, text, j = 0) {
                        if (j < text.length) {
                            span.innerHTML += text.charAt(j);
                            j++;
                            setTimeout(() => typeHighlight(span, text, j), 100);
                        }
                    }
                    
                    // Start typing the highlight
                    typeHighlight(highlightSpan, highlightText);
                    i += 14; // Skip the placeholder length
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(() => typeEffect(element, text, placeholder, highlightText, i), 50);
                }
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(() => {
            typeEffect(heroText, textWithoutHighlight, '###HIGHLIGHT###', highlightContent);
        }, 500);
    }
    
    // Initialize tilt effect for project cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15, // max tilt rotation (degrees)
            speed: 400, // speed of the tilt effect
            glare: true, // enable glare effect
            "max-glare": 0.2, // maximum glare opacity
            scale: 1.05, // scale on hover
            perspective: 1000, // perspective of tilt effect
            transition: true, // transition on hover
            easing: "cubic-bezier(.03,.98,.52,.99)", // easing of the tilt effect
            reset: true // reset tilt after mouse leaves element
        });
    }
    
    // Initialize animated cursor
    initAnimatedCursor();
    
    function initAnimatedCursor() {
        if (window.innerWidth < 992) return; // Don't initialize on mobile devices
        
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorDotOutline = document.querySelector('.cursor-dot-outline');
        
        if (!cursorDot || !cursorDotOutline) return;
        
        // Show cursors
        cursorDot.style.display = 'block';
        cursorDotOutline.style.display = 'block';
        
        // Track cursor position
        window.addEventListener('mousemove', function(e) {
            // Animated cursor follows mouse with slight delay
            gsapCursorFollow(e, cursorDot, 0.1); // Fast follow
            gsapCursorFollow(e, cursorDotOutline, 0.3); // Slower follow with delay
        });
        
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, input, textarea, .interactive');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDotOutline.style.width = '60px';
                cursorDotOutline.style.height = '60px';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorDotOutline.style.width = '40px';
                cursorDotOutline.style.height = '40px';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
        
        // Hide cursor when it leaves the window
        document.addEventListener('mouseout', function(e) {
            if (e.relatedTarget === null) {
                cursorDot.style.opacity = '0';
                cursorDotOutline.style.opacity = '0';
            }
        });
        
        document.addEventListener('mouseover', function() {
            cursorDot.style.opacity = '1';
            cursorDotOutline.style.opacity = '1';
        });
    }
    
    // Helper function to smoothly move cursor with GSAP-like animation
    function gsapCursorFollow(e, element, speed) {
        const currentX = parseFloat(element.style.left) || e.clientX;
        const currentY = parseFloat(element.style.top) || e.clientY;
        
        const dx = e.clientX - currentX;
        const dy = e.clientY - currentY;
        
        const newX = currentX + dx * speed;
        const newY = currentY + dy * speed;
        
        element.style.left = newX + 'px';
        element.style.top = newY + 'px';
        
        requestAnimationFrame(() => gsapCursorFollow(e, element, speed));
    }
    
    // Add parallax effect to hero section
    function initParallax() {
        const heroSection = document.querySelector('.hero-section');
        const shapes = document.querySelectorAll('.shape');
        const codeBubble = document.querySelector('.code-bubble');
        
        if (heroSection && (shapes.length > 0 || codeBubble)) {
            window.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                
                // Calculate percentage position
                const percentX = mouseX / windowWidth - 0.5;
                const percentY = mouseY / windowHeight - 0.5;
                
                // Apply parallax to shapes
                shapes.forEach(shape => {
                    const speed = shape.classList.contains('shape-1') ? 20 : 
                                shape.classList.contains('shape-2') ? 30 : 15;
                                
                    const translateX = percentX * speed;
                    const translateY = percentY * speed;
                    
                    shape.style.transform = `translate(${translateX}px, ${translateY}px)`;
                });
                
                // Apply parallax to code bubble
                if (codeBubble) {
                    const bubbleX = percentX * -30;
                    const bubbleY = percentY * -30;
                    
                    codeBubble.style.transform = `translate(${bubbleX}px, ${bubbleY}px)`;
                }
            });
        }
    }
    
    initParallax();
    
    // Section parallax background effects
    function initSectionParallax() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const shapes = section.querySelectorAll('.section-shape');
            
            if (shapes.length > 0) {
                window.addEventListener('scroll', () => {
                    const scrollPosition = window.scrollY;
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    // Check if section is in viewport
                    if (scrollPosition + window.innerHeight > sectionTop && 
                        scrollPosition < sectionTop + sectionHeight) {
                        
                        // Calculate how far scrolled into section (0 to 1)
                        const scrollFactor = (scrollPosition - sectionTop + window.innerHeight) / 
                                            (window.innerHeight + sectionHeight);
                                            
                        // Apply different transform to each shape
                        shapes.forEach((shape, index) => {
                            const direction = index % 2 === 0 ? 1 : -1;
                            const translateY = (scrollFactor * 50 * direction) - 25;
                            const rotate = scrollFactor * 15 * direction;
                            
                            shape.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
                        });
                    }
                });
            }
        });
    }
    
    initSectionParallax();
      // No glitch effect - removed
});
