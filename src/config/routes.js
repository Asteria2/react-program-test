import Home from '../components/home/Home';
import Login from '../components/login/Login';
import NotMatch from '../components/404/NotMatch'
export default [{
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    component: NotMatch
  }
]