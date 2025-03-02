// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to elements as they enter the viewport
    const fadeElements = document.querySelectorAll('.feature-card, .solution-card, .testimonial-card, .section-heading');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            
            if (navLinks) {
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                } else {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '80px';
                    navLinks.style.left = '0';
                    navLinks.style.width = '100%';
                    navLinks.style.padding = '20px';
                    navLinks.style.backgroundColor = 'var(--white)';
                    navLinks.style.boxShadow = 'var(--shadow)';
                }
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
            }
        });
    });
    
    // Add active state to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightCurrentSection() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Add CSS for active navigation links
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--primary);
            font-weight: 600;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -8px);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize form validation for the contact form if exists
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    submitButton.textContent = 'Message Sent!';
                    submitButton.style.backgroundColor = 'var(--success)';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Restore button after 3 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.style.backgroundColor = '';
                        submitButton.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Add click handlers for CTA buttons
    document.querySelectorAll('.primary-btn, .secondary-btn').forEach(button => {
        button.addEventListener('click', () => {
            // For demo purposes, just log the button click
            console.log('Button clicked:', button.textContent.trim());
            
            // You would typically handle navigation or modal opening here
            if (button.textContent.includes('Demo')) {
                alert('Demo video would play here in a production environment');
            }
            
            if (button.textContent.includes('Trial') || button.textContent.includes('Started')) {
                alert('Sign up form would open here in a production environment');
            }
        });
    });
}); 