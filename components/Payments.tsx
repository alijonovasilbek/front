
import React, { useState, useMemo } from 'react';
import { PAYMENTS, STUDENTS } from '../constants';
import { PaymentStatus } from '../types';

const Payments: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const paymentsWithStudentData = useMemo(() =>
        PAYMENTS.map(payment => ({
            ...payment,
            student: STUDENTS.find(s => s.id === payment.studentId)
        })).sort((a,b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()),
    []);

    const filteredPayments = useMemo(() => {
        return paymentsWithStudentData.filter(p => {
            const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
            const matchesSearch = searchTerm === '' || p.student?.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [statusFilter, searchTerm, paymentsWithStudentData]);

    const getStatusColor = (status: PaymentStatus) => {
        switch (status) {
            case PaymentStatus.Paid: return 'bg-green-100 text-green-700';
            case PaymentStatus.Due: return 'bg-yellow-100 text-yellow-700';
            case PaymentStatus.Overdue: return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <h1 className="text-3xl font-bold text-text-primary">Payments</h1>
                 <button className="bg-bunyodkor-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Record Payment
                </button>
            </div>

            <div className="bg-card p-4 rounded-xl shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by student name..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bunyodkor-blue"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                     <select
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bunyodkor-blue"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | 'all')}
                    >
                        <option value="all">All Statuses</option>
                        <option value={PaymentStatus.Paid}>Paid</option>
                        <option value={PaymentStatus.Due}>Due</option>
                        <option value={PaymentStatus.Overdue}>Overdue</option>
                    </select>
                </div>
            </div>

            <div className="bg-card rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr className="text-sm text-text-secondary">
                                <th className="py-3 px-4 font-medium">Student</th>
                                <th className="py-3 px-4 font-medium">Amount</th>
                                <th className="py-3 px-4 font-medium">Due Date</th>
                                <th className="py-3 px-4 font-medium">Payment Date</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                                <th className="py-3 px-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map(p => (
                                <tr key={p.id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 flex items-center">
                                         <img src={p.student?.avatarUrl} alt={p.student?.name} className="w-10 h-10 rounded-full mr-4" />
                                        <div>
                                            <p className="font-semibold text-text-primary">{p.student?.name}</p>
                                            <p className="text-sm text-text-secondary">ID: {p.student?.id}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-text-secondary font-medium">{p.amount.toLocaleString('uz-UZ')} UZS</td>
                                    <td className="py-3 px-4 text-text-secondary">{new Date(p.dueDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 text-text-secondary">{p.date ? new Date(p.date).toLocaleDateString() : 'N/A'}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(p.status)}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="text-bunyodkor-blue hover:underline font-semibold text-sm">Details</button>
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
const PlusIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const SearchIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

export default Payments;
