
import React, { useState, useEffect } from 'react';
import type { Group } from '../types';

interface AddGroupModalProps {
  onClose: () => void;
  onAddGroup: (group: Omit<Group, 'id' | 'studentIds'>) => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ onClose, onAddGroup }) => {
  const [name, setName] = useState('');
  const [coach, setCoach] = useState('');
  const [monthlyFee, setMonthlyFee] = useState(500000);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !coach) return;
    onAddGroup({ name, coach, monthlyFee });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-group-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 id="add-group-title" className="text-2xl font-bold text-gray-800">Add New Group</h2>
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                <XIcon className="w-8 h-8" />
              </button>
            </div>

            <div className="space-y-4">
              <Input label="Group Name" value={name} onChange={e => setName(e.target.value)} required />
              <Input label="Coach Name" value={coach} onChange={e => setCoach(e.target.value)} required />
              <Input label="Monthly Fee (UZS)" type="number" value={monthlyFee} onChange={e => setMonthlyFee(Number(e.target.value))} required />
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300">
                Cancel
              </button>
              <button type="submit" className="bg-bunyodkor-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300">
                Add Group
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

const XIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default AddGroupModal;
