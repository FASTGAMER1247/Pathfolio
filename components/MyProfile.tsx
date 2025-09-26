import React, { useState } from 'react';
import type { User, StudentProfile, FacultyProfile } from '../types';
import { Avatar } from './Avatar';
import { UploadCloudIcon } from './icons/Icons';

interface MyProfileProps {
    user: User;
    onUpdateProfile: (updatedUser: User) => void;
}

export const MyProfile: React.FC<MyProfileProps> = ({ user, onUpdateProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleStudentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'year' ? parseInt(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateProfile(formData);
        setIsEditing(false);
    };
    
    const renderEditAvatar = () => (
        <div className="relative group">
            <Avatar name={user.name} imageUrl={user.profilePictureUrl} className="w-24 h-24 text-4xl" />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <UploadCloudIcon className="w-8 h-8 text-white" />
            </div>
        </div>
    );

    const renderStudentFields = (profile: StudentProfile) => (
        <>
            <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Major</label>
                {isEditing ? (
                    <input type="text" name="major" value={profile.major} onChange={handleStudentInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-light-bg dark:bg-dark-bg" />
                ) : (
                    <p className="mt-1 text-lg">{profile.major}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Year</label>
                {isEditing ? (
                    <input type="number" name="year" value={profile.year} onChange={handleStudentInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-light-bg dark:bg-dark-bg" />
                ) : (
                    <p className="mt-1 text-lg">{profile.year}</p>
                )}
            </div>
             <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Institution Code</label>
                {isEditing ? (
                    <input type="text" name="institutionCode" value={profile.institutionCode || ''} onChange={handleStudentInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-light-bg dark:bg-dark-bg" placeholder="e.g. SU"/>
                ) : (
                    <p className="mt-1 text-lg">{profile.institutionCode || 'N/A'}</p>
                )}
            </div>
            {(profile.institutionCode) && (
                <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Roll Number</label>
                    {isEditing ? (
                        <input type="text" name="rollNumber" value={profile.rollNumber || ''} onChange={handleStudentInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-light-bg dark:bg-dark-bg" placeholder="e.g. 21CS010"/>
                    ) : (
                        <p className="mt-1 text-lg">{profile.rollNumber || 'N/A'}</p>
                    )}
                </div>
            )}
        </>
    );

    const renderFacultyFields = (profile: FacultyProfile) => (
        <>
            <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Department</label>
                {isEditing ? (
                    <input type="text" name="department" value={profile.department} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-light-bg dark:bg-dark-bg" />
                ) : (
                    <p className="mt-1 text-lg">{profile.department}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Institution Code</label>
                {isEditing ? (
                    <input type="text" name="institutionCode" value={profile.institutionCode || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-light-bg dark:bg-dark-bg" />
                ) : (
                    <p className="mt-1 text-lg">{profile.institutionCode || 'N/A'}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Faculty ID</label>
                {isEditing ? (
                    <input type="text" name="facultyId" value={profile.facultyId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-light-bg dark:bg-dark-bg" />
                ) : (
                    <p className="mt-1 text-lg">{profile.facultyId}</p>
                )}
            </div>
        </>
    );


    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
             <div className="bg-card-bg dark:bg-dark-card-bg p-8 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-lg">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {isEditing ? renderEditAvatar() : <Avatar name={user.name} imageUrl={user.profilePictureUrl} className="w-24 h-24 text-4xl" />}
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-3xl font-bold">{isEditing ? formData.name : user.name}</h2>
                        <p className="text-text-secondary dark:text-dark-text-secondary">{user.email}</p>
                    </div>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover shadow-md">
                            Edit Profile
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Full Name</label>
                        {isEditing ? (
                             <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-light-bg dark:bg-dark-bg" />
                        ) : (
                            <p className="mt-1 text-lg">{user.name}</p>
                        )}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Email</label>
                        <p className="mt-1 text-lg">{user.email}</p>
                    </div>

                    {user.role === 'student' && renderStudentFields(formData as StudentProfile)}
                    {user.role === 'faculty' && renderFacultyFields(formData as FacultyProfile)}
                    
                    {isEditing && (
                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={() => { setIsEditing(false); setFormData(user); }} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-transparent rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50">
                                Cancel
                            </button>
                            <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover shadow-md">
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
             </div>
        </div>
    );
};