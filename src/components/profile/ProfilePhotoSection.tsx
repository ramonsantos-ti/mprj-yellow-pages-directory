
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface ProfilePhotoSectionProps {
  fotoUrl: string | null;
  uploading: boolean;
  userName?: string;
  uploadFoto: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({
  fotoUrl,
  uploading,
  userName,
  uploadFoto,
}) => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <Avatar className="w-32 h-32">
      {fotoUrl ? (
        <AvatarImage src={fotoUrl} alt="Foto de Perfil" />
      ) : (
        <AvatarFallback>{userName?.substring(0, 2).toUpperCase()}</AvatarFallback>
      )}
    </Avatar>
    <div>
      <Label htmlFor="foto" className="text-sm font-medium text-gray-900">
        Atualizar Foto
      </Label>
      <Input
        id="foto"
        type="file"
        accept="image/*"
        onChange={uploadFoto}
        disabled={uploading}
        className="mt-2"
      />
      {uploading && <Loader2 className="w-4 h-4 animate-spin mt-2" />}
    </div>
  </div>
);

export default ProfilePhotoSection;
