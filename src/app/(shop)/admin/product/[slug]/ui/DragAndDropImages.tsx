'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { ImageIcon, Upload } from 'lucide-react';

import { Label } from '@/components/ui/label';

const fileTypes = ['JPG', 'PNG', 'WEBP', 'JPEG'];

export const DragAndDropImages = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (fileList: File | FileList) => {
    let newFiles = files;
    if (fileList instanceof FileList) {
      newFiles = [...files, ...Array.from(fileList)];
    } else if (fileList instanceof File) {
      newFiles = [...files, fileList];
    }
    setFiles(newFiles);
    generatePreviews(newFiles);
  };

  const generatePreviews = (files: File[]) => {
    const previewsArray = files
      .filter((file) => file instanceof File)
      .map((file) => URL.createObjectURL(file));
    setPreviews(previewsArray);
    // console.log('Previews generated:', previewsArray);
  };

  return (
    <div className='grid grid-cols-1 mt-4'>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name='file'
        label='Subir imagenes de producto'
        hoverTitle='Arrastra y suelta tus archivos aquí'
        types={fileTypes}
      >
        <div className='flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground bg-muted/20 transition-colors hover:border-primary hover:bg-muted/30'>
          {files.length > 0 ? (
            <div className='flex flex-col items-center gap-2 text-muted-foreground'>
              <ImageIcon className='h-8 w-8' />
              {files.length} archivos a subir
            </div>
          ) : (
            <div className='flex flex-col items-center gap-2 text-muted-foreground'>
              <Upload className='h-8 w-8' />
              <span>
                Arrastra tus archivos aquí o haz click para seleccionar
              </span>
              <span className='text-sm'>
                Formatos permitidos: JPG, PNG, WEBP, JPEG
              </span>
            </div>
          )}
        </div>
      </FileUploader>
      <Label className='mt-2 text-muted-foreground'>
        {files.length > 0
          ? `Archivos: ${files.map((file) => file.name).join(', ')}`
          : 'No se han subido archivos'}
      </Label>
      <div className='mt-4 grid grid-cols-3 gap-4'>
        {previews.map((preview, index) => (
          <div
            key={index}
            className='relative h-32 w-32 overflow-hidden rounded-lg border'
          >
            <Image
              src={preview}
              alt={`Preview ${index}`}
              className='h-full w-full object-cover'
              height={128}
              width={128}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
