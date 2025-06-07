document.addEventListener("DOMContentLoaded", () => {
    const products = [
        {id: 1, name: "Product 1", price: 29.99},
        {id: 2, name: "Product 2", price: 99.99},
        {id: 3, name: "Product 3", price: 59.999},
    ];

    let cart =  JSON.parse(localStorage.getItem('item')) || [];    

    const producList = document.getElementById("product-list");
    const cartIteams = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    renderCart(); 

    products.forEach(product =>{
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        producList.appendChild(productDiv);
    });

    producList.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON"){
            const productId = parseInt(e.target.getAttribute("data-id"));

            const product = products.find(p => p.id === productId)
            addToCart(product);
        }
    });

    function addToCart(product){
        cart.push(product);
        saveCart();
        renderCart();
    }

    function renderCart(){
        let totalprice = 0;
        cartIteams.innerHTML = "";

        if(cart.length> 0){
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item, index) => {
                totalprice+= item.price;
                const cartIteam = document.createElement("div");
                cartIteam.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button data-id="${item.id}">delete</button>
                `
                cartIteams.appendChild(cartIteam);
            })

            totalPriceDisplay.textContent = `${totalprice.toFixed(2)}`;

        }else{
            cartTotalMessage.classList.add("hidden");
            emptyCartMessage.classList.remove("hidden");
        }
    }

    checkoutBtn.addEventListener("click", () =>{
        cart.length = 0;
        alert("Checkout successfully");
        saveCart();
        renderCart();
    })

    function saveCart(){
        localStorage.setItem('item', JSON.stringify(cart));
    }

     cartIteams.addEventListener("click", e => {
        if (e.target.tagName !== "BUTTON") return;

        // data-id is a string, so convert to number
        const idToDelete = parseInt(e.target.dataset.id, 10);

        // Filter out any item whose `id` matches idToDelete
        cart = cart.filter(item => item.id !== idToDelete);

        saveCart();
        renderCart();
    });
})