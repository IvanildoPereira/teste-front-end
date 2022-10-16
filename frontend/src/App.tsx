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
import GlobalStyles from './styles/GlobalStyles';

const App = () => {  
  const { login, logout, user, isLoading } = useAuth();
  let routes;

  if(user){
    routes = (
      <Container style={{marginTop: 80}}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/video/:id" element={<DetailsPage/>} />
          <Route path="/*" element={<Navigate to = "/"/>} />
        </Routes>
     </Container>
    )
  }else{
    routes = (
      <Container>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/*" element={<Navigate to = "/"/>} />
        </Routes>
      </Container>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login: login, logout: logout}}>
      <Router>
        {user && <Header name = {user.name} email = {user.email}/>}
        {isLoading && <LoadingSpinner/>}
        {!isLoading && routes}
      </Router> 
      <GlobalStyles/>
    </AuthContext.Provider>
  );
}

export default App;
