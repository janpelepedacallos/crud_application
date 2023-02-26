import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import './app-style.css';

const App = () => {
  return (
    <div className="app">
      <ToastContainer position="top-center" />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/addContact" element={ <AddEdit /> } /> 
        <Route path="/update/:id" element={ <AddEdit /> } />
        <Route path="/view/:id" element={ <View /> } />
      </Routes>
    </div>
  )
}

export default App;