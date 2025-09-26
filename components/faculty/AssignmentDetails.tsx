import React, { useMemo } from 'react';
import type { Assignment, StudentProfile } from '../../types';
import { useDataStore } from '../../hooks/useStudentData';
import { ChevronDownIcon, CheckCircleIcon, XCircleIcon } from '../icons/Icons';
import { Avatar } from '../Avatar';

interface AssignmentDetailsProps {
    assignment: Assignment;
    onBack: () => void;
}

export const AssignmentDetails: React.FC<AssignmentDetailsProps> = ({ assignment, onBack }) => {
    const { getStudentsByInstitution, achievements } = useDataStore();

    const students = useMemo(() => getStudentsByInstitution(assignment.institutionCode), [assignment.institutionCode, getStudentsByInstitution]);

    const submissions = useMemo(() => {
        const studentIdsWhoSubmitted = new Set(
            achievements
                .filter(ach => ach.assignmentId === assignment.id)
                .map(ach => ach.studentId)
        );
        return studentIdsWhoSubmitted;
    }, [achievements, assignment.id]);

    return (
        <div className="animate-fade-in-up max-w-5xl mx-auto space-y-6">
            <button onClick={onBack} className="flex items-center text-sm font-semibold text-primary hover:underline">
                <ChevronDownIcon className="w-5 h-5 mr-1 rotate-90" />
                Back to Assignments
            </button>

            <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80">
                <h2 className="text-3xl font-bold">{assignment.title}</h2>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Deadline: {assignment.deadline}</p>
                <p className="mt-4">{assignment.description}</p>
            </div>

            <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80">
                <h3 className="text-2xl font-bold mb-4">Submission Status ({submissions.size} / {students.length})</h3>
                <div className="space-y-3">
                    {students.map(student => {
                        const hasSubmitted = submissions.has(student.id);
                        return (
                             <div key={student.id} className="flex items-center justify-between p-3 bg-light-bg dark:bg-dark-bg rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Avatar name={student.name} imageUrl={student.profilePictureUrl} className="w-8 h-8"/>
                                    <div>
                                        <p className="font-semibold">{student.name}</p>
                                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{student.rollNumber}</p>
                                    </div>
                                </div>
                                {hasSubmitted ? (
                                    <span className="flex items-center text-xs font-semibold text-green-600 dark:text-green-400"><CheckCircleIcon className="w-4 h-4 mr-1.5" /> Submitted</span>
                                ) : (
                                    <span className="flex items-center text-xs font-semibold text-red-600 dark:text-red-400"><XCircleIcon className="w-4 h-4 mr-1.5" /> Not Submitted</span>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
