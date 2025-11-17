import React, { useState, useEffect, useMemo } from 'react';
import { PaymentStatus } from '../types';
import type { Payment, Student, Group } from '../types';

interface RecordPaymentModalProps {
  onClose: () => void;
  onRecordPayment: (payment: Omit<Payment, 'id'>) => void;
  students: Student[];
  groups: Group[];
}

const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({ onClose, onRecordPayment, students, groups }) => {
  const [studentId, setStudentId] = useState<string>(students[0]?.id.toString() || '');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.Paid);

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

  useEffect(() => {
    if (studentId) {
      const student = students.find(s => s.id === Number(studentId));
      if (student) {
        const group = groups.find(g => g.id === student.groupId);
        if (group) {
          setAmount(group.monthlyFee);
        }
      }
    }
  }, [studentId, students, groups]);
  
  useEffect(() => {
    if(status === PaymentStatus.Paid && !date) {
        setDate(new Date().toISOString().split('T')[0]);
    } else if (status !== PaymentStatus.Paid) {
        setDate('');
    }
  }, [status, date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !amount || !dueDate) return;
    onRecordPayment({ 
        studentId: Number(studentId), 
        amount, 
        date, 
        dueDate, 
        status 
    });
  };
  
  const sortedStudents = useMemo(() => [...students].sort((a,b) => a.name.localeCompare(b.name)), [students]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="record-payment-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 id="record-payment-title" className="text-2xl font-bold text-gray-800">Record Payment</h2>
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                <XIcon className="w-8 h-8" />
              </button>
            </div>

            <div className="space-y-4">
              <Select label="Student" value={studentId} onChange={e => setStudentId(e.target.value)} required>
                {sortedStudents.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Select>
              <Input label="Amount (UZS)" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select label="Status" value={status} onChange={e => setStatus(e.target.value as PaymentStatus)} required>
                    <option value={PaymentStatus.Paid}>Paid</option>
                    <option value={PaymentStatus.Due}>Due</option>
                    <option value={PaymentStatus.Overdue}>Overdue</option>
                </Select>
                <Input label="Due Date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
              </div>
              {status === PaymentStatus.Paid && (
                  <Input label="Payment Date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300">
                Cancel
              </button>
              <button type="submit" className="bg-bunyodkor-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300">
                Record Payment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bunyodkor-blue bg-white text-gray-900 placeholder-gray-400" />
    </div>
);
const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, children, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bunyodkor-blue bg-white text-gray-900">
            {children}
        </select>
    </div>
);

const XIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default RecordPaymentModal;