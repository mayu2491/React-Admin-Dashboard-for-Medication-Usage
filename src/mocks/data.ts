import { patients } from '../data/patients';
import { medicationUsage } from '../data/medications';

export const metrics = [
  { label: 'Total Patients', value: patients.length, change: 4.2 },
  {
    label: 'Avg. Adherence',
    value: Math.round(
      (medicationUsage.reduce((acc, item) => acc + item.adherenceRate, 0) / medicationUsage.length) * 100
    ),
    change: 2.1
  },
  {
    label: 'High-Risk Alerts',
    value: medicationUsage.filter((item) => item.adherenceRate < 0.8).length,
    change: -1.5
  }
];

export { patients, medicationUsage };
