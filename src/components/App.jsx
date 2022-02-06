import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import PostDetailPage from './PostDetailPage/PostDetailPage';
import React from 'react';
import SearchPage from './SearchPage/SearchPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<SearchPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
