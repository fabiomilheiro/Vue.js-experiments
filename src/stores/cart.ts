import { defineStore } from "pinia";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  isDeleted?: boolean;
}

interface Cart {
  items: CartItem[];
}

function validItems(state: Cart) {
  return state.items?.filter((i) => !i.isDeleted);
}

export const useCartStore = defineStore({
  id: "cart",
  state: (): Cart => ({
    items: [
      { id: "1", name: "Red cup", quantity: 1 },
      { id: "2", name: "Blue cup", quantity: 1 },
      { id: "3", name: "Yellow cup", quantity: 1 },
    ],
  }),
  getters: {
    validItems,
    totalQuantity: function (state) {
      return validItems(state).reduce((acc, item) => (acc += item.quantity), 0);
    },
  },
  actions: {
    addItem(newItem: CartItem) {
      const item = this.items.find((i) => i.id === newItem.id);

      if (!item) {
        this.items.push(newItem);
      } else {
        item.quantity++;
      }
    },
    decreaseItem(item: CartItem) {
      if (item) {
        item.quantity--;
      }
    },
    removeItem(item: CartItem) {
      this.items = this.items.filter((i) => i.id !== item.id);
    },
  },
});
