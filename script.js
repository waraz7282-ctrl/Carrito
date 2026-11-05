function loadProducts(){
    fetch('obtener_productos.php')
    .then(response => response.json())
    .then(products => {

        const producList = document.getElementById('product-list');
        producList.innerHTML = '';

        products.forEach(product => {

            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.setAttribute('data-id', product.id);

            const img = document.createElement('img');
            img.src= `images/${product.imagen}`;
            img.alt = product.nombre;
            productDiv.appendChild(img);

            const name = document.createElement('h3');
            name.textContent= product.nombre;
            productDiv.appendChild(name);

            const price = document.createElement('p');
            price.classList.add('price');
            price.textContent = `Precio: $${product.precio}`;
            productDiv.appendChild(price);

            const button = document.createElement('button');
            button.textContent = 'Añadir al carrito';
            button.classList.add('add-to-cart');
            button.addEventListener('click', () =>{
                addToCart(product);                

            });

            productDiv.appendChild(button);
            producList.appendChild(productDiv);


        });

      });
}


let cart = [];

function updateCart(){
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML='';

    if(cart.length===0){
    cartItems.innerHTML = '<p>Tu carrito esta vacio </p>';
    cartTotal.textContent='0';
    return;

}

let total = 0;
cart.forEach(item => {

    const productDiv = document.createElement('div');
    productDiv.textContent = `${item.nombre} - $${item.precio}`;
    cartItems.appendChild(productDiv);
    total += parseFloat(item.precio);
    

});

cartTotal.textContent = total.toFixed(2);


}


function addToCart(product){
    cart.push(product);
    updateCart();

}

document.getElementById('checkout').addEventListener('click', () => {
    if(cart.length === 0) {
        alert('El carrito esta vacio');
        return;
    }


    fetch('procesar_compra.php',{

        method: 'POST',
        headers: {

            'Content-Type' : 'aplication/json'
        },
        body:JSON.stringify(cart)
    }).then(response => response.json())
    .then(data => {
        alert(data.message);
        cart = [];
        updateCart();

    });


});

loadProducts();