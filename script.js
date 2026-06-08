/* ========================================
   SCRIPT DE INTERATIVIDADE
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Suavizar scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form de contato
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Validação básica
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Simular envio
            console.log('Dados do formulário:', { name, email, phone, message });
            
            // Mensagem de sucesso
            alert('Obrigado! Sua mensagem foi enviada com sucesso. Em breve entraremos em contato!');
            
            // Limpar formulário
            form.reset();
        });
    }

    // Animação ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.product-card, .highlight-card, .usage-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Atualizar links de WhatsApp
    const whatsappNumber = '5541999752201'; // Alterar conforme necessário
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        // Manter os links que já têm mensagem customizada
        if (!link.href.includes('text=')) {
            const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os molhos Da Capivara Gourmet!');
            link.href = `https://wa.me/${whatsappNumber}?text=${message}`;
        }
    });

    // Contador de scroll para header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Lazy loading para imagens (se necessário)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Função para atualizar informações de contato
function updateContactInfo(whatsapp, email, city) {
    document.getElementById('contact-whatsapp').textContent = whatsapp;
    document.getElementById('contact-email').textContent = email;
    document.getElementById('contact-city').textContent = city;
}

// Exemplo de uso (descomente e configure):
// updateContactInfo('(11) 98765-4321', 'contato@dacapivara.com.br', 'São Paulo, SP');
