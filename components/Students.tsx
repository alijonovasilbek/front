
import React, { useState, useMemo } from 'react';
import { STUDENTS, GROUPS } from '../constants';
import type { Student, Group } from '../types';
import { StudentStatus } from '../types';
import StudentProfile from './StudentProfile';

const Students: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<StudentStatus | 'all'>('all');
    const [groupFilter, setGroupFilter] = useState<number | 'all'>('all');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const studentsWithGroup = useMemo(() => STUDENTS.map(student => ({
        ...student,
        group: GROUPS.find(g => g.id === student.groupId)
    })), []);

    const filteredStudents = useMemo(() => {
        return studentsWithGroup.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  student.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
            const matchesGroup = groupFilter === 'all' || student.groupId === groupFilter;
            return matchesSearch && matchesStatus && matchesGroup;
        });
    }, [searchTerm, statusFilter, groupFilter, studentsWithGroup]);
    
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <h1 className="text-3xl font-bold text-text-primary">Students</h1>
                 <button className="bg-bunyodkor-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Student
                </button>
            </div>
           
            <div className="bg-card p-4 rounded-xl shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bunyodkor-blue"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <select
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bunyodkor-blue"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as StudentStatus | 'all')}
                    >
                        <option value="all">All Statuses</option>
                        <option value={StudentStatus.Active}>Active</option>
                        <option value={StudentStatus.Inactive}>Inactive</option>
                    </select>
                    <select
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bunyodkor-blue"
                        value={groupFilter}
                        onChange={(e) => setGroupFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    >
                        <option value="all">All Groups</option>
                        {GROUPS.map(group => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-card rounded-xl shadow-md overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr className="text-sm text-text-secondary">
                                <th className="py-3 px-4 font-medium">Name</th>
                                <th className="py-3 px-4 font-medium">Group</th>
                                <th className="py-3 px-4 font-medium">Contact</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                                <th className="py-3 px-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 flex items-center">
                                        <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-full mr-4" />
                                        <div>
                                            <p className="font-semibold text-text-primary">{student.name}</p>
                                            <p className="text-sm text-text-secondary">{student.contact.email}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-text-secondary">{student.group?.name}</td>
                                    <td className="py-3 px-4 text-text-secondary">{student.contact.phone}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            student.status === StudentStatus.Active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>{student.status}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => setSelectedStudent(student)} className="text-bunyodkor-blue hover:underline">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedStudent && (
                 <StudentProfile student={selectedStudent} group={GROUPS.find(g => g.id === selectedStudent.groupId)!} onClose={() => setSelectedStudent(null)} />
            )}
        </div>
    );
};


// Icons
const PlusIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const SearchIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;


export default Students;
