
import React, { useState } from 'react';
import type { Achievement, StudentProfile } from '../types';
import { AchievementCard } from './AchievementCard';
import { DownloadIcon, ShareIcon } from './icons/Icons';
import { PortfolioPDFLayout } from './PortfolioPDFLayout';
import { renderToStaticMarkup } from 'react-dom/server';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface MyPortfolioProps {
    profile: StudentProfile;
    achievements: Achievement[];
    showToast: (message: string) => void;
}

export const MyPortfolio: React.FC<MyPortfolioProps> = ({ profile, achievements, showToast }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const approvedAchievements = achievements.filter(a => a.status === 'Approved');

    const handleShare = async () => {
        const publicUrl = `${window.location.origin}/portfolio/${profile.id}`;
        const shareData = {
            title: `${profile.name}'s Pathfolio`,
            text: `Check out my verified professional portfolio on Pathfolio!`,
            url: publicUrl,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast('Portfolio shared successfully!');
            } else {
                throw new Error('Web Share API not supported');
            }
        } catch (err) {
            // Fallback to clipboard
            navigator.clipboard.writeText(publicUrl).then(() => {
                showToast('Portfolio link copied to clipboard!');
            }, () => {
                showToast('Failed to copy link.');
            });
        }
    };
    
    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        showToast('Preparing PDF...');

        // Create a container for the PDF content and render it off-screen
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.width = '794px'; // A4 width in pixels
        
        // Use renderToStaticMarkup to get the HTML string of the component
        const portfolioComponent = <PortfolioPDFLayout achievements={approvedAchievements} profile={profile} />;
        container.innerHTML = renderToStaticMarkup(portfolioComponent);
        document.body.appendChild(container);
        
        const elementToCapture = container.firstElementChild as HTMLElement;

        try {
            // Find all images within the component and wait for them to load
            // This is crucial for html2canvas to capture images correctly, especially from external sources.
            const images = Array.from(elementToCapture.getElementsByTagName('img'));
            const imageLoadPromises = images.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => {
                        console.error(`Failed to load image: ${img.src}`);
                        // Resolve anyway to not block PDF generation if one image fails
                        resolve();
                    };
                });
            });

            await Promise.all(imageLoadPromises);

            const canvas = await html2canvas(elementToCapture, {
                scale: 2, // Higher scale for better quality
                useCORS: true, // Needed for cross-origin images
                logging: false,
            });
            
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${profile.name.replace(' ', '_')}_Portfolio.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            showToast("Could not generate PDF. Please try again.");
        } finally {
            // Clean up the temporary container
            document.body.removeChild(container);
            setIsDownloading(false);
        }
    };

    return (
        <div className="animate-fade-in-up max-w-5xl mx-auto space-y-8">
            <div className="bg-card-bg dark:bg-dark-card-bg p-8 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold">My Portfolio</h2>
                        <p className="text-text-secondary dark:text-dark-text-secondary mt-1">A curated showcase of your approved achievements.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleShare} className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-md">
                            <ShareIcon className="mr-2"/> Share
                        </button>
                        <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex items-center bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition shadow-md disabled:opacity-50">
                            {isDownloading ? 'Downloading...' : <><DownloadIcon className="mr-2"/> Download PDF</>}
                        </button>
                    </div>
                </div>
            </div>
            
             <div>
                <h3 className="text-2xl font-bold mb-4">Approved Achievements ({approvedAchievements.length})</h3>
                 <div className="space-y-4">
                    {approvedAchievements.length > 0 ? (
                        approvedAchievements.map(ach => <AchievementCard key={ach.id} achievement={ach} />)
                    ) : (
                        <div className="text-center p-12 bg-card-bg dark:bg-dark-card-bg border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                            <p className="text-text-secondary dark:text-dark-text-secondary">You have no approved achievements to display.</p>
                        </div>
                    )}
                 </div>
            </div>
        </div>
    );
};
