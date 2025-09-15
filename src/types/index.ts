export interface AdovacteFetchResponse {
  data: Advocate[];
  pagination?: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters?: {
    search: string | null;
    sort: string;
    order: string;
  };
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