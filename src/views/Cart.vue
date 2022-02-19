<script lang="ts">
import { computed, defineComponent } from "vue";
import { useCartStore } from "../stores/cart";
import type { CartItem } from "../stores/cart";

export default defineComponent({
  setup() {
    const store = useCartStore();

    return {
      store,
      validItems: computed(() => store.validItems),
      totalQuantity: computed(() => store.totalQuantity),
    };
  },
  methods: {
    addItem(item: CartItem) {
      this.store.addItem(item);
    },
    decreaseItem(item: CartItem) {
      this.store.decreaseItem(item);
    },
    removeItem(item: CartItem) {
      this.store.removeItem(item);
    },
  },
  data() {
    return {
      name: "John Smith",
    };
  },
});
</script>
<template>
  <h1>Cart ({{ totalQuantity }})</h1>
  <p>Hi, {{ name }}!</p>
  <ul>
    <li v-for="item in validItems" :key="item.id">
      {{ item.name }}
      {{ item.quantity }}
      <button @click="() => addItem(item)">+</button>
      <button @click="() => decreaseItem(item)">-</button>
      <button @click="() => removeItem(item)">❌</button>
    </li>
  </ul>
  <label for="name">Name</label>
  <input id="name" type="name" v-model="name" />
</template>

<style scoped></style>
