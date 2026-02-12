// Main JavaScript file for portfolio website

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const downloadResumeBtn = document.getElementById('download-resume');

// Typing Effect
const typingText = document.getElementById('typing-text');
const skills = [
    'Java & Spring Boot',
    'React.js Development',
    'REST API Design',
    'Tailwind CSS Styling',
    'Database Management',
    'Full Stack Development'
];
let skillIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initTypingEffect();
    initScrollReveal();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
    initDownloadResume();
});

// Typing Effect Function
function initTypingEffect() {
    if (!typingText) return;
    
    function type() {
        const currentSkill = skills[skillIndex];
        
        if (isDeleting) {
            typingText.textContent = currentSkill.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentSkill.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentSkill.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            skillIndex = (skillIndex + 1) % skills.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Scroll Reveal Animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    function reveal() {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
}

// Mobile Menu
function initMobileMenu() {
    if (!mobileMenuBtn || !mobileMenu || !closeMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
    
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
    
    // Close menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Active Navigation Highlight
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-white');
                    link.classList.add('text-gray-300');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.remove('text-gray-300');
                    activeLink.classList.add('text-white');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
}

// Download Resume
function initDownloadResume() {
    if (!downloadResumeBtn) return;
    
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = 'assets/resume.pdf'; // Update with actual resume path
        link.download = 'MARAGANI_MOHANA_VENKATA_SAI_Resume.pdf';
        link.style.display = 'none';
        
        // Add to DOM and trigger click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        showNotification('Resume download started!', 'success');
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 px-6 py-3 rounded-lg text-white font-medium z-50 transform translate-x-full transition-transform duration-300`;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #6366F1, #22D3EE)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax Effect for Hero Section - DISABLED to prevent overlap issues
function initParallax() {
    // Parallax effect removed as it was causing content overlap when scrolling
    // The hero section should remain static for better UX
    return;
}

// Initialize parallax on scroll
// initParallax(); // Disabled to prevent scroll issues

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations and effects
}, 10));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
});

// Add touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    }
    
    if (touchEndX > touchStartX + 50) {
        // Swipe right - could be used to open menu
        // Currently not implemented as it might interfere with normal scrolling
    }
}

// Add intersection observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Console welcome message
console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; color: #6366F1; font-weight: bold;');
console.log('%cBuilt with HTML5, Tailwind CSS, and Vanilla JavaScript', 'font-size: 14px; color: #22D3EE;');
console.log('%cFeel free to explore the code!', 'font-size: 12px; color: #94A3B8;');
