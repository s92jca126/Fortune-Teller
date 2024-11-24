import "./App.css";
import BirthForm from "./components/BirthForm";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fortune Teller</h1>
      </header>
      <main>
        <p>Please input your birth information below.</p>
        <BirthForm />
      </main>
    </div>
  );
}

export default App;
