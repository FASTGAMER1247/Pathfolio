import React, { useState } from 'react';
import type { Assignment, FacultyProfile } from '../../types';
import { useDataStore } from '../../hooks/useStudentData';
import { AddAssignmentModal } from './AddAssignmentModal';
import { DocumentTextIcon, PlusIcon } from '../icons/Icons';
import { AssignmentDetails } from './AssignmentDetails';

interface AssignmentsViewProps {
    faculty: FacultyProfile;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({ faculty }) => {
    const { assignments, addAssignment } = useDataStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingAssignment, setViewingAssignment] = useState<Assignment | null>(null);
    
    const facultyAssignments = assignments.filter(a => a.facultyId === faculty.id);

    const handleSaveAssignment = (data: Omit<Assignment, 'id'|'facultyId'|'institutionCode'>) => {
        addAssignment(data, faculty);
    };

    if (viewingAssignment) {
        return <AssignmentDetails assignment={viewingAssignment} onBack={() => setViewingAssignment(null)} />;
    }

    return (
        <div className="animate-fade-in-up max-w-5xl mx-auto space-y-8">
             <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">Assignments</h2>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition shadow-md"
                    >
                        <PlusIcon className="mr-2" /> Create Assignment
                    </button>
                </div>

                <div className="space-y-4">
                    {facultyAssignments.length > 0 ? (
                        facultyAssignments.map(asg => (
                            <div key={asg.id} className="p-4 bg-light-bg/80 dark:bg-dark-bg/80 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold">{asg.title}</h3>
                                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Deadline: {asg.deadline}</p>
                                    </div>
                                    <button 
                                        onClick={() => setViewingAssignment(asg)}
                                        className="px-4 py-2 text-sm font-medium text-primary rounded-md hover:bg-primary/10 transition">
                                        View Submissions
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                            <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-400" />
                            <h3 className="mt-2 text-lg font-semibold">No assignments created yet.</h3>
                            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Click 'Create Assignment' to get started.</p>
                        </div>
                    )}
                </div>
             </div>
            {isModalOpen && <AddAssignmentModal onClose={() => setIsModalOpen(false)} onSave={handleSaveAssignment} />}
        </div>
    );
};
