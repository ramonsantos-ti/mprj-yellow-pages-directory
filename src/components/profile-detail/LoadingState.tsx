
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-red-600" />
        <p className="text-gray-600">Carregando perfil...</p>
      </div>
    </div>
  );
};

export default LoadingState;
