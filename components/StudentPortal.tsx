
import React from 'react';
import type { Student, Group } from '../types';
import { STUDENTS, GROUPS, PAYMENTS, CONTRACTS } from '../constants';
import { PaymentStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const StudentPortal: React.FC = () => {
    // Mocking a logged-in student. In a real app, this would come from auth context.
    const student = STUDENTS[4]; // Odil Ahmedov Jr.
    const group = GROUPS.find(g => g.id === student.groupId)!;
    const studentPayments = PAYMENTS.filter(p => p.studentId === student.id).sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    const studentContract = CONTRACTS.find(c => c.studentId === student.id);

    const performanceData = [
        { name: 'Goals', value: student.performance.goals },
        { name: 'Assists', value: student.performance.assists },
        { name: 'Attendance', value: student.performance.attendance },
    ];

    return (
        <div className="space-y-8">
            <div className="bg-card shadow-md rounded-xl p-8 flex items-center">
                <img src={student.avatarUrl} alt={student.name} className="w-24 h-24 rounded-full mr-6 border-4 border-bunyodkor-yellow" />
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Welcome, {student.name.split(' ')[0]}!</h1>
                    <p className="text-text-secondary text-lg">Here is your academy overview.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Performance */}
                    <div className="bg-card shadow-md rounded-xl p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-4">Season Performance</h2>
                         <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={performanceData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" tick={{ fill: '#64748B' }} />
                                <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#64748B' }} />
                                <Tooltip cursor={{fill: 'rgba(241, 245, 249, 0.5)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '0.5rem' }}/>
                                <Bar dataKey="value" fill="#00529B" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Payment History */}
                    <div className="bg-card shadow-md rounded-xl p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-4">Payment History</h2>
                        <ul className="space-y-3">
                            {studentPayments.map(p => (
                                <li key={p.id} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                                    <div>
                                        <p className="font-semibold text-gray-800">{p.amount.toLocaleString('uz-UZ')} UZS</p>
                                        <p className="text-sm text-gray-500">Due: {new Date(p.dueDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center">
                                       {p.status === PaymentStatus.Paid && p.date && <p className="text-sm text-gray-500 mr-4">Paid on: {new Date(p.date).toLocaleDateString()}</p>}
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                            p.status === PaymentStatus.Paid ? 'bg-green-100 text-green-700' : p.status === PaymentStatus.Due ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                        }`}>{p.status}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                         <button className="mt-4 w-full bg-bunyodkor-yellow text-bunyodkor-blue font-bold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300">
                            Make a Payment
                        </button>
                    </div>
                </div>

                {/* Profile & Group */}
                <div className="space-y-8">
                     <div className="bg-card shadow-md rounded-xl p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-4">My Group</h2>
                        <p className="text-2xl font-semibold text-bunyodkor-blue">{group.name}</p>
                        <p className="text-text-secondary mt-1">Coach: <span className="font-medium text-text-primary">{group.coach}</span></p>
                     </div>
                     <div className="bg-card shadow-md rounded-xl p-6">
                        <h2 className="text-xl font-bold text-text-primary mb-4">My Profile</h2>
                        <InfoItem label="Phone" value={student.contact.phone} />
                        <InfoItem label="Email" value={student.contact.email} />
                        <InfoItem label="Joined" value={student.joinedDate} />
                        <InfoItem label="Contract End" value={studentContract?.endDate || 'N/A'} />
                        <button className="mt-4 w-full bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300">
                            Update Information
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem: React.FC<{ label: string; value: string}> = ({ label, value}) => (
    <div className="text-sm mb-2">
        <span className="font-semibold text-gray-600 mr-2">{label}:</span>
        <span className="text-gray-800">{value}</span>
    </div>
);


export default StudentPortal;
