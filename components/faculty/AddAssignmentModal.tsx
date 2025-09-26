import React, { useState } from 'react';
import type { Assignment } from '../../types';
import { CloseIcon } from '../icons/Icons';

interface AddAssignmentModalProps {
    onClose: () => void;
    onSave: (data: Omit<Assignment, 'id'|'facultyId'|'institutionCode'>) => void;
}

export const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !deadline || !description) return;
        onSave({ title, deadline, description });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-card-bg dark:bg-dark-card-bg rounded-xl shadow-2xl w-full max-w-lg animate-fade-in-up border border-gray-200/50 dark:border-gray-700/50" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold">Create New Assignment</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Title</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" required />
                        </div>
                        <div>
                            <label htmlFor="deadline" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Deadline</label>
                            <input type="date" id="deadline" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" required />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Description</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" required></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end items-center p-5 bg-light-bg/50 dark:bg-dark-bg/50 border-t border-gray-200 dark:border-gray-700 rounded-b-xl">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-transparent rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 mr-3">Cancel</button>
                        <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover shadow-md hover:shadow-lg transition">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
