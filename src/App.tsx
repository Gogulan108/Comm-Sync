import { RouterProvider } from 'react-router';
import router from './components/Routes/Route';
import ErrorBoundary from './components/atoms/errorBoundary/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);
export default App;
