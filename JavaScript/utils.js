import elements from "./helpers.js";

const saveToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}
const getFromLocalStorage = () => {
    const strData = localStorage.getItem ("cart")
    return strData ? JSON.parse(strData) : []
}
// ! sepet toplamını hesaplama
const calculateCartTotal = (cart) => {
// ürün miktarını ve fiyatını çarp sonra topla sonuç elde et
return cart.reduce((sum,item) => sum + item.price* item.quantity , 0)
}

const updateCartIcon = (cart) => {
    // Septteki toplam ürün miktarını hesapla
    let totalQuantity = cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  
    // Septteki ürün miktarını dinamik şekilde render et
    elements.icon.setAttribute("data-quantity", totalQuantity);
  
    // ** setAttribute bir elemana attribute eklemek için kullanılır
  };


export {saveToLocalStorage,getFromLocalStorage,calculateCartTotal,updateCartIcon}