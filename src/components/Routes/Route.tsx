import { createBrowserRouter } from 'react-router';
import HomePage from '../homepage/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

export default router;
