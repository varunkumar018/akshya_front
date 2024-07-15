import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { Settings } from './pages/settings';
import { Units } from './pages/Units';
import { Resource } from './pages/resources';
import { PowerPlant } from './pages/PowerPlant';
import { Maintenance } from './pages/Maintenance';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/units',
    element: <Units />,
  },
  {
    path: '/resources',
    element: <Resource />,
  },
  {
    path: '/powerplant',
    element: <PowerPlant />,
  },
  {
    path: '/maintenance',
    element: <Maintenance />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
