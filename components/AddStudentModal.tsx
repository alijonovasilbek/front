import React, { useState, useEffect } from 'react';
import type { Student, Group } from '../types';
import { StudentStatus } from '../types';

type NewStudentData = Omit<Student, 'id' | 'avatarUrl' | 'performance'>;

interface AddStudentModalProps {
  onClose: () => void;
  onAddStudent: (student: NewStudentData) => void;
  groups: Group[];
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose, onAddStudent, groups }) => {
  const [formData, setFormData] = useState<NewStudentData>({
    name: '',
    dob: '',
    groupId: groups[0]?.id || 1,
    contact: {
      phone: '',
      email: '',
      address: '',
    },
    status: StudentStatus.Active,
    joinedDate: new Date().toISOString().split('T')[0],
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (['phone', 'email', 'address'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        contact: { ...prev.contact, [name]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: name === 'groupId' ? Number(value) : value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-student-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 id="add-student-title" className="text-2xl font-bold text-gray-800">Add New Student</h2>
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                <XIcon className="w-8 h-8" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Email" name="email" type="email" value={formData.contact.email} onChange={handleChange} required />
                <Input label="Phone" name="phone" type="tel" value={formData.contact.phone} onChange={handleChange} required />
              </div>
               <Input label="Address" name="address" value={formData.contact.address} onChange={handleChange} required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Select label="Group" name="groupId" value={formData.groupId} onChange={handleChange}>
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                 </Select>
                 <Select label="Status" name="status" value={formData.status} onChange={handleChange}>
                    <option value={StudentStatus.Active}>Active</option>
                    <option value={StudentStatus.Inactive}>Inactive</option>
                 </Select>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300">
                Cancel
              </button>
              <button type="submit" className="bg-bunyodkor-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300">
                Add Student
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
        <select {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bunyodkor-blue bg-white">
            {children}
        </select>
    </div>
);


const XIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default AddStudentModal;