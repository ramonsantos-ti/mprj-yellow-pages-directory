
import React from 'react';
import ProfileEditForm from './ProfileEditForm';

// Agora este arquivo só faz a renderização principal e delega o formulário para outro arquivo.
const ProfileEdit: React.FC = () => {
  return <ProfileEditForm />;
};

export default ProfileEdit;
