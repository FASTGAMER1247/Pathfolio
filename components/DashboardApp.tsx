import React, { useState } from 'react';
import type { User, StudentProfile, FacultyProfile, Achievement, AppUser, Assignment } from '../types';
import { useDataStore } from '../hooks/useStudentData';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Dashboard } from './Dashboard';
import { MyPortfolio } from './MyPortfolio';
import { MyProfile } from './MyProfile';
import { Settings } from './Settings';
import { FacultyDashboard } from './faculty/FacultyDashboard';
import { AddAchievementModal } from './AddAchievementModal';
import { StudentsView } from './faculty/StudentsView';
import { StudentPortfolioManager } from './faculty/StudentPortfolioManager';
import { AssignmentsView as FacultyAssignmentsView } from './faculty/AssignmentsView';
import { AssignmentsView as StudentAssignmentsView } from './student/AssignmentsView';
import { Status } from '../types';

interface DashboardAppProps {
    user: AppUser;
    onLogout: () => void;
    showToast: (message: string) => void;
}

export const DashboardApp: React.FC<DashboardAppProps> = ({ user, onLogout, showToast }) => {
    const { 
        achievements, addAchievement, getAchievementsByStudentId, 
        updateAchievementStatus, updateUser, getUserById,
        deleteAchievement, updateAchievement,
        getStudentByRollNumber,
    } = useDataStore();

    const [currentView, setCurrentView] = useState('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [achievementToEdit, setAchievementToEdit] = useState<Achievement | null>(null);
    const [submittingForAssignmentId, setSubmittingForAssignmentId] = useState<string | undefined>();
    
    // Faculty-specific state
    const [viewingStudent, setViewingStudent] = useState<StudentProfile | null>(null);

    const studentAchievements = user.role === 'student' ? getAchievementsByStudentId(user.id) : [];
    
    let pendingAchievements: Achievement[] = [];
    if (user.role === 'faculty') {
        const facultyUser = user as FacultyProfile;
        const allPending = achievements.filter(a => a.status === Status.Pending);

        pendingAchievements = allPending.filter(ach => {
            const student = getUserById(ach.studentId);
            if (!student || student.role !== 'student') return false; 
            
            const studentProfile = student as StudentProfile;
            if (facultyUser.institutionCode) {
                return studentProfile.institutionCode === facultyUser.institutionCode;
            }
            return !studentProfile.institutionCode;
        });
    }

    const handleOpenAddModal = (assignmentId?: string) => {
        setAchievementToEdit(null);
        setSubmittingForAssignmentId(assignmentId);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (achievement: Achievement) => {
        setSubmittingForAssignmentId(undefined);
        setAchievementToEdit(achievement);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setAchievementToEdit(null);
        setSubmittingForAssignmentId(undefined);
    };

    const handleSaveAchievement = (data: Omit<Achievement, 'id' | 'status' | 'studentId' | 'submittedBy'>, achievementIdToUpdate?: string) => {
        if (achievementIdToUpdate) {
             updateAchievement({ ...data, id: achievementIdToUpdate });
             showToast('Achievement updated successfully!');
        } else {
            const studentForAchievement = viewingStudent || (user.role === 'student' ? user : null);
            if (studentForAchievement) {
                addAchievement(data, studentForAchievement);
                if (studentForAchievement.institutionCode) {
                    showToast(data.assignmentId ? 'Assignment submitted for approval!' : 'Achievement submitted for approval!');
                } else {
                    showToast('Achievement added successfully!');
                }
            }
        }
    };
    
    const handleDeleteAchievement = (achievementId: string) => {
        deleteAchievement(achievementId);
        showToast('Achievement deleted.');
    };

    const handleUpdateProfile = (updatedUser: AppUser) => {
         updateUser(updatedUser);
         showToast('Profile updated successfully!');
         if (viewingStudent && viewingStudent.id === updatedUser.id) {
            setViewingStudent(updatedUser as StudentProfile);
         }
    };
    
    const renderStudentView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard user={user as StudentProfile} achievements={studentAchievements} onAddNew={() => handleOpenAddModal()} onEdit={handleOpenEditModal} onDelete={handleDeleteAchievement} />;
            case 'portfolio':
                return <MyPortfolio profile={user as StudentProfile} achievements={studentAchievements} showToast={showToast} />;
            case 'assignments':
                return <StudentAssignmentsView user={user as StudentProfile} onSubmitForAssignment={handleOpenAddModal} />;
            case 'profile':
                return <MyProfile user={user} onUpdateProfile={handleUpdateProfile} />;
            case 'settings':
                return <Settings />;
            default:
                return <Dashboard user={user as StudentProfile} achievements={studentAchievements} onAddNew={() => handleOpenAddModal()} onEdit={handleOpenEditModal} onDelete={handleDeleteAchievement} />;
        }
    };
    
    const renderFacultyView = () => {
        if (viewingStudent) {
            return <StudentPortfolioManager 
                        student={viewingStudent} 
                        onBack={() => setViewingStudent(null)} 
                        onUpdateProfile={handleUpdateProfile}
                        onSaveAchievement={handleSaveAchievement}
                        onDeleteAchievement={handleDeleteAchievement}
                    />;
        }

        switch (currentView) {
            case 'dashboard':
                return <FacultyDashboard pendingAchievements={pendingAchievements} onUpdateStatus={updateAchievementStatus} />;
            case 'students':
                return <StudentsView faculty={user as FacultyProfile} onSelectStudent={setViewingStudent} />;
            case 'assignments':
                return <FacultyAssignmentsView faculty={user as FacultyProfile} />;
            case 'analytics':
                return <div className="p-8 text-center text-lg text-text-secondary dark:text-dark-text-secondary">Analytics View (Not Implemented)</div>;
            case 'profile':
                return <MyProfile user={user} onUpdateProfile={handleUpdateProfile} />;
            case 'settings':
                return <Settings />;
            default:
                return <FacultyDashboard pendingAchievements={pendingAchievements} onUpdateStatus={updateAchievementStatus} />;
        }
    };

    return (
        <div className="flex h-screen bg-light-bg dark:bg-dark-bg text-text-primary dark:text-dark-text-primary">
            <Sidebar user={user} currentView={currentView} setCurrentView={setCurrentView} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header user={user} currentView={currentView} onLogout={onLogout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {user.role === 'student' ? renderStudentView() : renderFacultyView()}
                </main>
            </div>
            {isModalOpen && <AddAchievementModal onClose={handleCloseModal} onSave={handleSaveAchievement} achievementToEdit={achievementToEdit} assignmentId={submittingForAssignmentId} />}
        </div>
    );
};
