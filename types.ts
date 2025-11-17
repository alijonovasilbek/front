
export enum PaymentStatus {
  Paid = 'Paid',
  Due = 'Due',
  Overdue = 'Overdue',
}

export enum StudentStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface Payment {
  id: string;
  studentId: number;
  amount: number;
  date: string; // Empty if not paid
  dueDate: string;
  status: PaymentStatus;
}

export interface Contract {
  id: string;
  studentId: number;
  startDate: string;
  endDate: string;
  contractUrl: string;
}

export interface Group {
  id: number;
  name: string;
  coach: string;
  studentIds: number[];
  monthlyFee: number;
}

export interface Student {
  id: number;
  name: string;
  dob: string;
  groupId: number;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  status: StudentStatus;
  joinedDate: string;
  avatarUrl: string;
  performance: {
    goals: number;
    assists: number;
    attendance: number; // percentage
  }
}

export type Page = 'Dashboard' | 'Students' | 'Groups' | 'Payments' | 'Contracts' | 'StudentPortal';
