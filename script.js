// Wait for the document to load completely
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
                
                // Scroll to target
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Set active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message || !service) {
                showAlert('Please fill all required fields', 'danger');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }
            
            // Phone validation (optional field)
            if (phone) {
                const phoneRegex = /^\d{10,15}$/;
                if (!phoneRegex.test(phone.replace(/[\s()-]/g, ''))) {
                    showAlert('Please enter a valid phone number', 'danger');
                    return;
                }
            }
            
            // Simulate form submission
            showAlert('Your message has been sent successfully! We will contact you soon.', 'success');
            contactForm.reset();
            
            // In a real application, you would send this data to your server
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

    // Show alert message
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Insert alert before the form
        contactForm.parentElement.insertBefore(alertDiv, contactForm);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            const alert = document.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    }

    // FAQ Accordion Management
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(0, 123, 255, 0.05)';
        });
        
        header.addEventListener('mouseleave', function() {
            if (!this.querySelector('.accordion-button').classList.contains('collapsed')) {
                this.style.backgroundColor = 'rgba(0, 123, 255, 0.05)';
            } else {
                this.style.backgroundColor = '';
            }
        });
    });

    // Add animation effects on scroll
    const animatedElements = document.querySelectorAll('.service-card, .job-card, .about-feature');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animation = 'fadeInUp 0.5s ease forwards';
                element.style.opacity = '1';
            }
        });
    }
    
    // Set initial opacity
    animatedElements.forEach(element => {
        element.style.opacity = '0';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkAnimations);
    window.addEventListener('scroll', checkAnimations);

    // Define fadeInUp animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.append(style);

    // Carousel testimonials auto-play (if you add testimonials later)
    const testimonialsCarousel = document.querySelector('#testimonialsCarousel');
    if (testimonialsCarousel) {
        new bootstrap.Carousel(testimonialsCarousel, {
            interval: 5000,
            ride: 'carousel'
        });
    }

    // Service hover effect for cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 123, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Job cards hover effect
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 123, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Navbar mobile menu close when clicking outside
    document.addEventListener('click', function(event) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse.classList.contains('show') &&
            !event.target.closest('.navbar') &&
            !event.target.closest('.navbar-toggler')) {
            navbarToggler.click();
        }
    });
});