import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import CreateRecipe from './components/CreateRecipe/CreateRecipe';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={ <LandingPage/> } />
          <Route exact path='/home' element={ <Home/> } />
          <Route exact path='/home/:id' element={ <Detail />} />
          <Route exact path='recipe' element={ <CreateRecipe/>} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
