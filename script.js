const productos = [
    { nombre: "Amoxicilina", stock: 10, precio: 3500 },
    { nombre: "Betametasona", stock: 5, precio: 8000 },
    { nombre: "Diclofenac", stock: 0, precio: 6000 },
    { nombre: "Ibuprofeno", stock: 10, precio: 5000 }
];

const selectProducto = document.getElementById("product-select");
const listaProductos = document.getElementById("selected-products");
const outputDiv = document.getElementById("output");
const carrito = [];

function initializeProductSelect() {
    productos.forEach(product => {
        const option = document.createElement("option");
        option.value = product.nombre;
        option.textContent = product.nombre;
        selectProducto.appendChild(option);
    });
}

function limpiarFormAgregar() {
    document.getElementById("new-product-name").value = "";
    document.getElementById("new-product-stock").value = "";
    document.getElementById("new-product-price").value = "";
}

function agregarCarrito() {
    const selectedProduct = selectProducto.value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const product = productos.find(p => p.nombre === selectedProduct);

    if (product && product.stock >= quantity) {
        const cartItem = { product: selectedProduct, quantity, precio: product.precio };
        carrito.push(cartItem);
        const option = document.createElement("option");
        option.text = `${cartItem.product} x ${cartItem.quantity}`;
        listaProductos.add(option);
    } else {
        alert("Error: Producto no disponible en la cantidad solicitada.");
    }
}

function vender() {
    let totalPrice = 0;
    carrito.forEach(item => {
        const product = productos.find(p => p.nombre === item.product);
        if (product && product.stock >= item.quantity) {
            product.stock -= item.quantity;
            totalPrice += item.quantity * item.precio;
        } else {
            outputDiv.textContent = `Error: Stock insuficiente para ${item.product}.`;
            return;
        }
    });
    carrito.length = 0;
    listaProductos.innerHTML = "";
    alert("Venta realizada.\nPrecio total: $" + totalPrice + ".");
}

function mostrarStock() {
    const stockOutputDiv = document.getElementById("stock-output");
    stockOutputDiv.innerHTML = "";

    productos.forEach(product => {
        const productStock = document.createElement("p");
        productStock.textContent = `${product.nombre}: ${product.stock} unidades en stock.`;
        stockOutputDiv.appendChild(productStock);
    });
}

function replenishStock() {
    const replenishProductInput = document.getElementById("replenish-product");
    const replenishQuantityInput = document.getElementById("replenish-quantity");
    const productName = replenishProductInput.value.trim();
    const replenishQuantity = parseInt(replenishQuantityInput.value);
    const product = productos.find(p => p.nombre === productName);

    if (product && replenishQuantity > 0) {
        product.stock += replenishQuantity;
        alert("Stock de " + productName + " reabastecido!");
        replenishProductInput.value = "";
        replenishQuantityInput.value = "";
    } else {
        outputDiv.textContent = "Error: Por favor, ingrese un producto válido y una cantidad mayor que 0.";
    }
}

function addNewProduct() {
    const newProductName = document.getElementById("new-product-name").value;
    const newProductStock = parseInt(document.getElementById("new-product-stock").value);
    const newProductPrice = parseFloat(document.getElementById("new-product-price").value);

    if (newProductName && newProductStock >= 0 && newProductPrice >= 0) {
        const newProduct = {
            nombre: newProductName,
            stock: newProductStock,
            precio: newProductPrice
        };
        productos.push(newProduct);
        // initializeProductSelect();
        alert("El producto " + newProduct.nombre + " ha sido agregado!");
        limpiarFormAgregar();
    } else {
        alert("Error. Por favor, complete todos los campos correctamente.");
    }
}

initializeProductSelect();

function preguntarUsuario() {
    const username = prompt("Por favor, ingrese su nombre:");
    if (username) {
        localStorage.setItem("username", username);
        displayUsername(username);
    }
}

function displayUsername(username) {
    const usernameContainer = document.getElementById("username-container");
    usernameContainer.textContent = `Bienvenido, ${username}!`;
}

function changeUsername() {
    localStorage.removeItem("username");
    preguntarUsuario();
}

window.onload = function() {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        displayUsername(storedUsername);
    } else {
        preguntarUsuario();
    }
};
