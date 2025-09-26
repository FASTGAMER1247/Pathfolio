
import React from 'react';
import type { Achievement, StudentProfile } from '../types';
import { Status } from '../types';
import { StatCard } from './StatCard';
import { AchievementList } from './AchievementList';
import { CertificateIcon, CheckCircleIcon, ClockIcon, TrophyIcon } from './icons/Icons';

interface DashboardProps {
    user: StudentProfile;
    achievements: Achievement[];
    onAddNew: () => void;
    onEdit: (achievement: Achievement) => void;
    onDelete: (achievementId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, achievements, onAddNew, onEdit, onDelete }) => {
    const approvedCount = achievements.filter(a => a.status === Status.Approved).length;
    const pendingCount = achievements.filter(a => a.status === Status.Pending).length;
    const totalCount = achievements.length;

    const sortedAchievements = [...achievements]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return (
        <div className="animate-fade-in-up space-y-8">
            <div className="p-8 rounded-xl bg-gradient-to-br from-primary to-violet-700 text-white shadow-lg">
                <h2 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h2>
                <p className="text-violet-200 mt-2 max-w-2xl">Here's a summary of your achievements. Keep up the great work and continue to build your professional portfolio.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Achievements" value={totalCount} icon={<TrophyIcon />} color="blue" />
                <StatCard title="Approved" value={approvedCount} icon={<CheckCircleIcon />} color="green" />
                <StatCard title="Pending Review" value={pendingCount} icon={<ClockIcon />} color="yellow" />
                <StatCard title="Certifications" value={achievements.filter(a => a.type === 'Professional Certification').length} icon={<CertificateIcon />} color="purple" />
            </div>
            
            <AchievementList 
                achievements={sortedAchievements}
                title="My Achievements"
                onAddNew={onAddNew}
                isEditable={true}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </div>
    );
};
