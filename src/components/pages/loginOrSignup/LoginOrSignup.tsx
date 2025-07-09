import React from 'react';
import InputFeild from '../../atoms/inputFeild/InputFeild';
import Button from '../../atoms/button/Button';
import { useLoginOrSignup } from './useLoginOrSignup';

const LoginOrSignup: React.FC = () => {
  const { activeTab, setActiveTab, loading, error, register, handleSubmit, errors, onSubmit } =
    useLoginOrSignup();

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-10">
        {/* Tab Box */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-xl p-1 w-full max-w-xs">
            <button
              className={`flex-1 py-2 text-center font-semibold rounded-xl transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('login')}
              type="button"
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center font-semibold rounded-xl transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('signup')}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>
        {/* Single Form with Conditional Fields */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          {activeTab === 'signup' && (
            <div className="p-2">
              <InputFeild
                type="text"
                placeholder="Please enter name"
                label="Name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>
          )}
          <div className="p-2">
            <InputFeild
              type="email"
              placeholder="Please enter email"
              label="E-mail"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>
          <div className="p-2">
            <InputFeild
              type="password"
              placeholder="Please enter password"
              label="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password.message}</span>
            )}
          </div>
          <div className="p-2">
            <Button
              isLoading={loading}
              type="submit"
              className={`w-full cursor-pointer px-4 py-2 rounded font-semibold transition-colors bg-gradient-to-r from-blue-500 to-purple-500`}
            >
              {activeTab === 'login' ? 'Login' : 'Sign Up'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginOrSignup;
