<script setup>
import { onMounted, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTrashCan } from '@mdi/js';

const props = defineProps({
    list: {
        type: Object,
        required: true
    },
    products: {
        type: Array
    },
    currency: {
        type: String,
        default: 'NZD'
    }
})
const cartStore = useCartStore();

onMounted(async ()=>{
    // get book list on mount
    // console.log('products',props.products);
    // console.log('list',props.list);
});

const removeFromCart = (index) => {
    cartStore.removeFromCart(index);
}
</script>

<template>
    <v-overlay v-model="cartStore.cartVisible"
        class="overlay-style"
        location-strategy="connected"
        scroll-strategy="block">
        <transition name="slide">
            <v-sheet class="cart-content">
                <v-list class="v-list">
                    <v-list-item v-for="(item, index) in list" :key="index">
                        <v-card class="text-center">
                                <div>
                                    <div class="d-flex">
                                        <img :src="item.detail.imagePreviewURL" width="180" height="180" />
                                    </div>
                                    <v-card-item>
                                        <v-card-subtitle>{{  item.detail.title  }}</v-card-subtitle>
                                    </v-card-item>
                                    <v-card-text class="pa-0 d-flex">
                                        <div class="left font-weight-black">{{ item.qty + " X $" + item.detail.price + ' ' + currency }}</div>
                                        <div class="right button" @click="removeFromCart(index)"><svg-icon type="mdi" :path="mdiTrashCan">1</svg-icon></div>
                                    </v-card-text>
                                </div>
                            </v-card>
                    </v-list-item>
                    <div class="bottom"><v-btn size="large" block color="black">Checkout</v-btn></div>
                </v-list>
            </v-sheet>
        </transition>

        <!-- <v-container class="v-container">
                <v-col class="v-col" v-for="item in listComputed">
                    <v-card class="text-center">
                        <div>
                            <div class="d-flex justify-center">
                                <img :src="item.imagePreviewURL" width="180" height="180" />
                            </div>
                            <v-card-item>
                                <v-card-title class="text-subtitle-1 h-2">{{  item.title  }}</v-card-title>
                            </v-card-item>
                            <v-card-text class="pa-0">
                                <div class="font-weight-black">{{ item.qty + " X $" + item.price + ' ' + currency }}</div>
                            </v-card-text>
                        </div>
                    </v-card>
                </v-col>
        </v-container> -->
    </v-overlay>
</template>

<style scoped>
/* Custom styling for overlay */
.overlay-style {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent dark overlay */
  z-index: 999; /* Make sure it appears above other elements */
}

/* Scrollable Cart Content */
.cart-content {
  max-height: 300px; /* Limit height */
  overflow-y: auto; /* Enable scrolling */
  padding: 10px;
}

.v-list {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 280px;
    z-index: 1000; /* Higher than overlay */
    background-color: white;
    padding: 0 !important;
}

.v-list-item {
    padding: 0 !important;
    border-bottom: 1px solid #dadadb;
}

.v-list-item img {
    width: calc(100% - 60px) !important;
    height: calc(100% - 60px) !important;
}

.d-flex {
    padding: 15px 15px 0px 15px;
}
.v-card-item {
    padding: 0px 10px;
    text-align: left;
}

.v-card-text > div {
    display: inline-block;
    flex: 1;
}

.v-card-text > .left {
    text-align: left;
    padding-left: 10px;
}

.button {
    cursor: pointer;
    text-align: right;
    padding-right: 5px;
}

.bottom {
    position: sticky;
    background-color: white;
    padding: 10px;
    bottom: 0;
    display: block;
    width: 100%;
    text-align: center;
}

/* Transition for Sliding Effect */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-out;
}

/* Slide in from left to right */
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}

/* Slide out to the left */
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>