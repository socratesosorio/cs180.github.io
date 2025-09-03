// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll direction
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
}

window.addEventListener('scroll', updateNavbar);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.stat-item, .step, .image-placeholder, .analysis, .mini-step, .frame-placeholder'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Parallax Effect for Hero Section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
}

window.addEventListener('scroll', updateParallax);

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Image Placeholder Interactions
document.querySelectorAll('.image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        // Create a file input for uploading images
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    placeholder.style.backgroundImage = `url(${e.target.result})`;
                    placeholder.style.backgroundSize = 'cover';
                    placeholder.style.backgroundPosition = 'center';
                    placeholder.innerHTML = '';
                    
                    // Add overlay for better text visibility
                    const overlay = document.createElement('div');
                    overlay.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: inherit;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 600;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    `;
                    overlay.textContent = 'Click to change image';
                    
                    placeholder.style.position = 'relative';
                    placeholder.appendChild(overlay);
                    
                    placeholder.addEventListener('mouseenter', () => {
                        overlay.style.opacity = '1';
                    });
                    
                    placeholder.addEventListener('mouseleave', () => {
                        overlay.style.opacity = '0';
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });
    
    // Add hover effect for empty placeholders
    placeholder.addEventListener('mouseenter', function() {
        if (!this.style.backgroundImage) {
            this.style.background = 'linear-gradient(135deg, #cbd5e0, #a0aec0)';
            this.style.transform = 'scale(1.02)';
        }
    });
    
    placeholder.addEventListener('mouseleave', function() {
        if (!this.style.backgroundImage) {
            this.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e0)';
            this.style.transform = 'scale(1)';
        }
    });
});

// GIF Placeholder Interaction
document.querySelector('.gif-placeholder')?.addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.gif,image/gif';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file && file.type === 'image/gif') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: inherit;
                `;
                
                // Clear placeholder and add GIF
                document.querySelector('.gif-placeholder').innerHTML = '';
                document.querySelector('.gif-placeholder').appendChild(img);
                document.querySelector('.gif-placeholder').style.background = 'transparent';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a GIF file.');
        }
    };
    
    input.click();
});



// Progress Indicator
function createProgressIndicator() {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--berkeley-gold);
        z-index: 999;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progress.style.width = `${scrolled}%`;
        
        // Check if navbar is hidden and adjust progress bar position
        const navbar = document.querySelector('.navbar');
        const navbarTransform = window.getComputedStyle(navbar).transform;
        
        if (navbarTransform === 'matrix(1, 0, 0, 1, 0, -70)' || navbar.style.transform === 'translateY(-100%)') {
            // Navbar is hidden, move progress bar to top
            progress.style.top = '0px';
        } else {
            // Navbar is visible, keep progress bar below it
            progress.style.top = '70px';
        }
    });
}

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                
                if (finalNumber === '∞') return; // Skip infinity symbol
                
                let current = 0;
                const increment = 1;
                const duration = 2000;
                const stepTime = duration / parseInt(finalNumber);
                
                const timer = setInterval(() => {
                    current += increment;
                    target.textContent = current;
                    
                    if (current >= parseInt(finalNumber)) {
                        target.textContent = finalNumber;
                        clearInterval(timer);
                    }
                }, stepTime);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Dark Mode Toggle (Optional Enhancement)
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--berkeley-blue);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: var(--shadow-medium);
        transition: var(--transition);
        z-index: 1000;
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = toggle.querySelector('i');
        icon.className = document.body.classList.contains('dark-mode') 
            ? 'fas fa-sun' 
            : 'fas fa-moon';
    });
    
    document.body.appendChild(toggle);
}

// Toggle Extra Examples
function toggleExtraExamples() {
    const extraContent = document.getElementById('part2-extra');
    const button = document.querySelector('.show-extra-btn');
    const buttonText = button.querySelector('span');
    const buttonIcon = button.querySelector('i');
    
    if (extraContent.style.display === 'none') {
        extraContent.style.display = 'block';
        button.classList.add('active');
        buttonText.textContent = 'Hide Additional Example';
        buttonIcon.className = 'fas fa-minus';
    } else {
        extraContent.style.display = 'none';
        button.classList.remove('active');
        buttonText.textContent = 'Show Additional Example';
        buttonIcon.className = 'fas fa-plus';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createProgressIndicator();
    animateCounters();
    // createDarkModeToggle(); // Uncomment if you want dark mode
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        padding: 1rem 0;
        box-shadow: var(--shadow-soft);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-soft);
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .dark-mode {
        background: #1a202c;
        color: #e2e8f0;
    }
    
    .dark-mode .section.alt {
        background: #2d3748;
    }
    
    .dark-mode .navbar {
        background: rgba(26, 32, 44, 0.95);
    }
    
    .dark-mode .step,
    .dark-mode .stat-item,
    .dark-mode .mini-step {
        background: #2d3748;
        color: #e2e8f0;
    }
`;
document.head.appendChild(style);
