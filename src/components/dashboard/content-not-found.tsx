import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function ContentNotFound() {
  return (
    <Alert variant="destructive">
      <Terminal />
      <AlertTitle>Content not found!</AlertTitle>
      <AlertDescription>Pleace, provide a valid ID</AlertDescription>
    </Alert>
  );
}
