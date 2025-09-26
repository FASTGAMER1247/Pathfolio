
import React from 'react';
import type { Achievement } from '../types';
import { AchievementCard } from './AchievementCard';
import { PlusIcon } from './icons/Icons';

interface AchievementListProps {
    achievements: Achievement[];
    title: string;
    onAddNew: () => void;
    isEditable?: boolean;
    onEdit?: (achievement: Achievement) => void;
    onDelete?: (achievementId: string) => void;
}

export const AchievementList: React.FC<AchievementListProps> = ({ achievements, title, onAddNew, isEditable, onEdit, onDelete }) => {
    return (
        <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{title}</h3>
                <button 
                    onClick={onAddNew}
                    className="flex items-center bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition shadow-md"
                >
                    <PlusIcon className="mr-2" /> Add New
                </button>
            </div>
             <div className="space-y-4">
                {achievements.length > 0 ? (
                    achievements.map(ach => (
                        <AchievementCard 
                            key={ach.id} 
                            achievement={ach} 
                            onEdit={isEditable ? onEdit : undefined}
                            onDelete={isEditable ? onDelete : undefined}
                        />
                    ))
                ) : (
                    <div className="text-center p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                        <p className="text-text-secondary dark:text-dark-text-secondary">No achievements recorded yet. Click 'Add New' to get started!</p>
                    </div>
                )}
             </div>
        </div>
    );
};
