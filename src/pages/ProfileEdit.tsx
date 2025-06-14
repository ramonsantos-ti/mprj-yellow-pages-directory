import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Profile } from '../types';
import { mockProfiles } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { 
  CARGOS, 
  FUNCOES, 
  UNIDADES, 
  CERTIFICACOES,
  NIVEIS_FORMACAO,
  TIPOS_COLABORACAO,
  DISPONIBILIDADE_ESTIMADA,
  FORMAS_CONTATO
} from '../data/constants';

const ProfileEdit: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [fotoPreview, setFotoPreview] = useState('');
  const [name, setName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [biografia, setBiografia] = useState('');
  const [cargo, setCargo] = useState<string[]>([]);
  const [funcao, setFuncao] = useState<string[]>([]);
  const [unidade, setUnidade] = useState<string[]>([]);
  const [formacoes, setFormacoes] = useState([]);
  const [linkCurriculo, setLinkCurriculo] = useState('');
  const [aceiteTermos, setAceiteTermos] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [certificacoes, setCertificacoes] = useState<string[]>([]);
  const [publicacoes, setPublicacoes] = useState('');
  const [tipoColaboracao, setTipoColaboracao] = useState<string[]>([]);
  const [disponibilidadeEstimada, setDisponibilidadeEstimada] = useState('');
  const [formaContato, setFormaContato] = useState('');
  const [horarioPreferencial, setHorarioPreferencial] = useState('');

  // Safe arrays
  const safeCargos = Array.isArray(CARGOS) ? CARGOS : [];
  const safeFuncoes = Array.isArray(FUNCOES) ? FUNCOES : [];
  const safeUnidades = Array.isArray(UNIDADES) ? UNIDADES : [];
  const safeCertificacoes = Array.isArray(CERTIFICACOES) ? CERTIFICACOES : [];
  const safeNiveisFormacao = Array.isArray(NIVEIS_FORMACAO) ? NIVEIS_FORMACAO : [];
  const safeTiposColaboracao = Array.isArray(TIPOS_COLABORACAO) ? TIPOS_COLABORACAO : [];
  const safeDisponibilidadeEstimada = Array.isArray(DISPONIBILIDADE_ESTIMADA) ? DISPONIBILIDADE_ESTIMADA : [];
  const safeFormasContato = Array.isArray(FORMAS_CONTATO) ? FORMAS_CONTATO : [];

  const isValidSelectValue = (value: any): value is string => {
    return typeof value === 'string' && value.trim() !== '';
  };

  // Load profiles from localStorage or use mock data
  useEffect(() => {
    const loadProfiles = () => {
      const savedProfiles = localStorage.getItem('mprj_profiles');
      if (savedProfiles) {
        const parsedProfiles = JSON.parse(savedProfiles);
        console.log('ProfileEdit: Loaded profiles from localStorage:', parsedProfiles.length);
        setProfiles(parsedProfiles);
        
        // Find the current user's profile
        if (user) {
          const userProfile = parsedProfiles.find((p: Profile) => p.userId === user.id);
          setProfile(userProfile || null);
          
          // Populate form with profile data
          if (userProfile) {
            setFotoPreview(userProfile.fotoUrl || '');
            setName(userProfile.name || user.name);
            setMatricula(userProfile.matricula || user.matricula);
            setEmail(userProfile.email || user.username);
            setTelefone(userProfile.telefone || '');
            setBiografia(userProfile.biografia || '');
            setCargo(Array.isArray(userProfile.cargo) ? userProfile.cargo : []);
            setFuncao(Array.isArray(userProfile.funcao) ? userProfile.funcao : []);
            setUnidade(Array.isArray(userProfile.unidade) ? userProfile.unidade : []);
            setFormacoes(Array.isArray(userProfile.formacaoAcademica) ? userProfile.formacaoAcademica : []);
            setLinkCurriculo(userProfile.linkCurriculo || '');
            setAceiteTermos(userProfile.aceiteTermos || false);
            setProjetos(Array.isArray(userProfile.projetos) ? userProfile.projetos : []);
            setCertificacoes(Array.isArray(userProfile.certificacoes) ? userProfile.certificacoes : []);
            setPublicacoes(userProfile.publicacoes || '');
            setTipoColaboracao(Array.isArray(userProfile.disponibilidade?.tipoColaboracao) ? userProfile.disponibilidade.tipoColaboracao : []);
            setDisponibilidadeEstimada(userProfile.disponibilidade?.disponibilidadeEstimada || '');
            setFormaContato(userProfile.contato?.formaContato || '');
            setHorarioPreferencial(userProfile.contato?.horarioPreferencial || '');
          } else {
            // Set default values for new profile
            setName(user.name);
            setMatricula(user.matricula);
            setEmail(user.username);
          }
        }
      } else {
        console.log('ProfileEdit: Using mock profiles');
        setProfiles(mockProfiles);
        
        // Find the current user's profile from mock data
        if (user) {
          const userProfile = mockProfiles.find(p => p.userId === user.id);
          setProfile(userProfile || null);
          
          if (userProfile) {
            // Populate form with mock profile data
            setFotoPreview(userProfile.fotoUrl || '');
            setName(userProfile.name || user.name);
            setMatricula(userProfile.matricula || user.matricula);
            setEmail(userProfile.email || user.username);
            setTelefone(userProfile.telefone || '');
            setBiografia(userProfile.biografia || '');
            setCargo(Array.isArray(userProfile.cargo) ? userProfile.cargo : []);
            setFuncao(Array.isArray(userProfile.funcao) ? userProfile.funcao : []);
            setUnidade(Array.isArray(userProfile.unidade) ? userProfile.unidade : []);
            setFormacoes(Array.isArray(userProfile.formacaoAcademica) ? userProfile.formacaoAcademica : []);
            setLinkCurriculo(userProfile.linkCurriculo || '');
            setAceiteTermos(userProfile.aceiteTermos || false);
            setProjetos(Array.isArray(userProfile.projetos) ? userProfile.projetos : []);
            setCertificacoes(Array.isArray(userProfile.certificacoes) ? userProfile.certificacoes : []);
            setPublicacoes(userProfile.publicacoes || '');
            setTipoColaboracao(Array.isArray(userProfile.disponibilidade?.tipoColaboracao) ? userProfile.disponibilidade.tipoColaboracao : []);
            setDisponibilidadeEstimada(userProfile.disponibilidade?.disponibilidadeEstimada || '');
            setFormaContato(userProfile.contato?.formaContato || '');
            setHorarioPreferencial(userProfile.contato?.horarioPreferencial || '');
          } else {
            // Set default values for new profile
            setName(user.name);
            setMatricula(user.matricula);
            setEmail(user.username);
          }
        }
      }
      setIsLoading(false);
    };

    loadProfiles();

    // Listen for localStorage changes (when admin makes changes)
    const handleStorageChange = () => {
      console.log('ProfileEdit: Storage changed, reloading profiles');
      loadProfiles();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadProfiles, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Carregando perfil...</h2>
      </div>
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    try {
      const updatedProfileData = {
        name,
        matricula,
        email,
        telefone,
        biografia,
        cargo,
        funcao,
        unidade,
        formacaoAcademica: formacoes,
        linkCurriculo,
        aceiteTermos,
        projetos,
        certificacoes,
        publicacoes,
        fotoUrl: fotoPreview,
        disponibilidade: {
          tipoColaboracao,
          disponibilidadeEstimada
        },
        contato: {
          formaContato,
          horarioPreferencial
        }
      };

      let updatedProfiles: Profile[];
      
      if (profile) {
        // Update existing profile
        updatedProfiles = profiles.map(p => 
          p.id === profile.id 
            ? { 
                ...p, 
                ...updatedProfileData, 
                lastUpdated: new Date(),
                // Don't override updatedByAdmin flag when user updates their own profile
                updatedByAdmin: p.updatedByAdmin || false
              } 
            : p
        );
      } else {
        // Create new profile
        const newProfile: Profile = {
          id: Date.now().toString(),
          userId: user.id,
          lastUpdated: new Date(),
          isActive: true,
          updatedByAdmin: false,
          // Default values
          areasConhecimento: [],
          temasInteresse: [],
          experienciasProfissionais: [],
          idiomas: [],
          ...updatedProfileData
        };
        
        updatedProfiles = [...profiles, newProfile];
      }
      
      // Save to localStorage
      localStorage.setItem('mprj_profiles', JSON.stringify(updatedProfiles));
      console.log('ProfileEdit: Profile saved to localStorage');
      
      // Update local state
      setProfiles(updatedProfiles);
      
      // Manually trigger storage event for same-tab updates
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "Perfil salvo com sucesso!",
        description: "Suas informações foram atualizadas.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erro ao salvar perfil",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {profile ? 'Editar Perfil' : 'Criar Perfil'}
        </h1>
        <p className="text-lg text-gray-600">
          {profile ? 'Atualize suas informações profissionais' : 'Complete seu perfil para aparecer nas buscas'}
        </p>
        {profile?.updatedByAdmin && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-800 text-sm font-medium">
              ⚠️ Este perfil foi alterado pelo administrador. Suas próximas alterações irão sobrescrever as modificações administrativas.
            </p>
          </div>
        )}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Photo Upload - keeping existing simplified implementation */}
        <Card>
          <CardHeader>
            <CardTitle>Foto do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-6">
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {fotoPreview ? (
                  <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <span className="text-gray-400">Sem foto</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="foto-upload">
                  <Button type="button" variant="outline" className="cursor-pointer" asChild>
                    <span>Fazer Upload de Foto</span>
                  </Button>
                </label>
                <input
                  id="foto-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button 
            type="button"
            onClick={handleSubmit}
            size="lg"
            className="bg-red-900 hover:bg-red-800 text-white px-8"
          >
            {profile ? 'Atualizar Perfil' : 'Criar Perfil'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
