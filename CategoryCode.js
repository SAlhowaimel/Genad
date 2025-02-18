// Get references to the sort dropdown and the product grid container
const sortSelect = document.getElementById('sort-options');
const productContainer = document.querySelector('.product-grid');

// Add an event listener to the sort dropdown
sortSelect.addEventListener('change', function () {
    const sortBy = sortSelect.value; // Get the selected sorting option
    sortProducts(sortBy); // Call the sort function
});

// Function to sort products
function sortProducts(sortBy) {
    // Get all product cards as an array
    const products = Array.from(document.querySelectorAll('.product-card'));

    // Sort the products based on the selected option
    products.sort((a, b) => {
        // Extract the product name and price for comparison
        const nameA = a.querySelector('.product-name').innerText.trim();
        const nameB = b.querySelector('.product-name').innerText.trim();
        const priceA = parseFloat(a.querySelector('.product-price').innerText.replace('SR', '').trim());
        const priceB = parseFloat(b.querySelector('.product-price').innerText.replace('SR', '').trim());

        // Perform sorting based on the selected criteria
        switch (sortBy) {
            case 'name-a-z': // Sort alphabetically (A-Z)
                return nameA.localeCompare(nameB);
            case 'name-z-a': // Sort alphabetically (Z-A)
                return nameB.localeCompare(nameA);
            case 'price-low-high': // Sort by price (low to high)
                return priceA - priceB;
            case 'price-high-low': // Sort by price (high to low)
                return priceB - priceA;
        }
    });

    // Clear the product grid and re-append sorted products
    productContainer.innerHTML = ''; // Clear existing products
    products.forEach(product => productContainer.appendChild(product)); // Append sorted products
}

// Add to Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Select all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Add click event listener to each button
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card'); // Get the parent product card
            const productName = productCard.querySelector('.product-name').innerText; // Product name
            const productPrice = productCard.querySelector('.product-price').innerText; // Product price
            const productQuantity = parseInt(productCard.querySelector('.quantity').value); // Product quantity
            const productImage = productCard.querySelector('.product-image').src; // Product image URL

            // Create a product object
            const product = {
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                image: productImage,
            };

            // Retrieve the existing cart from local storage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the product already exists in the cart
            const existingProduct = cart.find((item) => item.name === product.name);
            if (existingProduct) {
                // Update the quantity if it exists
                existingProduct.quantity += product.quantity;
            } else {
                // Add the new product to the cart
                cart.push(product);
            }

            // Save the updated cart to local storage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Notify the user and redirect after 10 seconds
            alert(`${product.quantity} x ${product.name} has been added to your cart! Redirecting to cart in 10 seconds.`);

            // Set a timeout to redirect to the cart page
            setTimeout(() => {
                window.location.href = 'cart.html'; // Replace with your cart page URL
            }, 10000); // 10 seconds
        });
    });

    // Handle quantity increment and decrement
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    const increaseButtons = document.querySelectorAll('.increase-quantity');

    decreaseButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const quantityInput = e.target.nextElementSibling; // Select the input field
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) { // Prevent going below 1
                quantityInput.value = currentQuantity - 1;
            }
        });
    });

    increaseButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const quantityInput = e.target.previousElementSibling; // Select the input field
            let currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;
        });
    });
});