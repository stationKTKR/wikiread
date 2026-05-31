import './App.css';
import WikiPage from './components/WikiPage'
import FinalPage from './components/FinalPage';
import { useState, useEffect } from 'react';

function App() {

  const [ending, setEnding] = useState(false);

  return (
    <main>
      <div className={ending ? "hidden" : ""}>
        <WikiPage setEnding={setEnding} />
      </div>
      <div className={ending ? "" : "hidden"}>
        <FinalPage setEnding={setEnding} />
      </div>
    </main>
  );
}

export default App;
