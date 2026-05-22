import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRouter from './router/AppRouter.jsx'
// import MyStoreProvider from './contextApi/MyContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'
import { ToastContainer } from 'react-toastify'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
 <QueryClientProvider client={queryClient}>
   <Provider store={store}>
    <AppRouter />
    <ToastContainer/>
  </Provider>
 </QueryClientProvider>
)
