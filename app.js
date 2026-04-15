// Menú Oficial Bestia Burger's (Sin duplicados)
const menuBurgers = [
    { id: "b1", nombre: "LA INDOMABLE", ingredientes: "Pan de papa, medallón de carne, cheddar, bacon, huevo y salsa de la casa.", imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80", variantes: [{ nombre: "Simple", precio: 9000 }, { nombre: "Doble", precio: 11000 }, { nombre: "Triple", precio: 13000 }] },
    { id: "b2", nombre: "CHEESEBURGER", ingredientes: "Pan de papa, medallón de carne, cheddar.", imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80", variantes: [{ nombre: "Simple", precio: 9000 }, { nombre: "Doble", precio: 11000 }, { nombre: "Triple", precio: 13000 }] },
    { id: "b3", nombre: "DOBLE CUARTO", ingredientes: "Pan de papa, medallón de carne, cheddar, cebolla, kétchup y mostaza.", imagen: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80", variantes: [{ nombre: "Simple", precio: 9000 }, { nombre: "Doble", precio: 11000 }, { nombre: "Triple", precio: 13000 }] },
    { id: "b4", nombre: "BACON SALVAJE", ingredientes: "Pan de papa, medallón de carne, cheddar, bacon.", imagen: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80", variantes: [{ nombre: "Simple", precio: 9000 }, { nombre: "Doble", precio: 11000 }, { nombre: "Triple", precio: 13000 }] },
    { id: "b5", nombre: "CRISPY INFERNAL", ingredientes: "Pan de papa, medallón de carne, cheddar, bacon, cebolla crispy y salsa de la casa.", imagen: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=80", variantes: [{ nombre: "Simple", precio: 9000 }, { nombre: "Doble", precio: 11000 }, { nombre: "Triple", precio: 13000 }] },
    { id: "b6", nombre: "BESTIA BBQ", ingredientes: "Pan de papa, medallón de carne, cheddar, cebolla caramelizada y BBQ.", imagen: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?w=500&q=80", variantes: [{ nombre: "Simple", precio: 9000 }, { nombre: "Doble", precio: 11000 }, { nombre: "Triple", precio: 13000 }] },
    { id: "b7", nombre: "FURIA DEL JARDÍN", ingredientes: "Pan de papa, medallón de carne, cheddar, lechuga, tomate y mayonesa.", imagen: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80", variantes: [{ nombre: "Simple", precio: 9000 }, { nombre: "Doble", precio: 11000 }, { nombre: "Triple", precio: 13000 }] },
    { id: "b8", nombre: "MORADA MALDITA", ingredientes: "Pan de papa, medallón de carne, cheddar, cebolla morada en cubo, bacon en cubos y salsa de la casa.", imagen: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&q=80", variantes: [{ nombre: "Simple", precio: 9000 }, { nombre: "Doble", precio: 11000 }, { nombre: "Triple", precio: 13000 }] }
];

const menuExtras = [
    { id: "e1", nombre: "Medallón Extra", precio: 2000 },
    { id: "e2", nombre: "Cheddar Extra", precio: 1000 },
    { id: "e3", nombre: "Bacon Extra", precio: 1000 },
    { id: "e4", nombre: "Cambio a Papas Cheddar/Bacon", precio: 3000 },
    { id: "e5", nombre: "Porción Extra Papas Cheddar/Bacon", precio: 4000 }
];

let carrito = [];
const NUMERO_WHATSAPP = "541122454518"; 

const contenedorBurgers = document.getElementById('productos-contenedor');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const listaCarrito = document.getElementById('lista-carrito');
const precioTotalDOM = document.getElementById('precio-total');
const cartCounter = document.getElementById('cart-counter');
const btnWhatsApp = document.getElementById('btn-whatsapp');
const inputNotas = document.getElementById('pedido-notas');

const modalOverlay = document.getElementById('product-modal');
const btnCerrarModal = document.getElementById('close-modal');
const btnAgregarModal = document.getElementById('btn-agregar-modal');
let burgerSeleccionada = null; 

function renderizarMenu() {
    contenedorBurgers.innerHTML = '';
    menuBurgers.forEach((burger) => {
        const div = document.createElement('div');
        div.classList.add('slider-card'); 
        div.onclick = (e) => {
            if(e.target.tagName.toLowerCase() === 'button') return;
            div.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        };
        div.innerHTML = `
            <img src="${burger.imagen}" alt="${burger.nombre}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${burger.nombre}</h3>
                <p class="product-desc">${burger.ingredientes}</p>
                <div class="product-actions" style="margin-top: auto;">
                    <button class="btn-add" onclick="abrirModal('${burger.id}')">ARMARLA</button>
                </div>
            </div>`;
        contenedorBurgers.appendChild(div);
    });
    setTimeout(() => {
        iniciarEfectoCoverFlow();
        contenedorBurgers.scrollLeft = 0;
    }, 100);
}

function iniciarEfectoCoverFlow() {
    const slider = document.getElementById('productos-contenedor');
    const updateCenter = () => {
        const sliderRect = slider.getBoundingClientRect();
        const sliderCenter = sliderRect.left + sliderRect.width / 2;
        let closestCard = null;
        let minDistance = Infinity;
        Array.from(slider.children).forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(sliderCenter - cardCenter);
            card.classList.remove('center-active');
            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });
        if (closestCard) closestCard.classList.add('center-active');
    };
    slider.addEventListener('scroll', updateCenter);
    updateCenter();
}

window.scrollSlider = function(direction, containerId) {
    const container = document.getElementById(containerId);
    const cardWidth = container.querySelector('.slider-card').offsetWidth;
    const scrollAmount = cardWidth + 20; 
    if(direction === 'left') container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    else container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

function abrirModal(id) {
    burgerSeleccionada = menuBurgers.find(b => b.id === id);
    document.getElementById('modal-title').innerText = burgerSeleccionada.nombre;
    document.getElementById('modal-desc').innerText = burgerSeleccionada.ingredientes;
    let htmlSizes = '';
    burgerSeleccionada.variantes.forEach((v, index) => {
        let checked = index === 0 ? 'checked' : ''; 
        htmlSizes += `<label class="radio-label"><input type="radio" name="modal-size" value="${v.precio}" data-name="${v.nombre}" ${checked}> ${v.nombre} ($${v.precio.toLocaleString('es-AR')})</label>`;
    });
    document.getElementById('modal-sizes').innerHTML = htmlSizes;
    let htmlExtras = '';
    menuExtras.forEach(e => {
        htmlExtras += `<label class="check-label"><input type="checkbox" class="modal-extra" value="${e.precio}" data-name="${e.nombre}"> ${e.nombre} (+$${e.precio.toLocaleString('es-AR')})</label>`;
    });
    document.getElementById('modal-extras').innerHTML = htmlExtras;
    document.querySelectorAll('input[name="modal-size"], .modal-extra').forEach(input => input.addEventListener('change', actualizarPrecioModal));
    actualizarPrecioModal(); 
    modalOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
}

function actualizarPrecioModal() {
    let total = 0;
    const sizeInput = document.querySelector('input[name="modal-size"]:checked');
    if (sizeInput) total += parseInt(sizeInput.value);
    document.querySelectorAll('.modal-extra:checked').forEach(cb => total += parseInt(cb.value));
    document.getElementById('modal-total-price').innerText = '$' + total.toLocaleString('es-AR');
}

function cerrarModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    burgerSeleccionada = null;
}

btnCerrarModal.addEventListener('click', cerrarModal);
modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) cerrarModal(); });

btnAgregarModal.addEventListener('click', (event) => {
    if (!burgerSeleccionada) return;
    const sizeInput = document.querySelector('input[name="modal-size"]:checked');
    let precioFinal = parseInt(sizeInput.value);
    let nombreCombo = `${burgerSeleccionada.nombre} (${sizeInput.dataset.name})`;
    let extrasSeleccionados = [];
    document.querySelectorAll('.modal-extra:checked').forEach(cb => {
        extrasSeleccionados.push(cb.dataset.name);
        precioFinal += parseInt(cb.value);
    });
    if (extrasSeleccionados.length > 0) nombreCombo += ` + ${extrasSeleccionados.join(', ')}`;
    carrito.push({ nombre: nombreCombo, precio: precioFinal });
    
    // ACÁ DISPARAMOS EL EFECTO
    animarVuelo(event);
    cerrarModal();
    actualizarCarrito();
    mostrarNotificacion(`¡Agregada!`);
});

// NUEVA FUNCIÓN DE ANIMACIÓN COORDINADA
function activarAnimacionesCarrito() {
    const btn = document.getElementById('btn-abrir-carrito');
    const badge = document.getElementById('cart-counter');
    
    // 1. Efecto Pop en el ícono
    btn.classList.add('cart-pop');
    
    // 2. Efecto Glow Pulse en el botón
    btn.classList.add('cart-glow-pulse');
    
    // 3. Efecto Bump en el número
    badge.classList.add('badge-bump');
    
    // Limpieza después de la animación
    setTimeout(() => {
        btn.classList.remove('cart-pop', 'cart-glow-pulse');
        badge.classList.remove('badge-bump');
    }, 600);
}

function animarVuelo(event) {
    const btnCarrito = document.getElementById('btn-abrir-carrito');
    const coordsCarrito = btnCarrito.getBoundingClientRect();
    const particle = document.createElement('div');
    particle.className = 'flying-item';
    particle.innerHTML = '<i class="fa-solid fa-fire"></i>';
    
    // Usar la posición del botón del modal o del mouse
    const x = event ? event.clientX : window.innerWidth / 2;
    const y = event ? event.clientY : window.innerHeight / 2;
    
    particle.style.left = `${x - 20}px`;
    particle.style.top = `${y - 20}px`;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.left = `${coordsCarrito.left + (coordsCarrito.width / 2) - 20}px`;
        particle.style.top = `${coordsCarrito.top + (coordsCarrito.height / 2) - 20}px`;
        particle.style.transform = 'scale(0.2) rotate(360deg)';
        particle.style.opacity = '0.5';
    }, 50);

    setTimeout(() => {
        particle.remove();
        activarAnimacionesCarrito(); // LLAMADA A LA NUEVA FUNCIÓN
    }, 800);
}

function mostrarNotificacion(mensaje) {
    const t = document.getElementById('notificacion');
    t.innerText = mensaje; 
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function eliminarItem(i) { 
    carrito.splice(i, 1); 
    actualizarCarrito(); 
}

function actualizarCarrito() {
    listaCarrito.innerHTML = ''; let t = 0;
    cartCounter.innerText = carrito.length;
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p style="text-align:center; padding: 20px; color:var(--text-muted);">¿Te asustaste, Bestia?</p>';
        btnWhatsApp.disabled = true;
    } else {
        btnWhatsApp.disabled = false;
        carrito.forEach((item, i) => {
            t += item.precio;
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `<div class="item-details"><h4>${item.nombre}</h4><p>$${item.precio.toLocaleString('es-AR')}</p></div><button class="btn-remove" onclick="eliminarItem(${i})"><i class="fa-solid fa-trash"></i></button>`;
            listaCarrito.appendChild(li);
        });
    }
    precioTotalDOM.innerText = "$" + t.toLocaleString('es-AR');
}

function abrirCarrito() { cartSidebar.classList.add('active'); cartOverlay.classList.add('active'); document.body.classList.add('no-scroll'); }
function cerrarCarrito() { cartSidebar.classList.remove('active'); cartOverlay.classList.remove('active'); document.body.classList.remove('no-scroll'); }

function toggleDireccion() {
    const m = document.getElementById('metodo-entrega').value;
    document.getElementById('grupo-direccion').style.display = m === 'Delivery' ? 'block' : 'none';
}

document.getElementById('btn-abrir-carrito').addEventListener('click', abrirCarrito);
document.getElementById('btn-cerrar-carrito').addEventListener('click', cerrarCarrito);
cartOverlay.addEventListener('click', cerrarCarrito);

btnWhatsApp.addEventListener('click', () => {
    let m = "¡Hola Bestia! 🔥 Mi pedido es:\n\n"; let t = 0;
    carrito.forEach(i => { m += `- ${i.nombre}: $${i.precio}\n`; t += i.precio; });
    m += `\n💰 *Total: $${t.toLocaleString('es-AR')}*\n💳 *Pago:* ${document.getElementById('metodo-pago').value}\n🛵 *Entrega:* ${document.getElementById('metodo-entrega').value}`;
    if (document.getElementById('metodo-entrega').value === "Delivery") m += `\n📍 *Dirección:* ${document.getElementById('direccion-envio').value}`;
    if (inputNotas.value.trim() !== "") m += `\n📝 *Aclaraciones:* ${inputNotas.value.trim()}`;
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(m)}`, '_blank');
});

function generarChispas() {
    const contenedorFuego = document.getElementById('sparks-container');
    if (!contenedorFuego) return;
    const cantidadChispas = 15; 
    for (let i = 0; i < cantidadChispas; i++) {
        let chispa = document.createElement('div');
        chispa.classList.add('spark');
        let size = Math.random() * 3 + 2; 
        chispa.style.width = size + 'px';
        chispa.style.height = size + 'px';
        chispa.style.left = Math.random() * 100 + '%';
        chispa.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
        chispa.style.animationDelay = Math.random() * 5 + 's';
        contenedorFuego.appendChild(chispa);
    }
}

renderizarMenu(); 
actualizarCarrito();
generarChispas();