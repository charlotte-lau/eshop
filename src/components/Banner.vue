<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHome, mdiCart, mdiBookSearch } from '@mdi/js'

const props = defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    logo: {
        type: String,
        default: ''
    },
    totalBooks: {
        type: Number,
        default: 0
    },
    search: {
        type: Function
    },
    goToCart: {
        type: Function
    },
    goHome: {
        type: Function
    }
})
</script>

<template>
<div class="container d-flex bg pa-2">
    <div class="left">
        <div v-if="logo != ''" class="logo"><img :src="logo"/></div>
        <div class="text-h6 banner">{{ title }}</div>
    </div>
    <div class="icon pr-2">        
        <div @click="search"><svg-icon type="mdi" :path="mdiBookSearch"></svg-icon></div>
        <div @click="goToCart"><svg-icon type="mdi" :path="mdiCart"></svg-icon>{{ totalBooks }}</div>
        <div  @click="$router.push('/')"><svg-icon type="mdi" :path="mdiHome"></svg-icon></div>
    </div>
</div>
</template>

<style scoped>
.container {
    justify-content: space-between;
}
.left {
    display: flex;
    align-items: center;
}
.banner {
    font-size: 1.2rem !important;
    font-family:  Copperplate, Papyrus,fantasy !important;
}
.logo {
    padding-right: 10px;
}
.icon {
    display: flex;
    justify-content: end;
    align-items: center;
}
.icon > div {
    display: flex;
    padding-left: 5px;
}

@media (min-width: 1024px) {
.icon > div {
    padding-left: 10px;
}
}
.banner {
    font-size: 1.125rem !important;
}

.bg {
    box-shadow: 0px 1px 3px rgba(54,62,81,0.2),0px 0px 16px rgba(54,62,81,0.1);
    background: #ffffff none repeat scroll 0 0;

    top: 0px;
    position: sticky;
    z-index: 100;
}
</style>