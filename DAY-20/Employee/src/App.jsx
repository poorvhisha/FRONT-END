import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        toastStyle={{
          borderRadius: 12,
          fontSize: 14,
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
        }}
      />
    </>
  );
}
