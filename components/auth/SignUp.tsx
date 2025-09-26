import React, { useState } from 'react';
import { SparklesIcon } from '../icons/Icons';
// FIX: Import AppUser for more specific typing on signup.
// FIX: Import StudentProfile and FacultyProfile to correctly type user objects for creation.
import type { User, AppUser, StudentProfile, FacultyProfile } from '../../types';

interface SignUpProps {
  // FIX: Changed newUser to a more specific type to allow for role-specific properties.
  onSignUp: (newUser: Omit<AppUser, 'id'> & { password?: string }) => void;
  onSwitchToSignIn: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSwitchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'faculty'>('student');
  const [institutionCode, setInstitutionCode] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (role === 'student' && institutionCode && !rollNumber) {
        setError('Roll number is required if an institution code is provided.');
        return;
    }

    if (role === 'faculty' && (!institutionCode || !facultyId)) {
        setError('Institution Code and Faculty ID are required for faculty accounts.');
        return;
    }
    
    if (role === 'student') {
        const baseUser = { 
            name, 
            email, 
            password, 
            role, 
            ...(institutionCode && { institutionCode }) 
        };
        const studentDetails = { 
            major: 'Undeclared', 
            year: 1, 
            ...(institutionCode && { rollNumber })
        };
        const newUser: Omit<StudentProfile, 'id'> & { password?: string } = { 
            ...baseUser, 
            role: 'student', 
            ...studentDetails 
        };
        onSignUp(newUser);
    } else {
        const baseUser = { 
            name, 
            email, 
            password, 
            role, 
            institutionCode
        };
        const newUser: Omit<FacultyProfile, 'id'> & { password?: string } = { 
            ...baseUser, 
            role: 'faculty', 
            department: 'General Studies',
            facultyId,
        };
        onSignUp(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg p-4 animate-fade-in-up">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <SparklesIcon className="w-12 h-12 text-primary mx-auto" />
            <h1 className="text-3xl font-bold mt-2">Create Your Account</h1>
            <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Start building your portfolio today.</p>
        </div>
        <div className="bg-card-bg dark:bg-dark-card-bg rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg">
          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Full Name</label>
              <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" placeholder="Jane Doe" required />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Email Address</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" placeholder="you@example.com" required />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Password</label>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" placeholder="••••••••" required />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">I am a...</label>
                <div className="flex gap-4">
                    <label className={`flex-1 p-3 border rounded-md cursor-pointer text-center transition-colors ${role === 'student' ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-600'}`}>
                        <input type="radio" name="role" value="student" checked={role === 'student'} onChange={() => setRole('student')} className="sr-only" />
                        <span>Student</span>
                    </label>
                    <label className={`flex-1 p-3 border rounded-md cursor-pointer text-center transition-colors ${role === 'faculty' ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-600'}`}>
                        <input type="radio" name="role" value="faculty" checked={role === 'faculty'} onChange={() => setRole('faculty')} className="sr-only" />
                        <span>Faculty</span>
                    </label>
                </div>
            </div>

            {role === 'student' ? (
                <>
                    <div>
                        <label htmlFor="institutionCode" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Institution Code (Optional)</label>
                        <input id="institutionCode" type="text" value={institutionCode} onChange={e => setInstitutionCode(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" placeholder="e.g. SU" />
                    </div>

                    {institutionCode && (
                        <div className="transition-all duration-300 ease-in-out animate-fade-in-up">
                            <label htmlFor="rollNumber" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Roll Number</label>
                            <input id="rollNumber" type="text" value={rollNumber} onChange={e => setRollNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" placeholder="e.g. 21CS010" required />
                        </div>
                    )}
                </>
            ) : (
                <div className="space-y-6 transition-all duration-300 ease-in-out animate-fade-in-up">
                    <div>
                        <label htmlFor="institutionCode" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Institution Code</label>
                        <input id="institutionCode" type="text" value={institutionCode} onChange={e => setInstitutionCode(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" placeholder="e.g. SU" required />
                    </div>
                    <div>
                        <label htmlFor="facultyId" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Faculty ID</label>
                        <input id="facultyId" type="text" value={facultyId} onChange={e => setFacultyId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" placeholder="e.g. SU-ENG-001" required />
                    </div>
                </div>
            )}
            

            <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition shadow-md">Sign Up</button>
          </form>
          <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
             <p className="text-sm">
                Already have an account?{' '}
                <button type="button" onClick={onSwitchToSignIn} className="font-semibold text-primary hover:underline">
                    Sign In
                </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};