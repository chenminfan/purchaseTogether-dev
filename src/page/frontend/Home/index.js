import { Outlet } from 'react-router-dom'
import { LoginContentProvider } from '../../../components/module/LoginProvider';
import Header from '../../../components/frontend/Header';

const Home = () => {

  return (
    <LoginContentProvider>
      <Header headerTitle="react cart" >
      </Header>
      <main className="App"><Outlet /></main>
    </LoginContentProvider>
  );
}

export default Home;