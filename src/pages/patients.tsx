import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { DataTable } from '../components/ui/data-table';
import { loadPatients } from '../lib/data-loaders';
import { Patient } from '../data/patients';

export function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    loadPatients().then(setPatients).catch((error) => console.error(error));
  }, []);

  const columns = useMemo<ColumnDef<Patient>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        meta: { filterLabel: 'Patient ID' }
      },
      {
        accessorKey: 'name',
        header: 'Name',
        meta: { filterLabel: 'Name' }
      },
      {
        accessorKey: 'age',
        header: 'Age',
        cell: ({ getValue }) => <span>{getValue<number>()} yrs</span>
      },
      {
        accessorKey: 'location',
        header: 'Location',
        meta: { filterLabel: 'Location' }
      },
      {
        accessorKey: 'shift',
        header: 'Shift',
        meta: { filterLabel: 'Shift' }
      },
      {
        accessorKey: 'primaryMedication',
        header: 'Primary Medication',
        meta: { filterLabel: 'Medication' }
      }
    ],
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients</CardTitle>
        <CardDescription>Track enrolled patients and their assigned medications.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={patients} pageSize={6} />
      </CardContent>
    </Card>
  );
}
