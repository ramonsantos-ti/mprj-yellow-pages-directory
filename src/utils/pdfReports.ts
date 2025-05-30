
import { jsPDF } from 'jspdf';
import { Profile } from '../types';

export const generateProfileReport = (profiles: Profile[], reportType: string) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  let currentY = 20;

  // Header
  doc.setFontSize(16);
  doc.setTextColor(139, 69, 19); // Brown color for MPRJ
  doc.text('Ministério Público do Estado do Rio de Janeiro', 20, currentY);
  currentY += 10;
  
  doc.setFontSize(14);
  doc.text(`Relatório: ${reportType}`, 20, currentY);
  currentY += 10;
  
  doc.setFontSize(10);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, currentY);
  currentY += 20;

  // Content based on report type
  switch (reportType) {
    case 'cargos':
      generateCargoReport(doc, profiles, currentY);
      break;
    case 'areas-conhecimento':
      generateAreasConhecimentoReport(doc, profiles, currentY);
      break;
    case 'formacao':
      generateFormacaoReport(doc, profiles, currentY);
      break;
    case 'habilidades':
      generateHabilidadesReport(doc, profiles, currentY);
      break;
    case 'idiomas':
      generateIdiomasReport(doc, profiles, currentY);
      break;
    case 'colaboracao':
      generateColaboracaoReport(doc, profiles, currentY);
      break;
    default:
      generateGeneralReport(doc, profiles, currentY);
  }

  doc.save(`relatorio-${reportType}-${Date.now()}.pdf`);
};

const generateCargoReport = (doc: jsPDF, profiles: Profile[], startY: number) => {
  let currentY = startY;
  const cargoStats: { [key: string]: number } = {};

  profiles.forEach(profile => {
    profile.cargo.forEach(cargo => {
      cargoStats[cargo] = (cargoStats[cargo] || 0) + 1;
    });
  });

  doc.setFontSize(12);
  doc.text('Distribuição por Cargo:', 20, currentY);
  currentY += 10;

  Object.entries(cargoStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([cargo, count]) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFontSize(10);
      doc.text(`${cargo}: ${count} pessoas`, 25, currentY);
      currentY += 7;
    });
};

const generateAreasConhecimentoReport = (doc: jsPDF, profiles: Profile[], startY: number) => {
  let currentY = startY;
  const areaStats: { [key: string]: number } = {};

  profiles.forEach(profile => {
    profile.areasConhecimento.forEach(area => {
      areaStats[area] = (areaStats[area] || 0) + 1;
    });
  });

  doc.setFontSize(12);
  doc.text('Distribuição por Área de Conhecimento:', 20, currentY);
  currentY += 10;

  Object.entries(areaStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([area, count]) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFontSize(10);
      doc.text(`${area}: ${count} pessoas`, 25, currentY);
      currentY += 7;
    });
};

const generateFormacaoReport = (doc: jsPDF, profiles: Profile[], startY: number) => {
  let currentY = startY;
  const formacaoStats: { [key: string]: number } = {};

  profiles.forEach(profile => {
    profile.formacaoAcademica.forEach(formacao => {
      formacaoStats[formacao.nivel] = (formacaoStats[formacao.nivel] || 0) + 1;
    });
  });

  doc.setFontSize(12);
  doc.text('Distribuição por Formação Acadêmica:', 20, currentY);
  currentY += 10;

  Object.entries(formacaoStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([nivel, count]) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFontSize(10);
      doc.text(`${nivel}: ${count} pessoas`, 25, currentY);
      currentY += 7;
    });
};

const generateHabilidadesReport = (doc: jsPDF, profiles: Profile[], startY: number) => {
  let currentY = startY;
  const habilidadesStats: { [key: string]: number } = {};

  profiles.forEach(profile => {
    profile.habilidadesTecnicas.forEach(habilidade => {
      habilidadesStats[habilidade] = (habilidadesStats[habilidade] || 0) + 1;
    });
  });

  doc.setFontSize(12);
  doc.text('Distribuição por Habilidades Técnicas:', 20, currentY);
  currentY += 10;

  Object.entries(habilidadesStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20) // Top 20 skills
    .forEach(([habilidade, count]) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFontSize(10);
      doc.text(`${habilidade}: ${count} pessoas`, 25, currentY);
      currentY += 7;
    });
};

const generateIdiomasReport = (doc: jsPDF, profiles: Profile[], startY: number) => {
  let currentY = startY;
  const idiomaStats: { [key: string]: number } = {};

  profiles.forEach(profile => {
    profile.idiomas.forEach(idioma => {
      idiomaStats[idioma] = (idiomaStats[idioma] || 0) + 1;
    });
  });

  doc.setFontSize(12);
  doc.text('Distribuição por Idiomas:', 20, currentY);
  currentY += 10;

  Object.entries(idiomaStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([idioma, count]) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFontSize(10);
      doc.text(`${idioma}: ${count} pessoas`, 25, currentY);
      currentY += 7;
    });
};

const generateColaboracaoReport = (doc: jsPDF, profiles: Profile[], startY: number) => {
  let currentY = startY;
  const colaboracaoStats: { [key: string]: number } = {};

  profiles.forEach(profile => {
    profile.disponibilidade.tipoColaboracao.forEach(tipo => {
      colaboracaoStats[tipo] = (colaboracaoStats[tipo] || 0) + 1;
    });
  });

  doc.setFontSize(12);
  doc.text('Distribuição por Tipos de Colaboração:', 20, currentY);
  currentY += 10;

  Object.entries(colaboracaoStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([tipo, count]) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFontSize(10);
      doc.text(`${tipo}: ${count} pessoas`, 25, currentY);
      currentY += 7;
    });
};

const generateGeneralReport = (doc: jsPDF, profiles: Profile[], startY: number) => {
  let currentY = startY;

  doc.setFontSize(12);
  doc.text('Relatório Geral de Perfis:', 20, currentY);
  currentY += 15;

  profiles.forEach((profile, index) => {
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(11);
    doc.text(`${index + 1}. ${profile.name}`, 20, currentY);
    currentY += 7;
    
    doc.setFontSize(9);
    doc.text(`Matrícula: ${profile.matricula}`, 25, currentY);
    currentY += 5;
    
    doc.text(`Email: ${profile.email}`, 25, currentY);
    currentY += 5;
    
    doc.text(`Cargo: ${profile.cargo.join(', ')}`, 25, currentY);
    currentY += 5;
    
    doc.text(`Unidade: ${profile.unidade.join(', ')}`, 25, currentY);
    currentY += 10;
  });
};

export const validateEmail = (email: string): boolean => {
  return email.endsWith('@mprj.mp.br');
};
