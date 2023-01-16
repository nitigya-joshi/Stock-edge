
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import Alert from './Components/Alert';



function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} exact/>
          <Route path="/coins/:id" element={<CoinPage/>}/>
        </Routes>
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
