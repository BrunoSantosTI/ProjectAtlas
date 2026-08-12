// ===================== SMOOTH SCROLLING =====================
// Função para scroll suave ao clicar nos links do menu
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================== FUNÇÃO AUXILIAR =====================
// Função para scroll suave programático
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===================== ATIVA LINK DO MENU CONFORME SCROLL =====================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('a.nav-link');
    const navbar = document.querySelector('.navbar');
    const homeSection = document.getElementById('home');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
    
    // Controlar transparência da navbar baseado na seção home
    if (homeSection) {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
        if (window.pageYOffset < homeSectionBottom) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
    }
});

// ===================== ANIMAÇÃO AO ROLAR A PÁGINA =====================
// Função para ativar animações quando elementos entram na viewport
function observeElements() {
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
    
    // Observar cards e elementos animáveis
    const animatedElements = document.querySelectorAll('.benefit-card, .concept-card, .image-placeholder');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===================== ADICIONA ESTILO ATIVO AO MENU =====================
const style = document.createElement('style');
style.textContent = `
    a.nav-link.active {
        color: var(--primary-color) !important;
        border-bottom: 2px solid var(--primary-color) !important;
    }
`;
document.head.appendChild(style);

// ===================== EFEITO HOVER NOS CARDS =====================
// Adiciona interatividade aos cards de benefícios
document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===================== DEBOUNCE PARA PERFORMANCE =====================
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

// ===================== INICIALIZAÇÃO =====================
document.addEventListener('DOMContentLoaded', () => {
    // Ativa observador de elementos
    observeElements();
    
    // Log de inicialização
    console.log('✅ Site de Academia carregado com sucesso!');
    console.log('🏋️ Navegação suave ativada');
});

// ===================== SCROLL EFFECT NA NAVBAR =====================
// Adiciona sombra adicional na navbar ao rolar
const navbar = document.querySelector('.navbar');
const debouncedScroll = debounce(() => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================== PRELOAD DE IMAGENS =====================
// Garante que espaços de imagem sejam bem renderizados
const imagePlaceholders = document.querySelectorAll('.image-placeholder, .hero-image-placeholder');
imagePlaceholders.forEach(placeholder => {
    placeholder.style.minHeight = 'auto';
});
