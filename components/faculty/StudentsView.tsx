import React, { useState } from 'react';
import { useDataStore } from '../../hooks/useStudentData';
import type { StudentProfile, FacultyProfile } from '../../types';
import { AcademicCapIcon } from '../icons/Icons';
import { Avatar } from '../Avatar';

interface StudentsViewProps {
    faculty: FacultyProfile;
    onSelectStudent: (student: StudentProfile) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ faculty, onSelectStudent }) => {
    const [rollNumber, setRollNumber] = useState('');
    const [foundStudent, setFoundStudent] = useState<StudentProfile | null>(null);
    const [error, setError] = useState('');
    const { getStudentByRollNumber } = useDataStore();
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFoundStudent(null);

        if (!faculty.institutionCode) {
            setError("You must be associated with an institution to search for students.");
            return;
        }

        const student = getStudentByRollNumber(rollNumber, faculty.institutionCode);
        if (student) {
            setFoundStudent(student);
        } else {
            setError(`No student found with Roll Number "${rollNumber}" in your institution.`);
        }
    };

    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto space-y-8">
            <div className="bg-card-bg dark:bg-dark-card-bg p-8 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-lg">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                         <AcademicCapIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">Manage Students</h2>
                        <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Search for a student by their roll number to view and manage their portfolio.</p>
                    </div>
                </div>
                
                <form onSubmit={handleSearch} className="mt-6 flex gap-3">
                    <input 
                        type="text"
                        value={rollNumber}
                        onChange={e => setRollNumber(e.target.value)}
                        placeholder="Enter student roll number..."
                        className="flex-grow w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50"
                        required
                    />
                    <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover shadow-md transition">
                        Search
                    </button>
                </form>
            </div>

            {error && (
                <div className="p-4 text-center text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-300 rounded-lg">
                    {error}
                </div>
            )}
            
            {foundStudent && (
                 <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80">
                    <h3 className="text-xl font-bold mb-4">Search Result</h3>
                    <div className="flex items-center justify-between p-4 bg-light-bg dark:bg-dark-bg rounded-lg">
                        <div className="flex items-center gap-4">
                            <Avatar name={foundStudent.name} imageUrl={foundStudent.profilePictureUrl} />
                            <div>
                                <p className="font-bold">{foundStudent.name}</p>
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{foundStudent.major}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => onSelectStudent(foundStudent)}
                            className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-secondary-hover shadow-sm transition">
                            View Portfolio
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};
