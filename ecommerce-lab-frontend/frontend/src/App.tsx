import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import BooksPage from './pages/BooksPage';
import AuthorsPage from './pages/AuthorsPage';
import CountriesPage from './pages/CountriesPage';
import BookDetailsPage from "./pages/BookDetailsPage.tsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<h2>Welcome to the Home Page</h2>} />
              <Route path="books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />
              <Route path="authors" element={<AuthorsPage />} />
              <Route path="countries" element={<CountriesPage />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;