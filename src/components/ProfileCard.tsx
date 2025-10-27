import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../types';
import { Card } from './ui/card';
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
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Photo container with maximum height */}
        <div className="w-full md:w-32 h-48 md:h-56 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
          {profile.fotoUrl ? (
            <img 
              src={profile.fotoUrl} 
              alt={profile.name} 
              className="w-full h-full object-cover"
              onLoad={() => console.log('Image loaded successfully for:', profile.name, 'URL:', profile.fotoUrl)}
              onError={(e) => {
                console.error('Image failed to load for:', profile.name, 'URL:', profile.fotoUrl);
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.fallback-initials')) {
                  parent.innerHTML = `
                    <div class="w-full h-full bg-red-100 flex items-center justify-center fallback-initials">
                      <span class="text-red-900 font-semibold text-4xl">
                        ${getInitials(profile.name)}
                      </span>
                    </div>
                  `;
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-red-100 flex items-center justify-center">
              <span className="text-red-900 font-semibold text-4xl">
                {getInitials(profile.name)}
              </span>
            </div>
          )}
        </div>
        
        {/* Content area - horizontal layout */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Header section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1.5">
              {profile.name}
            </h3>
            <p className="text-xs text-gray-600 mb-2">Matrícula: {profile.matricula}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {/* Left column */}
              <div className="space-y-2">
                {/* Cargo */}
                <div>
                  <p className="text-[10px] font-medium text-gray-500 mb-0.5">Cargo</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.cargo.map((cargo, index) => (
                      <Badge key={index} variant="secondary" className="text-[10px] py-0 px-1.5">
                        {cargo}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Função */}
                {profile.funcao && profile.funcao.length > 0 && (
                  <div>
                    <p className="text-[10px] font-medium text-gray-500 mb-0.5">Função</p>
                    <div className="flex flex-wrap gap-1">
                      {profile.funcao.map((funcao, index) => (
                        <Badge key={index} variant="outline" className="text-[10px] py-0 px-1.5">
                          {funcao}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Unidades */}
                <div>
                  <p className="text-[10px] font-medium text-gray-500 mb-0.5">Unidades</p>
                  <div className="flex items-start space-x-1.5">
                    <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {profile.unidade.map((unidade, index) => (
                        <Badge key={index} variant="outline" className="text-[10px] py-0 px-1.5">
                          {unidade}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column */}
              <div className="space-y-2">
                {/* Contato */}
                <div>
                  <p className="text-[10px] font-medium text-gray-500 mb-0.5">Contato</p>
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600 truncate">{profile.email}</span>
                    </div>
                    {profile.telefone && (
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{profile.telefone}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Temas de Interesse */}
                <div>
                  <p className="text-[10px] font-medium text-gray-500 mb-0.5">Temas de Interesse</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.temasInteresse.slice(0, 4).map((tema, index) => (
                      <Badge key={index} className="text-[10px] py-0 px-1.5 bg-red-100 text-red-900 hover:bg-red-200">
                        {tema}
                      </Badge>
                    ))}
                    {profile.temasInteresse.length > 4 && (
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                        +{profile.temasInteresse.length - 4} mais
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Biografia */}
            {profile.biografia && (
              <div className="mb-3">
                <p className="text-xs text-gray-600 line-clamp-2">
                  {profile.biografia}
                </p>
              </div>
            )}
          </div>
          
          {/* Footer section */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-1.5 text-[10px] text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>
                Atualizado em {format(profile.lastUpdated, "dd/MM/yyyy", {
                locale: ptBR
              })}
              </span>
            </div>
            
            <Link to={`/profile/${profile.id}`} className="bg-red-900 text-white py-1.5 px-4 rounded-md text-xs font-medium hover:bg-red-800 transition-colors">
              Ver Perfil Completo
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
