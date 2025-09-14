export interface AdovacteFetchResponse {
  data: Advocate[];
  error?: string;
}

export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt?: Date;
}

export type AdvocateInput = Omit<Advocate, 'id' | 'createdAt'>;