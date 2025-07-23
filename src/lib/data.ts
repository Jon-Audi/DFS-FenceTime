export type Employee = {
  id: string;
  name: string;
  role: string;
  pin: string;
  rfid: string;
  status: 'Clocked In' | 'Clocked Out';
  avatar: string;
  email: string;
};

export type TimeEntry = {
  id: string;
  employeeId: string;
  employeeName: string;
  clockIn: Date;
  clockOut: Date | null;
  totalHours?: number;
};

export const employees: Employee[] = [
  { id: '1', name: 'John Doe', role: 'Lead Installer', pin: '1234', rfid: 'RFID001', status: 'Clocked Out', avatar: 'https://placehold.co/100x100.png', email: 'john.d@example.com' },
  { id: '2', name: 'Jane Smith', role: 'Fencer', pin: '5678', rfid: 'RFID002', status: 'Clocked In', avatar: 'https://placehold.co/100x100.png', email: 'jane.s@example.com' },
  { id: '3', name: 'Mike Johnson', role: 'Apprentice', pin: '4321', rfid: 'RFID003', status: 'Clocked Out', avatar: 'https://placehold.co/100x100.png', email: 'mike.j@example.com' },
  { id: '4', name: 'Emily Davis', role: 'Project Manager', pin: '8765', rfid: 'RFID004', status: 'Clocked In', avatar: 'https://placehold.co/100x100.png', email: 'emily.d@example.com' },
];

const now = new Date();

export const timeEntries: TimeEntry[] = [
  { 
    id: 'T1', 
    employeeId: '1', 
    employeeName: 'John Doe',
    clockIn: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 1, 15), 
    clockOut: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 32, 50),
    totalHours: 8.52
  },
   { 
    id: 'T2', 
    employeeId: '2', 
    employeeName: 'Jane Smith',
    clockIn: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 3, 22), 
    clockOut: null,
  },
  { 
    id: 'T3', 
    employeeId: '3', 
    employeeName: 'Mike Johnson',
    clockIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 7, 59, 10), 
    clockOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 17, 5, 1),
    totalHours: 9.1
  },
  { 
    id: 'T4', 
    employeeId: '4', 
    employeeName: 'Emily Davis',
    clockIn: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 10, 45), 
    clockOut: null,
  },
  { 
    id: 'T5', 
    employeeId: '1', 
    employeeName: 'John Doe',
    clockIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 8, 0, 0), 
    clockOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 12, 30, 0),
    totalHours: 4.5
  },
  { 
    id: 'T6', 
    employeeId: '1', 
    employeeName: 'John Doe',
    clockIn: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 13, 0, 0), 
    clockOut: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 17, 0, 0),
    totalHours: 4.0
  },
];

export const getEmployees = async () => {
  return Promise.resolve(employees);
};

export const getEmployeeById = async (id: string) => {
    return Promise.resolve(employees.find(e => e.id === id));
}

export const getTimeEntries = async () => {
  return Promise.resolve(timeEntries);
}

export const getEmployeeTimeEntries = async (employeeId: string) => {
    return Promise.resolve(timeEntries.filter(t => t.employeeId === employeeId));
}
