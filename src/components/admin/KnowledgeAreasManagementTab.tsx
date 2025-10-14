import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, Eye, EyeOff, Save, X } from 'lucide-react';
import { INTEREST_AREAS, MainInterestArea } from '../../data/interestAreas';

interface KnowledgeArea {
  id: string;
  category: string;
  name: string;
  isActive: boolean;
  isSystemDefined: boolean;
}

const KnowledgeAreasManagementTab: React.FC = () => {
  // Converter INTEREST_AREAS para formato editável
  const initialAreas: KnowledgeArea[] = Object.entries(INTEREST_AREAS).flatMap(([category, areas]) =>
    areas.map((area, index) => ({
      id: `${category}-${index}`,
      category,
      name: area,
      isActive: true,
      isSystemDefined: true
    }))
  );

  const [areas, setAreas] = useState<KnowledgeArea[]>(initialAreas);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [newAreaCategory, setNewAreaCategory] = useState<MainInterestArea>('Jurídica');
  const [newAreaName, setNewAreaName] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const categories = Object.keys(INTEREST_AREAS) as MainInterestArea[];

  const handleAddArea = () => {
    if (!newAreaName.trim()) {
      toast.error('Nome da área é obrigatório');
      return;
    }

    const newArea: KnowledgeArea = {
      id: `custom-${Date.now()}`,
      category: newAreaCategory,
      name: newAreaName.trim(),
      isActive: true,
      isSystemDefined: false
    };

    setAreas([...areas, newArea]);
    setNewAreaName('');
    toast.success('Área adicionada com sucesso');
  };

  const handleToggleActive = (id: string) => {
    setAreas(areas.map(area => 
      area.id === id ? { ...area, isActive: !area.isActive } : area
    ));
    toast.success('Status alterado com sucesso');
  };

  const handleStartEdit = (area: KnowledgeArea) => {
    if (area.isSystemDefined) {
      toast.error('Áreas do sistema não podem ser editadas. Desabilite-as se necessário.');
      return;
    }
    setEditingId(area.id);
    setEditingName(area.name);
  };

  const handleSaveEdit = () => {
    if (!editingName.trim()) {
      toast.error('Nome da área é obrigatório');
      return;
    }

    setAreas(areas.map(area => 
      area.id === editingId ? { ...area, name: editingName.trim() } : area
    ));
    setEditingId(null);
    setEditingName('');
    toast.success('Área atualizada com sucesso');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleDelete = (id: string) => {
    const area = areas.find(a => a.id === id);
    if (area?.isSystemDefined) {
      toast.error('Áreas do sistema não podem ser excluídas. Desabilite-as se necessário.');
      return;
    }

    if (confirm('Tem certeza que deseja excluir esta área?')) {
      setAreas(areas.filter(area => area.id !== id));
      toast.success('Área excluída com sucesso');
    }
  };

  const filteredAreas = areas.filter(area => {
    const categoryMatch = filterCategory === 'all' || area.category === filterCategory;
    const statusMatch = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && area.isActive) ||
      (filterStatus === 'inactive' && !area.isActive);
    return categoryMatch && statusMatch;
  });

  const stats = {
    total: areas.length,
    active: areas.filter(a => a.isActive).length,
    inactive: areas.filter(a => !a.isActive).length,
    custom: areas.filter(a => !a.isSystemDefined).length
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Áreas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Áreas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Áreas Inativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Áreas Personalizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.custom}</div>
          </CardContent>
        </Card>
      </div>

      {/* Adicionar Nova Área */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Área de Conhecimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <select
              value={newAreaCategory}
              onChange={(e) => setNewAreaCategory(e.target.value as MainInterestArea)}
              className="flex h-9 w-48 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Input
              placeholder="Nome da área..."
              value={newAreaName}
              onChange={(e) => setNewAreaName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddArea()}
              className="flex-1"
            />
            <Button onClick={handleAddArea}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="flex h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            >
              <option value="all">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="flex h-9 w-48 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            >
              <option value="all">Todos os status</option>
              <option value="active">Apenas ativas</option>
              <option value="inactive">Apenas inativas</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Áreas */}
      <Card>
        <CardHeader>
          <CardTitle>Áreas de Conhecimento ({filteredAreas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredAreas.map(area => (
              <div key={area.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  {editingId === area.id ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button size="sm" onClick={handleSaveEdit}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="font-medium">{area.name}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{area.category}</Badge>
                        {area.isSystemDefined && (
                          <Badge variant="secondary">Sistema</Badge>
                        )}
                        {!area.isSystemDefined && (
                          <Badge variant="default">Personalizada</Badge>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant={area.isActive ? "default" : "outline"}
                    onClick={() => handleToggleActive(area.id)}
                  >
                    {area.isActive ? (
                      <><Eye className="w-4 h-4 mr-1" /> Ativa</>
                    ) : (
                      <><EyeOff className="w-4 h-4 mr-1" /> Inativa</>
                    )}
                  </Button>
                  {!area.isSystemDefined && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStartEdit(area)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(area.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeAreasManagementTab;
