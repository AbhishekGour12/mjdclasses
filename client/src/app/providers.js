'use client';

import { Provider, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import { useEffect } from 'react';
import { authAPI } from './lib/auth';
import { loginSuccess } from './store/features/authSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// ✅ Safe and silent user auth initialization
function AuthInitializer() {
  //const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await authAPI.getProfile(token, { signal });

        if (res?.user) {
          console.log('✅ Logged-in user loaded:', res.user);
          dispatch(loginSuccess(res.user));
        } else {
          // If backend didn't send valid user, clear token
          localStorage.removeItem('token');
          console.warn('⚠️ Invalid user response, token cleared');
          router.push('/Login')
        }
      } catch (err) {
        // Detect if token expired or unauthorized
        const status = err?.response?.status;
        const backendMsg = err?.response?.data?.message;
        const msg = backendMsg || err?.message || 'Unknown error';

        // 🔹 Handle expired/invalid token
        if (status === 401 || msg.toLowerCase().includes('expired')) {
          localStorage.removeItem('token');
          console.warn('🔒 Token expired — logging out user');
          toast.error('Session expired. Please log in again.');
        } else {
          console.error('❌ Error fetching user profile:', msg);
        }
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [dispatch]);
/** 
  useEffect(() => {
  const email = localStorage.getItem("email");
  if (!email) return;

  const interval = setInterval(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/attendance/ping`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        time: new Date().toISOString(),
      }),
    });
  }, 20000); // ping every 20 seconds

  return () => clearInterval(interval);
}, []);
*/





  return null;
}


export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
      <Toaster position="top-right" />
    </Provider>
  );
}
