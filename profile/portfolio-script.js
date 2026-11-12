/* ========================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   ======================================== */

// ========================================
// SCROLL PROGRESS BAR
// ========================================

const scrollProgressBar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgressBar.style.width = scrolled + '%';
});

// ========================================
// DARK MODE TOGGLE
// ========================================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        updateThemeIcon();
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========================================
// LANGUAGE TOGGLE
// ========================================

const langToggle = document.getElementById('lang-toggle');
let currentLanguage = localStorage.getItem('language') || 'en';

function initLanguage() {
    if (currentLanguage === 'tn') {
        switchLanguage('tn');
        langToggle.textContent = 'EN/TN ✓';
    }
}

langToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'tn' : 'en';
    switchLanguage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
    langToggle.textContent = currentLanguage === 'tn' ? 'EN/TN ✓' : 'EN/TN';
});

function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        if (lang === 'tn' && el.hasAttribute('data-tn')) {
            el.textContent = el.getAttribute('data-tn');
        } else if (lang === 'en' && el.hasAttribute('data-en')) {
            el.textContent = el.getAttribute('data-en');
        }
    });

    // Update placeholders
    const inputElements = document.querySelectorAll('[data-en-placeholder]');
    inputElements.forEach(el => {
        if (lang === 'tn' && el.hasAttribute('data-tn-placeholder')) {
            el.placeholder = el.getAttribute('data-tn-placeholder');
        } else if (lang === 'en' && el.hasAttribute('data-en-placeholder')) {
            el.placeholder = el.getAttribute('data-en-placeholder');
        }
    });
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLLING & ACTIVE LINK HIGHLIGHT
// ========================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-item, .soft-skill, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// STATS COUNTER ANIMATION
// ========================================

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// Observe stats section for animation trigger
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            statsObserver.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');

// Advanced Form Validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.subject || formData.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: contactForm.querySelector('input[type="text"]').value.trim(),
        email: contactForm.querySelector('input[type="email"]').value.trim(),
        subject: contactForm.querySelectorAll('input[type="text"]')[1].value.trim(),
        message: contactForm.querySelector('textarea').value.trim(),
        timestamp: new Date().toISOString()
    };

    // Validate form
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Show success message
    showNotification('✅ Message sent successfully! Thank you for reaching out!', 'success');
    
    // Reset form with animation
    contactForm.reset();
    contactForm.style.opacity = '0.5';
    setTimeout(() => {
        contactForm.style.opacity = '1';
    }, 500);
});

    // In production, send to backend:
    // try {
    //     const response = await fetch('/api/contact', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(formData)
    //     });
    //     if (response.ok) {
    //         showNotification('Message sent successfully!', 'success');
    //         contactForm.reset();
    //     }
    // } catch (error) {
    //     showNotification('Error sending message. Please try again.', 'error');
    // }
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '#2ECC71' : '#E74C3C';
    const shadowColor = type === 'success' ? 'rgba(46, 204, 113, 0.3)' : 'rgba(231, 76, 60, 0.3)';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${bgColor};
        color: white;
        border-radius: 8px;
        box-shadow: 0 8px 24px ${shadowColor};
        z-index: 2000;
        animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-weight: 500;
        max-width: 350px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Add notification animations to style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// SKILLS ANIMATION ON SCROLL
// ========================================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ========================================
// KEYBOARD SHORTCUTS & ACCESSIBILITY
// ========================================

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to scroll to contact
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        showNotification('📧 Navigated to Contact section', 'success');
    }
    
    // Alt + T to toggle theme
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Alt + L to toggle language
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        langToggle.click();
    }
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: var(--shadow);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// PARALLAX EFFECT ON HERO SECTION
// ========================================

const hero = document.querySelector('.hero');
const shapes = document.querySelectorAll('.animated-shape');

window.addEventListener('mousemove', (e) => {
    if (window.pageYOffset < window.innerHeight) {
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;

        shapes.forEach((shape, index) => {
            shape.style.transform = `translate(${x * (index + 1)}px, ${y * (index + 1)}px)`;
        });
    }
});

// ========================================
// PROJECT LINKS ENHANCEMENT
// ========================================

const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.href === '#') {
            e.preventDefault();
            showNotification('🚀 Project demo coming soon! Stay tuned.', 'success');
        }
    });
    
    // Add keyboard accessibility
    link.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// SOCIAL ICONS ANIMATION
// ========================================

const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px) scale(1.1)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    setupLazyLoading();
    console.log('🚀 Portfolio loaded with advanced features!');
});

// ========================================
// LAZY LOADING IMAGES
// ========================================

function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.style.animation = 'fadeIn 0.6s ease';
                }
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// ACTIVE NAV LINK ON LOAD
// ========================================

window.addEventListener('load', () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').slice(1) === 'home') {
                link.classList.add('active');
            }
        });
    }
});
