import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { loadMedicationUsage, loadOverviewMetrics } from '../lib/data-loaders';
import { MedicationUsage } from '../data/medications';
import { OverviewMetric } from '../lib/data-loaders';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Badge } from '../components/ui/badge';

export function OverviewPage() {
  const [metrics, setMetrics] = useState<OverviewMetric[]>([]);
  const [usage, setUsage] = useState<MedicationUsage[]>([]);

  useEffect(() => {
    loadOverviewMetrics().then(setMetrics).catch((error) => console.error(error));
    loadMedicationUsage().then(setUsage).catch((error) => console.error(error));
  }, []);

  const usageByMedication = useMemo(() => {
    const grouped = usage.reduce<Record<string, number>>((acc, item) => {
      acc[item.medication] = (acc[item.medication] ?? 0) + item.normalizedUsage;
      return acc;
    }, {});
    return Object.entries(grouped).map(([medication, total]) => ({ medication, total }));
  }, [usage]);

  const usageByShift = useMemo(() => {
    const grouped = usage.reduce<Record<string, number>>((acc, item) => {
      acc[item.shift] = (acc[item.shift] ?? 0) + item.normalizedUsage;
      return acc;
    }, {});
    return Object.entries(grouped).map(([shift, total]) => ({ shift, total }));
  }, [usage]);

  const usageByLocation = useMemo(() => {
    const grouped = usage.reduce<Record<string, number>>((acc, item) => {
      acc[item.location] = (acc[item.location] ?? 0) + item.normalizedUsage;
      return acc;
    }, {});
    return Object.entries(grouped).map(([location, total]) => ({ location, total }));
  }, [usage]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle className="text-3xl font-bold">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={metric.change >= 0 ? 'default' : 'secondary'}>
                {metric.change >= 0 ? '▲' : '▼'} {Math.abs(metric.change)}% vs last week
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage by Medication</CardTitle>
            <CardDescription>Normalized daily doses administered.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageByMedication}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="medication" tick={{ fontSize: 12 }} interval={0} angle={-25} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="hsl(221 83% 53%)" name="Normalized Usage" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Usage by Shift</CardTitle>
            <CardDescription>Normalized totals grouped by shift.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageByShift}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="shift" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="hsl(221 83% 53%)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage by Location</CardTitle>
          <CardDescription>Compare normalized doses delivered per ward.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageByLocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="hsl(160 84% 39%)" name="Normalized Usage" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
