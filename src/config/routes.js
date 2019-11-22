import Home from '../components/home/Home';
import Login from '../containers/login/Login';
import NotMatch from '../components/404/NotMatch'
const authRoutes = [{
    path: '/',
    component: Home,
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