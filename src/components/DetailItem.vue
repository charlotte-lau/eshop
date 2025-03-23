<script setup>
import { computed, defineProps } from 'vue';
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCart } from '@mdi/js'

const props = defineProps({
    item: {
        id: Number,
        title: String,
        description: String,
        price: Number,
        availableStock: Number,
        imageURL: {
            type: String,
            default: ''
        }
    },
    currency: {
        type: String,
        default: 'NZD'
    },
    addToCart: {
        type: Function
    },
    buyNow: {
        type: Function
    }
})

const images = computed(()=> {
    if (props.item.imageURL !== '') {
        const _urls = props.item.imageURL.split(",");
        const _images = Array.from({ length: _urls.length }, (_, index) => ({
            id: index + 1,
            url: `${import.meta.env.BASE_URL}products/${_urls[index]}.jpg`,
        }));
        console.log("111",_images)
        return _images;
        console.log("1")
    }else {
        console.log("2")
        return `${import.meta.env.BASE_URL}products/404.jpg`;
    }
})

const descriptionComputed = computed(()=>{
    if (props.item.description !== '') {
        return props.item.description.split("\n");
    }else {
        return '';
    }
})

const config = {
  height: 'auto',
  itemsToShow: 'auto',
  gap: 5,
  autoplay: 4000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  breakpointMode: 'carousel'
};
</script>

<template>
    <div class="container d-flex">
        <div class="main pa-4">
            <div  class="left">
                <Carousel v-bind="config">
                    <Slide v-for="image in images" :key="image.id">
                    <img :src="image.url" alt="image" />
                    </Slide>

                    <template #addons>
                    <Navigation />
                    <Pagination />
                    </template>
                </Carousel>
            </div>
            <div class="right pl-4 d-flex">
                <div class="info">
                    <div class="text-h4">{{  item.title  }} </div>
                    <div v-show="(item.availableStock==0)" class="text-subtitle-1 text-grey-darken-1">Sold out</div>
                    <div class="price">{{ "$" + item.price + ' ' + currency}}</div>
                    <v-divider></v-divider>
                    <v-card-text class="pt-4">
                        <ul>
                            <li v-for="row in descriptionComputed">{{ row }}</li>
                        </ul>
                    </v-card-text>
                    <div class="actions">
                        <v-btn :disabled="(item.availableStock==0)" class="btn-red mt-2" block @click="addToCart(item.id)">
                            <div><svg-icon  type="mdi" :path="mdiCart"></svg-icon></div>
                        </v-btn>
                        <v-btn 
                        :disabled="(item.availableStock==0)" class="mt-4" 
                        block @click="buyNow(item.id)">
                            Purchase now 
                        </v-btn>
                    </div>
                </div>            
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    justify-content: center;
}
.main {
    width: 100%;
    height: 100%;
    max-width: calc(1160px - 2rem);
    position: relative;
    display: flex;
    flex-flow: row wrap;
}
.main > div {
    width: 100%;
}
.left > img {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 1.75rem 0 1.75rem;
}
.info {
    width: 100%;
    text-align: left;
    padding: 0.2rem;
}
.left > img {
    width: 100%;
    height: auto;
}

.main > .item > div {
    width: 50%;
}
.price {
    font-size: 1rem;
    line-height: 1.33333;
    font-weight: 900 !important;
    margin: 0.5rem 0;
}

@media (min-width: 750px) {
    .left {
        float: left;
        width: 50% !important;
    }
    .right {
        width: 50% !important;
    }
    .price {
        margin: 2rem 0;
    }
    .info {
        text-align: left;
    }
}
</style>