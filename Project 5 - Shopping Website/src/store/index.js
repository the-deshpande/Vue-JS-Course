import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    cart: [],
  },
  mutations: {
    
    loadProducts(state, products) {
      state.products = products;
    },

    loadCart(state, cart) {
      state.cart = cart;
    },

    addToCart(state, product) {
      state.cart.push(product);
    },

    removeFromCart(state, productId) {
      var updatedCart = state.cart.filter(item => item.id != productId);
      state.cart = updatedCart;
    }
    
  },
  actions: {

    loadProducts({ commit }) {
      var api = 'https://fakestoreapi.com/products';
      axios.get(api).then(response => {
        commit('loadProducts', response.data)
      });
    },

    loadCart({commit}) {
      if (localStorage.getItem('cart')){
        commit('loadCart', JSON.parse(localStorage.getItem('cart')));
      }
    },

    addToCart({ commit }, product) {
      commit('addToCart', product);
      localStorage.setItem('cart', JSON.stringify(this.state.cart));
    },

    removeFromCart({ commit }, productId) {
      if (confirm('Are You sure you want to remove this item?') ){
        commit('removeFromCart', productId);
      }
    }
    
  },
  modules: {
  }
})
