import React from 'react';
import type { Achievement } from '../../types';
import { CertificateIcon, CommunityServiceIcon, ConferenceIcon, InternshipIcon, OnlineCourseIcon, TrophyIcon, UsersIcon, WorkshopIcon, CheckCircleIcon } from '../icons/Icons';
import { ActivityType } from '../../types';

interface StudentApprovalCardProps {
    achievement: Achievement;
    onApprove: () => void;
    onReject: () => void;
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
}


export const StudentApprovalCard: React.FC<StudentApprovalCardProps> = ({ achievement, onApprove, onReject }) => {
    return (
        <div className="p-4 bg-light-bg/80 dark:bg-dark-bg/80 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md transition-all hover:shadow-lg hover:border-primary/50">
            <div className="flex items-start flex-col sm:flex-row gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                    {getIconForType(achievement.type)}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                             <p className="text-sm font-semibold text-primary">{achievement.submittedBy}</p>
                            <h3 className="text-lg font-bold">{achievement.title}</h3>
                        </div>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary flex-shrink-0 ml-4">{achievement.date}</p>
                    </div>
                    
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">{achievement.type}</p>
                    <p className="mt-2 text-sm">{achievement.description}</p>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto flex-shrink-0">
                    <button 
                        onClick={onApprove}
                        className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-secondary-hover transition">
                        <CheckCircleIcon className="w-5 h-5 mr-1.5" />
                        Approve
                    </button>
                    <button 
                        onClick={onReject}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};
