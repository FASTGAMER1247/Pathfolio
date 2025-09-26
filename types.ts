export enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum ActivityType {
  Conference = 'Conference Presentation',
  Workshop = 'Workshop Attended',
  Certification = 'Professional Certification',
  ClubActivity = 'Club Leadership/Activity',
  Competition = 'Competition/Award',
  Internship = 'Internship/Co-op',
  CommunityService = 'Community Service',
  OnlineCourse = 'Online Course Completion',
}

export interface Achievement {
  id: string;
  studentId: string;
  submittedBy: string; 
  title: string;
  description: string;
  date: string;
  type: ActivityType;
  status: Status;
  proofUrl?: string;
  assignmentId?: string; // For tracking assignment submissions
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty';
  profilePictureUrl?: string;
  institutionCode?: string;
  password?: string; // In a real app, this would be handled server-side
}

export interface StudentProfile extends User {
  role: 'student';
  major: string;
  year: number;
  rollNumber?: string;
}

export interface FacultyProfile extends User {
  role: 'faculty';
  department: string;
  facultyId: string;
}

export type AppUser = StudentProfile | FacultyProfile;

export interface Assignment {
  id: string;
  facultyId: string;
  institutionCode: string;
  title: string;
  description: string;
  deadline: string;
}
