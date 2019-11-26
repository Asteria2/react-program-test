import Home from '../components/home/Home';
import Login from '../containers/login/Login';
import NotMatch from '../components/404/NotMatch';
import Category from '../containers/category/Category';
import Product from '../components/product/Product';
import ProductForm from '../components/product/productForm/ProductForm';
const authRoutes = [{
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/category',
    component: Category,
    exact: true
  },
  {
    path: '/product',
    component: Product,
    exact: true
  },
  {
    path: '/product/add',
    component: ProductForm,
    exact: true
  },
  {
    path: '/product/update:id',
    component: ProductForm,
    exact: true
  },
  {
    component: NotMatch
  }
]
const noAuthRoutes = [{
  path: '/login',
  component: Login,
  exact: true
}]
export {
  authRoutes,
  noAuthRoutes
}