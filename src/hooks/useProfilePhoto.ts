
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function useProfilePhoto(setValue?: (name: string, value: any) => void) {
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadFoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `lovable-uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
      if (data && data.publicUrl) {
        setFotoUrl(data.publicUrl);
        setValue && setValue('fotoUrl', data.publicUrl);
      }
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar!",
        description: "Houve um problema ao fazer upload da foto.",
      });
    } finally {
      setUploading(false);
    }
  };

  return { fotoUrl, setFotoUrl, uploading, uploadFoto };
}
