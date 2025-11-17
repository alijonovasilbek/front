
import type { Student, Group, Payment, Contract } from './types';
import { PaymentStatus, StudentStatus } from './types';

export const GROUPS: Group[] = [
  { id: 1, name: 'U-10 Lions', coach: 'Aziz Haydarov', studentIds: [1, 2, 3, 4], monthlyFee: 500000 },
  { id: 2, name: 'U-12 Tigers', coach: 'Server Djeparov', studentIds: [5, 6, 7], monthlyFee: 600000 },
  { id: 3, name: 'U-14 Eagles', coach: 'Timur Kapadze', studentIds: [8, 9, 10], monthlyFee: 700000 },
  { id: 4, name: 'Goalkeepers', coach: 'Ignatiy Nesterov', studentIds: [1], monthlyFee: 550000 },
];

export const STUDENTS: Student[] = [
  { id: 1, name: 'Sardor Rashidov Jr.', dob: '2014-06-14', groupId: 1, contact: { phone: '998-90-123-4567', email: 'sardor@example.com', address: '123 Tashkent, Uzbekistan' }, status: StudentStatus.Active, joinedDate: '2023-09-01', avatarUrl: `https://picsum.photos/seed/sardor/200`, performance: { goals: 12, assists: 8, attendance: 95 } },
  { id: 2, name: 'Eldor Shomurodov Jr.', dob: '2014-03-22', groupId: 1, contact: { phone: '998-90-234-5678', email: 'eldor@example.com', address: '234 Tashkent, Uzbekistan' }, status: StudentStatus.Active, joinedDate: '2023-09-01', avatarUrl: `https://picsum.photos/seed/eldor/200`, performance: { goals: 15, assists: 5, attendance: 98 } },
  { id: 3, name: 'Jaloliddin Masharipov Jr.', dob: '2014-09-01', groupId: 1, contact: { phone: '998-90-345-6789', email: 'jalol@example.com', address: '345 Tashkent, Uzbekistan' }, status: StudentStatus.Inactive, joinedDate: '2023-10-05', avatarUrl: `https://picsum.photos/seed/jalol/200`, performance: { goals: 8, assists: 10, attendance: 85 } },
  { id: 4, name: 'Otabek Shukurov Jr.', dob: '2014-07-11', groupId: 1, contact: { phone: '998-90-456-7890', email: 'otabek@example.com', address: '456 Tashkent, Uzbekistan' }, status: StudentStatus.Active, joinedDate: '2023-09-15', avatarUrl: `https://picsum.photos/seed/otabek/200`, performance: { goals: 5, assists: 15, attendance: 92 } },
  { id: 5, name: 'Odil Ahmedov Jr.', dob: '2012-11-25', groupId: 2, contact: { phone: '998-91-123-4567', email: 'odil@example.com', address: '567 Tashkent, Uzbekistan' }, status: StudentStatus.Active, joinedDate: '2022-08-20', avatarUrl: `https://picsum.photos/seed/odil/200`, performance: { goals: 20, assists: 12, attendance: 99 } },
  { id: 6, name: 'Vitaliy Denisov Jr.', dob: '2012-02-23', groupId: 2, contact: { phone: '998-91-234-5678', email: 'vitaliy@example.com', address: '678 Tashkent, Uzbekistan' }, status: StudentStatus.Active, joinedDate: '2022-08-20', avatarUrl: `https://picsum.photos/seed/vitaliy/200`, performance: { goals: 7, assists: 18, attendance: 94 } },
  { id: 7, name: 'Igor Sergeev Jr.', dob: '2012-04-30', groupId: 2, contact: { phone: '998-91-345-6789', email: 'igor@example.com', address: '789 Tashkent, Uzbekistan' }, status: StudentStatus.Active, joinedDate: '2022-09-01', avatarUrl: `https://picsum.photos/seed/igor/200`, performance: { goals: 25, assists: 7, attendance: 96 } },
  { id: 8, name: 'Anzur Ismailov Jr.', dob: '2010-04-21', groupId: 3, contact: { phone: '998-93-123-4567', email: 'anzur@example.com', address: '890 Tashkent, Uzbekistan' }, status: StudentStatus.Active, joinedDate: '2021-09-01', avatarUrl: `https://picsum.photos/seed/anzur/200`, performance: { goals: 3, assists: 20, attendance: 97 } },
  { id: 9, name: 'Marat Bikmaev Jr.', dob: '2010-01-01', groupId: 3, contact: { phone: '998-93-234-5678', email: 'marat@example.com', address: '901 Tashkent, Uzbekistan' }, status: StudentStatus.Inactive, joinedDate: '2021-09-01', avatarUrl: `https://picsum.photos/seed/marat/200`, performance: { goals: 18, assists: 10, attendance: 88 } },
  { id: 10, name: 'Vagiz Galiulin Jr.', dob: '2010-10-10', groupId: 3, contact: { phone: '998-93-345-6789', email: 'vagiz@example.com', address: '112 Tashkent, Uzbekistan' }, status: StudentStatus.Active, joinedDate: '2021-10-01', avatarUrl: `https://picsum.photos/seed/vagiz/200`, performance: { goals: 14, assists: 14, attendance: 93 } },
];

export const PAYMENTS: Payment[] = [
  { id: 'p1', studentId: 1, amount: 500000, date: '2024-07-01', dueDate: '2024-07-05', status: PaymentStatus.Paid },
  { id: 'p2', studentId: 2, amount: 500000, date: '2024-07-02', dueDate: '2024-07-05', status: PaymentStatus.Paid },
  { id: 'p3', studentId: 3, amount: 500000, date: '', dueDate: '2024-07-05', status: PaymentStatus.Overdue },
  { id: 'p4', studentId: 4, amount: 500000, date: '2024-07-05', dueDate: '2024-07-05', status: PaymentStatus.Paid },
  { id: 'p5', studentId: 5, amount: 600000, date: '', dueDate: '2024-07-05', status: PaymentStatus.Due },
  { id: 'p6', studentId: 6, amount: 600000, date: '2024-07-01', dueDate: '2024-07-05', status: PaymentStatus.Paid },
  { id: 'p7', studentId: 7, amount: 600000, date: '', dueDate: '2024-07-05', status: PaymentStatus.Due },
  { id: 'p8', studentId: 8, amount: 700000, date: '2024-06-28', dueDate: '2024-07-05', status: PaymentStatus.Paid },
  { id: 'p9', studentId: 9, amount: 700000, date: '', dueDate: '2024-06-05', status: PaymentStatus.Overdue },
  { id: 'p10', studentId: 10, amount: 700000, date: '2024-07-04', dueDate: '2024-07-05', status: PaymentStatus.Paid },
  { id: 'p11', studentId: 1, amount: 500000, date: '2024-06-03', dueDate: '2024-06-05', status: PaymentStatus.Paid },
  { id: 'p12', studentId: 5, amount: 600000, date: '2024-06-05', dueDate: '2024-06-05', status: PaymentStatus.Paid },
];

export const CONTRACTS: Contract[] = STUDENTS.map(student => ({
  id: `c${student.id}`,
  studentId: student.id,
  startDate: new Date(new Date(student.joinedDate).setFullYear(new Date(student.joinedDate).getFullYear())).toISOString().split('T')[0],
  endDate: new Date(new Date(student.joinedDate).setFullYear(new Date(student.joinedDate).getFullYear() + 1)).toISOString().split('T')[0],
  contractUrl: '#',
}));
