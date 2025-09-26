
import React from 'react';
import { SparklesIcon, TrophyIcon, CheckCircleIcon, CertificateIcon, UsersIcon, LightBulbIcon } from './icons/Icons';
import { StatCard } from './StatCard';
import { AchievementCard } from './AchievementCard';
import { ActivityType, Status } from '../types';

interface LandingPageProps {
    onSignIn: () => void;
    onSignUp: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-card-bg/50 dark:bg-dark-card-bg/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-text-secondary dark:text-dark-text-secondary">{description}</p>
    </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onSignIn, onSignUp }) => {
    
    const demoAchievements = [
        { id: '1', studentId: 'demo', submittedBy: 'Alex Doe', title: 'Won 1st Place at Hackathon', type: ActivityType.Competition, date: '2023-10-22', description: 'Developed a mobile app for campus navigation.', status: Status.Approved },
        { id: '2', studentId: 'demo', submittedBy: 'Alex Doe', title: 'Summer Internship at TechCorp', type: ActivityType.Internship, date: '2023-08-31', description: 'Worked as a software engineering intern on the main product line.', status: Status.Pending },
    ];

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-text-primary dark:text-dark-text-primary font-sans overflow-x-hidden">
             {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-30 bg-card-bg/80 dark:bg-dark-card-bg/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <a href="#" className="flex items-center gap-2">
                        <SparklesIcon className="w-8 h-8 text-primary" />
                        <span className="text-2xl font-bold">Pathfolio</span>
                    </a>
                    <div className="flex items-center gap-2">
                        <button onClick={onSignIn} className="font-semibold px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition">
                            Sign In
                        </button>
                        <button onClick={onSignUp} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition shadow-md">
                            Get Started
                        </button>
                    </div>
                </nav>
            </header>
            
            <main>
                {/* Hero Section */}
                <section className="container mx-auto px-6 pt-32 pb-16 text-center flex flex-col items-center animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                        Unlock Your Full Potential
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-text-secondary dark:text-dark-text-secondary max-w-3xl">
                        Pathfolio is the ultimate platform for students to track, manage, and showcase their academic and extracurricular achievements with faculty-verified credibility.
                    </p>
                    <div className="mt-10">
                        <button onClick={onSignUp} className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-lg text-lg transition shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                            Create Your Portfolio for Free
                        </button>
                    </div>
                </section>
                
                {/* Features Section */}
                 <section className="py-20 bg-card-bg/50 dark:bg-dark-card-bg/50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold">Everything You Need to Succeed</h2>
                            <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">Pathfolio provides the tools to build a comprehensive, verified record of your journey.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                           <FeatureCard icon={<TrophyIcon/>} title="Dynamic Dashboard" description="Visualize your progress with real-time updates on all your academic and extracurricular activities." />
                           <FeatureCard icon={<CheckCircleIcon/>} title="Faculty Approval" description="Gain credibility with faculty-verified achievements, ensuring your portfolio is trusted and authentic." />
                           <FeatureCard icon={<CertificateIcon/>} title="Shareable Portfolio" description="Generate a professional, shareable link to your portfolio or download a PDF for applications." />
                        </div>
                    </div>
                </section>

                 {/* Visual Showcase */}
                 <section className="py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-12">See It in Action</h2>
                         <div className="relative max-w-5xl mx-auto rounded-xl shadow-2xl p-4 bg-light-bg dark:bg-dark-bg border border-gray-200/80 dark:border-gray-700/80">
                            {/* Mock Dashboard UI */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                               <StatCard title="Total Achievements" value={12} icon={<TrophyIcon />} color="blue" />
                               <StatCard title="Approved" value={9} icon={<CheckCircleIcon />} color="green" />
                               <StatCard title="Internships" value={1} icon={<UsersIcon />} color="purple" />
                               <StatCard title="Certifications" value={3} icon={<CertificateIcon />} color="yellow" />
                            </div>
                            <div className="space-y-3 text-left">
                                {demoAchievements.map(ach => <AchievementCard key={ach.id} achievement={ach} />)}
                            </div>
                            
                            {/* Interactive Overlay */}
                             <div className="absolute inset-0 bg-gradient-to-t from-light-bg via-light-bg/70 to-transparent dark:from-dark-bg dark:via-dark-bg/70 flex flex-col justify-end items-center p-8 rounded-xl">
                                <h3 className="text-2xl font-bold">Want to build a portfolio like this?</h3>
                                <p className="text-text-secondary dark:text-dark-text-secondary mt-2 mb-6">Sign up to start tracking your achievements and unlock your dashboard.</p>
                                <button
                                    onClick={onSignUp}
                                    className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg text-lg transition shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                                >
                                    Sign Up to Interact
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

             {/* Footer */}
            <footer className="border-t border-gray-200/80 dark:border-gray-700/80">
                <div className="container mx-auto px-6 py-6 text-center text-text-secondary dark:text-dark-text-secondary">
                    <p>&copy; {new Date().getFullYear()} Pathfolio. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
