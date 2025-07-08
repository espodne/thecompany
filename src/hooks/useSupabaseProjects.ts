'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Project {
  id: number;
  name: string;
  label: string;
  description: string;
  href: string;
  created_at?: string;
  updated_at?: string;
}

export const useSupabaseProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log('🚀 Запрос к Supabase начался...');
      
      const { data, error } = await supabase
        .from('project-data')
        .select('*')
        .order('id', { ascending: true });

      console.log('📊 Ответ от Supabase:', { data, error });
      console.log('📝 Данные:', data);
      console.log('❌ Ошибка:', error);

      if (error) {
        setError(error.message);
        console.error('Ошибка загрузки проектов:', error);
      } else {
        console.log('✅ Проекты загружены, количество:', data?.length);
        setProjects(data || []);
      }
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('💥 Исключение:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProjectByName = (name: string): Project | undefined => {
    return projects.find(project => project.name === name);
  };

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    getProjectByName
  };
}; 