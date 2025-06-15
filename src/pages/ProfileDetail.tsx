import React from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import ProfileDetailView from '../components/profile-detail/ProfileDetailView';
import ProfileEditForm from './ProfileEditForm';

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // Edit mode if query param "edit=1"
  const isEditMode = Boolean(searchParams.get("edit") === "1");
  const profileId = id;

  // If no id, show logged-in user's profile for editing
  if (!profileId) {
    return <ProfileEditForm />;
  }

  // If edit=1 and admin, show edit form for specific profile
  if (isEditMode && user?.role === 'admin') {
    return <ProfileEditForm profileId={profileId} isAdminEdit />;
  }

  // Otherwise, view only
  return <ProfileDetailView profileId={profileId} />;
};

export default ProfileDetail;
