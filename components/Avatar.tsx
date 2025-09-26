
import React from 'react';

interface AvatarProps {
  name: string;
  imageUrl?: string;
  className?: string;
}

const getInitials = (name: string) => {
  if (!name) return '?';
  const names = name.split(' ');
  const initials = names.map(n => n[0]).join('');
  return initials.slice(0, 2).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({ name, imageUrl, className = 'w-10 h-10' }) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`rounded-full object-cover shadow-md ${className}`}
      />
    );
  }

  return (
    <div className={`rounded-full bg-primary text-white flex items-center justify-center font-bold select-none shadow-md ${className}`}>
      <span>{getInitials(name)}</span>
    </div>
  );
};
