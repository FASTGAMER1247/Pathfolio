
import React, { useState, useEffect } from 'react';
import type { Achievement } from '../types';
import { ActivityType } from '../types';
import { CloseIcon, UploadCloudIcon } from './icons/Icons';

interface AddAchievementModalProps {
  onClose: () => void;
  onSave: (data: Omit<Achievement, 'id' | 'status' | 'studentId' | 'submittedBy'>, achievementIdToUpdate?: string) => void;
  achievementToEdit?: Achievement | null;
  assignmentId?: string;
}

export const AddAchievementModal: React.FC<AddAchievementModalProps> = ({ onClose, onSave, achievementToEdit, assignmentId }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ActivityType>(ActivityType.Conference);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (achievementToEdit) {
      setTitle(achievementToEdit.title);
      setType(achievementToEdit.type);
      setDate(achievementToEdit.date);
      setDescription(achievementToEdit.description);
    }
  }, [achievementToEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !description) {
        return;
    }
    const achievementData = { title, type, date, description, ...(assignmentId && { assignmentId }) };
    onSave(achievementData, achievementToEdit?.id);
    onClose();
  };
  
  const modalTitle = achievementToEdit ? 'Edit Achievement' : 'Add New Achievement';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card-bg dark:bg-dark-card-bg rounded-xl shadow-2xl w-full max-w-lg animate-fade-in-up border border-gray-200/50 dark:border-gray-700/50" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold">{modalTitle}</h3>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Activity Type</label>
                <select id="type" value={type} onChange={e => setType(e.target.value as ActivityType)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" required>
                  {Object.values(ActivityType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Date</label>
                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" required />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Description</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light-bg/50 dark:bg-dark-bg/50" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Upload Proof</label>
              <label htmlFor="proof-upload" className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-light-bg/50 dark:bg-dark-bg/50 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer dark:border-gray-600 hover:border-primary dark:hover:border-primary">
                  <span className="flex items-center space-x-2">
                      <UploadCloudIcon className="w-6 h-6 text-gray-500" />
                      <span className="font-medium text-gray-600 dark:text-gray-300">{fileName || 'Click to upload or drag and drop'}</span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{fileName ? `File: ${fileName}`: 'PNG, JPG, PDF (MAX. 5MB)'}</span>
              </label>
              <input id="proof-upload" type="file" className="hidden" onChange={handleFileChange} />
            </div>
          </div>
          <div className="flex justify-end items-center p-5 bg-light-bg/50 dark:bg-dark-bg/50 border-t border-gray-200 dark:border-gray-700 rounded-b-xl">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-transparent rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 mr-3">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover shadow-md hover:shadow-lg transition">Save Achievement</button>
          </div>
        </form>
      </div>
    </div>
  );
};
