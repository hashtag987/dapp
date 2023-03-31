import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Navbar from './components/main/Navbar';
import Post from './components/main/Post';
import Home from './components/main/Home';
// import Account from './components/main/Account';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home/:username" element={<Home/>}/>
        <Route path="/post" element={<Post/>}/>
        {/* <Route path="/account" element={<Account/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
