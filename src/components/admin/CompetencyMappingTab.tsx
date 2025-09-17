import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { supabase } from '../../integrations/supabase/client';
import { useProfiles } from '../../hooks/useProfiles';
import { INTEREST_AREAS } from '../../data/interestAreas';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Users, 
  Brain, 
  Settings,
  Search,
  Filter
} from 'lucide-react';

interface AdminCompetency {
  id: string;
  name: string;
  category: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

const CompetencyMappingTab: React.FC = () => {
  const { profiles } = useProfiles();
  const { toast } = useToast();
  const [adminCompetencies, setAdminCompetencies] = useState<AdminCompetency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCompetency, setEditingCompetency] = useState<AdminCompetency | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Formulário
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: ''
  });

  // Buscar competências cadastradas pelos usuários
  const activeProfiles = profiles.filter(p => p.isActive !== false);
  const userCompetencies = [...new Set(activeProfiles.flatMap(p => p.temasInteresse || []))]
    .map(competency => ({
      name: competency,
      count: activeProfiles.filter(p => p.temasInteresse?.includes(competency)).length,
      profiles: activeProfiles.filter(p => p.temasInteresse?.includes(competency))
    }))
    .sort((a, b) => b.count - a.count);

  // Carregar competências administrativas
  const loadAdminCompetencies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_competencies')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      setAdminCompetencies(data || []);
    } catch (error) {
      console.error('Erro ao carregar competências:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as competências cadastradas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminCompetencies();
  }, []);

  // Adicionar nova competência
  const handleAddCompetency = async () => {
    if (!formData.name.trim() || !formData.category) {
      toast({
        title: "Erro",
        description: "Nome e categoria são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_competencies')
        .insert([{
          name: formData.name.trim(),
          category: formData.category,
          description: formData.description.trim() || null,
          is_active: true
        }]);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Competência adicionada com sucesso."
      });

      setFormData({ name: '', category: '', description: '' });
      setIsAddDialogOpen(false);
      loadAdminCompetencies();
    } catch (error) {
      console.error('Erro ao adicionar competência:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a competência.",
        variant: "destructive"
      });
    }
  };

  // Editar competência
  const handleEditCompetency = async () => {
    if (!editingCompetency || !formData.name.trim() || !formData.category) {
      toast({
        title: "Erro",
        description: "Nome e categoria são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_competencies')
        .update({
          name: formData.name.trim(),
          category: formData.category,
          description: formData.description.trim() || null
        })
        .eq('id', editingCompetency.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Competência atualizada com sucesso."
      });

      setEditingCompetency(null);
      setFormData({ name: '', category: '', description: '' });
      loadAdminCompetencies();
    } catch (error) {
      console.error('Erro ao atualizar competência:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a competência.",
        variant: "destructive"
      });
    }
  };

  // Remover competência
  const handleRemoveCompetency = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover esta competência?')) return;

    try {
      const { error } = await supabase
        .from('admin_competencies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Competência removida com sucesso."
      });

      loadAdminCompetencies();
    } catch (error) {
      console.error('Erro ao remover competência:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a competência.",
        variant: "destructive"
      });
    }
  };

  // Preparar edição
  const startEdit = (competency: AdminCompetency) => {
    setEditingCompetency(competency);
    setFormData({
      name: competency.name,
      category: competency.category,
      description: competency.description || ''
    });
  };

  // Filtrar competências
  const filteredUserCompetencies = userCompetencies.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdminCompetencies = adminCompetencies.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Object.keys(INTEREST_AREAS);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Mapeamento de Competências</h2>
          <p className="text-muted-foreground">
            Gerencie as competências existentes nos perfis e as áreas cadastradas pelo administrador.
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Competência
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Competência</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Competência</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Direito Digital"
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição da competência..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddCompetency}>
                  Adicionar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar competências..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid com duas colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competências Existentes (dos perfis) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Competências Existentes</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Áreas de interesse informadas pelos usuários nos perfis ({userCompetencies.length} únicas)
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredUserCompetencies.map((competency, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{competency.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {competency.count} {competency.count === 1 ? 'especialista' : 'especialistas'}
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {competency.count}
                  </Badge>
                </div>
              ))}
              {filteredUserCompetencies.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  Nenhuma competência encontrada com os filtros aplicados.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Áreas Cadastradas pelo Admin */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Áreas Cadastradas pelo Admin</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Competências gerenciadas pelos administradores ({adminCompetencies.length} cadastradas)
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredAdminCompetencies.map((competency) => (
                <div key={competency.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{competency.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {competency.category}
                      {competency.description && ` • ${competency.description.substring(0, 50)}...`}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={competency.is_active ? "default" : "secondary"}>
                      {competency.is_active ? "Ativo" : "Inativo"}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(competency)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveCompetency(competency.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredAdminCompetencies.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  Nenhuma competência cadastrada encontrada com os filtros aplicados.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog de Edição */}
      <Dialog open={!!editingCompetency} onOpenChange={() => setEditingCompetency(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Competência</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nome da Competência</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Direito Digital"
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-description">Descrição (opcional)</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição da competência..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingCompetency(null)}>
                Cancelar
              </Button>
              <Button onClick={handleEditCompetency}>
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompetencyMappingTab;