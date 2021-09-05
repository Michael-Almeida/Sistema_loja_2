import VueRouter from "vue-router";
import Home from "./pages/Home.vue";
import ProdutoDetalhe from "./pages/ProdutoDetalhe.vue";

const routes = [
  { path: "/", name: "home", component : Home }, 
  { path: "/produto-detalhe/:id", component: ProdutoDetalhe, name: "produto-detalhe"}
]

const router = new VueRouter({
  routes,
  mode : 'history'
})

export default router;