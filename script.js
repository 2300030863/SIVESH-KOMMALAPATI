// ==================== TYPING ANIMATION ==================== //
const typingElement = document.querySelector('.typing-effect');
const phrases = [
    'Full Stack Java Developer',
    'AI & Full Stack Developer',
    'Passionate Problem Solver',
    'Tech Innovator',
    'Building Intelligent Solutions'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting && charIndex < currentPhrase.length) {
        typingElement.textContent += currentPhrase[charIndex];
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, 50);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => {
            isDeleting = true;
            typeEffect();
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

// ==================== SMOOTH SCROLL ==================== //
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== NAVIGATION SCROLL HIGHLIGHT ==================== //
document.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
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

// ==================== MOBILE MENU TOGGLE ==================== //
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ==================== THREE.JS SETUP ==================== //
function setupThreeJS() {
    const container = document.getElementById('canvas-container');
    
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    camera.position.z = 2;

    // Create Floating Sphere
    const geometrySphere = new THREE.IcosahedronGeometry(1, 4);
    const materialSphere = new THREE.MeshPhongMaterial({
        color: 0x06B6D4,
        emissive: 0x00B3CC,
        wireframe: false,
        shininess: 100
    });
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    scene.add(sphere);

    // Create Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x06B6D4,
        size: 0.02,
        sizeAttenuation: true
    });

    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const light1 = new THREE.DirectionalLight(0x06B6D4, 1);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x3B82F6, 0.5);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate sphere
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;

        // Mouse interaction
        sphere.rotation.x += mouseY * 0.001;
        sphere.rotation.y += mouseX * 0.001;

        // Float animation
        sphere.position.y += Math.sin(Date.now() * 0.0005) * 0.0005;

        // Rotate particles
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// Initialize Three.js after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupThreeJS);
} else {
    setupThreeJS();
}

// ==================== GSAP SCROLL ANIMATIONS ==================== //
gsap.registerPlugin(ScrollTrigger);

// Fade in sections on scroll
document.querySelectorAll('section').forEach(section => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: 'power3.out'
    });
});

// Animate skill tags
// Animate skill tags - with better initial state
gsap.utils.toArray('.skill-tag').forEach((element, index) => {
    gsap.set(element, { opacity: 1, y: 0 }); // Ensure visible initially
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        duration: 0.4,
        delay: index * 0.03,
        scale: 1.05,
        ease: 'back.out(1.7)'
    });
});

// Animate project cards - now visible by default
gsap.utils.toArray('.project-card').forEach((element, index) => {
    gsap.set(element, { opacity: 1, x: 0 }); // Ensure visible initially
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        duration: 0.6,
        delay: index * 0.1,
        scale: 1.02,
        ease: 'power3.out'
    });
});

// Animate timeline items - now visible by default
gsap.utils.toArray('.timeline-item').forEach((element, index) => {
    gsap.set(element, { opacity: 1, x: 0 }); // Ensure visible initially
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        duration: 0.6,
        delay: index * 0.08,
        scale: 1.02,
        ease: 'power3.out'
    });
});

// ==================== FORM HANDLING ==================== //
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #06B6D4, #3B82F6)';
        submitBtn.disabled = true;

        contactForm.reset();

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 4000);
    });
}

// ==================== PARALLAX EFFECT ==================== //
document.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const elements = document.querySelectorAll('.about-card, .skill-category, .project-card');

    elements.forEach((element, index) => {
        // Prevent excessive translation for items lower on the page
        const offset = scrollPosition * (0.5 + (index % 5) * 0.1);
        element.style.transform = `translateY(${offset * 0.03}px)`;
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fade-in 0.6s ease';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// ==================== SMOOTH SCROLL LINKS ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== PAGE LOAD ANIMATION ==================== //
window.addEventListener('load', () => {
    gsap.from('.hero-content', {
        duration: 1,
        opacity: 0,
        y: 30,
        stagger: 0.2
    });
});

// ==================== CURSOR GLOW EFFECT (Optional Enhancement) ==================== //
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Optional: Add custom cursor glow effect here
    // This can be expanded based on design requirements
});

// ==================== PERFORMANCE OPTIMIZATION ==================== //
// Lazy load images (if you add image elements later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// Log for debugging (remove in production)
console.log('Portfolio loaded successfully!');
console.log('Welcome to Sivesh Kommalapati\'s Portfolio');
