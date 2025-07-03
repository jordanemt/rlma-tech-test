import RouterProvider from './components/routes';
import AuthProvider from './providers/AuthProvider';

function RootProvider({ children }) {
  return (
    <AuthProvider>
      <RouterProvider>{children}</RouterProvider>
    </AuthProvider>
  );
}

export default RootProvider;
