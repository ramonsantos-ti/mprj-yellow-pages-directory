
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface StatusMessagesProps {
  error: string | null;
  successMessage: string | null;
}

const StatusMessages: React.FC<StatusMessagesProps> = ({ error, successMessage }) => {
  return (
    <>
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {successMessage && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle2 className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default StatusMessages;
