import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Update from './Update';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/update/:id' element={<Update />}/>
      </Routes>
    </div>
  );
}

export default App;
