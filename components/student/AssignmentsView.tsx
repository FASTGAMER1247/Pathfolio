import React from 'react';
import type { StudentProfile } from '../../types';
import { useDataStore } from '../../hooks/useStudentData';
import { DocumentTextIcon } from '../icons/Icons';

interface AssignmentsViewProps {
    user: StudentProfile;
    onSubmitForAssignment: (assignmentId: string) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({ user, onSubmitForAssignment }) => {
    const { getAssignmentsByInstitution, achievements } = useDataStore();
    
    if (!user.institutionCode) {
        return (
             <div className="text-center p-12 bg-card-bg dark:bg-dark-card-bg border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-semibold">No Institution Assigned</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">You must be part of an institution to receive assignments. Please update your profile.</p>
            </div>
        )
    }

    const assignments = getAssignmentsByInstitution(user.institutionCode);
    const submittedAssignmentIds = new Set(
        achievements
            .filter(ach => ach.studentId === user.id && ach.assignmentId)
            .map(ach => ach.assignmentId)
    );
    
    return (
        <div className="animate-fade-in-up max-w-5xl mx-auto space-y-8">
            <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-lg">
                <h2 className="text-3xl font-bold mb-4">Assignments</h2>
                 <div className="space-y-4">
                    {assignments.length > 0 ? (
                        assignments.map(asg => {
                            const hasSubmitted = submittedAssignmentIds.has(asg.id);
                            return (
                                <div key={asg.id} className="p-4 bg-light-bg/80 dark:bg-dark-bg/80 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold">{asg.title}</h3>
                                            <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">Deadline: {asg.deadline}</p>
                                            <p className="text-sm mt-2">{asg.description}</p>
                                        </div>
                                        <button 
                                            onClick={() => onSubmitForAssignment(asg.id)}
                                            disabled={hasSubmitted}
                                            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed">
                                            {hasSubmitted ? 'Submitted' : 'Submit Work'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                            <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-400" />
                            <h3 className="mt-2 text-lg font-semibold">No assignments yet.</h3>
                            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Check back later for new assignments from your faculty.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
