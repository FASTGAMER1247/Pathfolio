import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './icons/Icons';

const Toggle: React.FC<{ enabled: boolean; setEnabled: (enabled: boolean) => void }> = ({ enabled, setEnabled }) => {
    return (
        <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg focus:ring-primary ${
                enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
            }`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
                enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );
};

const SettingsCard: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-lg">
        <h3 className="text-xl font-bold mb-4 text-text-primary dark:text-dark-text-primary">{title}</h3>
        {children}
    </div>
);


export const Settings: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const theme = localStorage.getItem('theme');
        if (theme) return theme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const handleThemeChange = (enabled: boolean) => {
        setIsDarkMode(enabled);
    };

    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto space-y-8">
            <SettingsCard title="Appearance">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold">Dark Mode</p>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Toggle between light and dark themes.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <SunIcon className={`w-6 h-6 ${!isDarkMode ? 'text-yellow-500' : 'text-gray-500'}`} />
                        <Toggle enabled={isDarkMode} setEnabled={handleThemeChange} />
                        <MoonIcon className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-gray-500'}`} />
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard title="Notifications">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">New Achievement Approval</p>
                        <Toggle enabled={true} setEnabled={() => {}} />
                    </div>
                     <div className="flex justify-between items-center">
                        <p className="font-semibold">Weekly Summary</p>
                        <Toggle enabled={false} setEnabled={() => {}} />
                    </div>
                 </div>
            </SettingsCard>
            
            <SettingsCard title="Account">
                 <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-red-600 dark:text-red-400">Delete Account</p>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Permanently delete your account and all data.</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition">Delete</button>
                 </div>
            </SettingsCard>
        </div>
    );
};
