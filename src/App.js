import "./App.css";
import Articles from "./components/Articles";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header> News</Header>
      <Articles />
    </div>
  );
}

export default App;
