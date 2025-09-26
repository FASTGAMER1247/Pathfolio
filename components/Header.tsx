
import React, { useState } from 'react';
// FIX: Use AppUser type for more specific user profile data.
import type { AppUser } from '../types';
import { LogoutIcon, ChevronDownIcon } from './icons/Icons';
import { Avatar } from './Avatar';

interface HeaderProps {
    // FIX: Changed user prop to AppUser to include role-specific details.
    user: AppUser;
    currentView: string;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, currentView, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const viewTitle = currentView.charAt(0).toUpperCase() + currentView.slice(1);

    // FIX: Type guard `user.role` correctly narrows AppUser to StudentProfile or FacultyProfile.
    const userDetail = user.role === 'student' ? user.major : user.department;

    return (
        <header className="flex-shrink-0 flex items-center justify-between p-4 bg-card-bg/80 dark:bg-dark-card-bg/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary hidden sm:block">
                {viewTitle}
            </h2>
            <div className="flex-1 sm:hidden"></div> {/* Spacer for mobile */}

            <div className="flex items-center space-x-4">
                <div className="relative">
                     <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                     >
                        <Avatar name={user.name} imageUrl={user.profilePictureUrl} />
                        <div className="hidden md:flex flex-col items-start">
                            <span className="font-semibold text-sm">{user.name}</span>
                            <span className="text-xs text-text-secondary dark:text-dark-text-secondary">{userDetail}</span>
                        </div>
                        <ChevronDownIcon className={`w-4 h-4 hidden md:block transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                         <div className="absolute right-0 mt-2 w-48 bg-card-bg dark:bg-dark-card-bg rounded-md shadow-lg py-1 z-20 border border-gray-200/80 dark:border-gray-700/80">
                            <button
                                onClick={() => {
                                    onLogout();
                                    setIsDropdownOpen(false);
                                }}
                                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <LogoutIcon className="w-5 h-5 mr-2" />
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
