<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart';
import DetailItem from '../components/DetailItem.vue'
import axios from 'axios';
import baseURL from '../services/api';
import products from '@/assets/json/products.json';

const paramId = useRoute().params.id;
// store for shopping cart
const cartStore = useCartStore();
const loading = ref(true);
const item = products[paramId-1];

const addToCart = (id) => {
    cartStore.addToCart(id);
}

const buyNow = async (id) => {
    try {
        // TODO: buy now
        alert('Congratulation! You have successfully brought this item.');
    }catch(error) {
        alert('Server error in buyNow');
    }
}

onMounted(async ()=>{
    loading.value=false;
});

</script>

<template>
    <div v-if="!loading">
        <DetailItem 
        :item="item"
        :addToCart="addToCart"
        :buyNow="buyNow"
        />
    </div>
    <div class="loading text-center" v-else>
        <v-progress-circular
        indeterminate
        color="primary"
        ></v-progress-circular>
    </div>
    
</template>

<style scoped>
.loading {
    position: fixed;
    width: 100%;
    top: 50%;
}
</style>