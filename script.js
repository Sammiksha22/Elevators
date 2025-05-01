// Wait for the document to load completely
document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (backToTop) backToTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            if (backToTop) backToTop.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {  // avoid empty href
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });

                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY + 120;
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message || !service) {
                showAlert('Please fill all required fields', 'danger');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }

            if (phone) {
                const phoneRegex = /^\d{10,15}$/;
                if (!phoneRegex.test(phone.replace(/[\s()-]/g, ''))) {
                    showAlert('Please enter a valid phone number', 'danger');
                    return;
                }
            }

            showAlert('Your message has been sent successfully!', 'success');
            contactForm.reset();

            console.log({
                name,
                email,
                phone,
                service,
                message,
                timestamp: new Date()
            });
        });
    }

    // Show alert
    function showAlert(message, type) {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) existingAlert.remove();

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        contactForm.parentElement.insertBefore(alertDiv, contactForm);

        setTimeout(() => {
            const alert = document.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    }

    // Animate service cards, about features, and job cards on scroll
    const animatedElements = document.querySelectorAll('.service-card, .about-feature, .job-card');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.9;
    }

    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animation = 'fadeInUp 0.6s ease forwards';
                element.style.opacity = '1';
            }
        });
    }

    animatedElements.forEach(el => el.style.opacity = '0');

    window.addEventListener('load', checkAnimations);
    window.addEventListener('scroll', checkAnimations);

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.append(style);

    // Carousel auto-play
    const testimonialsCarousel = document.querySelector('#elevatorCarousel');
    if (testimonialsCarousel) {
        new bootstrap.Carousel(testimonialsCarousel, {
            interval: 5000,
            ride: 'carousel'
        });
    }

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse && navbarCollapse.classList.contains('show') && !e.target.closest('.navbar')) {
            navbarToggler.click();
        }
    });

});


// Script for Elevator Modernization Website

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const header = document.querySelector('header');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
    });
});

// Scroll to section when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        // Skip if it's just "#" with no specific target
        if (targetId === '#') return;

        const sectionId = targetId.replace('#', '');
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            // Smooth scroll to the section
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });

            // Update active class
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        } else {
            console.error(`Section with ID "${sectionId}" not found`);
        }
    });
});

// Sticky header
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Testimonial Slider
let currentTestimonial = 0;
const totalTestimonials = testimonials.length;

// Initialize testimonial slider
function initTestimonialSlider() {
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

// Show specific testimonial
function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

// Next testimonial
function nextTestimonial() {
    currentTestimonial++;
    if (currentTestimonial >= totalTestimonials) {
        currentTestimonial = 0;
    }
    showTestimonial(currentTestimonial);
}

// Previous testimonial
function prevTestimonial() {
    currentTestimonial--;
    if (currentTestimonial < 0) {
        currentTestimonial = totalTestimonials - 1;
    }
    showTestimonial(currentTestimonial);
}

// Event listeners for testimonial controls
nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Stop auto-rotation when interacting with controls
function resetInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

nextBtn.addEventListener('click', resetInterval);
prevBtn.addEventListener('click', resetInterval);
dots.forEach(dot => {
    dot.addEventListener('click', resetInterval);
});

// Reveal animations for sections
const revealElements = document.querySelectorAll('.benefit-card, .feature, .project-card, .timeline-item');

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 150) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Apply initial styles for animation
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-in-out';
});

// Initialize animations
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
    revealOnScroll();
    initTestimonialSlider();
});

// Pause testimonial rotation when hovering over slider
const testimonialSlider = document.querySelector('.testimonials-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextTestimonial, 5000);
});

// Form validation for contact form (if added later)
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const message = document.querySelector('#message');

            if (name && name.value.trim() === '') {
                alert('Please enter your name');
                name.focus();
                return false;
            }

            if (email && email.value.trim() === '') {
                alert('Please enter your email');
                email.focus();
                return false;
            }

            if (message && message.value.trim() === '') {
                alert('Please enter your message');
                message.focus();
                return false;
            }

            // Simulate form submission
            alert('Thank you for your message. We will get back to you shortly!');
            contactForm.reset();
        });
    }
});

//upgrade section learn more
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Add scrolling animation to elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .tech-item, .benefit-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Handle comparison slider interaction
    const comparisonSlider = document.querySelector('.comparison-slider');
    if (comparisonSlider) {
        const before = document.querySelector('.before');
        const sliderHandle = document.querySelector('.slider-handle');
        let isDragging = false;
        
        const moveSlider = function(x) {
            let position = (x - comparisonSlider.getBoundingClientRect().left) / comparisonSlider.offsetWidth;
            
            // Limit position between 0 and 1
            position = Math.max(0, Math.min(1, position));
            
            // Update before element width
            before.style.width = position * 100 + '%';
            
            // Update slider handle position
            sliderHandle.style.left = position * 100 + '%';
        };
        
        // Mouse events
        sliderHandle.addEventListener('mousedown', function() {
            isDragging = true;
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                moveSlider(e.clientX);
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        // Touch events
        sliderHandle.addEventListener('touchstart', function() {
            isDragging = true;
        });
        
        document.addEventListener('touchmove', function(e) {
            if (isDragging) {
                moveSlider(e.touches[0].clientX);
            }
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
        
        // Click on slider
        comparisonSlider.addEventListener('click', function(e) {
            moveSlider(e.clientX);
        });
    }
    
    // Animation for numbers in stats
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Handle percentage values
            if (element.textContent.includes('%')) {
                element.textContent = value + '%';
            } 
            // Handle x values (like 2x)
            else if (element.textContent.includes('x')) {
                element.textContent = value + 'x';
            }
            // Handle other values
            else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Fix navbar on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Add glitch effect to glitch-text elements
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        const content = text.textContent;
        text.setAttribute('data-text', content);
    });
    
    // Back to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.classList.add('back-to-top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 700) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});