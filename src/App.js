import { Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Article from "./components/Article";
import Comments from "./components/Comments";
import Users from "./components/Users";

import Nav from "./components/Nav";
import Topics from "./components/Topics";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />

      <Routes>
        <Route path="/" element={<Articles />} />
        {/* <Route path="/articles" element={<Articles />} /> */}
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/articles/:article_id/comments" element={<Comments />} />
        <Route path="/users" element={<Users />} />
        <Route path="/topics/:topic" element={<Topics />} />
      </Routes>
    </div>
  );
}

export default App;
