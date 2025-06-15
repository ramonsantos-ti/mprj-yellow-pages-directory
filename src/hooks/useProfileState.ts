
import { useState } from 'react';

export const useProfileState = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return {
    successMessage,
    setSuccessMessage,
    showSuccessMessage
  };
};
