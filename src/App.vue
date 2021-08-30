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
    <transition-group name="list-complete">
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
        :user="user"
        @remove-product="removeProduct"
        class="product"
      />
    </transition-group>
    <!-- Options -->
    <div class="fixed bottom-3 right-3">
      <div
        @click="removeBoughtProducts"
        class="w-12 p-2 bg-blue-500 rounded-full cursor-pointer"
      >
        <img src="@/assets/img/clipboard-list.svg" alt="remove bought products" />
      </div>
      <div
        @click="removeAllProducts"
        class="w-12 p-2 mt-3 bg-blue-500 rounded-full cursor-pointer"
      >
        <img src="@/assets/img/clipboard-check.svg" alt="remove all products" />
      </div>
    </div>
  </div>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue'
import Product from '@/components/Product.vue'
import { firebase, auth, db } from '@/firebase.js'
import { ref } from 'vue'

export default {
  name: 'App',
  components: { AddProduct, Product },
  setup() {
    // User
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

    // Product
    let products = ref([])
    db.collection('products')
      .orderBy('bought', 'asc')
      .onSnapshot(
        (snapshot) => {
          const newProducts = []
          snapshot.docs.forEach((doc) => {
            let { product, user, userName, createdAt, supermarket, bought } = doc.data()
            let id = doc.id
            newProducts.push({
              id,
              product,
              user,
              userName,
              createdAt,
              supermarket,
              bought,
            })
            products.value = newProducts
          })
        },
        (error) => console.log(error),
      )

    const removeAllProducts = async () => {
      try {
        if (!user.value) {
          return
        }

        if (!confirm(`¿Deseas eliminar todos los productos de la lista?`)) {
          return
        }

        let products = await db.collection('products').get()
        products.forEach(async (product) => {
          await db.collection('products').doc(product.id).delete()
        })

        setTimeout(() => {
          location.reload()
        }, 900)
      } catch (error) {
        console.log(error)
      }
    }

    const removeBoughtProducts = async () => {
      try {
        if (!user.value) {
          return
        }

        if (!confirm(`¿Deseas eliminar todos los productos marcados como comprados?`)) {
          return
        }

        let products = await db.collection('products').where('bought', '==', true).get()
        products.forEach(async (product) => {
          await db.collection('products').doc(product.id).delete()
        })

        setTimeout(() => {
          location.reload()
        }, 900)
      } catch (error) {
        console.log(error)
      }
    }

    const removeProduct = () => {
      if (products.value.length === 1) {
        setTimeout(() => {
          location.reload()
        }, 200)
      }
    }

    return {
      doLogin,
      doLogout,
      user,
      products,
      removeAllProducts,
      removeBoughtProducts,
      removeProduct,
    }
  },
}
</script>

<style>
.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.product {
  transition: all 0.8s ease;
}
</style>
