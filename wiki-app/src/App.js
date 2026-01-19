import './App.css';
import WikiPage from './components/WikiPage'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  
  return (
    <main>
      
      <WikiPage pagename=""/>
    </main>
  );
}

export default App;
