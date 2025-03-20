<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart';
import Banner from '@/components/Banner.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHome } from '@mdi/js'

const cartStore = useCartStore();
const search = () =>{
  console.log('searching..');
}
const goToCart = () =>{
  console.log('goToCart..');
}
</script>

<template>
  <header>
    <Banner 
      title="Charlotte Affordable Jewellery" 
      :search="search" 
      :totalBooks="cartStore.count"
      :goToCart="goToCart"/> 
  </header>

  <RouterView />
</template>

<style scoped>
</style>
