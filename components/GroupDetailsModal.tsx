import React, { useEffect, useState, useMemo } from 'react';
import type { Group, Student } from '../types';

interface GroupDetailsModalProps {
  group: Group;
  students: Student[];
  onClose: () => void;
  onAddStudentToGroup: (studentId: number, groupId: number) => void;
}

const GroupDetailsModal: React.FC<GroupDetailsModalProps> = ({ group, students, onClose, onAddStudentToGroup }) => {
  const [studentToAdd, setStudentToAdd] = useState('');
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const groupStudents = useMemo(() => students.filter(s => s.groupId === group.id), [students, group.id]);
  const availableStudents = useMemo(() => students.filter(s => s.groupId !== group.id), [students, group.id]);
  
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentToAdd) {
        onAddStudentToGroup(Number(studentToAdd), group.id);
        setStudentToAdd('');
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{group.name}</h2>
              <p className="text-lg text-gray-600">Coach: {group.coach}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XIcon className="w-8 h-8" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                 <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                    {groupStudents.length} Members
                </h3>
                <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {groupStudents.length > 0 ? groupStudents.map(student => (
                    <li key={student.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold text-text-primary">{student.name}</p>
                        <p className="text-sm text-text-secondary">{student.contact.email}</p>
                      </div>
                    </li>
                  )) : <p className="text-text-secondary italic">No students in this group yet.</p>}
                </ul>
            </div>
            <div>
                 <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                    Add Member
                </h3>
                <form onSubmit={handleAddStudent} className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Select a student to add to this group. This will move them from their current group.</p>
                    <select
                        value={studentToAdd}
                        onChange={e => setStudentToAdd(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bunyodkor-blue bg-white"
                        required
                    >
                        <option value="" disabled>Select a student...</option>
                        {availableStudents.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="w-full bg-bunyodkor-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 disabled:opacity-50" disabled={!studentToAdd}>
                        Add to Group
                    </button>
                </form>
            </div>
          </div>


          <div className="mt-8 flex justify-end">
            <button onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const XIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default GroupDetailsModal;