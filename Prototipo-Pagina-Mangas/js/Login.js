// Función para mostrar/ocultar el formulario de login
const loginToggle = document.getElementById('login-toggle');
const loginContainer = document.getElementById('login-container');

// Mostrar u ocultar el formulario de login
loginToggle.addEventListener('click', function() {
    loginContainer.classList.toggle('hidden');
});

// Función para mostrar/ocultar el carrito
const cartToggle = document.getElementById('cart-toggle');
const cartContainer = document.getElementById('cart-container');

// Mostrar u ocultar el carrito
cartToggle.addEventListener('click', function() {
    cartContainer.classList.toggle('hidden');
});

// Función para agregar un artículo al carrito (puedes agregar más funciones para añadir productos)
function addToCart(productName, price) {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    const newItem = document.createElement('li');
    newItem.textContent = `${productName} - $${price}`;
    cartItems.appendChild(newItem);

    // Actualizar el total
    let currentTotal = parseFloat(totalPrice.textContent);
    currentTotal += price;
    totalPrice.textContent = currentTotal.toFixed(2);
}

// Enviar el formulario de login al servidor PHP
document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar que recargue la página

    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;
    const mensajeLogin = document.getElementById('mensajeLogin');

    fetch('php/verificar_login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `correo=${encodeURIComponent(correo)}&clave=${encodeURIComponent(clave)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            mensajeLogin.style.color = 'green';
            mensajeLogin.textContent = data.message;

            // Ocultar login luego de iniciar sesión exitosamente
            setTimeout(() => {
                document.getElementById('login-container').classList.add('hidden');
                mensajeLogin.textContent = '';
            }, 1500);
        } else {
            mensajeLogin.style.color = 'red';
            mensajeLogin.textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error al enviar login:', error);
        mensajeLogin.style.color = 'red';
        mensajeLogin.textContent = 'Error al conectar con el servidor.';
    });
});