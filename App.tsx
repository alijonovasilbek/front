
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Groups from './components/Groups';
import Payments from './components/Payments';
import StudentPortal from './components/StudentPortal';
import type { Page, Student, Group, Payment } from './types';
import { STUDENTS, GROUPS, PAYMENTS } from './constants';
// FIX: Import PaymentStatus enum to fix type error when creating new invoices.
import { StudentStatus, PaymentStatus } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [groups, setGroups] = useState<Group[]>(GROUPS);
  const [payments, setPayments] = useState<Payment[]>(PAYMENTS);

  const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'avatarUrl' | 'performance'>) => {
    const newStudent: Student = {
        ...newStudentData,
        id: students.length + 1,
        avatarUrl: `https://picsum.photos/seed/${students.length + 1}/200`,
        performance: { goals: 0, assists: 0, attendance: 100 },
    };
    setStudents(prevStudents => [newStudent, ...prevStudents]);
  };

  const handleAddGroup = (groupData: Omit<Group, 'id' | 'studentIds'>) => {
    const newGroup: Group = {
      ...groupData,
      id: Math.max(...groups.map(g => g.id), 0) + 1,
      studentIds: [],
    };
    setGroups(prev => [newGroup, ...prev]);
  };
  
  const handleAddStudentToGroup = (studentId: number, groupId: number) => {
      // Update the student's group affiliation
      const updatedStudents = students.map(s => 
          s.id === studentId ? { ...s, groupId: groupId } : s
      );
      setStudents(updatedStudents);

      // Update the groups' member lists
      const updatedGroups = groups.map(g => {
          // Remove student from their old group
          const newStudentIds = g.studentIds.filter(id => id !== studentId);
          // Add student to their new group
          if (g.id === groupId) {
              newStudentIds.push(studentId);
          }
          return { ...g, studentIds: newStudentIds };
      });
      setGroups(updatedGroups);
  };

  const handleRecordPayment = (newPayment: Omit<Payment, 'id'>) => {
    const paymentWithId = {
        ...newPayment,
        id: `p${payments.length + 1}`
    };
    setPayments(prev => [paymentWithId, ...prev]);
  };
  
  const handleGenerateInvoices = () => {
      const activeStudents = students.filter(s => s.status === StudentStatus.Active);
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      let newInvoicesCount = 0;

      const newPayments = activeStudents.flatMap(student => {
          const hasInvoiceForCurrentMonth = payments.some(p => 
              p.studentId === student.id &&
              new Date(p.dueDate).getMonth() === currentMonth &&
              new Date(p.dueDate).getFullYear() === currentYear
          );

          if (!hasInvoiceForCurrentMonth) {
              newInvoicesCount++;
              const group = groups.find(g => g.id === student.groupId);
              const dueDate = new Date(currentYear, currentMonth, 5).toISOString().split('T')[0];
              return [{
                  id: `p_new_${student.id}_${Date.now()}`,
                  studentId: student.id,
                  amount: group?.monthlyFee || 500000,
                  date: '',
                  dueDate,
                  // FIX: Use PaymentStatus enum member instead of a raw string to match the Payment type.
                  status: PaymentStatus.Due
              }];
          }
          return [];
      });

      if (newPayments.length > 0) {
          setPayments(prev => [...newPayments, ...prev]);
      }
      alert(`${newInvoicesCount} new monthly invoices generated!`);
  };


  const renderContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard students={students} groups={groups} payments={payments} />;
      case 'Students':
        return <Students students={students} groups={groups} onAddStudent={handleAddStudent} />;
      case 'Groups':
        return <Groups groups={groups} students={students} onAddGroup={handleAddGroup} onAddStudentToGroup={handleAddStudentToGroup} />;
      case 'Payments':
        return <Payments payments={payments} students={students} groups={groups} onRecordPayment={handleRecordPayment} onGenerateInvoices={handleGenerateInvoices} />;
      case 'StudentPortal':
        return <StudentPortal />;
      default:
        return <Dashboard students={students} groups={groups} payments={payments}/>;
    }
  };

  const pageTitle = currentPage === 'StudentPortal' ? 'Student Portal' : currentPage;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setIsSidebarOpen(false); // Close sidebar on navigation
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
         {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center bg-card p-4 border-b z-10">
          <button onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-bunyodkor-blue">{pageTitle}</h1>
          <div className="w-6"></div> {/* Spacer */}
        </header>
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
