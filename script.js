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
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Toggle hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // 3D Animation 
    document.addEventListener('DOMContentLoaded', function () {
        const floorCount = 10;
        const elevatorShaft = document.querySelector('.elevator-shaft');
        const elevatorCar = document.querySelector('.elevator-car');
        const floorHeight = elevatorShaft.clientHeight / floorCount;
    
        for (let i = 0; i < floorCount; i++) {
            const floorNum = floorCount - i;
            const yPos = i * floorHeight;
    
            const floor = document.createElement('div');
            floor.className = 'floor';
            floor.style.bottom = `${yPos}px`;
            floor.dataset.floor = floorNum;
            elevatorShaft.appendChild(floor);
    
            const label = document.createElement('div');
            label.className = 'floor-label';
            label.textContent = `Floor ${floorNum}`;
            label.style.bottom = `${yPos - 10}px`;
            elevatorShaft.appendChild(label);
        }
    
        const floorSelector = document.querySelector('.floor-selector');
        for (let i = floorCount; i >= 1; i--) {
            const btn = document.createElement('div');
            btn.className = 'floor-btn';
            btn.textContent = i;
            btn.dataset.floor = i;
            floorSelector.appendChild(btn);
    
            btn.addEventListener('click', function () {
                selectFloor(i);
            });
        }
    
        function createParticles() {
            const particles = document.querySelector('.particles');
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.opacity = Math.random() * 0.5 + 0.2;
                particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particles.appendChild(particle);
            }
        }
    
        createParticles();
    
        const scene = document.querySelector('.elevator-scene');
        const glow = document.createElement('div');
        glow.className = 'glow';
        scene.appendChild(glow);
    
        scene.addEventListener('mousemove', function (e) {
            const rect = scene.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
    
            glow.style.left = `${x - 150}px`;
            glow.style.top = `${y - 150}px`;
        });
    
        let currentFloor = 1;
        let destinationFloor = null;
        let doorsOpen = false;
    
        function selectFloor(floor) {
            if (floor === currentFloor && !doorsOpen) {
                toggleDoors();
                return;
            }
    
            destinationFloor = floor;
            document.getElementById('destination-floor').textContent = floor;
    
            const notification = document.querySelector('.notification');
            notification.textContent = `Floor Selected: ${floor}`;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
    
            if (doorsOpen) {
                toggleDoors();
                setTimeout(() => {
                    moveElevator(floor);
                }, 1500);
            } else {
                moveElevator(floor);
            }
    
            document.querySelectorAll('.floor-btn').forEach(btn => {
                btn.classList.remove('active');
                if (parseInt(btn.dataset.floor) === floor) {
                    btn.classList.add('active');
                }
            });
        }
    
        function moveElevator(floor) {
            const newPosition = (floor - 1) * floorHeight;
            elevatorCar.style.bottom = `${newPosition}px`;
    
            document.querySelector('.status-value').textContent = 'Moving';
    
            setTimeout(() => {
                currentFloor = floor;
                document.getElementById('current-floor').textContent = floor;
                document.querySelector('.status-value').textContent = 'Ready';
                toggleDoors();
    
                setTimeout(() => {
                    document.getElementById('destination-floor').textContent = '-';
                    destinationFloor = null;
                }, 1500);
            }, 2000);
        }
    
        function toggleDoors() {
            const leftDoor = document.querySelector('.door.left');
            const rightDoor = document.querySelector('.door.right');
    
            if (doorsOpen) {
                leftDoor.classList.remove('open');
                rightDoor.classList.remove('open');
                doorsOpen = false;
            } else {
                leftDoor.classList.add('open');
                rightDoor.classList.add('open');
                doorsOpen = true;
            }
        }
    
        document.querySelector('.door-btn').addEventListener('click', toggleDoors);
    
        document.querySelector('.call').addEventListener('click', function () {
            if (destinationFloor === null) {
                const notification = document.querySelector('.notification');
                notification.textContent = 'Please select a floor first';
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
                return;
            }
    
            selectFloor(destinationFloor);
        });
    
        function randomMove() {
            if (destinationFloor === null) {
                const randomFloor = Math.floor(Math.random() * floorCount) + 1;
                if (randomFloor !== currentFloor) {
                    selectFloor(randomFloor);
                }
            }
    
            setTimeout(randomMove, Math.random() * 20000 + 10000);
        }
    
        setTimeout(randomMove, 15000);
    });
    


    // Testimonial Slider
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // Initialize first slide
    if (testimonialCards.length > 0) {
        testimonialCards[0].classList.add('active');
    }

    function showSlide(index) {
        // Hide all slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the current slide and activate dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        // Next slide button
        nextBtn.addEventListener('click', function () {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        });

        // Previous slide button
        prevBtn.addEventListener('click', function () {
            currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            showSlide(currentSlide);
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto slide every 5 seconds
        setInterval(function () {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    hamburger.click();
                }
            }
        });
    });

    // Animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .tech-item, .process-step, .testimonial-card, .faq-item');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animation
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Check for elements in view on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);

    // Preload background images
    function preloadImages() {
        const images = [
            'elevator-hero.jpg',
            'elevator-tech.jpg',
            'logo.png'
        ];

        images.forEach(image => {
            const img = new Image();
            img.src = image;
        });
    }

    preloadImages();
});