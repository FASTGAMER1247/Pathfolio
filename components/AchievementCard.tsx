
import React, { useState } from 'react';
import type { Achievement } from '../types';
import { ActivityType, Status } from '../types';
import { CertificateIcon, ClockIcon, CommunityServiceIcon, ConferenceIcon, InternshipIcon, OnlineCourseIcon, TrophyIcon, UsersIcon, WorkshopIcon, CheckCircleIcon, XCircleIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from './icons/Icons';

interface AchievementCardProps {
    achievement: Achievement;
    onEdit?: (achievement: Achievement) => void;
    onDelete?: (achievementId: string) => void;
}

const getIconForType = (type: ActivityType) => {
    switch (type) {
        case ActivityType.Conference: return <ConferenceIcon />;
        case ActivityType.Workshop: return <WorkshopIcon />;
        case ActivityType.Certification: return <CertificateIcon />;
        case ActivityType.ClubActivity: return <UsersIcon />;
        case ActivityType.Competition: return <TrophyIcon />;
        case ActivityType.Internship: return <InternshipIcon />;
        case ActivityType.CommunityService: return <CommunityServiceIcon />;
        case ActivityType.OnlineCourse: return <OnlineCourseIcon />;
        default: return <TrophyIcon />;
    }
};

const getStatusIndicator = (status: Status) => {
    switch (status) {
        case Status.Approved:
            return <span className="flex items-center text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-full"><CheckCircleIcon className="w-4 h-4 mr-1" /> Approved</span>;
        case Status.Pending:
            return <span className="flex items-center text-xs font-semibold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded-full"><ClockIcon className="w-4 h-4 mr-1" /> Pending</span>;
        case Status.Rejected:
            return <span className="flex items-center text-xs font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded-full"><XCircleIcon className="w-4 h-4 mr-1" /> Rejected</span>;
    }
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const hasActions = !!(onEdit || onDelete);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this achievement?')) {
            onDelete?.(achievement.id);
        }
        setIsMenuOpen(false);
    }

    const handleEdit = () => {
        onEdit?.(achievement);
        setIsMenuOpen(false);
    }
    
    return (
        <div className="p-4 bg-light-bg/80 dark:bg-dark-bg/80 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                    {getIconForType(achievement.type)}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold">{achievement.title}</h3>
                        <div className="hidden sm:flex items-center gap-2">
                            {getStatusIndicator(achievement.status)}
                             {hasActions && (
                                <div className="relative">
                                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                                        <EllipsisVerticalIcon className="w-5 h-5" />
                                    </button>
                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-32 bg-card-bg dark:bg-dark-card-bg rounded-md shadow-lg py-1 z-10 border border-gray-200/80 dark:border-gray-700/80">
                                            {onEdit && <button onClick={handleEdit} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"><PencilIcon className="w-4 h-4 mr-2" /> Edit</button>}
                                            {onDelete && <button onClick={handleDelete} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700"><TrashIcon className="w-4 h-4 mr-2" /> Delete</button>}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{achievement.type}</p>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary flex-shrink-0 ml-4">{achievement.date}</p>
                    </div>
                    <p className="mt-2 text-sm">{achievement.description}</p>
                    <div className="sm:hidden mt-2 flex justify-between items-center">
                        {getStatusIndicator(achievement.status)}
                        {hasActions && (
                             <div className="relative">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                                    <EllipsisVerticalIcon className="w-5 h-5" />
                                </button>
                                {isMenuOpen && (
                                     <div className="absolute right-0 mt-2 w-32 bg-card-bg dark:bg-dark-card-bg rounded-md shadow-lg py-1 z-10 border border-gray-200/80 dark:border-gray-700/80">
                                        {onEdit && <button onClick={handleEdit} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"><PencilIcon className="w-4 h-4 mr-2" /> Edit</button>}
                                        {onDelete && <button onClick={handleDelete} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700"><TrashIcon className="w-4 h-4 mr-2" /> Delete</button>}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
