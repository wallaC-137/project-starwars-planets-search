import './App.css';
import Table from './components/Table';
import TextFilter from './filters/TextFilter';
import ThreeFilter from './filters/ThreeFilter';

function App() {
  return (
    <div>
      <TextFilter />
      <ThreeFilter />
      <Table />
    </div>

  );
}

export default App;
