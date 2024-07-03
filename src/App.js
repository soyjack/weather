import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import WeatherGrid from './components/WeatherGrid';

function App() {
  return (
    <div>
      <Header></Header>
      <WeatherGrid></WeatherGrid>
      <Footer></Footer>
    </div>
  );
}

export default App;
