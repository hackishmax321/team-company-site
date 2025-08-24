import './App.css';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import TopNavigation from './components/layout/nav/TopNavigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Projects from './components/pages/Projects';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import NotFound from './components/pages/NotFound';


function App() {
  return (
    <Router>
      <div className="App">
        <TopNavigation />
        {/* <Header /> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;