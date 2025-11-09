export interface Patient {
  id: string;
  name: string;
  age: number;
  location: string;
  shift: 'Day' | 'Evening' | 'Night';
  primaryMedication: string;
}

export const patients: Patient[] = [
  { id: 'P-100', name: 'Evelyn Harper', age: 72, location: 'North Wing', shift: 'Day', primaryMedication: 'Amoxicillin' },
  { id: 'P-101', name: 'Jacob Martin', age: 65, location: 'East Wing', shift: 'Night', primaryMedication: 'Metformin' },
  { id: 'P-102', name: 'Sofia Lee', age: 58, location: 'Central Ward', shift: 'Evening', primaryMedication: 'Lisinopril' },
  { id: 'P-103', name: 'Mason Ortiz', age: 49, location: 'South Wing', shift: 'Day', primaryMedication: 'Ibuprofen' },
  { id: 'P-104', name: 'Olivia Patel', age: 77, location: 'North Wing', shift: 'Night', primaryMedication: 'Atorvastatin' },
  { id: 'P-105', name: 'William Cooper', age: 83, location: 'Central Ward', shift: 'Evening', primaryMedication: 'Levothyroxine' },
  { id: 'P-106', name: 'Isabella Nguyen', age: 61, location: 'East Wing', shift: 'Day', primaryMedication: 'Omeprazole' },
  { id: 'P-107', name: 'Benjamin Ross', age: 55, location: 'West Annex', shift: 'Evening', primaryMedication: 'Metformin' }
];
