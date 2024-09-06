<template>
  <div>
    <h2 class="mb-4">상품추가</h2>
    <form @submit.prevent="addProduct">
      <label for="name" class="mx-2">상품명:</label>
      <input type="text" placeholder="상품명을 입력해주세요." v-model="productName" required />

      <label for="price" class="mx-2">상품가격:</label>
      <input
        type="number"
        placeholder="가격을 입력해주세요."
        v-model.number="productPrice"
        required
      />

      <button type="submit" class="btn btn-success mx-2">추가</button>
    </form>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { ref } from 'vue';

const cartStore = useCartStore();

// 상품이름, 상품가격 변수 선언
const productName = ref('');
const productPrice = ref(0);

// 새상품 추가
const addProduct = () => {
  if (productName.value && productPrice.value > 0) {
    cartStore.addToProducts(productName.value, productPrice.value);
    // 입력필드 초기화
    productName.value = '';
    productPrice.value = 0;
  }
};
</script>

<style>
input {
  padding: 5px;
}
</style>
