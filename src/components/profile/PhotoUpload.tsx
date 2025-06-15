import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Camera, Upload } from 'lucide-react';
import { validateSingleFace } from '../../utils/validateSingleFace';

interface PhotoUploadProps {
  fotoPreview: string;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ fotoPreview, onFileUpload }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Novo handle que faz validação antes do upload de fato
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setErrorMsg(null);
      try {
        const isValid = await validateSingleFace(file);
        if (!isValid) {
          setErrorMsg('Por favor, selecione uma imagem com UM único rosto visível.');
          return;
        }
        onFileUpload(event); // Executa o upload padrão (preview + callback do form)
      } catch (e) {
        setErrorMsg('Erro ao validar imagem. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Foto do Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-6">
          <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
            {fotoPreview ? (
              <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Sem foto</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Button 
              type="button" 
              variant="logo-brown" 
              className="cursor-pointer font-bold" 
              onClick={() => document.getElementById('foto-upload')?.click()}
              disabled={loading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {loading ? 'Validando...' : 'Fazer Upload de Foto'}
            </Button>
            <input
              id="foto-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
            {/* Requisitos da funcionalidade evidenciados ao usuário */}
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm text-yellow-900 font-semibold">
              Requisitos para a foto de perfil:<br />
              • Apenas uma imagem com <span className="font-bold underline">um único rosto visível</span> será aceita.<br />
              • Formatos aceitos: JPG, PNG, GIF.<br />
              • Tamanho máximo: 5MB.
            </div>
            {errorMsg && (
              <div className="text-sm text-red-700 font-medium">{errorMsg}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
