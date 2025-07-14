import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import Overview from './pages/Overview';
import Benefits from './pages/Benefits';
import Featured from './pages/Featured';
import SignIn from './pages/SignIn/SignIn';
import Profile from './pages/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import SignUp from './pages/SignIn/SignUp';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/analyze"
          element={
            <ProtectedRoute>
              <Analyzer />
            </ProtectedRoute>
          }
        />
        <Route path="/overview" element={<Overview />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/login" element={<SignIn />} />
        <Route path='/signup' element= {<SignUp/>}/>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
