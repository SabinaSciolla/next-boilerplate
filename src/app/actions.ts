'use server';

import { createClient } from '@/lib/supabase/server';
import { CreateRatingInput, SymptomRating } from '@/types';
import { revalidatePath } from 'next/cache';

export async function createRating(input: CreateRatingInput) {
  // Valider påkrævede felter
  if (!input.device_id || !input.device_name) {
    return {
      success: false,
      error: 'device_id og device_name er påkrævet',
    };
  }

  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('symptom_ratings')
      .insert({
        device_id: input.device_id,
        device_name: input.device_name,
        dose: input.dose || null,
        rating_date: input.rating_date || new Date().toISOString(),
        symptoms: input.symptoms || null,
        side_effects: input.side_effects || null,
      })
      .select()
      .single();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Revalidate paths for at opdatere cache
    revalidatePath('/');
    revalidatePath('/history');

    return {
      success: true,
      data: data as SymptomRating,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ukendt fejl',
    };
  }
}

export async function getTodaysRating(deviceId?: string) {
  try {
    const supabase = createClient();
    
    // Start og slut af dag i UTC
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let query = supabase
      .from('symptom_ratings')
      .select('*')
      .gte('rating_date', today.toISOString())
      .lt('rating_date', tomorrow.toISOString())
      .order('rating_date', { ascending: false })
      .limit(1);

    // Hvis deviceId er angivet, filtrer også på det
    if (deviceId) {
      query = query.eq('device_id', deviceId);
    }

    const { data, error } = await query;

    if (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }

    return {
      success: true,
      data: data && data.length > 0 ? (data[0] as SymptomRating) : null,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ukendt fejl',
      data: null,
    };
  }
}

export async function getAllRatings(deviceId?: string) {
  try {
    const supabase = createClient();
    
    let query = supabase
      .from('symptom_ratings')
      .select('*')
      .order('rating_date', { ascending: false });

    // Hvis deviceId er angivet, filtrer på det
    if (deviceId) {
      query = query.eq('device_id', deviceId);
    }

    const { data, error } = await query;

    if (error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }

    return {
      success: true,
      data: (data || []) as SymptomRating[],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ukendt fejl',
      data: [],
    };
  }
}

