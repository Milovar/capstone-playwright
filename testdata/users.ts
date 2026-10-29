import { randomUUID } from 'node:crypto';

export interface DemoUser {
  name: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
}

export function createDemoUser(): DemoUser {
  return {
    name: 'PersonaQA',
    email: `qa-${randomUUID().slice(0, 12)}@example.com`,
    password: 'DemoPassword2026!',
    firstname: 'Persona',
    lastname: 'Demostracion',
    company: 'Demo QA',
    address: '123 Demo Street',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    zipcode: '10001',
    mobile: '5551234567'
  };
}
