export interface MedicationUsage {
  id: string;
  medication: string;
  normalizedUsage: number;
  location: string;
  shift: 'Day' | 'Evening' | 'Night';
  adherenceRate: number;
}

export const medicationUsage: MedicationUsage[] = [
  { id: 'M-200', medication: 'Amoxicillin', normalizedUsage: 78, location: 'North Wing', shift: 'Day', adherenceRate: 0.92 },
  { id: 'M-201', medication: 'Metformin', normalizedUsage: 65, location: 'East Wing', shift: 'Night', adherenceRate: 0.88 },
  { id: 'M-202', medication: 'Lisinopril', normalizedUsage: 82, location: 'Central Ward', shift: 'Evening', adherenceRate: 0.9 },
  { id: 'M-203', medication: 'Ibuprofen', normalizedUsage: 45, location: 'South Wing', shift: 'Day', adherenceRate: 0.76 },
  { id: 'M-204', medication: 'Atorvastatin', normalizedUsage: 70, location: 'North Wing', shift: 'Night', adherenceRate: 0.87 },
  { id: 'M-205', medication: 'Levothyroxine', normalizedUsage: 91, location: 'Central Ward', shift: 'Evening', adherenceRate: 0.94 },
  { id: 'M-206', medication: 'Omeprazole', normalizedUsage: 58, location: 'East Wing', shift: 'Day', adherenceRate: 0.81 },
  { id: 'M-207', medication: 'Warfarin', normalizedUsage: 49, location: 'West Annex', shift: 'Evening', adherenceRate: 0.73 }
];
