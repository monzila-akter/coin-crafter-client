import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
   <QueryClientProvider client={queryClient}>
   <HelmetProvider>
    <RouterProvider router={router}></RouterProvider>
    </HelmetProvider>
   </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
