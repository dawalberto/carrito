<template>
  <div
    @dblclick="removeProduct"
    class="flex items-center p-3 mt-1 border bg-blue-200 rounded-2xl"
    :class="{ 'opacity-60': product.bought }"
  >
    <input
      type="checkbox"
      @click="selectDeselectProduct"
      :disabled="!user"
      :checked="product.bought"
      name="bought"
      id="bought"
    />
    <div class="flex-grow pl-3">
      <h2 class="text-xl">{{ product.product }}</h2>
      <p class="text-sm text-gray-600">{{ product.userName }}</p>
    </div>
    <img
      v-if="product.supermarket !== 'any'"
      :src="srcImg()"
      alt="supermarket"
      class="w-12 rounded-full h-auto"
    />
  </div>
</template>

<script>
import { db } from '@/firebase.js'

export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true,
    },
    user: {
      type: [Object, null],
    },
  },
  setup(props) {
    const srcImg = () => {
      if (props.product.supermarket !== 'any') {
        return require(`@/assets/img/${props.product.supermarket}.png`)
      }
    }

    const selectDeselectProduct = () => {
      if (!props.user) {
        return
      }
      try {
        db.collection('products').doc(props.product.id).update({
          bought: !props.product.bought,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const removeProduct = async () => {
      try {
        if (!props.user) {
          return
        }
        if (
          !confirm(
            `¿Quieres eliminar el producto '${props.product.product}' de la lista?`,
          )
        ) {
          return
        }
        await db.collection('products').doc(props.product.id).delete()
      } catch (error) {
        console.error(error)
      }
    }

    return { srcImg, selectDeselectProduct, removeProduct }
  },
}
</script>

<style></style>
