import { Container } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hooks';
import Header from './layouts/Header';
import DetailsPage from './pages/details/DetailsPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';

const App = () => {  
  const { login, logout, user, isLoading } = useAuth();
  let routes;

  if(user){
    routes = (
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/video/:id" element={<DetailsPage/>} />
        <Route path="/*" element={<Navigate to = "/"/>} />
      </Routes>
    )
  }else{
    routes = (
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/*" element={<Navigate to = "/"/>} />
      </Routes>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login: login, logout: logout}}>
      <Router>
        {user && 
          <Header name = {user.name} email = {user.email}/>
        }
        <Container>
          {isLoading && <LoadingSpinner/>}
          {!isLoading && routes}
        </Container>
      </Router> 
    </AuthContext.Provider>
  );
}

export default App;
