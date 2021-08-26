<template>
  <form @submit.prevent="addProduct" class="flex flex-col mt-3">
    <div class="flex h-12">
      <input
        type="text"
        v-model="product"
        required
        class="
          flex-grow
          h-full
          py-2
          px-3
          rounded-tl-full
          border border-blue-500
          rounded-bl-full
          outline-none
          text-lg
        "
      />
      <button
        class="
          bg-blue-500
          w-12
          h-full
          py-1
          px-2
          transform
          rotate-90
          cursor-pointer
          rounded-tl-full rounded-tr-full
        "
        type="submit"
        @submit.prevent="addProduct"
      >
        <img src="@/assets/img/airplane.svg" alt="airplane" />
      </button>
    </div>
    <div class="p-3">
      <label for="supermarket" class="pr-3 font-bold text-lg">Supermercado:</label>
      <select
        name="supermarket"
        id="supermarket"
        v-model="supermarket"
        class="py-3 px-4 rounded-full text-lg bg-blue-500 text-white outline-none"
      >
        <option value="any">Cualquiera</option>
        <option value="mercadona">Mercadona</option>
        <option value="consum">Consum</option>
        <option value="aldi">Aldi</option>
        <option value="famili-cash">Famili cash</option>
        <option value="carrefour">Carrefour</option>
        <option value="lidl">Lidl</option>
      </select>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { db } from '@/firebase.js'

export default {
  name: 'AddProduct',
  props: {
    user: {
      type: [Object, null],
    },
  },
  setup(props) {
    let product = ref('')
    let supermarket = ref('any')

    const addProduct = async () => {
      try {
        await db.collection('products').add({
          product: product.value,
          supermarket: supermarket.value,
          user: props.user.uid,
          userName: props.user.displayName,
          createdAt: Date.now(),
        })

        product.value = ''
      } catch (error) {
        console.log(error)
      }
    }

    return { product, supermarket, addProduct }
  },
}
</script>

<style></style>
