export interface SymptomRating {
  id: string;
  device_id: string;
  device_name: string;
  dose: string | null;
  rating_date: string; // ISO timestamp
  symptoms: string | null;
  side_effects: string | null;
  created_at: string;
  user_id?: string; // Optional, hvis auth aktiveres senere
}

export interface CreateRatingInput {
  device_id: string;
  device_name: string;
  dose?: string;
  rating_date?: string;
  symptoms?: string;
  side_effects?: string;
}

