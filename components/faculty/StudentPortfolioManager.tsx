import React, { useState } from 'react';
import type { StudentProfile, Achievement } from '../../types';
import { useDataStore } from '../../hooks/useStudentData';
import { MyProfile } from '../MyProfile';
import { AchievementList } from '../AchievementList';
import { AddAchievementModal } from '../AddAchievementModal';
import { ChevronDownIcon } from '../icons/Icons';

interface StudentPortfolioManagerProps {
    student: StudentProfile;
    onBack: () => void;
    onUpdateProfile: (updatedUser: StudentProfile) => void;
    onSaveAchievement: (data: Omit<Achievement, 'id' | 'status' | 'studentId' | 'submittedBy'>, achievementIdToUpdate?: string) => void;
    onDeleteAchievement: (achievementId: string) => void;
}

export const StudentPortfolioManager: React.FC<StudentPortfolioManagerProps> = ({ student, onBack, onUpdateProfile, onSaveAchievement, onDeleteAchievement }) => {
    const { getAchievementsByStudentId } = useDataStore();
    const [achievements, setAchievements] = useState(() => getAchievementsByStudentId(student.id));
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [achievementToEdit, setAchievementToEdit] = useState<Achievement | null>(null);

     React.useEffect(() => {
        setAchievements(getAchievementsByStudentId(student.id));
    }, [student.id, getAchievementsByStudentId]);

    const handleOpenAddModal = () => {
        setAchievementToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (achievement: Achievement) => {
        setAchievementToEdit(achievement);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setAchievementToEdit(null);
    };


    const sortedAchievements = [...achievements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return (
        <div className="animate-fade-in-up space-y-8">
             <button onClick={onBack} className="flex items-center text-sm font-semibold text-primary hover:underline mb-4">
                <ChevronDownIcon className="w-5 h-5 mr-1 rotate-90" />
                Back to Student Search
            </button>

            <MyProfile user={student} onUpdateProfile={onUpdateProfile as any} />
            
            <AchievementList 
                achievements={sortedAchievements}
                title={`${student.name.split(' ')[0]}'s Achievements`}
                onAddNew={handleOpenAddModal}
                isEditable={true}
                onEdit={handleOpenEditModal}
                onDelete={onDeleteAchievement}
            />

            {isModalOpen && (
                <AddAchievementModal 
                    onClose={handleCloseModal} 
                    onSave={onSaveAchievement}
                    achievementToEdit={achievementToEdit}
                />
            )}
        </div>
    );
};
