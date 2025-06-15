
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { GraduationCap } from 'lucide-react';
import { Profile } from '../../types';

interface AcademicFormationCardProps {
  formacaoAcademica: Profile['formacaoAcademica'];
}

const AcademicFormationCard: React.FC<AcademicFormationCardProps> = ({ formacaoAcademica }) => {
  console.log('🎓 AcademicFormationCard - formações recebidas:', formacaoAcademica);
  
  const hasFormations = formacaoAcademica && formacaoAcademica.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-[#7B3F00]" />
          <span>Formação Acadêmica</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasFormations ? (
          <div className="space-y-4">
            {formacaoAcademica.map((formacao, index) => (
              <div key={formacao.id || index} className="border-l-4 border-red-200 pl-4">
                <h4 className="font-semibold text-gray-900">{formacao.nivel}</h4>
                <p className="text-gray-700">{formacao.curso}</p>
                <p className="text-sm text-gray-600">{formacao.instituicao} • {formacao.ano}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhuma formação acadêmica informada</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AcademicFormationCard;

