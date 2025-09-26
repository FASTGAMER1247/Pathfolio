import React from 'react';
import type { User } from '../types';
import { CertificateIcon, SunIcon, TrophyIcon, UsersIcon, SparklesIcon, AnalyticsIcon, CheckCircleIcon, DocumentTextIcon, AcademicCapIcon, UserCircleIcon } from './icons/Icons';

interface SidebarProps {
    user: User;
    currentView: string;
    setCurrentView: (view: string) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <li
        onClick={onClick}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            isActive
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
    >
        {icon}
        <span className="ml-4 font-semibold">{label}</span>
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ user, currentView, setCurrentView }) => {
    const studentViews = [
        { id: 'dashboard', label: 'Dashboard', icon: <TrophyIcon /> },
        { id: 'portfolio', label: 'My Portfolio', icon: <CertificateIcon /> },
        { id: 'assignments', label: 'Assignments', icon: <DocumentTextIcon /> },
        { id: 'profile', label: 'My Profile', icon: <UserCircleIcon /> },
        { id: 'settings', label: 'Settings', icon: <SunIcon /> }
    ];

    const facultyViews = [
        { id: 'dashboard', label: 'Dashboard', icon: <CheckCircleIcon /> },
        { id: 'students', label: 'Students', icon: <AcademicCapIcon /> },
        { id: 'assignments', label: 'Assignments', icon: <DocumentTextIcon /> },
        { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
        { id: 'profile', label: 'My Profile', icon: <UserCircleIcon /> },
        { id: 'settings', label: 'Settings', icon: <SunIcon /> }
    ];

    const views = user.role === 'student' ? studentViews : facultyViews;

    return (
        <aside className="w-64 bg-card-bg dark:bg-dark-card-bg p-4 flex-col border-r border-gray-200 dark:border-gray-700/80 hidden lg:flex">
            <div className="flex items-center mb-8 p-2">
                <SparklesIcon className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold ml-2 text-text-primary dark:text-dark-text-primary">Pathfolio</h1>
            </div>
            <nav>
                <ul className="space-y-2">
                    {views.map(view => (
                         <NavItem
                            key={view.id}
                            icon={view.icon}
                            label={view.label}
                            isActive={currentView === view.id}
                            onClick={() => setCurrentView(view.id)}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
