import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/Play';
import Results from './components/Results';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" /> } />
        <Route path="/home" element={<Home /> } />
        <Route path="/play" element={<Play /> } />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
