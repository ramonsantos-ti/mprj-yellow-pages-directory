
import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../types';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  console.log('ProfileCard rendering:', profile.name, 'fotoUrl:', profile.fotoUrl);

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          {/* Photo container with increased size */}
          <div className="w-30 h-42 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
            {profile.fotoUrl ? (
              <img 
                src={profile.fotoUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
                onLoad={() => console.log('Image loaded successfully for:', profile.name)}
                onError={(e) => {
                  console.error('Image failed to load for:', profile.name, 'URL:', profile.fotoUrl);
                  // Fallback to initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-initials')) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-red-100 flex items-center justify-center fallback-initials">
                        <span class="text-red-900 font-semibold text-xl">
                          ${getInitials(profile.name)}
                        </span>
                      </div>
                    `;
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-red-100 flex items-center justify-center">
                <span className="text-red-900 font-semibold text-xl">
                  {getInitials(profile.name)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {profile.name}
            </h3>
            <p className="text-sm text-gray-600">Matrícula: {profile.matricula}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {profile.cargo.map((cargo, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {cargo}
                </Badge>
              ))}
            </div>
            {profile.funcao && profile.funcao.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {profile.funcao.map((funcao, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {funcao}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Unidades */}
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="flex flex-wrap gap-1">
            {profile.unidade.map((unidade, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {unidade}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contato */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{profile.email}</span>
          </div>
          {profile.telefone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{profile.telefone}</span>
            </div>
          )}
        </div>

        {/* Áreas de Interesse */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Áreas de Interesse</h4>
          <div className="flex flex-wrap gap-1">
            {profile.areasConhecimento.slice(0, 3).map((area, index) => (
              <Badge key={index} className="text-xs bg-red-100 text-red-900 hover:bg-red-200">
                {area}
              </Badge>
            ))}
            {profile.areasConhecimento.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.areasConhecimento.length - 3} mais
              </Badge>
            )}
          </div>
        </div>

        {/* Biografia */}
        {profile.biografia && (
          <div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {profile.biografia}
            </p>
          </div>
        )}

        {/* Última atualização */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2 border-t">
          <Calendar className="w-3 h-3" />
          <span>
            Atualizado em {format(profile.lastUpdated, "dd/MM/yyyy", {
            locale: ptBR
          })}
          </span>
        </div>

        {/* Link para perfil completo */}
        <div className="pt-2">
          <Link to={`/profile/${profile.id}`} className="block w-full text-center bg-red-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-800 transition-colors">
            Ver Perfil Completo
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
