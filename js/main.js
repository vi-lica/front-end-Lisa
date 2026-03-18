/* 
sources used for this code: 
https://www.geeksforgeeks.org/javascript/javascript-localstorage/ ,
https://www.youtube.com/watch?v=-ZRDZyUjEEI&t=14s ,
videos on canvas
*/

/* querySelector looks for elements with add-to-cart 
source: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll*/
const buttons = document.querySelectorAll(".add-to-cart");

/* go through each button one by one */
/* addEventListener + click (if someone clicks the button do this) 
source: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener,
https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes */
/* make a product using the info from the button */
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const product = {
      name: button.dataset.name,
      price: button.dataset.price,
      image: button.dataset.image,
    };

    /* source:https://www.geeksforgeeks.org/javascript/javascript-localstorage/, 
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    /* retrieves existing cart from localStorage or creates an empty array if none exist
    [] = if nothing exists it will use an empty list */

    /* adds the new product to the cart */
    cart.push(product);

    /* transform the cart into a string and saves it in the browser (localStorage) 
    source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify*/
    localStorage.setItem("cart", JSON.stringify(cart));
  });
}); /* using }); to close */

const cartItems = document.getElementById("cart-items");

if (cartItems) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  /* retrieve the cart or default to anempty array */

  /* repeat for each item in the cart */
  cart.forEach(function (product, index) {
    const liElement = document.createElement("div");
    liElement.classList.add("cart-item");

    /* showing the product image in the cart */
    const img = document.createElement("img");
    img.src = product.image;
    img.classList.add("cart-image");

    /* display info about the product */
    const info = document.createElement("div");
    info.classList.add("cart-info");
    info.textContent = product.name + " - " + product.price;

    /* creates the remove button */
    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.classList.add("remove-button");

    /* when clicked it removes the product from the cart */
    removeButton.addEventListener("click", function () {
      removeFromCart(index);
    });

    /* appendChild so the elements are added to the cart item container and then added to the page */
    liElement.appendChild(img);
    liElement.appendChild(info);
    liElement.appendChild(removeButton);

    cartItems.appendChild(liElement);
  });
}

/* function and splice to remove the item, localStorage to save, reload */
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}
