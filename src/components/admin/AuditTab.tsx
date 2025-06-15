
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { History, User, Clock, Edit, Trash2, Plus, Eye, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuditLog } from '../../types/admin';
import { exportAuditLogsToPDF, exportAuditLogsToXLS } from '../../utils/auditExports';

interface AuditTabProps {
  auditLogs: AuditLog[];
}

const AuditTab: React.FC<AuditTabProps> = ({ auditLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);

  const getActionIcon = (action: string) => {
    if (action.includes('criado') || action.includes('adicionado')) return <Plus className="w-4 h-4 text-green-600" />;
    if (action.includes('editado') || action.includes('atualizado')) return <Edit className="w-4 h-4 text-blue-600" />;
    if (action.includes('excluído') || action.includes('removido')) return <Trash2 className="w-4 h-4 text-red-600" />;
    if (action.includes('visualizado')) return <Eye className="w-4 h-4 text-gray-600" />;
    return <History className="w-4 h-4 text-gray-600" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('criado') || action.includes('adicionado')) return 'bg-green-100 text-green-800';
    if (action.includes('editado') || action.includes('atualizado')) return 'bg-blue-100 text-blue-800';
    if (action.includes('excluído') || action.includes('removido')) return 'bg-red-100 text-red-800';
    if (action.includes('visualizado')) return 'bg-gray-100 text-gray-800';
    return 'bg-gray-100 text-gray-800';
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = !actionFilter || actionFilter === 'all' || log.action.toLowerCase().includes(actionFilter.toLowerCase());
    
    return matchesSearch && matchesAction;
  });

  const handleSelectLog = (logId: string, checked: boolean) => {
    if (checked) {
      setSelectedLogs(prev => [...prev, logId]);
    } else {
      setSelectedLogs(prev => prev.filter(id => id !== logId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLogs(filteredLogs.map(log => log.id));
    } else {
      setSelectedLogs([]);
    }
  };

  const exportSelectedToPDF = () => {
    const logsToExport = filteredLogs.filter(log => selectedLogs.includes(log.id));
    exportAuditLogsToPDF(logsToExport, 'selecionados');
  };

  const exportSelectedToXLS = () => {
    const logsToExport = filteredLogs.filter(log => selectedLogs.includes(log.id));
    exportAuditLogsToXLS(logsToExport, 'selecionados');
  };

  const exportAllToPDF = () => {
    exportAuditLogsToPDF(filteredLogs, 'todos');
  };

  const exportAllToXLS = () => {
    exportAuditLogsToXLS(filteredLogs, 'todos');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Logs de Auditoria</span>
            <Badge variant="secondary">{filteredLogs.length} registros</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedLogs.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Selecionados ({selectedLogs.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={exportSelectedToPDF}>
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportSelectedToXLS}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Exportar Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Todos
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={exportAllToPDF}>
                  <FileText className="w-4 h-4 mr-2" />
                  Exportar PDF ({filteredLogs.length} logs)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportAllToXLS}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Exportar Excel ({filteredLogs.length} logs)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Input 
              placeholder="Buscar por usuário, ação ou detalhes..." 
              className="flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por ação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as ações</SelectItem>
                <SelectItem value="criado">Criação</SelectItem>
                <SelectItem value="editado">Edição</SelectItem>
                <SelectItem value="excluído">Exclusão</SelectItem>
                <SelectItem value="ativado">Ativação</SelectItem>
                <SelectItem value="desativado">Desativação</SelectItem>
                <SelectItem value="promovido">Promoção</SelectItem>
                <SelectItem value="notificação">Notificação</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-lg max-h-[600px] overflow-y-auto">
            {filteredLogs.length > 0 ? (
              <div className="divide-y">
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedLogs.length === filteredLogs.length && filteredLogs.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm font-medium">
                      Selecionar todos ({filteredLogs.length} logs)
                    </span>
                  </div>
                </div>
                
                {filteredLogs.map(log => (
                  <div key={log.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Checkbox
                          checked={selectedLogs.includes(log.id)}
                          onCheckedChange={(checked) => handleSelectLog(log.id, checked as boolean)}
                        />
                        {getActionIcon(log.action)}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge className={getActionColor(log.action)}>
                              {log.action}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              em {log.entityType}
                            </span>
                          </div>
                          
                          <p className="text-sm font-medium text-gray-900">
                            {log.details}
                          </p>
                          
                          {(log.previousValue || log.newValue) && (
                            <div className="text-xs space-y-1 bg-gray-50 p-2 rounded">
                              {log.previousValue && (
                                <div>
                                  <span className="font-medium text-red-700">Antes:</span>
                                  <span className="ml-1 text-gray-600">{log.previousValue}</span>
                                </div>
                              )}
                              {log.newValue && (
                                <div>
                                  <span className="font-medium text-green-700">Depois:</span>
                                  <span className="ml-1 text-gray-600">{log.newValue}</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>
                                {log.user}
                                {log.userMatricula && ` (Mat: ${log.userMatricula})`}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {format(log.timestamp, "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
                              </span>
                            </div>
                            {log.entityId && (
                              <span className="text-gray-400">ID: {log.entityId}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Nenhum log encontrado</p>
                <p className="text-sm">
                  {searchTerm || actionFilter 
                    ? 'Tente ajustar os filtros de busca'
                    : 'As ações realizadas no sistema aparecerão aqui'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditTab;
