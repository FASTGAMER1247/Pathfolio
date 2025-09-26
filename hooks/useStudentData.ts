import { useState, useEffect } from 'react';
import { User, StudentProfile, FacultyProfile, Achievement, Status, ActivityType, AppUser, Assignment } from '../types';

// Mock Data - Used ONLY for the very first initialization if localStorage is empty.
const initialUsers: AppUser[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'student@demo.com',
        password: 'password',
        role: 'student',
        major: 'Computer Science',
        year: 3,
        institutionCode: 'SU',
        profilePictureUrl: 'https://picsum.photos/id/1027/200/200',
        rollNumber: '21CS001',
    },
    {
        id: '2',
        name: 'Dr. Bob Smith',
        email: 'faculty@demo.com',
        password: 'password',
        role: 'faculty',
        department: 'Engineering',
        institutionCode: 'SU',
        profilePictureUrl: 'https://picsum.photos/id/1005/200/200',
        facultyId: 'SU-ENG-001',
    },
];

const initialAchievements: Achievement[] = [
    { id: 'a1', studentId: '1', submittedBy: 'Alice Johnson', title: 'Won 1st Place at Hackathon', type: ActivityType.Competition, date: '2023-10-22', description: 'Developed a mobile app for campus navigation and won first prize.', status: Status.Approved },
    { id: 'a2', studentId: '1', submittedBy: 'Alice Johnson', title: 'React Front-End Development Course', type: ActivityType.OnlineCourse, date: '2023-08-15', description: 'Completed a 10-week intensive course on React, Redux, and modern front-end workflows.', status: Status.Approved },
    { id: 'a3', studentId: '1', submittedBy: 'Alice Johnson', title: 'Summer Internship at TechCorp', type: ActivityType.Internship, date: '2023-08-31', description: 'Worked as a software engineering intern, contributing to the main product line.', status: Status.Pending },
    { id: 'a4', studentId: '1', submittedBy: 'Alice Johnson', title: 'Volunteering at Local Code Camp', type: ActivityType.CommunityService, date: '2023-09-10', description: 'Mentored high school students and taught them basic Python programming.', status: Status.Rejected },
];

const initialAssignments: Assignment[] = [];

// --- LocalStorage Persistence Layer ---
const USERS_KEY = 'pathfolio_users';
const ACHIEVEMENTS_KEY = 'pathfolio_achievements';
const ASSIGNMENTS_KEY = 'pathfolio_assignments';

// Function to initialize the DB from localStorage or seed it with initial data
const initializeDB = () => {
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
    }
    if (!localStorage.getItem(ACHIEVEMENTS_KEY)) {
        localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(initialAchievements));
    }
    if (!localStorage.getItem(ASSIGNMENTS_KEY)) {
        localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(initialAssignments));
    }
};

// Initialize on module load
initializeDB();

// Load data from localStorage. We can now be sure it exists.
let usersDB: AppUser[] = JSON.parse(localStorage.getItem(USERS_KEY)!);
let achievementsDB: Achievement[] = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY)!);
let assignmentsDB: Assignment[] = JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY)!);

const saveUsers = () => localStorage.setItem(USERS_KEY, JSON.stringify(usersDB));
const saveAchievements = () => localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievementsDB));
const saveAssignments = () => localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignmentsDB));


let listeners: React.Dispatch<React.SetStateAction<number>>[] = [];

const notifyListeners = () => {
  // Re-read from storage to ensure consistency
  usersDB = JSON.parse(localStorage.getItem(USERS_KEY)!);
  achievementsDB = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY)!);
  assignmentsDB = JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY)!);
  for (const listener of listeners) {
    listener(c => c + 1); // Trigger re-render
  }
};

// Data modification functions are now outside the hook, operating on the singleton DB
const dataStore = {
    login: (email: string, pass: string): AppUser | null => {
        const user = usersDB.find(u => u.email === email && u.password === pass);
        if (user) {
            const { password, ...userWithoutPass } = user;
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
            return userWithoutPass as AppUser;
        }
        return null;
    },
    register: (newUser: Omit<AppUser, 'id'>): AppUser => {
        const userWithId = { ...newUser, id: String(Date.now()) } as AppUser;
        usersDB.push(userWithId);
        saveUsers();
        const { password, ...userWithoutPass } = userWithId;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
        notifyListeners();
        return userWithoutPass;
    },
    logout: () => {
        localStorage.removeItem('currentUser');
    },
    getUserById: (userId: string): AppUser | undefined => {
        return usersDB.find(u => u.id === userId);
    },
    getStudentByRollNumber: (rollNumber: string, institutionCode: string): StudentProfile | undefined => {
        return usersDB.find(u => 
            u.role === 'student' && 
            (u as StudentProfile).rollNumber === rollNumber &&
            u.institutionCode === institutionCode
        ) as StudentProfile | undefined;
    },
    getAchievementsByStudentId: (studentId: string): Achievement[] => {
        return achievementsDB.filter(a => a.studentId === studentId);
    },
    addAchievement: (data: Omit<Achievement, 'id' | 'status' | 'studentId' | 'submittedBy'>, student: StudentProfile) => {
        const newAchievement: Achievement = {
            ...data,
            id: `ach_${Date.now()}`,
            status: student.institutionCode ? Status.Pending : Status.Approved,
            studentId: student.id,
            submittedBy: student.name,
        };
        achievementsDB.push(newAchievement);
        saveAchievements();
        notifyListeners();
    },
    updateAchievement: (updatedData: Partial<Achievement> & { id: string }) => {
        achievementsDB = achievementsDB.map(ach =>
            ach.id === updatedData.id ? { ...ach, ...updatedData } : ach
        );
        saveAchievements();
        notifyListeners();
    },
    deleteAchievement: (achievementId: string) => {
        achievementsDB = achievementsDB.filter(ach => ach.id !== achievementId);
        saveAchievements();
        notifyListeners();
    },
    updateAchievementStatus: (achievementId: string, status: Status) => {
        achievementsDB = achievementsDB.map(ach =>
            ach.id === achievementId ? { ...ach, status } : ach
        );
        saveAchievements();
        notifyListeners();
    },
    updateUser: (updatedUser: AppUser) => {
        usersDB = usersDB.map(user =>
            user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
        saveUsers();
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser && JSON.parse(currentUser).id === updatedUser.id) {
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
        notifyListeners();
    },
    getUsers: () => usersDB,
    getAchievements: () => achievementsDB,
    getAssignments: () => assignmentsDB,

    addAssignment: (data: Omit<Assignment, 'id' | 'facultyId' | 'institutionCode'>, faculty: FacultyProfile) => {
        if (!faculty.institutionCode) return;
        const newAssignment: Assignment = {
            ...data,
            id: `asg_${Date.now()}`,
            facultyId: faculty.id,
            institutionCode: faculty.institutionCode,
        };
        assignmentsDB.push(newAssignment);
        saveAssignments();
        notifyListeners();
    },
    getAssignmentsByInstitution: (institutionCode: string) => {
        return assignmentsDB.filter(a => a.institutionCode === institutionCode);
    },
     getStudentsByInstitution: (institutionCode: string) => {
        return usersDB.filter(u => u.role === 'student' && u.institutionCode === institutionCode) as StudentProfile[];
    }
};


export const useDataStore = () => {
    const [_, forceUpdate] = useState(0);

    useEffect(() => {
        listeners.push(forceUpdate);
        return () => {
            listeners = listeners.filter(l => l !== forceUpdate);
        };
    }, []);

    return {
        ...dataStore,
        users: dataStore.getUsers(),
        achievements: dataStore.getAchievements(),
        assignments: dataStore.getAssignments(),
    };
};
