import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import BookingPage from './components/BookingPage';
import AboutPage from './components/AboutPage';
import DemoOne from './components/gallery'; // ✅ Gallery page

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  // Function to decide which page to render
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage onNavigate={setCurrentPage} currentPage={currentPage} />;

      case 'Menu':
        return <MenuPage onNavigate={setCurrentPage} currentPage={currentPage} />;

      case 'Booking':
        return <BookingPage onNavigate={setCurrentPage} currentPage={currentPage} />;

      case 'About':
        // ✅ Properly pass navigation and state to AboutPage
        return <AboutPage onNavigate={setCurrentPage} currentPage={currentPage} />;

      case 'Gallery':
        // ✅ Gallery page shown when "Go to Gallery" button is clicked
        return <DemoOne onNavigate={setCurrentPage} currentPage={currentPage} />;

    
      default:
        // ✅ Safe fallback to HomePage
        return <HomePage onNavigate={setCurrentPage} currentPage={currentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1510] via-[#221c14] to-[#1a1510]">
      {/* Header with navigation */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Render page dynamically */}
      <main>{renderPage()}</main>

      {/* Footer with navigation */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
