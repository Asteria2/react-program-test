import Home from '../components/home/Home';
import Login from '../containers/login/Login';
import NotMatch from '../components/404/NotMatch';
import Category from '../containers/category/Category';
import Product from '../components/product/Product';
import ProductForm from '../components/product/productForm/ProductForm';
import ProductDetail from '../components/product/productDetail/ProductDetail';
import User from '../containers/user/User';
import Role from '../containers/role/Role';
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
    path: '/product/detail',
    component: ProductDetail,
    exact: true
  },
  {
    path: '/user',
    component: User,
    exact: true
  },
  {
    path: '/role',
    component: Role,
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