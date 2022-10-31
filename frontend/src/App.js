import { BrowserRouter, Route, Routes } from "react-router-dom";
import { history } from "./helpers/history";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import NewArticle from "./components/NewArticle";
import GetArticles from "./components/GetArticles";
import ModifyArticle from "./components/ModifyArticle";

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/" element={
          <>
            <Navbar />
            <Login />
          </>
        } />
        <Route path="/register" element={
          <>
            <Navbar/>
            <Register/>
          </>
        } />
        <Route path="/dashboard" element={
          <>
            <Navbar/>
            <Dashboard/>
          </>
        } />
        <Route path="/newarticle" element={
          <>
            <Navbar/>
            <NewArticle/>
          </>
        } />
        <Route path="/articles" element={
          <>
            <Navbar/>
            <GetArticles/>
          </>
        } />
        <Route path="/modifyarticle" element={
          <>
            <Navbar/>
            <ModifyArticle/>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;