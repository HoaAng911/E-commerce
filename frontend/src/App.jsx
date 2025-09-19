import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Homepage from "./pages/Homepage"
function App() {


  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
              <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
