// ===============================
// BURGER GO
// RU / KZ + CART
// ===============================

let currentLanguage = "ru";
let cart = [];


// LANGUAGE

const ruBtn = document.getElementById("ruBtn");
const kzBtn = document.getElementById("kzBtn");

function setLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-ru]").forEach(element => {

        const text = element.dataset[language];

        if (text) {
            element.textContent = text;
        }

    });

    ruBtn.classList.toggle("active", language === "ru");
    kzBtn.classList.toggle("active", language === "kz");
}


ruBtn.addEventListener("click", () => {
    setLanguage("ru");
});

kzBtn.addEventListener("click", () => {
    setLanguage("kz");
});


// CART

const cartButton = document.querySelector(".cart-button");
const cartWindow = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


const products = [
    {
        name: "Classic Burger",
        price: 2990
    },
    {
        name: "Cheese Burger",
        price: 3490
    },
    {
        name: "Double Burger",
        price: 3990
    },
    {
        name: "Картофель фри",
        price: 990
    }
];


document.querySelectorAll(".add-button").forEach((button, index) => {

    button.addEventListener("click", () => {

        cart.push(products[index]);

        updateCart();

        openCart();

    });

});


function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <span>${item.price.toLocaleString("ru-RU")} ₸</span>
            </div>

            <button class="remove-item" data-index="${index}">
                ×
            </button>
        `;

        cartItems.appendChild(itemElement);

    });


    cartCount.textContent = cart.length;

    cartTotal.textContent =
        total.toLocaleString("ru-RU") + " ₸";


    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });

}


function openCart() {

    cartWindow.classList.add("open");

    cartOverlay.classList.add("open");

    document.body.classList.add("no-scroll");

}


function closeCartWindow() {

    cartWindow.classList.remove("open");

    cartOverlay.classList.remove("open");

    document.body.classList.remove("no-scroll");

}


cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartWindow);

cartOverlay.addEventListener("click", closeCartWindow);


// CHECKOUT

const checkoutButton =
    document.querySelector(".checkout-button");


checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert(
            currentLanguage === "ru"
                ? "Корзина пустая."
                : "Себет бос."
        );

        return;
    }


    alert(
        currentLanguage === "ru"
            ? "Заказ принят! Скоро с вами свяжется оператор."
            : "Тапсырыс қабылданды! Жақында оператор сізбен байланысады."
    );


    cart = [];

    updateCart();

    closeCartWindow();

});


// START

setLanguage("ru");

updateCart();