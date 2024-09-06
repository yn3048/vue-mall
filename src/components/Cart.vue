<template>
  <div class="cart mt-5">
    <h2 class="pb-4"><i class="bi bi-cart3 px-2"></i>Cart</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        <p>
          {{ item.name }}
        </p>
        <input
          v-model.number="item.quantity"
          type="number"
          @input="updateQuantity(item.id, item.quantity)"
          min="1"
        />
        <button class="btn btn-danger mx-1" @click="removeFromCart(item.id)">삭제</button>
      </li>
    </ul>
    <div class="total-price mt-5">
      <p>
        Total Price: <strong>{{ totalPrice }}원</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

// 마운트 되면 카트 정보 불러오기
onMounted(() => {
  cartStore.fetchCart();
});

// 카트 아이템 삭제
const removeFromCart = (id) => {
  if (confirm('정말 삭제하시겠습니까?') === false) {
    return;
  }
  cartStore.removeFromCart(id);
};

// 카트 아이템 수 업데이트
const updateQuantity = (id, quantity) => {
  if (quantity < 1) quantity = 1;
  cartStore.updateQuantity(id, quantity);
};

const cart = computed(() => cartStore.cart);
const totalPrice = computed(() => cartStore.getTotalPrice());
</script>

<style>
.cart {
  width: 500px;
  padding: 50px;
  border: 1px solid #888;
  border-radius: 10px;
}
li {
  list-style: none;
  margin-bottom: 10px;
}
.total-price {
  font-size: 20px;
}
</style>
