import React, { useState, useEffect } from 'react';
import type { Achievement, StudentProfile, User } from '../types';
import { SparklesIcon } from './icons/Icons';
import { AchievementCard } from './AchievementCard';
import { Avatar } from './Avatar';
import { useDataStore } from '../hooks/useStudentData';

export const PublicPortfolio: React.FC = () => {
    const [profile, setProfile] = useState<StudentProfile | null>(null);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const { getUserById, getAchievementsByStudentId } = useDataStore();

    useEffect(() => {
        const path = window.location.pathname;
        const userId = path.split('/')[2];
        if (userId) {
            const userProfile = getUserById(userId);
            if (userProfile && userProfile.role === 'student') {
                setProfile(userProfile);
                setAchievements(getAchievementsByStudentId(userId));
            }
        }
    }, [getUserById, getAchievementsByStudentId]);
    
    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
                <p>Profile not found or invalid URL.</p>
            </div>
        );
    }
    
    const approvedAchievements = achievements.filter(ach => ach.status === 'Approved');
    
    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-text-primary dark:text-dark-text-primary">
            <header className="bg-card-bg/80 dark:bg-dark-card-bg/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 py-6">
                <div className="container mx-auto px-6 flex items-center gap-6">
                    <Avatar name={profile.name} imageUrl={profile.profilePictureUrl} className="w-20 h-20 text-3xl" />
                    <div>
                        <h1 className="text-4xl font-bold">{profile.name}</h1>
                        <p className="text-md text-text-secondary dark:text-dark-text-secondary mt-1">
                            {profile.major} | Year {profile.year} {profile.institutionCode && `| ${profile.institutionCode}`}
                        </p>
                    </div>
                </div>
            </header>
            
            <main className="container mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-6">Verified Achievements ({approvedAchievements.length})</h2>
                {approvedAchievements.length > 0 ? (
                     <div className="space-y-4">
                        {approvedAchievements.map(ach => (
                            <AchievementCard key={ach.id} achievement={ach} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-12 bg-card-bg dark:bg-dark-card-bg border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                        <p className="text-text-secondary dark:text-dark-text-secondary">This student has not published any verified achievements yet.</p>
                    </div>
                )}
            </main>

            <footer className="text-center py-8 text-sm text-gray-500">
                <p>
                    Powered by{' '}
                    <a href="/" className="font-semibold text-primary hover:underline flex items-center justify-center">
                        <SparklesIcon className="w-5 h-5 mr-1" /> Pathfolio
                    </a>
                </p>
            </footer>
        </div>
    );
};