
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { Profile } from '../../types';

interface ProfileHeaderProps {
  profile: Profile;
  getInitials: (name: string) => string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, getInitials }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à busca
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Photo */}
            <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
              {profile.fotoUrl ? (
                <img 
                  src={profile.fotoUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-900 font-semibold text-xl">
                    {getInitials(profile.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
              <p className="text-lg text-gray-600 mb-4">Matrícula: {profile.matricula}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                
                {profile.telefone && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{profile.telefone}</span>
                  </div>
                )}
              </div>

              {/* Cargo, Função e Unidade */}
              <div className="mt-4 space-y-2">
                {profile.cargo && profile.cargo.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Cargo:</h3>
                    <div className="flex flex-wrap gap-1">
                      {profile.cargo.map((c, index) => (
                        <Badge key={index} variant="outline">{c}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.funcao && profile.funcao.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Função:</h3>
                    <div className="flex flex-wrap gap-1">
                      {profile.funcao.map((f, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50">{f}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.unidade && profile.unidade.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Unidade:</h3>
                    <div className="flex flex-wrap gap-1">
                      {profile.unidade.map((u, index) => (
                        <Badge key={index} variant="outline">{u}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileHeader;
