import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Profile } from '../../types';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { X, Plus } from 'lucide-react';
import { CARGOS, FUNCOES, UNIDADES, IDIOMAS } from '../../data/constants';

const adminProfileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  biografia: z.string().optional(),
  especializacoes: z.string().optional(),
  linkCurriculo: z.string().optional(),
  publicacoes: z.string().optional(),
});

type AdminProfileFormData = z.infer<typeof adminProfileSchema>;

interface AdminProfileEditModalProps {
  profile: Profile;
  onSave: (updatedData: Partial<Profile>) => void;
  onCancel: () => void;
}

const AdminProfileEditModal: React.FC<AdminProfileEditModalProps> = ({
  profile,
  onSave,
  onCancel
}) => {
  const [selectedCargos, setSelectedCargos] = useState<string[]>(profile.cargo || []);
  const [selectedFuncoes, setSelectedFuncoes] = useState<string[]>(profile.funcao || []);
  const [selectedUnidades, setSelectedUnidades] = useState<string[]>(profile.unidade || []);
  const [selectedIdiomas, setSelectedIdiomas] = useState<string[]>(profile.idiomas || []);
  const [selectedTemas, setSelectedTemas] = useState<string[]>(profile.temasInteresse || []);
  const [selectedCertificacoes, setSelectedCertificacoes] = useState<string[]>(profile.certificacoes || []);
  const [newTema, setNewTema] = useState('');
  const [newCertificacao, setNewCertificacao] = useState('');

  const form = useForm<AdminProfileFormData>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      telefone: profile.telefone || '',
      biografia: profile.biografia || '',
      especializacoes: profile.especializacoes || '',
      linkCurriculo: profile.linkCurriculo || '',
      publicacoes: profile.publicacoes || '',
    }
  });

  const onSubmit = (data: AdminProfileFormData) => {
    const updatedData: Partial<Profile> = {
      ...data,
      cargo: selectedCargos,
      funcao: selectedFuncoes,
      unidade: selectedUnidades,
      idiomas: selectedIdiomas,
      temasInteresse: selectedTemas,
      certificacoes: selectedCertificacoes,
      lastUpdated: new Date(),
      updatedByAdmin: true,
    };

    onSave(updatedData);
  };

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const addCustomItem = (
    newItem: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
    setNewItem: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (newItem.trim() && !selectedItems.includes(newItem.trim())) {
      setSelectedItems([...selectedItems, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedItems(selectedItems.filter(i => i !== item));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Cargo e Função */}
        <Card>
          <CardHeader>
            <CardTitle>Cargo e Função</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <FormLabel>Cargos</FormLabel>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {CARGOS.map(cargo => (
                  <div key={cargo} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedCargos.includes(cargo)}
                      onCheckedChange={() => toggleSelection(cargo, selectedCargos, setSelectedCargos)}
                    />
                    <span className="text-sm">{cargo}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <FormLabel>Funções</FormLabel>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {FUNCOES.map(funcao => (
                  <div key={funcao} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedFuncoes.includes(funcao)}
                      onCheckedChange={() => toggleSelection(funcao, selectedFuncoes, setSelectedFuncoes)}
                    />
                    <span className="text-sm">{funcao}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unidades */}
        <Card>
          <CardHeader>
            <CardTitle>Unidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {UNIDADES.map(unidade => (
                <div key={unidade} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedUnidades.includes(unidade)}
                    onCheckedChange={() => toggleSelection(unidade, selectedUnidades, setSelectedUnidades)}
                  />
                  <span className="text-sm">{unidade}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Idiomas */}
        <Card>
          <CardHeader>
            <CardTitle>Idiomas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {IDIOMAS.map(idioma => (
                <div key={idioma} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedIdiomas.includes(idioma)}
                    onCheckedChange={() => toggleSelection(idioma, selectedIdiomas, setSelectedIdiomas)}
                  />
                  <span className="text-sm">{idioma}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* TEMAS DE INTERESSE */}
        <Card>
          <CardHeader>
            <CardTitle>Temas de Interesse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Novo tema de interesse"
                value={newTema}
                onChange={(e) => setNewTema(e.target.value)}
              />
              <Button
                type="button"
                onClick={() => addCustomItem(newTema, selectedTemas, setSelectedTemas, setNewTema)}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTemas.map(tema => (
                <Badge key={tema} variant="secondary" className="flex items-center space-x-1">
                  <span>{tema}</span>
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeItem(tema, selectedTemas, setSelectedTemas)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="biografia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografia</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="especializacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especializações</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="linkCurriculo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do Currículo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="publicacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publicações</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Certificações */}
        <Card>
          <CardHeader>
            <CardTitle>Certificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Nova certificação"
                value={newCertificacao}
                onChange={(e) => setNewCertificacao(e.target.value)}
              />
              <Button
                type="button"
                onClick={() => addCustomItem(newCertificacao, selectedCertificacoes, setSelectedCertificacoes, setNewCertificacao)}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCertificacoes.map(cert => (
                <Badge key={cert} variant="secondary" className="flex items-center space-x-1">
                  <span>{cert}</span>
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeItem(cert, selectedCertificacoes, setSelectedCertificacoes)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-red-900 hover:bg-red-800">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminProfileEditModal;
