export interface ITransaction {
  id: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  location?: { name: string, coordinates: { latitude: number, longitude: number } };
}