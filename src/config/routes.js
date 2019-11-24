import Home from '../components/home/Home';
import Login from '../containers/login/Login';
import NotMatch from '../components/404/NotMatch';
import Category from '../containers/category/Category';
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