<template>
  <div class="w-full p-3 m-auto flex flex-col md:w-3/4">
    <!-- Add product -->
    <AddProduct />
    <!-- Products -->
    <div>
      <Product />
    </div>
  </div>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue'
import Product from '@/components/Product.vue'

export default {
  name: 'App',
  components: { AddProduct, Product },
}
</script>

<style></style>
