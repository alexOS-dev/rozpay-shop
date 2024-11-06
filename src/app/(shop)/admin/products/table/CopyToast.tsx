import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Button } from '@/components/ui/button';

interface Props {
  url: string;
  name: string;
}

export const CopyToast = ({ url, name }: Props) => {
  return (
    <CopyToClipboard
      text={url}
      onCopy={() =>
        toast.info('¡Enlace copiado!', {
          description: `Link de ${name} ha sido copiado al portapapeles`,
          duration: 1500,
          richColors: true,
        })
      }
    >
      <Button variant='default' className='h-8 w-8 p-0'>
        <CopyIcon className='h-4 w-4' />
      </Button>
    </CopyToClipboard>
  );
};
