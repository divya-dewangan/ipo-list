import './App.css';
// import IpoEntry from './IpoEntry';
import MainRaouter from './MainRaouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <MainRaouter />
      {/* <IpoEntry /> */}
    </div>
  );
}

export default App;
