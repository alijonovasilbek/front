
import React, { useState, useEffect } from 'react';
import type { Student, Group } from '../types';
import { CONTRACTS, PAYMENTS } from '../constants';
import { PaymentStatus } from '../types';
import { generatePerformanceSummary } from '../services/geminiService';

interface StudentProfileProps {
    student: Student;
    group: Group;
    onClose: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, group, onClose }) => {
    const [summary, setSummary] = useState('');
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const studentPayments = PAYMENTS.filter(p => p.studentId === student.id);
    const studentContract = CONTRACTS.find(c => c.studentId === student.id);

    const handleGenerateSummary = async () => {
        setIsLoadingSummary(true);
        const result = await generatePerformanceSummary(student, group);
        setSummary(result);
        setIsLoadingSummary(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="student-profile-title">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                            <img src={student.avatarUrl} alt={student.name} className="w-24 h-24 rounded-full mr-0 sm:mr-6 mb-4 sm:mb-0 border-4 border-bunyodkor-blue" />
                            <div>
                                <h2 id="student-profile-title" className="text-3xl font-bold text-gray-800">{student.name}</h2>
                                <p className="text-lg text-gray-600">{group.name} - {group.coach}</p>
                                <span className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                                    student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>{student.status}</span>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close profile">
                            <XIcon className="w-8 h-8"/>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-6">
                           <InfoCard title="Contact Information">
                                <InfoItem icon={<PhoneIcon/>} label="Phone" value={student.contact.phone} />
                                <InfoItem icon={<MailIcon/>} label="Email" value={student.contact.email} />
                                <InfoItem icon={<LocationMarkerIcon/>} label="Address" value={student.contact.address} />
                           </InfoCard>
                           <InfoCard title="Personal Details">
                                <InfoItem icon={<CakeIcon/>} label="Date of Birth" value={student.dob} />
                                <InfoItem icon={<CalendarIcon/>} label="Joined Date" value={student.joinedDate} />
                           </InfoCard>
                           <InfoCard title="Contract Details">
                                <InfoItem icon={<DocumentTextIcon/>} label="Start Date" value={studentContract?.startDate || 'N/A'} />
                                <InfoItem icon={<DocumentTextIcon/>} label="End Date" value={studentContract?.endDate || 'N/A'} />
                                <a href={studentContract?.contractUrl} className="text-bunyodkor-blue font-semibold hover:underline mt-2 inline-block">View Contract</a>
                           </InfoCard>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-6">
                           <InfoCard title="Performance (Season)">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-bunyodkor-blue">{student.performance.goals}</p>
                                        <p className="text-sm text-gray-500">Goals</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-bunyodkor-blue">{student.performance.assists}</p>
                                        <p className="text-sm text-gray-500">Assists</p>
                                    </div>
                                     <div>
                                        <p className="text-2xl font-bold text-bunyodkor-blue">{student.performance.attendance}%</p>
                                        <p className="text-sm text-gray-500">Attendance</p>
                                    </div>
                                </div>
                           </InfoCard>

                            <InfoCard title="AI Coach's Assistant">
                                <p className="text-sm text-gray-600 mb-4">Generate a performance summary for parents using Gemini AI.</p>
                                <button
                                    onClick={handleGenerateSummary}
                                    disabled={isLoadingSummary}
                                    className="bg-bunyodkor-yellow text-bunyodkor-blue font-bold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoadingSummary ? (
                                        <>
                                            <SpinnerIcon className="animate-spin w-5 h-5 mr-2" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <SparklesIcon className="w-5 h-5 mr-2" />
                                            Generate Performance Summary
                                        </>
                                    )}
                                </button>
                                {summary && (
                                    <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
                                    </div>
                                )}
                           </InfoCard>

                           <InfoCard title="Payment History">
                                <ul className="space-y-2">
                                    {studentPayments.slice(0,5).map(p => (
                                        <li key={p.id} className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                                            <div>
                                                <p className="font-medium text-gray-700">{p.amount.toLocaleString('uz-UZ')} UZS</p>
                                                <p className="text-xs text-gray-500">Due: {new Date(p.dueDate).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                p.status === PaymentStatus.Paid ? 'bg-green-100 text-green-700' : p.status === PaymentStatus.Due ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                            }`}>{p.status}</span>
                                        </li>
                                    ))}
                                </ul>
                           </InfoCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoCard: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
    <div className="bg-white border border-gray-200 p-5 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">{title}</h3>
        {children}
    </div>
);

const InfoItem: React.FC<{icon: React.ReactElement; label: string; value: string}> = ({icon, label, value}) => (
    <div className="flex items-center text-sm mb-2">
        <span className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0">{icon}</span>
        <span className="font-semibold text-gray-600 mr-2">{label}:</span>
        <span className="text-gray-800 break-all">{value}</span>
    </div>
);


const XIcon = ({className="w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LocationMarkerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CakeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0c-.454-.303-.977-.454-1.5-.454A3.5 3.5 0 002 19v-2.5a3.5 3.5 0 003.5-3.5c.523 0 1.046-.151 1.5-.454a2.704 2.704 0 013 0 2.704 2.704 0 003 0 2.704 2.704 0 013 0 2.704 2.704 0 003 0c.454.303.977.454 1.5.454A3.5 3.5 0 0022 16.5V19a3.5 3.5 0 00-1-3.454z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 11V9a2 2 0 012-2h12a2 2 0 012 2v2" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const SparklesIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6.343 6.343l-2.828 2.829M10 21v-4m-2-2h4m-4 0l-2.828-2.829M17.657 6.343l2.828 2.829M18 5h-4m2 2v-4m4.657 12.657l-2.828-2.829M14 17h4m-2-2v4" /></svg>;
const SpinnerIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;


export default StudentProfile;
