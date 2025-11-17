
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { STUDENTS, PAYMENTS, GROUPS } from '../constants';
import { PaymentStatus, StudentStatus } from '../types';
import type { Student, Payment } from '../types';

// Fix: Replaced JSX.Element with React.ReactElement to resolve namespace error.
const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-card p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-text-secondary">{title}</p>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const totalStudents = STUDENTS.length;
    const activeStudents = STUDENTS.filter(s => s.status === StudentStatus.Active).length;
    
    const totalRevenue = useMemo(() => 
        PAYMENTS.filter(p => p.status === PaymentStatus.Paid)
                .reduce((acc, p) => acc + p.amount, 0),
    []);

    const paymentsDue = useMemo(() =>
        PAYMENTS.filter(p => p.status === PaymentStatus.Due || p.status === PaymentStatus.Overdue).length,
    []);
    
    const monthlyRevenueData = useMemo(() => {
        const months = ["January", "February", "March", "April", "May", "June", "July"];
        const data = months.map(month => ({ name: month.substring(0,3), revenue: 0 }));
        PAYMENTS.forEach(p => {
            if (p.status === PaymentStatus.Paid) {
                const monthIndex = new Date(p.date).getMonth();
                if(monthIndex < data.length) {
                    data[monthIndex].revenue += p.amount;
                }
            }
        });
        return data.map(d => ({ ...d, revenue: d.revenue / 1000000 })); // in millions UZS
    }, []);

    const groupDistributionData = useMemo(() => 
        GROUPS.map(group => ({
            name: group.name,
            value: STUDENTS.filter(s => s.groupId === group.id).length
        })), 
    []);

    const recentPayments = useMemo(() =>
        PAYMENTS
            .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
            .slice(0, 5)
            .map(p => ({...p, student: STUDENTS.find(s => s.id === p.studentId)}))
    , []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value={totalStudents.toString()} icon={<UsersIcon />} color="bg-blue-100 text-blue-600" />
                <StatCard title="Active Students" value={activeStudents.toString()} icon={<UserCheckIcon />} color="bg-green-100 text-green-600" />
                <StatCard title="Total Revenue (YTD)" value={`${(totalRevenue / 1000000).toFixed(1)}M UZS`} icon={<CashIcon />} color="bg-yellow-100 text-yellow-600" />
                <StatCard title="Payments Due" value={paymentsDue.toString()} icon={<ExclamationIcon />} color="bg-red-100 text-red-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-card p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Monthly Revenue (in millions UZS)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyRevenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: '#64748B' }} />
                            <YAxis tick={{ fill: '#64748B' }} />
                            <Tooltip cursor={{fill: 'rgba(241, 245, 249, 0.5)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '0.5rem' }}/>
                            <Legend />
                            <Bar dataKey="revenue" fill="#00529B" name="Revenue (M UZS)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Student Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={groupDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {groupDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '0.5rem' }}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Payments</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-sm text-text-secondary border-b">
                                <th className="py-3 px-4 font-medium">Student</th>
                                <th className="py-3 px-4 font-medium">Amount</th>
                                <th className="py-3 px-4 font-medium">Date</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPayments.map(p => (
                                <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="py-3 px-4 flex items-center">
                                        <img src={p.student?.avatarUrl} alt={p.student?.name} className="w-8 h-8 rounded-full mr-3" />
                                        <span className="font-medium text-text-primary">{p.student?.name}</span>
                                    </td>
                                    <td className="py-3 px-4 text-text-secondary">{p.amount.toLocaleString('uz-UZ')} UZS</td>
                                    <td className="py-3 px-4 text-text-secondary">{p.date ? new Date(p.date).toLocaleDateString() : 'N/A'}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            p.status === PaymentStatus.Paid ? 'bg-green-100 text-green-700' :
                                            p.status === PaymentStatus.Due ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>{p.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Icons
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-6-6h6a6 6 0 006 6" /></svg>;
const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ExclamationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;

export default Dashboard;
