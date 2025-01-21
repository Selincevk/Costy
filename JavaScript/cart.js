import elements from "./helpers.js";
import { getFromLocalStorage, saveToLocalStorage, calculateCartTotal,updateCartIcon} from "./utils.js";

// localden kart verisini al
let cart = getFromLocalStorage();

// sepete ekleme yapan fonksiyon
const addToCart = (e, products) => {
  const productId = parseInt(e.target.dataset.id);

  const product = products.find((product) => product.id === productId);

  // ürün sepette varsa bunu kontrol et ve bunu exitingItem a aktar
  if (product) {
    const exitingItem = cart.find((item) => item.id === productId);
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    saveToLocalStorage(cart);
    e.target.textContent = "Added";
    // 2 sn sonra eleman içeriğini tekrardan eski haline getir
    setTimeout(() => {
      e.target.textContent ="Add to cart"
    }, 2000);
    updateCartIcon(cart)
  }
};

// sepetten ürün kaldıracak opsiyon
const removeFromCart = (e) => {
  // tıklanılan elemanın idsine erişmek için
  const productId = parseInt(e.target.dataset.id)
  // idsi bilinen elemanı sepetten kaldır
  cart = cart.filter((item) => item.id != productId);
  // localstorage güncelle
  saveToLocalStorage(cart)
  // arayüz renderlama
  renderCartItems()
  // sepette toplam fiyat render
  displayCartTotal()
  // sepet iconunu güncelleme
  updateCartIcon()


}
// ! sepetteki ürün miktarını güncelleyen fonksiyon
const onQuantityChange = (e) => {
  const productId =+e.target.dataset.id
  const newQuantity=+e.target.value


// Sepeteki elemanın değeri 0'dan büyükse
if (newQuantity > 0) {
  // Sepet içerisinde miktarı değişen elemanı bul
  const cartItem = cart.find((item) => item.id === productId);

  // Bulunan elemanın miktarını güncelle
  cartItem.quantity = newQuantity;

  // localstorag'ı güncelle
  saveToLocalStorage(cart);

  // toplam fiyatı güncelle
  displayCartTotal();

  // Sepet ikonunu güncelle
  updateCartIcon(cart);
}
}

// ürünleri render edecek
const renderCartItems = () => {
  elements.cartItemsList.innerHTML = cart
    .map(
      (item) => `  <div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />

              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input type="number" min="1" class='cart-item-quantity' data-id='${item.id}'  value="${item.quantity}" />
              </div>

              <h2 class="cart-item-price">$ ${item.price}</h2>

              <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
            </div>`
    )
    .join("");

  // ! REMOVE
  const removeButtons = document.querySelectorAll(".remove-from-cart");

  // addeventlistener olmaz. removeButtons içerisindeki her bir butona ayrı ayrı eriş
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }
    // cart-item-quantity classına sahip tüm elemanlara eriş
    const quantityInputs = document.querySelectorAll(".cart-item-quantity");
    
    for (let i = 0; i < quantityInputs.length; i++) {
      const quantityInput = quantityInputs[i];
  
      // quantityInputlara birer olay izleyicisi ekle
      quantityInput.addEventListener("change", onQuantityChange);

      
    }
};
export { addToCart, renderCartItems, displayCartTotal };




// Sepetteki toplam ürün mikarını render eden fonksiyon
const displayCartTotal = () => {
  // sepetteki toplam fiyatı hesapla
  const total = calculateCartTotal(cart);
  // Toplam değeri ekranda render et
  elements.cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};



