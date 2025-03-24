<script setup>
import { computed, onMounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCart } from '@mdi/js'

const props = defineProps({
    item: {
        id: Number,
        title: String,
        author: String,
        isbn: String,
        price: Number,
        availableStock: Number,
        imagePreviewURL: {
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
    }
})

onMounted(async ()=>{
    // get book list on mount
    console.log('props.item',props.item);
});
</script>

<template>
    <v-col class="v-col">
        <v-card class="text-center">
            <div   @click="$router.push('detail/'+item.id)">
                <div class="d-flex justify-center">
                    <img :src="item.imagePreviewURL" width="180" height="180" />
                </div>
                <v-card-item>
                    <v-card-title class="text-subtitle-1 h-2">{{  item.title  }}</v-card-title>
                    <v-card-subtitle class="text-subtitle-2">{{  item.author  }}</v-card-subtitle>
                </v-card-item>
                <v-card-text class="pa-0">
                    <div class="font-weight-black">{{ "$" + item.price + ' ' + currency }}</div>
                    <!-- <div class="font-weight-black" :class="(item.availableStock>0)?'text-black':'text-red'">{{ (item.availableStock > 0)? "In stock": "Out of Stock" }}</div> -->
                </v-card-text>
            </div>
            <v-card-actions class="d-flex flex-column">
                <v-btn variant="tonal"  size="small"
                :disabled="(item.availableStock==0)" 
                block @click="addToCart(item)">
                    <svg-icon type="mdi" :path="mdiCart"></svg-icon>
                </v-btn>
                <!-- <v-btn class="btn-gray" block >Detail</v-btn> -->
            </v-card-actions>
        </v-card>
    </v-col>
    
</template>

<style scoped>
.v-card {
    padding-top: 0.3rem;
}

.v-card-actions {
    padding: 0 0.5rem;
}

.h-2 {
    height: 2rem;
}

button {
    margin: 5px 0 5px 0 !important;
}
</style>