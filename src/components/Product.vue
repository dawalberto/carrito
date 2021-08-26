<template>
  <div>
    <div class="flex items-center p-3 mt-1 border bg-blue-200 rounded-2xl">
      <input type="checkbox" name="bought" id="bought" />
      <div class="flex-grow pl-3">
        <h2 class="text-xl">Pan</h2>
        <p class="text-sm">username</p>
      </div>
      <img
        src="@/assets/img/mercadona.png"
        alt="supermarket"
        class="w-12 rounded-full h-auto"
      />
    </div>
    <div class="flex items-center p-3 mt-1 border bg-blue-200 rounded-2xl">
      <input type="checkbox" name="bought" id="bought" />
      <div class="flex-grow pl-3">
        <h2 class="text-xl">Crema de cacahuete</h2>
        <p class="text-sm">username</p>
      </div>
      <img
        src="@/assets/img/aldi.png"
        alt="supermarket"
        class="w-12 rounded-full h-auto"
      />
    </div>
    <div class="flex items-center p-3 mt-1 border bg-blue-200 rounded-2xl">
      <input type="checkbox" name="bought" id="bought" />
      <div class="flex-grow pl-3">
        <h2 class="text-xl">Leche</h2>
        <p class="text-sm">username</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
}
</script>

<style></style>
