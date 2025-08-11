import React, { useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { useProfiles } from '../hooks/useProfiles';
import AnalyticsTab from '../components/admin/AnalyticsTab';

const Indicadores: React.FC = () => {
  const { profiles, loading, error } = useProfiles();

  useEffect(() => {
    document.title = 'Indicadores | Sistema de Especialistas';
    const desc = 'Indicadores públicos do Sistema de Especialistas do MPRJ';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${window.location.origin}/indicadores`;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-red-600" />
          <p className="text-gray-600">Carregando indicadores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar indicadores</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Tentar novamente
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <article className="space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Indicadores</h1>
        <p className="text-gray-600">Visão geral dos principais indicadores públicos</p>
      </header>

      <section aria-label="Indicadores">
        <AnalyticsTab profiles={profiles} />
      </section>
    </article>
  );
};

export default Indicadores;
