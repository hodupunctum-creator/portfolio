import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Works from './pages/Works';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="works" element={<Works />} />
          <Route path="works/:id" element={<WorkDetail />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
