import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { DataTable } from '../components/ui/data-table';
import { loadMedicationUsage } from '../lib/data-loaders';
import { MedicationUsage } from '../data/medications';
import { Badge } from '../components/ui/badge';

export function MedicationsPage() {
  const [medications, setMedications] = useState<MedicationUsage[]>([]);

  useEffect(() => {
    loadMedicationUsage().then(setMedications).catch((error) => console.error(error));
  }, []);

  const columns = useMemo<ColumnDef<MedicationUsage>[]>(
    () => [
      {
        accessorKey: 'medication',
        header: 'Medication',
        meta: { filterLabel: 'Medication' }
      },
      {
        accessorKey: 'normalizedUsage',
        header: 'Normalized Usage',
        cell: ({ getValue }) => <span>{getValue<number>()}</span>
      },
      {
        accessorKey: 'adherenceRate',
        header: 'Adherence',
        cell: ({ getValue }) => {
          const value = getValue<number>();
          const percentage = Math.round(value * 100);
          const variant = percentage >= 85 ? 'default' : percentage >= 75 ? 'secondary' : 'outline';
          return <Badge variant={variant}>{percentage}%</Badge>;
        }
      },
      {
        accessorKey: 'shift',
        header: 'Shift',
        meta: { filterLabel: 'Shift' }
      },
      {
        accessorKey: 'location',
        header: 'Location',
        meta: { filterLabel: 'Location' }
      }
    ],
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication Usage</CardTitle>
        <CardDescription>Monitor normalized doses, adherence, and distribution.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={medications} pageSize={6} />
      </CardContent>
    </Card>
  );
}
