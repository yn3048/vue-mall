<template>
  <div class="mt-5 products">
    <h2 class="pb-4">
      <i class="bi bi-bag-heart"></i>
      Products
    </h2>
    <ul>
      <li v-for="product in products" :key="product.id" class="pb-3">
        {{ product.name }} - {{ product.price }} 원
        <button class="btn btn-primary" @click="addToCart(product)">카트에 담기</button>
        <button class="btn btn-danger mx-2" @click="removeFromProducts(product.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.fetchProducts();
});
const products = computed(() => cartStore.products);

const addToCart = (product) => {
  cartStore.addToCart(product);
};

const removeFromProducts = (productId) => {
  if (confirm('정말 삭제하시겠습니까?') === false) {
    return;
  }
  cartStore.removeFromProducts(productId);
};
</script>

<style>
.products {
  width: 600px;
  padding: 50px;
  border: 1px solid #888;
  border-radius: 10px;
}
</style>
