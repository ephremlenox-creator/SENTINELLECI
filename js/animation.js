// ===========================
// CUSTOM CURSOR
// ===========================
const createCursorFollower = () => {
    if (window.matchMedia('(pointer: fine)').matches) {
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        document.body.appendChild(follower);
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Créer une traînée occasionnelle
            if (Math.random() > 0.8) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.width = '15px';
                trail.style.height = '15px';
                trail.style.left = (mouseX - 7.5) + 'px';
                trail.style.top = (mouseY - 7.5) + 'px';
                document.body.appendChild(trail);
                setTimeout(() => trail.remove(), 600);
            }
        });
        
        const animate = () => {
            followerX += (mouseX - followerX) * 0.2;
            followerY += (mouseY - followerY) * 0.2;
            
            follower.style.left = (followerX - 10) + 'px';
            follower.style.top = (followerY - 10) + 'px';
            
            requestAnimationFrame(animate);
        };
        animate();
    }
};

// ===========================
// TYPEWRITER EFFECT - HERO TITLE
// ===========================
const initTypewriter = () => {
    const h1 = document.querySelector('.hero-content h1');
    if (!h1) return;
    
    const text = h1.textContent;
    h1.textContent = '';
    h1.style.width = 'fit-content';
    
    let index = 0;
    const speed = 50;
    
    const type = () => {
        if (index < text.length) {
            h1.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    // Start après un petit délai
    setTimeout(type, 300);
};

// ===========================
// PULSE BUTTONS - HERO CTA
// ===========================
const initPulseButtons = () => {
    const buttons = document.querySelectorAll('.hero-buttons .btn');
    buttons.forEach(btn => {
        btn.classList.add('pulse-button');
    });
};

// ===========================
// FLOATING PARTICLES
// ===========================
const createFloatingParticles = () => {
    const heroSection = document.querySelector('#hero');
    if (!heroSection) return;
    
    const particleCount = 20;
    const colors = ['#00A86B', '#FF6B35'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 10;
        const delay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.bottom = '-10px';
        particle.style.background = color;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        heroSection.appendChild(particle);
        
        setTimeout(() => particle.remove(), (duration + delay) * 1000);
    }
};

// Créer des particules en boucle
const initParticleLoop = () => {
    createFloatingParticles();
    setInterval(createFloatingParticles, 10000);
};

// ===========================
// PROGRESS BAR
// ===========================
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('hidden');
});

// Fermer menu au clic sur un lien (mobile seulement)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // Vérifier si on est en mobile
        if (window.innerWidth < 768) {
            hamburger.classList.remove('active');
            navLinks.classList.add('hidden');
        }
    });
    
    // Ajouter bounce effect au hover
    link.classList.add('bounce-on-hover');
});

// ===========================
// INTERSECTION OBSERVER (Animations au scroll)
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Appliquer fade-from-left ou fade-from-right selon le secteur
            const sectionIndex = Array.from(document.querySelectorAll('section')).indexOf(
                entry.target.closest('section') || entry.target
            );
            
            if (sectionIndex % 2 === 0) {
                entry.target.classList.add('fade-from-left');
            } else {
                entry.target.classList.add('fade-from-right');
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.problem-card, .profile-card, .blockchain-card, .counter, .timeline-item').forEach((el, index) => {
    // Ajouter stagger delay
    el.style.setProperty('--stagger-delay', (index * 0.1) + 's');
    el.classList.add('stagger-in');
    observer.observe(el);
});

// ===========================
// STATS BANNER - COUNT UP AVEC SCALE BOUNCE
// ===========================
function animateCounterWithBounce(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            element.classList.add('scale-bounce');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach((stat, index) => {
                setTimeout(() => {
                    const textContent = stat.textContent;
                    const value = parseInt(textContent.replace(/[%<>+]/g, ''));
                    
                    if (!isNaN(value)) {
                        animateCounterWithBounce(stat, value);
                    }
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsBanner = document.querySelector('.stats-banner');
if (statsBanner) {
    statsObserver.observe(statsBanner);
}

// ===========================
// PROBLEM CARDS - SHIMMER & STAGGER
// ===========================
const initProblemCards = () => {
    const cards = document.querySelectorAll('.problem-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
        
        // Ajouter shimmer au hover
        const originalOnMouseEnter = card.onmouseenter;
        card.addEventListener('mouseenter', () => {
            const shimmer = document.createElement('div');
            shimmer.className = 'shimmer-effect';
            shimmer.style.position = 'absolute';
            shimmer.style.top = '0';
            shimmer.style.left = '0';
            shimmer.style.right = '0';
            shimmer.style.bottom = '0';
            shimmer.style.borderRadius = '12px';
            shimmer.style.pointerEvents = 'none';
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(shimmer);
            
            setTimeout(() => shimmer.remove(), 2000);
        });
    });
};

// ===========================
// COMPTEURS ANIMÉS AVEC FLASH
// ===========================
function animateCounterWithFlash(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            element.classList.add('color-flash');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observer pour les compteurs
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counterNumber = entry.target.querySelector('.counter-number');
            const textContent = counterNumber.textContent;
            
            if (textContent === '∞') {
                counterNumber.style.animation = 'fadeIn 0.6s ease-out';
            } else if (textContent.includes('-')) {
                const value = parseInt(textContent.replace('%', ''));
                animateCounterWithFlash(counterNumber, value);
                counterNumber.textContent = value + '%';
            } else if (textContent.includes('+')) {
                const value = parseInt(textContent.replace('%', ''));
                animateCounterWithFlash(counterNumber, value);
                counterNumber.textContent = '+' + value + '%';
            } else if (textContent.includes('100')) {
                animateCounterWithFlash(counterNumber, 100);
                counterNumber.textContent = '100%';
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.counter').forEach(el => {
    counterObserver.observe(el);
});

// ===========================
// TIMELINE - ROTATION & LINE FILL
// ===========================
const initTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        
        // Créer pseudo-élément pour la rotation
        const rotatingElement = document.createElement('div');
        rotatingElement.style.fontSize = '2rem';
        rotatingElement.textContent = '●';
        rotatingElement.style.color = 'var(--color-emerald)';
        rotatingElement.style.position = 'absolute';
        rotatingElement.style.top = '20px';
        rotatingElement.style.left = '50%';
        rotatingElement.style.transform = 'translateX(-50%)';
        
        item.style.position = 'relative';
        item.appendChild(rotatingElement);
        
        // Rotation au hover
        item.addEventListener('mouseenter', () => {
            rotatingElement.style.animation = 'rotate-3d 0.8s ease-in-out';
        });
    });
    
    // Animer la ligne
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const timelineObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelector('.timeline::before')?.classList.add('animating');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        timelineObserver.observe(timeline);
    }
};

// ===========================
// BLOCKCHAIN CARDS - FLOATING & WIGGLE
// ===========================
const initBlockchainAnimations = () => {
    const blockchainCards = document.querySelectorAll('.blockchain-card');
    blockchainCards.forEach((card, index) => {
        // Floating animation avec délai différent
        const delay = index * 0.4;
        const duration = 3 + (index * 0.5);
        card.style.animation = `float-up ${duration}s ease-in-out infinite`;
        card.style.animationDelay = delay + 's';
        
        // Wiggle sur les icônes
        const icon = card.querySelector('i');
        if (icon) {
            icon.parentElement.classList.add('wiggle-on-hover');
        }
    });
};

// ===========================
// CTA FINALE - TITLE WORD CASCADE & BADGE BOUNCE
// ===========================
const initCTAAnimations = () => {
    const ctaTitle = document.querySelector('#cta h2');
    if (ctaTitle) {
        const titleText = ctaTitle.textContent;
        ctaTitle.textContent = '';
        
        const words = titleText.split(' ');
        let index = 0;
        
        const typeWords = () => {
            if (index < words.length) {
                const word = document.createElement('span');
                word.className = 'slide-up-word';
                word.textContent = words[index];
                word.style.animationDelay = (index * 0.15) + 's';
                ctaTitle.appendChild(word);
                index++;
                setTimeout(typeWords, 100);
            }
        };
        
        // Démarrer avec intersection observer
        const ctaObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && index === 0) {
                    typeWords();
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        ctaObserver.observe(ctaTitle.closest('section'));
    }
    
    // Badges bounce
    const badges = document.querySelectorAll('.sdg-badge');
    const badgeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badgesInView = entry.target.querySelectorAll('.sdg-badge');
                badgesInView.forEach((badge, index) => {
                    badge.classList.add('badge-bounce');
                    badge.style.animationDelay = (index * 0.15) + 's';
                });
                badgeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (badges.length > 0) {
        badgeObserver.observe(badges[0].closest('.container'));
    }
};

// ===========================
// SMOOTH SCROLL
// ===========================
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

// ===========================
// FERMER MENU AU CLIC DEHORS
// ===========================
document.addEventListener('click', (e) => {
    if (!e.target.closest('header') && window.innerWidth < 768) {
        hamburger.classList.remove('active');
        navLinks.classList.add('hidden');
    }
});

// ===========================
// DÉMO INTERACTIVE
// ===========================
const demoPhotoInput = document.getElementById('demoPhoto');
const photoPreview = document.getElementById('photoPreview');
const demoProblemType = document.getElementById('demoProblemType');
const demoDescription = document.getElementById('demoDescription');
const demoLocation = document.getElementById('demoLocation');
const demoSubmitBtn = document.getElementById('demoSubmitBtn');
const demoResult = document.getElementById('demoResult');
const demoConfirmation = document.getElementById('demoConfirmation');

// Aperçu photo
if (demoPhotoInput) {
    demoPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                photoPreview.innerHTML = `<img src="${event.target.result}" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 1rem;">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Soumettre la démo
    demoSubmitBtn.addEventListener('click', () => {
        const problemType = demoProblemType.value;
        const description = demoDescription.value;
        const location = demoLocation.value;
        const hasPhoto = photoPreview.querySelector('img') !== null;
        
        if (!problemType || !description.trim() || !location.trim()) {
            alert('Veuillez remplir tous les champs avant de soumettre.');
            return;
        }
        
        // Générer un ID de signalement
        const reportId = 'CI-' + Date.now();
        const timestamp = new Date().toLocaleString('fr-FR');
        
        // Afficher le résultat
        demoResult.style.display = 'block';
        demoConfirmation.innerHTML = `
            <p><strong>ID Signalement :</strong> <span style="background: #E8F5E9; padding: 0.4rem 0.8rem; border-radius: 4px; font-family: monospace;">${reportId}</span></p>
            <p style="margin-top: 0.8rem;"><strong>Date/Heure :</strong> ${timestamp}</p>
            <p style="margin-top: 0.8rem;"><strong>Type de problème :</strong> ${problemType}</p>
            <p style="margin-top: 0.8rem;"><strong>Localisation :</strong> ${location}</p>
            <p style="margin-top: 0.8rem;"><strong>Description :</strong> ${description}</p>
            <p style="margin-top: 0.8rem;"><strong>Photo jointe :</strong> ${hasPhoto ? '✅ Oui' : '❌ Non'}</p>
            <p style="margin-top: 1.5rem; padding: 1rem; background: #F5F5F5; border-radius: 6px; color: #333;">
                <strong>✅ Status :</strong> Enregistré de manière <strong>permanente et inviolable</strong> sur la blockchain. Aucune commune ne peut supprimer ou modifier ce signalement. Les citoyens, journalistes et bailleurs peuvent vérifier son statut à tout moment.
            </p>
        `;
        
        // Scroll vers le résultat
        demoResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// ===========================
// INITIALISATION AU CHARGEMENT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initPulseButtons();
    initParticleLoop();
    initProblemCards();
    initTimeline();
    initBlockchainAnimations();
    initCTAAnimations();
    createCursorFollower();
});
