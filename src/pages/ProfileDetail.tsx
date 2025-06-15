import React from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import ProfileDetailView from '../components/profile-detail/ProfileDetailView';
import ProfileEditForm from './ProfileEditForm';

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // Se estivermos em /profile/:id?edit=1 e o usuário for admin, mostramos o formulário de edição para esse perfil.
  // Se estivermos em /profile, mostramos o formulário do usuário logado.
  // Em outras situações, mostra somente visualização.

  const isEditMode = Boolean(searchParams.get("edit") === "1");
  const profileId = id;

  // Se estiver sem id, estamos no perfil do usuário logado (edição dele mesmo)
  if (!profileId) {
    return <ProfileEditForm />;
  }

  // Caso contrário, estamos em outro perfil:
  // Se edit=1 na query e o usuário for admin, mostrar formulário de edição apontando para esse profileId
  // Caso contrário, só visualização

  // (Aqui você pode criar um novo ProfileEditForm que aceite profileId para editar outro usuário; nesta implementação base estamos só diferenciando, ajuste conforme componentes reais.)

  if (isEditMode && user?.role === 'admin') {
    // TODO: Crie/ajuste um ProfileEditForm que aceite profileId como prop para editar outro usuário
    return <ProfileEditForm profileId={profileId} isAdminEdit />;
  }

  // Visualização apenas
  return <ProfileDetailView profileId={profileId} />;
};

export default ProfileDetail;
