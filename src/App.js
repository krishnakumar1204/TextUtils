import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './components/About';

function App() {
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  const [alert, setAlert] = useState(null);
  const toggleMode = () =>{
    if(mode === "light"){
      setMode("dark");
      document.body.style.backgroundColor = "#29465B";
      showAlert("Dark Mode has been enabled!", "success");
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode has been enabled!", "success");
    }
  }
  const [mode, setMode] = useState("light");
  return (
    <>
    <Router>
    <Navbar title="TextUtils" aboutText="About" mode={mode} toggleMode={toggleMode} />
    <Alert alert={alert} />
    <Routes>
      <Route exact path='/' element={<TextForm showAlert={showAlert} heading="Enter Your Text Below to Analyze" mode={mode}/>} />
      <Route exact path='/about' element={<About/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
