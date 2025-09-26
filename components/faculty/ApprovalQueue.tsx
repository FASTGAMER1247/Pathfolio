import React from 'react';
import type { Achievement } from '../../types';
import { Status } from '../../types';
import { StudentApprovalCard } from './StudentApprovalCard';
import { DocumentTextIcon } from '../icons/Icons';

interface ApprovalQueueProps {
    pendingAchievements: Achievement[];
    onUpdateStatus: (achievementId: string, status: Status) => void;
}

export const ApprovalQueue: React.FC<ApprovalQueueProps> = ({ pendingAchievements, onUpdateStatus }) => {
    return (
        <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-lg">
            <h2 className="text-2xl font-bold mb-4">Approval Queue</h2>
            {pendingAchievements.length > 0 ? (
                <div className="space-y-4">
                    {pendingAchievements.map(achievement => (
                        <StudentApprovalCard 
                            key={achievement.id} 
                            achievement={achievement} 
                            onApprove={() => onUpdateStatus(achievement.id, Status.Approved)}
                            onReject={() => onUpdateStatus(achievement.id, Status.Rejected)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                    <div className="inline-block p-4 bg-secondary/10 rounded-full text-secondary">
                        <DocumentTextIcon className="w-10 h-10" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-text-primary dark:text-dark-text-primary">All Clear!</h3>
                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">The approval queue is empty.</p>
                </div>
            )}
        </div>
    );
};
