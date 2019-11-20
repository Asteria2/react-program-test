import Home from '../components/home/Home';
import Login from '../containers/login/Login';
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