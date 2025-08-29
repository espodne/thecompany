'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Project, fetchProjects } from '@/data/projectsData';

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetchProjects: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const refetchProjects = async () => {
    await loadProjects();
  };

  return (
    <ProjectsContext.Provider 
      value={{ 
        projects, 
        loading, 
        error, 
        refetchProjects 
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects(): ProjectsContextType {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}