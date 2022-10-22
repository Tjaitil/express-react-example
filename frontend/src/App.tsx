import "./App.css";
import "./scss/app.scss";
import PlayerDynamicTable from "./components/PlayerDynamicTable";

function App() {
  return (
    <div className="App container-fluid">
      <h1>Welcome!</h1>
      <h2>Players from the League of Legends 2022 World Championship</h2>
      <PlayerDynamicTable />
    </div>
  );
}

export default App;
