
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { History, User, Clock, Edit, Trash2, Plus, Eye, Download, FileText, FileSpreadsheet, Shield, AlertTriangle } from 'lucide-react';
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

  const getActionIcon = (operationType: string) => {
    switch (operationType) {
      case 'CREATE': return <Plus className="w-4 h-4 text-green-600" />;
      case 'UPDATE': return <Edit className="w-4 h-4 text-blue-600" />;
      case 'DELETE': return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'LOGIN': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'LOGOUT': return <Shield className="w-4 h-4 text-gray-600" />;
      default: return <History className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionColor = (operationType: string, severityLevel: string) => {
    if (severityLevel === 'CRITICAL') return 'bg-red-100 text-red-800 border-red-200';
    if (severityLevel === 'HIGH') return 'bg-orange-100 text-orange-800 border-orange-200';
    if (severityLevel === 'MEDIUM') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (severityLevel === 'LOW') return 'bg-gray-100 text-gray-800 border-gray-200';
    
    switch (operationType) {
      case 'CREATE': return 'bg-green-100 text-green-800 border-green-200';
      case 'UPDATE': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-200';
      case 'LOGIN': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'LOGOUT': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severityLevel: string) => {
    if (severityLevel === 'CRITICAL' || severityLevel === 'HIGH') {
      return <AlertTriangle className="w-3 h-3 text-red-500" />;
    }
    return null;
  };

  const formatUserInfo = (log: AuditLog) => {
    // Usuário que REALIZOU a ação (user_name do banco)
    if (log.user && log.user !== 'Unknown') {
      if (log.user.includes('@')) {
        // Se é email, extrai o nome antes do @
        const userName = log.user.split('@')[0].replace('.', ' ');
        return userName.charAt(0).toUpperCase() + userName.slice(1);
      }
      return log.user;
    }
    return 'Sistema';
  };

  const formatActionDescription = (log: AuditLog) => {
    const action = log.operationType || log.action;
    const entityType = log.entityType;
    
    switch (action) {
      case 'CREATE':
        return `Criou ${entityType.toLowerCase()}`;
      case 'UPDATE':
        return `Atualizou ${entityType.toLowerCase()}`;
      case 'DELETE':
        return `Excluiu ${entityType.toLowerCase()}`;
      case 'LOGIN':
        return 'Login realizado';
      case 'LOGOUT':
        return 'Logout realizado';
      default:
        return log.action || 'Ação realizada';
    }
  };

  const isValueRelevant = (value: string | undefined) => {
    if (!value) return false;
    // Se é muito longo (provavelmente base64 ou dados grandes), não mostrar
    if (value.length > 200) return false;
    // Se contém base64, não mostrar
    if (value.includes('data:image') || value.includes('base64')) return false;
    return true;
  };

  const filteredLogs = auditLogs.filter(log => {
    const userInfo = formatUserInfo(log);
    const actionDesc = formatActionDescription(log);
    
    const matchesSearch = actionDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entityType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = !actionFilter || actionFilter === 'all' || 
                         (log.operationType || log.action).toLowerCase().includes(actionFilter.toLowerCase());
    
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
              placeholder="Buscar por usuário, ação ou tipo de entidade..." 
              className="flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por operação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as operações</SelectItem>
                <SelectItem value="create">Criação</SelectItem>
                <SelectItem value="update">Atualização</SelectItem>
                <SelectItem value="delete">Exclusão</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
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
                  <div key={log.id} className="p-4 hover:bg-gray-50 border-l-4 border-transparent hover:border-blue-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Checkbox
                          checked={selectedLogs.includes(log.id)}
                          onCheckedChange={(checked) => handleSelectLog(log.id, checked as boolean)}
                        />
                        {getActionIcon(log.operationType || log.action)}
                        <div className="flex-1 space-y-3">
                          {/* Header com ação e severidade */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge className={`border ${getActionColor(log.operationType || log.action, log.severityLevel || 'MEDIUM')}`}>
                                {formatActionDescription(log)}
                              </Badge>
                              {getSeverityIcon(log.severityLevel || 'MEDIUM')}
                              <span className="text-sm text-gray-600">
                                {log.entityType}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {log.module || 'Sistema'}
                            </span>
                          </div>
                          
                          {/* Detalhes principais */}
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-gray-700">Usuário:</span>
                                <span className="text-gray-900">{formatUserInfo(log)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-600" />
                                <span className="font-medium text-gray-700">Data:</span>
                                <span className="text-gray-900">
                                  {format(log.timestamp, "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Campos afetados (se disponível) */}
                          {log.affectedFields && log.affectedFields.length > 0 && (
                            <div className="text-xs">
                              <span className="font-medium text-gray-700">Campos alterados: </span>
                              <span className="text-gray-600">
                                {log.affectedFields.filter(field => field !== 'all_fields').join(', ') || 'Múltiplos campos'}
                              </span>
                            </div>
                          )}
                          
                          {/* Valores alterados (apenas se relevantes) */}
                          {(isValueRelevant(log.previousValue) || isValueRelevant(log.newValue)) && (
                            <div className="text-xs space-y-1 bg-blue-50 p-2 rounded border">
                              {isValueRelevant(log.previousValue) && (
                                <div>
                                  <span className="font-medium text-red-700">Valor anterior: </span>
                                  <span className="text-gray-700">{log.previousValue}</span>
                                </div>
                              )}
                              {isValueRelevant(log.newValue) && (
                                <div>
                                  <span className="font-medium text-green-700">Novo valor: </span>
                                  <span className="text-gray-700">{log.newValue}</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Status da operação */}
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {log.success ? 'Sucesso' : 'Erro'}
                              </span>
                              {log.errorMessage && (
                                <span className="text-red-600" title={log.errorMessage}>
                                  Erro: {log.errorMessage.substring(0, 50)}...
                                </span>
                              )}
                            </div>
                            {log.entityId && (
                              <span className="text-gray-400 font-mono">
                                ID: {log.entityId.substring(0, 8)}...
                              </span>
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
