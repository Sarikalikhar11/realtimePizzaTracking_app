import axios from 'axios';
import toastr from 'toastr';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
  axios
    .post('/update-cart', pizza)
    .then((res) => {
      // console.log(res);
      cartCounter.innerText = res.data.totalQty;
      // new Noty({
      // type:'success',
      // timeout:1000,
      // text: 'Item Added to cart Successfully',
      // progressBar: false,
      // }),
      //   show();
      toastr.success('Item Added to cart Successfully');
    })
    .catch((err) => {
      // new Noty({
      // type:'error',
      // timeout:1000,
      // text: 'Item Added to cart Successfully',
      // progressBar: false,
      // }),
      //   show();
      toastr.error('Something went wrong');
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
    // console.log(pizza);
  });
});
