import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DisabilityType } from '@/types';

export const useDisabilityTypes = () => {
  const [disabilityTypes, setDisabilityTypes] = useState<DisabilityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDisabilityTypes = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('disability_types')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) {
        console.error('Erro ao buscar tipos de deficiência:', error);
        throw error;
      }

      setDisabilityTypes((data || []) as DisabilityType[]);
    } catch (err) {
      console.error('Erro no hook useDisabilityTypes:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisabilityTypes();
  }, []);

  const getDisabilitiesByCategory = (category: string) => {
    return disabilityTypes.filter(disability => disability.category === category);
  };

  const getDisabilityById = (id: string) => {
    return disabilityTypes.find(disability => disability.id === id);
  };

  return {
    disabilityTypes,
    loading,
    error,
    refetch: fetchDisabilityTypes,
    getDisabilitiesByCategory,
    getDisabilityById
  };
};