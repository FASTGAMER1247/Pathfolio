import React from 'react';
import { ApprovalQueue } from './ApprovalQueue';
import type { Achievement } from '../../types';
import { Status } from '../../types';
import { StatCard } from '../StatCard';
import { CheckCircleIcon, UsersIcon } from '../icons/Icons';

interface FacultyDashboardProps {
    pendingAchievements: Achievement[];
    onUpdateStatus: (achievementId: string, status: Status) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ pendingAchievements, onUpdateStatus }) => {
  const uniqueStudents = [...new Set(pendingAchievements.map(a => a.submittedBy))].length;

  return (
    <div className="animate-fade-in-up space-y-8">
       <div className="p-8 rounded-xl bg-gradient-to-br from-secondary to-green-700 text-white shadow-lg">
        <h2 className="text-3xl font-bold">Faculty Dashboard</h2>
        <p className="text-green-200 mt-2 max-w-2xl">Review and approve student achievements to help them build a verified portfolio of their hard work.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pending Approvals" value={pendingAchievements.length} icon={<CheckCircleIcon />} color="yellow" />
        <StatCard title="Unique Students" value={uniqueStudents} icon={<UsersIcon />} color="blue" />
      </div>

      <ApprovalQueue pendingAchievements={pendingAchievements} onUpdateStatus={onUpdateStatus} />
    </div>
  );
};
