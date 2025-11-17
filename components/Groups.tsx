
import React from 'react';
import { GROUPS, STUDENTS } from '../constants';

const Groups: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-text-primary">Training Groups</h1>
        <button className="bg-bunyodkor-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GROUPS.map(group => {
            const groupStudents = STUDENTS.filter(s => s.groupId === group.id);
            return (
                <div key={group.id} className="bg-card rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div>
                        <div className="flex justify-between items-start">
                           <h2 className="text-xl font-bold text-bunyodkor-blue">{group.name}</h2>
                           <div className="flex items-center text-sm font-semibold bg-blue-100 text-bunyodkor-blue px-2 py-1 rounded-full">
                               <UsersIcon className="w-4 h-4 mr-1" />
                               {group.studentIds.length}
                           </div>
                        </div>
                        <p className="text-text-secondary mt-1">Coach: <span className="font-medium text-text-primary">{group.coach}</span></p>
                        
                        <div className="mt-4 border-t pt-4">
                            <h3 className="text-sm font-semibold text-text-secondary mb-2">Members:</h3>
                            <div className="flex flex-wrap -space-x-2">
                                {groupStudents.slice(0,5).map(student => (
                                    <img 
                                        key={student.id}
                                        className="w-8 h-8 rounded-full border-2 border-white"
                                        src={student.avatarUrl}
                                        alt={student.name}
                                        title={student.name}
                                    />
                                ))}
                                {groupStudents.length > 5 && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                                        +{groupStudents.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                         <button className="w-full bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300">
                            Manage Group
                        </button>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

// Icons
const PlusIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const UsersIcon = ({ className = "w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-6-6h6a6 6 0 006 6" /></svg>;

export default Groups;
