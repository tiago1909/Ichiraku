import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './components/pages/Login'
import Container from './components/layouts/Container';
import Home from './components/pages/Home';
import Cadastro from './components/pages/Cadastro';
import Perfil from './components/pages/Perfil';
import Restaurante from './components/pages/Restaurante';
import CriacaoRestaurante from './components/pages/CriacaoRestaurante';
import EdicaoRestaurante from './components/pages/EdicaoRestaurante';
import EdicaoPratos from './components/pages/EdicaoPratos';
import Menu from './components/pages/Menu';


function App() {
  return (
    <Router>
    <Container>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/cadastro' element={<Cadastro />} />
        <Route exact path='/perfil' element={<Perfil />} />
        <Route exact path='/:name' element={<Restaurante />} />
        <Route exact path='/criacaoRestaurante' element={<CriacaoRestaurante />} />
        <Route exact path='/edicaoRestaurante' element={<EdicaoRestaurante />} />
        <Route exact path='/edicaopratos/:id' element={<EdicaoPratos />} />
        <Route exact path='/menu/:id' element={<Menu />} />
      </Routes>
    </Container>
  </Router>
  );
}

export default App;
