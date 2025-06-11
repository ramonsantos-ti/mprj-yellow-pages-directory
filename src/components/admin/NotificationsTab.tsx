
import React from 'react';
import { Profile } from '../../types';
import { StandardMessage } from '../../types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Plus, Mail } from 'lucide-react';

interface NotificationsTabProps {
  profiles: Profile[];
  standardMessages: StandardMessage[];
  setStandardMessages: React.Dispatch<React.SetStateAction<StandardMessage[]>>;
  newStandardMessage: { title: string; content: string };
  setNewStandardMessage: React.Dispatch<React.SetStateAction<{ title: string; content: string }>>;
  selectedRecipients: string[];
  setSelectedRecipients: React.Dispatch<React.SetStateAction<string[]>>;
  recipientType: string;
  setRecipientType: React.Dispatch<React.SetStateAction<string>>;
  messageSubject: string;
  setMessageSubject: React.Dispatch<React.SetStateAction<string>>;
  messageContent: string;
  setMessageContent: React.Dispatch<React.SetStateAction<string>>;
  sendNotification: () => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({
  profiles,
  standardMessages,
  setStandardMessages,
  newStandardMessage,
  setNewStandardMessage,
  selectedRecipients,
  setSelectedRecipients,
  recipientType,
  setRecipientType,
  messageSubject,
  setMessageSubject,
  messageContent,
  setMessageContent,
  sendNotification
}) => {
  const activeProfiles = profiles.filter(p => p.isActive !== false);
  const inactiveProfiles = profiles.filter(p => p.isActive === false);

  const addStandardMessage = () => {
    if (newStandardMessage.title && newStandardMessage.content) {
      const message: StandardMessage = {
        id: Date.now().toString(),
        ...newStandardMessage
      };
      setStandardMessages(prev => [...prev, message]);
      setNewStandardMessage({ title: '', content: '' });
    }
  };

  const useStandardMessage = (message: StandardMessage) => {
    setMessageSubject(message.title);
    setMessageContent(message.content);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Textos Padrão</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Título do texto padrão"
              value={newStandardMessage.title}
              onChange={(e) => setNewStandardMessage(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="Conteúdo do texto padrão"
              value={newStandardMessage.content}
              onChange={(e) => setNewStandardMessage(prev => ({ ...prev, content: e.target.value }))}
              rows={3}
            />
            <Button onClick={addStandardMessage} className="w-full">
              Adicionar Texto Padrão
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Textos Salvos:</h4>
            {standardMessages.map(message => (
              <div key={message.id} className="border rounded p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{message.title}</h5>
                    <p className="text-xs text-gray-600 mt-1">{message.content}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => useStandardMessage(message)}
                  >
                    Usar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Envio de Notificações</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Destinatário</label>
            <Select value={recipientType} onValueChange={setRecipientType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group">Grupo</SelectItem>
                <SelectItem value="specific">Específicos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {recipientType === 'group' ? (
            <div>
              <label className="block text-sm font-medium mb-2">Grupo de Destinatários</label>
              <Select value={selectedRecipients[0]} onValueChange={(value) => setSelectedRecipients([value])}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar grupo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os usuários ({profiles.length})</SelectItem>
                  <SelectItem value="active">Usuários ativos ({activeProfiles.length})</SelectItem>
                  <SelectItem value="inactive">Usuários inativos ({inactiveProfiles.length})</SelectItem>
                  <SelectItem value="admins">Administradores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">Destinatários Específicos</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar usuários específicos" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.map(profile => (
                    <SelectItem key={profile.id} value={profile.email}>
                      {profile.name} ({profile.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Assunto</label>
            <Input 
              placeholder="Digite o assunto da mensagem" 
              value={messageSubject}
              onChange={(e) => setMessageSubject(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Mensagem</label>
            <Textarea 
              className="resize-none h-32"
              placeholder="Digite sua mensagem aqui..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </div>
          
          <Button 
            className="bg-red-900 hover:bg-red-800 w-full"
            onClick={sendNotification}
            disabled={!messageSubject || !messageContent || selectedRecipients.length === 0}
          >
            <Mail className="w-4 h-4 mr-2" />
            Enviar Notificação
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;
