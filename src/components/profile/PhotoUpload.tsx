
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Camera, Upload } from 'lucide-react';

interface PhotoUploadProps {
  fotoPreview: string;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ fotoPreview, onFileUpload }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Foto do Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-6">
          {/* Increased photo size from w-32 h-32 to w-48 h-48 (50% increase) */}
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
            <label htmlFor="foto-upload">
              <Button type="button" variant="outline" className="cursor-pointer" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Fazer Upload de Foto
                </span>
              </Button>
            </label>
            <input
              id="foto-upload"
              type="file"
              accept="image/*"
              onChange={onFileUpload}
              className="hidden"
            />
            <p className="text-sm text-gray-500">
              Formatos aceitos: JPG, PNG, GIF. Máximo 5MB.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
