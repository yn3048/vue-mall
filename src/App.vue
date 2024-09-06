<template>
  <AddItem />
  <div class="wrap">
    <ProductList />
    <Cart />
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue';
import Cart from './components/Cart.vue';
import AddItem from './components/AddItem.vue';
</script>

<style>
#app {
  margin: 100px auto;
  text-align: center;
}
.wrap {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>
