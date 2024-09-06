import { defineStore } from 'pinia';
import axios from 'axios';

// 기본  URL
const baseURL = 'http://localhost:8000';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    products: [],
  }),
  actions: {
    // 상품 리스트 조회
    async fetchProducts() {
      const response = await axios.get(`${baseURL}/products`);
      this.products = response.data;
    },
    // 카트 리스트 조회
    async fetchCart() {
      const response = await axios.get(`${baseURL}/cart`);
      this.cart = response.data;
    },
    // products 테이블에 새로운 상품 추가하기
    async addToProducts(productName, productPrice) {
      try {
        const newProduct = {
          name: productName,
          price: productPrice,
        };
        const response = await axios.post(`${baseURL}/products`, newProduct);
        // 새로 추가된 상품을 products 배열에 추가
        this.products.push(response.data);
      } catch (error) {
        console.error('상품추가 실패', error);
      }
    },
    // 카트에 상품 담기
    async addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        await axios.patch(`${baseURL}/cart/${existingItem.id}`, {
          quantity: existingItem.quantity + 1,
        });
      } else {
        await axios.post(`${baseURL}/cart`, {
          ...product,
          quantity: 1,
        });
      }
      this.fetchCart();
    },
    // 상품 목록에서 아이템 제거
    async removeFromProducts(productId) {
      await axios.delete(`${baseURL}/products/${productId}`);
      this.fetchProducts();
    },
    // 카트에서 아이템 제거
    async removeFromCart(productId) {
      await axios.delete(`${baseURL}/cart/${productId}`);
      this.fetchCart();
    },
    // 카트 아이템 갯수 업데이트
    async updateQuantity(productId, quantity) {
      await axios.patch(`${baseURL}/cart/${productId}`, {
        quantity,
      });
      this.fetchCart();
    },
    // 전체 금액 계산
    getTotalPrice() {
      return this.cart && this.cart.length > 0
        ? this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
    },
  },
});
