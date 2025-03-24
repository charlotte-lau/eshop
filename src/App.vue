<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart';
import Banner from '@/components/Banner.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import products from '@/assets/json/products.json';

const cartStore = useCartStore();
const search = () =>{
  console.log('searching..');
}
const goToCart = () =>{
  console.log('goToCart..');
}
const productsWIthImages = computed(()=> {
    console.log("in pro with img");
    products.forEach((el) => {
        let _imagePreviewURL = `${import.meta.env.BASE_URL}products/404.jpg`;
        if(el.imageURL !== ''){
            const url = el.imageURL.split(",")[0];
            _imagePreviewURL = `${import.meta.env.BASE_URL}products/${url}.jpg`;
        }
        el.imagePreviewURL = _imagePreviewURL;
    })
    return products;
})
</script>

<template>
  <header>
    <Banner 
      title="Charlotte Affordable Jewellery" 
      :search="search" 
      :goToCart="goToCart"/> 
    <div class="wrapper">
      <nav>
        <RouterLink to="/"></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <ShoppingCart v-if="cartStore.cartVisible"
      :list="cartStore.list"
      :products="productsWIthImages"
  ></ShoppingCart>
</template>

<style scoped>
</style>
