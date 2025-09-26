import React, { useState } from 'react';
import { SparklesIcon } from '../icons/Icons';
import { useDataStore } from '../../hooks/useStudentData';

interface SignInProps {
  onSignIn: (email: string, pass: string) => boolean;
  onSwitchToSignUp: () => void;
  onDemoLogin: (user: any) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSignIn, onSwitchToSignUp, onDemoLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { users } = useDataStore(); // To find demo users

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onSignIn(email, password);
    if (!success) {
        setError('Invalid email or password.');
    }
  };
  
  const handleDemoStudent = () => {
      const demoStudent = users.find(u => u.email === 'student@demo.com');
      if (demoStudent) onDemoLogin(demoStudent);
  };
  const handleDemoFaculty = () => {
      const demoFaculty = users.find(u => u.email === 'faculty@demo.com');
      if (demoFaculty) onDemoLogin(demoFaculty);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg p-4 animate-fade-in-up">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <SparklesIcon className="w-12 h-12 text-primary mx-auto" />
            <h1 className="text-3xl font-bold mt-2">Welcome Back</h1>
            <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Sign in to continue to Pathfolio.</p>
        </div>
        <div className="bg-card-bg dark:bg-dark-card-bg rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg">
          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Email Address</label>
              <input 
                id="email" 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" 
                placeholder="you@example.com"
                required 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Password</label>
              <input 
                id="password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" 
                placeholder="••••••••"
                required 
              />
            </div>
            <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition shadow-md">Sign In</button>
            <div className="text-center text-sm text-text-secondary dark:text-dark-text-secondary">
              Or use a demo account:
              <div className="flex justify-center gap-2 mt-2">
                <button type="button" onClick={handleDemoStudent} className="text-primary font-semibold hover:underline">Student</button>
                <span>|</span>
                <button type="button" onClick={handleDemoFaculty} className="text-primary font-semibold hover:underline">Faculty</button>
              </div>
            </div>
          </form>
          <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
             <p className="text-sm">
                Don't have an account?{' '}
                <button type="button" onClick={onSwitchToSignUp} className="font-semibold text-primary hover:underline">
                    Sign Up
                </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
