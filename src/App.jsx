
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDash from "./UserDash";
import ChefView from "./ChefView";

function App() {
  

   return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDash />} />
        <Route path="/chef" element={<ChefView />} />
      </Routes>
    </Router>
  );
}

export default App
