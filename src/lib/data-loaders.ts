import { patients as fallbackPatients, Patient } from '../data/patients';
import { medicationUsage as fallbackMedicationUsage, MedicationUsage } from '../data/medications';

interface OverviewMetric {
  label: string;
  value: number;
  change: number;
}

const fallbackMetrics: OverviewMetric[] = [
  { label: 'Total Patients', value: fallbackPatients.length, change: 4.2 },
  {
    label: 'Avg. Adherence',
    value: Math.round(
      (fallbackMedicationUsage.reduce((acc, item) => acc + item.adherenceRate, 0) / fallbackMedicationUsage.length) * 100
    ),
    change: 2.1
  },
  {
    label: 'High-Risk Alerts',
    value: fallbackMedicationUsage.filter((item) => item.adherenceRate < 0.8).length,
    change: -1.5
  }
];

async function safeFetch<T>(input: RequestInfo | URL, init?: RequestInit, fallbackValue?: T): Promise<T> {
  try {
    const response = await fetch(input, init);
    if (!response.ok) throw new Error('Request failed');
    return (await response.json()) as T;
  } catch (error) {
    if (fallbackValue) {
      console.warn('Falling back to static data for', input);
      return fallbackValue;
    }
    throw error;
  }
}

export async function loadPatients(): Promise<Patient[]> {
  return safeFetch('/api/patients', undefined, fallbackPatients);
}

export async function loadMedicationUsage(): Promise<MedicationUsage[]> {
  return safeFetch('/api/medications', undefined, fallbackMedicationUsage);
}

export async function loadOverviewMetrics(): Promise<OverviewMetric[]> {
  return safeFetch('/api/metrics', undefined, fallbackMetrics);
}

export type { OverviewMetric };
