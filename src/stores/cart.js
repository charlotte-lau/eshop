import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      totalPrice: 0,
      list: {},
      cartVisible: true
    }
  },
  getters: {
    count:(state) => {
      let count = 0;
      for (const values in state.list) {
        if (state.list.hasOwnProperty(values)) {
          count+=state.list[values]['qty'];
        }
     }
     console.log(count);
     return count
    }
  },
  actions: {
    addToCart(item) {
      if (typeof(this.list[item.id]) != 'undefined' && this.list[item.id]['qty'] != 'undefined' ){
        this.list[item.id]['qty'] += 1;
      }else {
        this.list[item.id] = {'qty':1, 'detail': item};
      }
      console.log('list', this.list);
    },
    removeFromCart(id) {
      if (this.list[id]) {
        this.totalPrice -= this.list[id].price * this.list[id].qty;
        console.log('before delete', this.list);
        delete this.list[id];
        console.log('after delete', this.list);
      }

    },
    toggleCart() {
      console.log('toggleCart');
      this.cartVisible = !this.cartVisible  // Toggle the visibility of the cart
    }
  }
})
