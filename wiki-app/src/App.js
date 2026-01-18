import './App.css';
import WikiPage from './components/WikiPage'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function Page() {
  const {pagename} = useParams();
  console.log("APP " + pagename);
  return <WikiPage pagename={pagename}/>
}

function App() {
  return (
    <main>
      <WikiPage pagename=""/>
    </main>
  );
}

export default App;
