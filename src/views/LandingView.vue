<script setup>
import { ref, watch, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import ProductItem from '../components/ProductItem.vue'
import axios from 'axios';
import baseURL from '../services/api';
import products from '@/assets/json/products.json';

// loading - for indicating whether data has been finished loading
const loading = ref(true);
const books = ref({});
// store for shopping cart
const cartStore = useCartStore();

onMounted(async ()=>{
    // get book list on mount
    console.log('products',products);
    loading.value=false;
});

const addToCart = (id) => {
    cartStore.addToCart(id);
}
</script>

<template>
    <div v-if="!loading">
        <v-container class="main">
            <v-row justify="space-around">
                <ProductItem v-for="item in products" 
                :item="item"
                :addToCart="addToCart"
                />
            </v-row>
        </v-container>
    </div>
    <div class="loading text-center" v-else>
        <v-progress-circular
        indeterminate
        color="primary"
        ></v-progress-circular>
    </div>
    
    
</template>

<style scoped>
.main {
    width: 100%;
    position: relative;
    display: flex;
    flex-flow: column wrap;
}
@media (min-width: 1024px) {
    .main {
        width: 100%;
        position: relative;
        display: flex;
        flex-flow: row wrap;
    }
}

.loading {
    position: fixed;
    width: 100%;
    top: 50%;
}
</style>