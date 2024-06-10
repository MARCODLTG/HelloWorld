document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const products = [
        { name: 'Pallet Tipo Americano', price: 'Pino, Melina y Semiduro', image: 'Pallets/Palet-Americano.png', description: 'Dimensiones: 102x122 106x120. Madera: Pino, Melina, Semiduro.' },
        { name: 'Pallet Tipo Europeo', price: 'Pino, Melina y Semiduro', image: 'Pallets/Palet-Europeo.png', description: 'Dimensiones: 106x120 102x120 102x122. Madera: Pino, Melina, Semiduro.' },
        { name: 'Mini Pallet Tipo Europeo', price: 'Pino, Melina y Semiduro', image: 'Pallets/Mini-Palet-Europeo.png', description: 'Dimensiones: 40x122. Madera: Pino, Melina, Semiduro.' }
    ];

    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        if (index === 0) productElement.style.opacity = 1;

        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.price}</p>
            <button onclick="showProductDetails(${index})">Información</button>
        `;
        carouselContainer.appendChild(productElement);
    });

    let currentIndex = 0;
    document.getElementById('prev').addEventListener('click', () => {
        const products = document.querySelectorAll('.product');
        products[currentIndex].style.opacity = 0.5;
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        products[currentIndex].style.opacity = 1;
    });

    document.getElementById('next').addEventListener('click', () => {
        const products = document.querySelectorAll('.product');
        products[currentIndex].style.opacity = 0.5;
        currentIndex = (currentIndex + 1) % products.length;
        products[currentIndex].style.opacity = 1;
    });
});

function showProductDetails(index) {
    const products = [
        { name: 'Pallet Tipo Americano', price: '$10.00', image: 'Pallets/Palet-Americano.png', description: `Dimensiones:102x122 106x120
Madera: Pino, Melina, Semiduro costos:
Pino: $10.00
Melina $9.50
Semiduro $ 8.00` },
        { name: 'Pallet Tipo Europeo', price: '$10.50', image: 'Pallets/Palet-Europeo.png', description: `Dimensiones:106x120 – 102x120 102x122
Madera: Pino, Melina, Semiduro costos:
Pino: $10.50
Melina $9.80
Semiduro $ 8.00` },
        { name: 'Mini Pallet Tipo Europeo', price: '$5.25', image: 'Pallets/Mini-Palet-Europeo.png', description: `Dimensiones:40x122
Madera: Pino, Melina, Semiduro costos:
Pino: $5.25
Melina $5.00
Semiduro $ 4.00
` }
    ];
    const product = products[index];

    localStorage.setItem('product', JSON.stringify(product));
    window.location.href = 'product.html';
}

function updatePrice() {
    const woodType = document.getElementById('wood-type').value;
    const quantity = document.getElementById('quantity').value;
    const productPrice = getProductPrice(woodType);
    const totalPrice = productPrice * quantity;
    document.getElementById('product-price').innerText = `Precio: $${totalPrice.toFixed(2)}`;
}

function getProductPrice(woodType) {
    // Aquí deberías tener una lógica para obtener el precio según el tipo de madera
    // Por ahora, se retorna un precio aleatorio
    return Math.random() * 20; // Precio aleatorio entre 0 y 20
}

function addToCart() {
    const productName = document.getElementById('product-name').innerText;
    const woodType = document.getElementById('wood-type').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const productPrice = getProductPrice(woodType);
    const totalPrice = productPrice * quantity;

    // Crear el objeto del producto
    const product = {
        name: productName,
        woodType: woodType,
        quantity: quantity,
        price: totalPrice
    };

    // Obtener el carrito del almacenamiento local
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Agregar el producto al carrito
    cart.push(product);

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirigir al usuario al carrito
    window.location.href = 'carrito.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el carrito del almacenamiento local
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Obtener la lista de elementos del carrito
    const cartList = document.getElementById('cart-list');

    // Iterar sobre cada producto en el carrito y mostrarlo en la lista
    cart.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price.toFixed(2)}`;
        cartList.appendChild(listItem);
    });
});

function toggleChat() {
    const chatPopup = document.getElementById('chat-popup');
    if (chatPopup.style.display === 'none' || chatPopup.style.display === '') {
        chatPopup.style.display = 'block';
    } else {
        chatPopup.style.display = 'none';
    }
}

document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const query = document.getElementById('query').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Mostrar el mensaje de agradecimiento
    document.getElementById('bot-message').innerText = 
        'Muchas gracias, en seguida le atenderá un encargado de Decor Pallets.';

    // Limpiar el formulario
    document.getElementById('chat-form').reset();

    // Puedes añadir aquí la lógica para enviar la información del formulario a tu servidor si es necesario
});