import './App.scss';
import Clock from './components/clock';

function App() {
  return (
    <div className="container">
      <h1 className="display-4 text-center mb-5">25 + 5 Clock</h1>
      <Clock />
    </div>
  );
}

export default App;
