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
    profile.temasInteresse.forEach(area => {
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
    if (currentY > 230) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(11);
    doc.text(`${index + 1}. ${profile.name}`, 20, currentY);
    currentY += 7;
    
    doc.setFontSize(9);
    doc.text(`Matrícula: ${profile.matricula}`, 25, currentY);
    currentY += 5;
    
    doc.text(`Cargo: ${profile.cargo.join(', ')}`, 25, currentY);
    currentY += 5;
    
    doc.text(`Unidade: ${profile.unidade.join(', ')}`, 25, currentY);
    currentY += 5;
    
    doc.text(`Contato: ${profile.telefone || 'Não informado'} | ${profile.email}`, 25, currentY);
    currentY += 5;
    
    doc.text(`Preferência de contato: ${profile.contato.formaContato}`, 25, currentY);
    currentY += 10;
  });
};

export const generateDetailedProfileReport = (profiles: Profile[]) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  profiles.forEach((profile, profileIndex) => {
    if (profileIndex > 0) {
      doc.addPage();
    }

    let currentY = 20;

    // Header - MPRJ
    doc.setFontSize(14);
    doc.setTextColor(139, 69, 19);
    doc.setFont('helvetica', 'bold');
    doc.text('Ministério Público do Estado do Rio de Janeiro', margin, currentY);
    currentY += 8;
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Sistema de Gestão de Especialistas', margin, currentY);
    currentY += 12;

    // Profile name as main title
    doc.setFontSize(16);
    doc.setTextColor(139, 69, 19);
    doc.setFont('helvetica', 'bold');
    const nameLines = doc.splitTextToSize(profile.name, contentWidth);
    doc.text(nameLines, margin, currentY);
    currentY += nameLines.length * 8;

    // Separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 8;

    // Section: Basic Information
    doc.setFontSize(11);
    doc.setTextColor(139, 69, 19);
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS BÁSICOS', margin, currentY);
    currentY += 6;

    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    doc.text(`Matrícula: ${profile.matricula}`, margin + 5, currentY);
    currentY += 5;
    doc.text(`E-mail: ${profile.email}`, margin + 5, currentY);
    currentY += 5;
    if (profile.telefone) {
      doc.text(`Telefone: ${profile.telefone}`, margin + 5, currentY);
      currentY += 5;
    }
    if (profile.cargo && profile.cargo.length > 0) {
      const cargoText = doc.splitTextToSize(`Cargo(s): ${profile.cargo.join(', ')}`, contentWidth - 5);
      doc.text(cargoText, margin + 5, currentY);
      currentY += cargoText.length * 5;
    }
    if (profile.unidade && profile.unidade.length > 0) {
      const unidadeText = doc.splitTextToSize(`Unidade(s): ${profile.unidade.join(', ')}`, contentWidth - 5);
      doc.text(unidadeText, margin + 5, currentY);
      currentY += unidadeText.length * 5;
    }
    currentY += 5;

    // Section: Biography
    if (profile.biografia && profile.biografia.trim() !== '') {
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = 20;
      }
      
      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('BIOGRAFIA', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const bioLines = doc.splitTextToSize(profile.biografia, contentWidth - 5);
      bioLines.forEach((line: string) => {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(line, margin + 5, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    // Section: Academic Education
    if (profile.formacaoAcademica && profile.formacaoAcademica.length > 0) {
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('FORMAÇÃO ACADÊMICA', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');

      profile.formacaoAcademica.forEach((formacao) => {
        if (currentY > pageHeight - 25) {
          doc.addPage();
          currentY = 20;
        }
        
        doc.setFont('helvetica', 'bold');
        doc.text(`• ${formacao.nivel}`, margin + 5, currentY);
        currentY += 5;
        
        doc.setFont('helvetica', 'normal');
        doc.text(`  ${formacao.curso}`, margin + 5, currentY);
        currentY += 4;
        doc.text(`  ${formacao.instituicao} - ${formacao.ano}`, margin + 5, currentY);
        currentY += 6;
      });
      currentY += 3;
    }

    // Section: Professional Experience
    if (profile.experienciasProfissionais && profile.experienciasProfissionais.length > 0) {
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('EXPERIÊNCIAS PROFISSIONAIS', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');

      profile.experienciasProfissionais.forEach((exp) => {
        if (currentY > pageHeight - 30) {
          doc.addPage();
          currentY = 20;
        }

        if (exp.cargoFuncao) {
          doc.setFont('helvetica', 'bold');
          doc.text(`• ${exp.cargoFuncao}`, margin + 5, currentY);
          currentY += 5;
          doc.setFont('helvetica', 'normal');
        }
        
        if (exp.empresaInstituicao) {
          doc.text(`  ${exp.empresaInstituicao}`, margin + 5, currentY);
          currentY += 4;
        }
        
        if (exp.dataInicio || exp.dataFim) {
          const periodo = `  ${exp.dataInicio || 'N/A'} - ${exp.dataFim || 'Atual'}`;
          doc.text(periodo, margin + 5, currentY);
          currentY += 4;
        }
        
        if (exp.atividades) {
          const atividadesLines = doc.splitTextToSize(`  ${exp.atividades}`, contentWidth - 10);
          atividadesLines.forEach((line: string) => {
            if (currentY > pageHeight - 20) {
              doc.addPage();
              currentY = 20;
            }
            doc.text(line, margin + 5, currentY);
            currentY += 4;
          });
        }
        currentY += 6;
      });
      currentY += 3;
    }

    // Section: Projects
    if (profile.projetos && profile.projetos.length > 0) {
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('PROJETOS', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');

      profile.projetos.forEach((projeto) => {
        if (currentY > pageHeight - 25) {
          doc.addPage();
          currentY = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.text(`• ${projeto.nome}`, margin + 5, currentY);
        currentY += 5;
        doc.setFont('helvetica', 'normal');

        const dataInicio = new Date(projeto.dataInicio).toLocaleDateString('pt-BR');
        const dataFim = projeto.dataFim ? new Date(projeto.dataFim).toLocaleDateString('pt-BR') : 'Em andamento';
        doc.text(`  Período: ${dataInicio} - ${dataFim}`, margin + 5, currentY);
        currentY += 4;

        if (projeto.observacoes) {
          const obsLines = doc.splitTextToSize(`  ${projeto.observacoes}`, contentWidth - 10);
          obsLines.forEach((line: string) => {
            if (currentY > pageHeight - 20) {
              doc.addPage();
              currentY = 20;
            }
            doc.text(line, margin + 5, currentY);
            currentY += 4;
          });
        }
        currentY += 6;
      });
      currentY += 3;
    }

    // Section: Interest Areas
    if (profile.temasInteresse && profile.temasInteresse.length > 0) {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('ÁREAS DE INTERESSE', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const temasText = doc.splitTextToSize(profile.temasInteresse.join(', '), contentWidth - 5);
      temasText.forEach((line: string) => {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(line, margin + 5, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    // Section: Languages
    if (profile.idiomas && profile.idiomas.length > 0) {
      if (currentY > pageHeight - 25) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('IDIOMAS', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.text(profile.idiomas.join(', '), margin + 5, currentY);
      currentY += 8;
    }

    // Section: Certifications
    if (profile.certificacoes && profile.certificacoes.length > 0) {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('CERTIFICAÇÕES', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');

      profile.certificacoes.forEach((cert) => {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(`• ${cert}`, margin + 5, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    // Section: Publications
    if (profile.publicacoes && profile.publicacoes.trim() !== '') {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('PUBLICAÇÕES', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const pubLines = doc.splitTextToSize(profile.publicacoes, contentWidth - 5);
      pubLines.forEach((line: string) => {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(line, margin + 5, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    // Section: Availability
    if (profile.disponibilidade) {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('DISPONIBILIDADE', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');

      if (profile.disponibilidade.tipoColaboracao && profile.disponibilidade.tipoColaboracao.length > 0) {
        doc.text(`Tipos de colaboração: ${profile.disponibilidade.tipoColaboracao.join(', ')}`, margin + 5, currentY);
        currentY += 5;
      }
      if (profile.disponibilidade.disponibilidadeEstimada) {
        doc.text(`Disponibilidade estimada: ${profile.disponibilidade.disponibilidadeEstimada}`, margin + 5, currentY);
        currentY += 5;
      }
      if (profile.contato?.formaContato) {
        doc.text(`Forma de contato preferencial: ${profile.contato.formaContato}`, margin + 5, currentY);
        currentY += 5;
      }
      if (profile.contato?.horarioPreferencial) {
        doc.text(`Horário preferencial: ${profile.contato.horarioPreferencial}`, margin + 5, currentY);
        currentY += 5;
      }
      currentY += 5;
    }

    // Section: Additional Information
    if (profile.informacoesComplementares && profile.informacoesComplementares.trim() !== '') {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('INFORMAÇÕES COMPLEMENTARES', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const infoLines = doc.splitTextToSize(profile.informacoesComplementares, contentWidth - 5);
      infoLines.forEach((line: string) => {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(line, margin + 5, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    // Section: Curriculum Link
    if (profile.linkCurriculo && profile.linkCurriculo.trim() !== '') {
      if (currentY > pageHeight - 25) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(139, 69, 19);
      doc.setFont('helvetica', 'bold');
      doc.text('CURRÍCULO', margin, currentY);
      currentY += 6;

      doc.setFontSize(9);
      doc.setTextColor(0, 0, 255);
      doc.setFont('helvetica', 'normal');
      doc.text(profile.linkCurriculo, margin + 5, currentY);
      currentY += 8;
    }

    // Footer with generation date
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'italic');
    doc.text(
      `Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
      margin,
      pageHeight - 10
    );
    doc.text(`Página ${profileIndex + 1} de ${profiles.length}`, pageWidth - margin - 30, pageHeight - 10);
  });

  doc.save(`relatorio-perfis-detalhado-${Date.now()}.pdf`);
};

export const validateEmail = (email: string): boolean => {
  return email.endsWith('@mprj.mp.br');
};
