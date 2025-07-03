import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ProtectedRoutes from './protected-route';
import Login from '../pages/Login';
import Layout from './layout';

function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/',
          element: (
            <Layout>
              <Dashboard />
            </Layout>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
