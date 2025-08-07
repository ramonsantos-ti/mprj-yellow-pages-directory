
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { History, User, Clock, Edit, Trash2, Plus, Download, FileText, FileSpreadsheet, Shield, AlertTriangle, UserCheck } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuditLog } from '../../types/admin';
import { exportAuditLogsToPDF, exportAuditLogsToXLS } from '../../utils/auditExports';

interface AuditTabProps {
  auditLogs: AuditLog[];
}

const AuditTab: React.FC<AuditTabProps> = ({ auditLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [operationFilter, setOperationFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);

  const getOperationIcon = (operationType: string) => {
    switch (operationType?.toUpperCase()) {
      case 'CREATE': return <Plus className="w-4 h-4 text-green-600" />;
      case 'UPDATE': return <Edit className="w-4 h-4 text-blue-600" />;
      case 'DELETE': return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'LOGIN': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'LOGOUT': return <UserCheck className="w-4 h-4 text-gray-600" />;
      default: return <History className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severityLevel: string) => {
    switch (severityLevel) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-300';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'LOW': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getSeverityIcon = (severityLevel: string) => {
    if (severityLevel === 'CRITICAL' || severityLevel === 'HIGH') {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const formatOperationText = (log: AuditLog) => {
    const operation = log.operationType || log.action;
    switch (operation?.toUpperCase()) {
      case 'CREATE': return 'Criação';
      case 'UPDATE': return 'Atualização';
      case 'DELETE': return 'Exclusão';
      case 'LOGIN': return 'Login';
      case 'LOGOUT': return 'Logout';
      default: return operation || 'Ação';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityType?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesOperation = !operationFilter || operationFilter === 'all' || 
                            (log.operationType || log.action)?.toLowerCase() === operationFilter.toLowerCase();
    
    const matchesSeverity = !severityFilter || severityFilter === 'all' || 
                           (log.severityLevel || 'MEDIUM').toLowerCase() === severityFilter.toLowerCase();
    
    return matchesSearch && matchesOperation && matchesSeverity;
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input 
              placeholder="Buscar por usuário, ação..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={operationFilter} onValueChange={setOperationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por operação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as operações</SelectItem>
                <SelectItem value="CREATE">Criação</SelectItem>
                <SelectItem value="UPDATE">Atualização</SelectItem>
                <SelectItem value="DELETE">Exclusão</SelectItem>
                <SelectItem value="LOGIN">Login</SelectItem>
                <SelectItem value="LOGOUT">Logout</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por severidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as severidades</SelectItem>
                <SelectItem value="CRITICAL">Crítica</SelectItem>
                <SelectItem value="HIGH">Alta</SelectItem>
                <SelectItem value="MEDIUM">Média</SelectItem>
                <SelectItem value="LOW">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-lg max-h-[600px] overflow-y-auto">
            {filteredLogs.length > 0 ? (
              <div className="divide-y">
                <div className="p-3 bg-muted/50 border-b">
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
                  <div key={log.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedLogs.includes(log.id)}
                        onCheckedChange={(checked) => handleSelectLog(log.id, checked as boolean)}
                      />
                      
                      <div className="flex-1 space-y-3">
                        {/* Header com operação e severidade */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getOperationIcon(log.operationType || log.action)}
                            <Badge className={`border ${getSeverityColor(log.severityLevel || 'MEDIUM')}`}>
                              {formatOperationText(log)}
                            </Badge>
                            {getSeverityIcon(log.severityLevel || 'MEDIUM')}
                            <span className="text-sm font-medium text-muted-foreground">
                              {log.entityType}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {log.module || 'Sistema'}
                          </span>
                        </div>
                        
                        {/* Informações principais */}
                        <div className="bg-muted/30 p-3 rounded-md">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-primary" />
                                <span className="font-medium">Executado por:</span>
                                <span className="font-semibold text-primary">{log.user || 'Sistema'}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {format(log.timestamp, "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
                                </span>
                              </div>
                            </div>
                            
                            {/* Detalhes da ação */}
                            <div className="mt-2 p-2 bg-background rounded border-l-4 border-primary/30">
                              <span className="text-foreground">{log.details}</span>
                            </div>
                          </div>
                        </div>
                        
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
                                {log.errorMessage.substring(0, 50)}...
                              </span>
                            )}
                          </div>
                          {log.entityId && (
                            <span className="text-muted-foreground font-mono">
                              ID: {log.entityId.substring(0, 8)}...
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <History className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-lg font-medium">Nenhum log encontrado</p>
                <p className="text-sm">
                  {searchTerm || operationFilter || severityFilter 
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
