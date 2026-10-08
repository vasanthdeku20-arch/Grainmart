// ================= PRODUCTS =================

const products = [

    {
        id: 1,
        name: "Premium Basmati Rice",
        category: "Rice",
        price: 120,
        emoji: "🍚",
        rating: 4.8
    },

    {
        id: 2,
        name: "Organic Brown Rice",
        category: "Rice",
        price: 150,
        emoji: "🍚",
        rating: 4.7
    },

    {
        id: 3,
        name: "Whole Wheat",
        category: "Wheat",
        price: 85,
        emoji: "🌾",
        rating: 4.6
    },

    {
        id: 4,
        name: "Foxtail Millet",
        category: "Millets",
        price: 180,
        emoji: "🌱",
        rating: 4.9
    },

    {
        id: 5,
        name: "Little Millet",
        category: "Millets",
        price: 160,
        emoji: "🌱",
        rating: 4.7
    },

    {
        id: 6,
        name: "Toor Dal",
        category: "Pulses",
        price: 140,
        emoji: "🫘",
        rating: 4.8
    },

    {
        id: 7,
        name: "Green Gram",
        category: "Pulses",
        price: 130,
        emoji: "🫘",
        rating: 4.6
    },

    {
        id: 8,
        name: "Organic Quinoa",
        category: "Millets",
        price: 220,
        emoji: "🌾",
        rating: 4.9
    }

];


// ================= CART =================

let cart = [];


// Load cart from browser storage

const savedCart = localStorage.getItem("grainMartCart");

if (savedCart) {
    cart = JSON.parse(savedCart);
}


// ================= DISPLAY PRODUCTS =================

function displayProducts(productList) {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML =
            "<h3>No products found.</h3>";

        return;
    }


    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${product.emoji}
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category-name">
                    ${product.category}
                </p>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <div class="price">
                    ₹${product.price} / kg
                </div>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


// Display products when page loads

displayProducts(products);


// ================= ADD TO CART =================

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    alert(`${product.name} added to cart 🛒`);

}


// ================= SAVE CART =================

function saveCart() {

    localStorage.setItem(
        "grainMartCart",
        JSON.stringify(cart)
    );

}


// ================= CART COUNT =================

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    document.getElementById("cartCount")
        .innerText = count;

}

updateCartCount();


// ================= SHOW CART =================

function showCart() {

    const modal =
        document.getElementById("cartModal");

    modal.style.display = "flex";

    displayCart();

}


// ================= CLOSE CART =================

function closeCart() {

    document.getElementById("cartModal")
        .style.display = "none";

}


// ================= DISPLAY CART =================

function displayCart() {

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");


    container.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your cart is empty 🛒</p>";

        totalElement.innerText = "0";

        return;
    }


    cart.forEach(item => {

        total +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <span class="cart-emoji">
                    ${item.emoji}
                </span>

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price} ×
                        ${item.quantity}
                    </p>

                </div>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        `;


        container.appendChild(cartItem);

    });


    totalElement.innerText = total;

}


// ================= REMOVE CART ITEM =================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    saveCart();

    updateCartCount();

    displayCart();

}


// ================= SEARCH =================

function searchProducts() {

    const search =
        document.getElementById("searchInput")
            .value
            .toLowerCase();


    const filtered =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(search)

            ||

            product.category
                .toLowerCase()
                .includes(search)

        );


    displayProducts(filtered);

}


// ================= CATEGORY FILTER =================

function filterProducts(category) {

    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    displayProducts(filtered);


    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= SCROLL TO PRODUCTS =================

function scrollToProducts() {

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "🎉 Order placed successfully!\n\n" +
        "Thank you for shopping with GrainMart!"
    );


    cart = [];

    saveCart();

    updateCartCount();

    closeCart();

}