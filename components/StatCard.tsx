import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

const colorClasses = {
  blue: 'from-blue-400 to-blue-600',
  green: 'from-green-400 to-green-600',
  yellow: 'from-yellow-400 to-yellow-600',
  purple: 'from-purple-400 to-purple-600',
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="relative p-6 rounded-xl shadow-lg overflow-hidden bg-card-bg dark:bg-dark-card-bg border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-bl ${colorClasses[color]} opacity-20 dark:opacity-30`}></div>
      <div className="relative z-10">
        <div className={`p-3 inline-block rounded-full bg-gradient-to-br ${colorClasses[color]} text-white shadow-md mb-4`}>
            {icon}
        </div>
        <p className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">{title}</p>
        <p className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">{value}</p>
      </div>
    </div>
  );
};
