import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Signup';
import Login from './Login';

export default function LoginSign() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
  )
}
