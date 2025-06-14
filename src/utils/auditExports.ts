
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuditLog } from '../types/admin';

export const exportAuditLogsToPDF = (logs: AuditLog[], type: 'selecionados' | 'todos') => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  let currentY = 20;

  // Header
  doc.setFontSize(16);
  doc.setTextColor(139, 69, 19); // Brown color for MPRJ
  doc.text('Ministério Público do Estado do Rio de Janeiro', 20, currentY);
  currentY += 10;
  
  doc.setFontSize(14);
  doc.text(`Relatório de Auditoria - Logs ${type}`, 20, currentY);
  currentY += 10;
  
  doc.setFontSize(10);
  doc.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}`, 20, currentY);
  doc.text(`Total de registros: ${logs.length}`, 20, currentY + 5);
  currentY += 20;

  // Table headers
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  
  logs.forEach((log, index) => {
    if (currentY > pageHeight - 40) {
      doc.addPage();
      currentY = 20;
    }

    // Log entry
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${log.action}`, 20, currentY);
    currentY += 7;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    // Details
    const detailsLines = doc.splitTextToSize(log.details, pageWidth - 40);
    doc.text(detailsLines, 25, currentY);
    currentY += detailsLines.length * 4;
    
    // Entity type
    doc.text(`Tipo: ${log.entityType}`, 25, currentY);
    currentY += 4;
    
    // Previous and new values
    if (log.previousValue) {
      const prevLines = doc.splitTextToSize(`Antes: ${log.previousValue}`, pageWidth - 40);
      doc.setTextColor(200, 0, 0);
      doc.text(prevLines, 25, currentY);
      currentY += prevLines.length * 4;
      doc.setTextColor(0, 0, 0);
    }
    
    if (log.newValue) {
      const newLines = doc.splitTextToSize(`Depois: ${log.newValue}`, pageWidth - 40);
      doc.setTextColor(0, 150, 0);
      doc.text(newLines, 25, currentY);
      currentY += newLines.length * 4;
      doc.setTextColor(0, 0, 0);
    }
    
    // User and timestamp
    doc.text(`Usuário: ${log.user}`, 25, currentY);
    currentY += 4;
    doc.text(`Data/Hora: ${format(log.timestamp, "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}`, 25, currentY);
    
    if (log.entityId) {
      currentY += 4;
      doc.text(`ID da Entidade: ${log.entityId}`, 25, currentY);
    }
    
    currentY += 8;
    
    // Separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, currentY, pageWidth - 20, currentY);
    currentY += 5;
  });

  doc.save(`audit-logs-${type}-${Date.now()}.pdf`);
};

export const exportAuditLogsToXLS = (logs: AuditLog[], type: 'selecionados' | 'todos') => {
  const worksheet = XLSX.utils.json_to_sheet(
    logs.map(log => ({
      'Ação': log.action,
      'Detalhes': log.details,
      'Tipo de Entidade': log.entityType,
      'ID da Entidade': log.entityId || '',
      'Valor Anterior': log.previousValue || '',
      'Valor Novo': log.newValue || '',
      'Usuário': log.user,
      'Data': format(log.timestamp, 'dd/MM/yyyy', { locale: ptBR }),
      'Hora': format(log.timestamp, 'HH:mm:ss', { locale: ptBR }),
      'Timestamp': log.timestamp.toISOString()
    }))
  );

  // Set column widths
  const columnWidths = [
    { wch: 20 }, // Ação
    { wch: 40 }, // Detalhes
    { wch: 15 }, // Tipo de Entidade
    { wch: 15 }, // ID da Entidade
    { wch: 30 }, // Valor Anterior
    { wch: 30 }, // Valor Novo
    { wch: 20 }, // Usuário
    { wch: 12 }, // Data
    { wch: 10 }, // Hora
    { wch: 20 }  // Timestamp
  ];
  
  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs de Auditoria');

  XLSX.writeFile(workbook, `audit-logs-${type}-${Date.now()}.xlsx`);
};
