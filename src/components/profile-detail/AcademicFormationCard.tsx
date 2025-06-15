
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { GraduationCap } from 'lucide-react';
import { Profile } from '../../types';

interface AcademicFormationCardProps {
  formacaoAcademica: Profile['formacaoAcademica'];
}

const AcademicFormationCard: React.FC<AcademicFormationCardProps> = ({ formacaoAcademica }) => {
  console.log('🎓 AcademicFormationCard renderizando:');
  console.log('- Formações recebidas:', formacaoAcademica);
  console.log('- Tipo:', typeof formacaoAcademica, Array.isArray(formacaoAcademica));
  console.log('- Length:', formacaoAcademica?.length);
  
  // Garantir que é um array válido
  const formacoes = Array.isArray(formacaoAcademica) ? formacaoAcademica : [];
  
  if (formacoes.length === 0) {
    console.log('🎓 AcademicFormationCard: sem formações válidas, não renderizando');
    return null;
  }

  console.log('🎓 AcademicFormationCard: renderizando', formacoes.length, 'formações');
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5" />
          <span>Formação Acadêmica</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {formacoes.map((formacao, index) => (
            <div key={formacao.id || index} className="border-l-4 border-red-200 pl-4">
              <h4 className="font-semibold text-gray-900">{formacao.nivel}</h4>
              <p className="text-gray-700">{formacao.curso}</p>
              <p className="text-sm text-gray-600">{formacao.instituicao} • {formacao.ano}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicFormationCard;
