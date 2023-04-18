import "./App.css";
import Login from "./components/login";
import Movie from "./components/movies";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Login />}path={"/" }  />
        <Route element={<Movie/>}  path="/movie" />
      </Routes>
    </div>
  );
}

export default App;
