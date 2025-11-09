import { http, HttpResponse } from 'msw';
import { metrics, patients, medicationUsage } from './data';
import { mockUsers } from './users';

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };
    const user = mockUsers.find((candidate) => candidate.email === email && candidate.password === password);
    if (!user) {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = btoa(`${user.id}:${Date.now()}`);

    return HttpResponse.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  }),
  http.get('/api/metrics', () => HttpResponse.json(metrics)),
  http.get('/api/patients', () => HttpResponse.json(patients)),
  http.get('/api/medications', () => HttpResponse.json(medicationUsage))
];
