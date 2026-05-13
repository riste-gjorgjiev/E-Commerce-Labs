import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import BooksPage from './pages/BooksPage';
import AuthorsPage from './pages/AuthorsPage';
import CountriesPage from './pages/CountriesPage';
import BookDetailsPage from "./pages/BookDetailsPage.tsx";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<h2>Welcome to the Home Page</h2>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN", "ADMINISTRATOR"]} />}>
              <Route path="books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />
              <Route path="authors" element={<AuthorsPage />} />
              <Route path="countries" element={<CountriesPage />} />
          </Route>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
