<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import ProductItem from '../components/ProductItem.vue'
import products from '@/assets/json/products.json';

// loading - for indicating whether data has been finished loading
const loading = ref(true);
// store for shopping cart
const cartStore = useCartStore();

onMounted(async ()=>{
    // get book list on mount
    console.log('products',products);
    loading.value=false;
});

const addToCart = (item) => {
    cartStore.addToCart(item);
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
    <div v-if="!loading">
        <v-container class="main">
            <v-row justify="space-around">
                <ProductItem v-for="item in productsWIthImages" 
                :item="item"
                :addToCart="addToCart"
                :currency="cartStore.currency"
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