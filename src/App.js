import { About } from './components/About';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/NoteState';
import {Alert}  from './components/Alert';
import { SignUp } from './components/SignUp';
import { Face } from './components/Face';
import Login from './components/LogIn';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 7500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert = {showAlert} />
          <Alert alert = {alert}/>
          <div className="container mt-4">
            <Routes>
              <Route exact path="/" element={<Face/>} />
              <Route exact path="/home" element={<Home showAlert = {showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert = {showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert = {showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
