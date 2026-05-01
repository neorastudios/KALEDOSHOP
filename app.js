/* ═══════════════════════════════════════
   KALEDOSHOP — App.js
   Cart, animations, product rendering
   Ready for Firebase integration
═══════════════════════════════════════ */

// ── Cart ──
let cart = [];
const cartCountEl = document.getElementById('cart-count');

function updateCartUI() {
    cartCountEl.textContent = cart.length;
    cartCountEl.parentElement.classList.add('cart-pop');
    setTimeout(() => cartCountEl.parentElement.classList.remove('cart-pop'), 300);
}

function addToCart(product) {
    cart.push(product);
    updateCartUI();
}

// ── Format XPF ──
function fmtXPF(price) {
    return Number(price).toLocaleString('fr-FR') + ' XPF';
}

// ── Render Products ──
// This function will be called with products from Firebase later
// For now it can be called with static data for testing
function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    const empty = document.getElementById('products-empty');

    if (!products || products.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'block';
        document.querySelector('.products__cta').style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    grid.style.display = 'grid';
    document.querySelector('.products__cta').style.display = 'block';

    grid.innerHTML = products.map((p, i) => {
        const tagClass = p.tag === 'Nouveau' ? 'product-card__tag--new'
            : p.tag === 'Promo' ? 'product-card__tag--promo'
            : 'product-card__tag--best';

        const hasDiscount = p.oldPrice && p.oldPrice > p.price;
        const discountPct = hasDiscount ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

        return `
            <div class="product-card" data-aos style="animation-delay: ${i * 0.06}s">
                <div class="product-card__img">
                    <span>${p.emoji || '📦'}</span>
                    ${p.tag ? `<span class="product-card__tag ${tagClass}">${p.tag}</span>` : ''}
                    ${hasDiscount ? `<span class="product-card__discount">-${discountPct}%</span>` : ''}
                    <button class="product-card__add" onclick="handleAddToCart(event, ${i})" data-index="${i}">
                        Ajouter au panier
                    </button>
                </div>
                <p class="product-card__cat">${p.cat || ''}</p>
                <p class="product-card__name">${p.name}</p>
                <div class="product-card__prices">
                    <span class="product-card__price ${hasDiscount ? 'product-card__price--promo' : ''}">${fmtXPF(p.price)}</span>
                    ${hasDiscount ? `<span class="product-card__old-price">${fmtXPF(p.oldPrice)}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');

    // Re-init AOS for new elements
    initAOS();
}

// Store products reference for add to cart
let currentProducts = [];

function handleAddToCart(event, index) {
    event.stopPropagation();
    const btn = event.target;
    const product = currentProducts[index];

    if (product) {
        addToCart(product);
        btn.textContent = '✓ Ajouté';
        btn.classList.add('product-card__add--added');
        setTimeout(() => {
            btn.textContent = 'Ajouter au panier';
            btn.classList.remove('product-card__add--added');
        }, 1200);
    }
}

// ── Animate on Scroll (simple implementation) ──
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]:not(.aos-visible)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// ── Newsletter ──
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const email = input.value;

        if (email) {
            // TODO: Save to Firebase
            console.log('Newsletter signup:', email);

            input.value = '';
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = '✓ Inscrit !';
            btn.style.background = '#2a6e4e';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        }
    });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    initAOS();

    // ════════════════════════════════════════
    // PRODUCTS — Remplace ce tableau par Firebase plus tard
    // Pour tester, décommente les lignes ci-dessous :
    // ════════════════════════════════════════

    /*
    currentProducts = [
        { name: "Ventilateur colonne silencieux", price: 8990, cat: "Maison", tag: "Best-seller", emoji: "🌀" },
        { name: "Set 3 boîtes hermétiques verre", price: 3490, cat: "Cuisine", emoji: "🫙" },
        { name: "Multiprise parafoudre 6 USB", price: 4950, cat: "Électronique", tag: "Nouveau", emoji: "🔌" },
        { name: "Tuyau d'arrosage extensible 15m", price: 5490, cat: "Jardin", emoji: "💧" },
        { name: "Organisateur tiroir bambou", price: 2790, cat: "Maison", emoji: "🗄️" },
        { name: "Poêle céramique 28cm", price: 4290, cat: "Cuisine", tag: "Best-seller", emoji: "🍳" },
        { name: "Lampe LED anti-moustiques", price: 3990, oldPrice: 5990, cat: "Électronique", tag: "Promo", emoji: "💡" },
        { name: "Sécateur ergonomique pro", price: 2490, cat: "Jardin", emoji: "✂️" },
    ];
    renderProducts(currentProducts);
    */

    // Par défaut : affiche l'état vide
    renderProducts([]);
});
