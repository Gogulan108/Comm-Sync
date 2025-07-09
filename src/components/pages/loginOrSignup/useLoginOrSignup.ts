import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { login, signup } from '../../../context/AuthContext';

export type FormValues = {
  name?: string;
  email: string;
  password: string;
};

export function useLoginOrSignup() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onTouched', shouldUnregister: true });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setLoading(true);
    try {
      if (activeTab === 'signup') {
        await signup(data.name ?? '', data.email, data.password);
        toast.success('Signed up successfully');
      } else {
        await login(data.email, data.password);
        toast.success('Logged in successfully');
      }
      reset();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    loading,
    error,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
