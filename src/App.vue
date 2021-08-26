<template>
  <div class="w-full p-3 m-auto flex flex-col md:w-3/4">
    <!-- Login/Logout -->
    <div class="block mr-0 text-right">
      <p v-if="!user" class="text-lg text-blue-500">
        <a href="#" @click="doLogin">Iniciar sesión</a>
      </p>
      <p v-else class="text-lg">
        Hola 👋 {{ user.displayName }} -
        <a @click="doLogout" class="text-blue-500" href="#"> Cerrar Sesión</a>
      </p>
    </div>
    <!-- Add product -->
    <AddProduct :user="user" />
    <!-- Products -->
    <div>
      <Product />
    </div>
  </div>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue'
import Product from '@/components/Product.vue'
import { firebase, auth } from '@/firebase.js'
import { ref } from 'vue'

export default {
  name: 'App',
  components: { AddProduct, Product },
  setup() {
    let user = ref(null)

    auth.onAuthStateChanged(async (auth) => {
      if (auth) {
        user.value = auth
      } else {
        user.value = null
      }
    })

    const doLogin = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()

      try {
        await auth.signInWithPopup(provider)
      } catch (error) {
        console.log(error)
      }
    }

    const doLogout = async () => {
      try {
        await auth.signOut()
      } catch (error) {
        console.log(error)
      }
    }

    return { doLogin, doLogout, user }
  },
}
</script>

<style></style>
