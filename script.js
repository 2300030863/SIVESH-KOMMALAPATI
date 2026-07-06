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
    // Disable parallax on mobile to prevent cards from colliding vertically
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.about-card, .skill-category, .project-card').forEach(el => {
            el.style.transform = '';
        });
        return;
    }

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

// ==================== READ MORE TOGGLE ==================== //
function toggleReadMore(contentId, btnElement) {
    const content = document.getElementById(contentId);
    if (!content) return;
    
    const isExpanded = content.classList.contains('expanded');
    
    if (isExpanded) {
        content.classList.remove('expanded');
        btnElement.classList.remove('expanded');
        btnElement.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
    } else {
        content.classList.add('expanded');
        btnElement.classList.add('expanded');
        btnElement.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
    }
}

// ==================== 3D MOVING BACKGROUND (THREE.JS) ==================== //
function init3DBackground() {
    if (typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    
    document.body.prepend(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.008,
        color: 0x06B6D4,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    
    camera.position.z = 4;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
        
        particlesMesh.position.y = Math.sin(elapsedTime * 0.3) * 0.15;
        
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize 3D UI Effects and Mobile Nav
function initUI() {
    // 1. Initialize interactive 3D background
    init3DBackground();
    
    // 2. Initialize Vanilla Tilt for 3D card movement (desktop only)
    if (typeof VanillaTilt !== 'undefined' && window.innerWidth > 768) {
        VanillaTilt.init(document.querySelectorAll(".glass-effect"), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
    }

    // 3. Mobile Navigation Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
}

// Execute immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUI);
} else {
    initUI();
}
