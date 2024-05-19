import { createBrowserRouter } from 'react-router-dom'
import { MainTemplate } from '../components/templates/Main'
import { Register } from '../pages/register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainTemplate />,
    children: [
      {
        path: 'cadastro',
        element: <Register />,
      },
    ],
  },
])
