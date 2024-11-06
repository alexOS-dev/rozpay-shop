'use client';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Check, ChevronsUpDown, Circle, Plus } from 'lucide-react';

import { createUpdateProduct } from '@/actions';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { DragAndDropImages } from './DragAndDropImages';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductPreview } from './ProductPreview';
import { Textarea } from '@/components/ui/textarea';
import { TooltipHelper } from '@/components/ui/tooltips';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import type {
  Brand,
  Category,
  Color,
  Condition,
  Product,
  ProductImage as ProductWithImage,
} from '@/interfaces';
import { CreateColorDialog } from './CreateColorDialog';
import { Separator } from '@/components/ui/separator';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  conditions: Condition[];
}

// 1. Define the form schema
const formSchema = z.object({
  id: z.string().optional().nullable(),
  title: z
    .string()
    .min(3, 'Por favor ingrese un título de al menos 3 caracteres')
    .max(255, 'El título no puede superar los 255 caracteres'),
  brandId: z.string().refine((brandId) => brandId !== '', {
    message: 'Por favor seleccione una marca',
  }),
  slug: z
    .string()
    .min(3, 'El slug debe tener al menos 3 caracteres')
    .max(100, 'El slug no puede superar los 100 caracteres ')
    .transform((val) => val.toLowerCase().replace(/\s+/g, '_')),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(700, 'La descripción no puede exceder los 700 caracteres'),
  price: z.coerce
    .number()
    .positive('El precio debe ser mayor a $0')
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0, 'El precio debe ser mayor o igual a 0')
    .transform((val) => Number(val.toFixed(2))),
  tags: z.string().or(z.string().array().optional()),
  categoryId: z.number().refine((categoryId) => categoryId !== 0, {
    message: 'Por favor seleccione una categoría',
  }),
  images: z.instanceof(File).array().optional(),
  colorId: z.string(),
  conditionId: z.string(),
});

export default function ProductForm({
  categories,
  product,
  brands,
  colors,
  conditions,
}: Props) {
  const router = useRouter();
  // 2. Create the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product.id ?? null,
      title: product.title ?? '',
      brandId: product.brandId ?? '',
      slug: product.slug ?? '',
      description: product.description ?? '',
      price: product.price ?? 0,
      inStock: product.inStock ?? 0,
      tags: product.tags ?? [],
      categoryId: product.categoryId ?? 0,
      images: undefined,
      colorId: product.colorId ?? '',
      conditionId: product.conditionId ?? '',
    },
  });

  // 3. Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    const { images, ...productToSave } = values;

    // Append product ID to form data
    // if the product has an ID
    if (values.id) {
      // Append the ID to the form data
      formData.append('id', values.id);
    }

    // Append the rest of the product data to the form data
    formData.append('title', productToSave.title);
    formData.append('brandId', productToSave.brandId);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('tags', productToSave.tags?.toString() ?? '');
    formData.append('colorId', productToSave.colorId.toString());
    formData.append('categoryId', productToSave.categoryId.toString());
    formData.append('conditionId', productToSave.conditionId.toString());

    if (images) {
      for (const image of images) {
        formData.append('images', image);
      }
    }

    const {
      ok,
      message,
      product: updatedProduct,
    } = await createUpdateProduct(formData);

    if (!ok) {
      toast.error('Error al guardar el producto', {
        description: `Hubo un error al guardar el producto: ${message}. Por favor intenta de nuevo`,
      });
      return;
    } else {
      toast.success('Producto guardado', {
        description: 'El producto ha sido guardado exitosamente',
      });
      router.replace(`/admin/product/${updatedProduct?.slug}`);
    }
  };

  const { isSubmitting } = form.formState;
  return (
    <div className='grid md:grid-cols-2 gap-8 px-4 md:px-6 max-w-6xl mx-auto py-12'>
      {/* Images Preview */}
      <div className='grid grid-cols-1'>
        <ProductPreview product={product} />
        <DragAndDropImages />
      </div>

      {/* Form inputs */}
      <Form {...form}>
        <form className='grid gap-6' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder='Título del producto' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid md:grid-cols-2'>
            <FormField
              control={form.control}
              name='brandId'
              render={({ field }) => (
                <FormItem className='flex flex-col col-span-1'>
                  <FormLabel>Marca</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? brands.find((brand) => brand.id === field.value)
                                ?.name
                            : 'Seleccionar Marca'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                      <Command>
                        <CommandInput placeholder='Buscar marca' />
                        <CommandList>
                          <CommandEmpty>No hay marcas.</CommandEmpty>
                          <CommandGroup>
                            {brands.map((brand) => (
                              <CommandItem
                                value={brand.name}
                                key={brand.id}
                                onSelect={() =>
                                  form.setValue('brandId', brand.id!)
                                }
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    brand.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {brand.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Marca del producto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='conditionId'
              render={({ field }) => (
                <FormItem className='flex flex-col col-span-1'>
                  <FormLabel>Condición</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='capitalize'>
                        <SelectValue placeholder='Seleccionar condición' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Seleccione la condición</SelectLabel>
                        {conditions.map((condition) => (
                          <SelectItem
                            key={condition.id}
                            value={condition.id!}
                            className='capitalize'
                          >
                            {condition.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Estado del producto, 'nuevo', 'usado', 'reacondicionado' o
                    'outlet'.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center'>
                  Slug
                  <TooltipHelper tooltipText={'URL legible para el producto'} />
                </FormLabel>
                <FormControl>
                  <Input placeholder='producto-ejemplo-xl' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    className='h-36'
                    placeholder='Descripción del producto...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input placeholder='99.99' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='inStock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock disponible</FormLabel>
                  <FormControl>
                    <Input placeholder='100' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etiquetas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Etiquetas separadas por coma: 'ropa, moda, tendencia'"
                    {...field}
                    // Convert the input value to an array of tags separated by ,
                    onChange={(e) => {
                      const tags = e.target.value.split(',');
                      field.onChange(tags);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        form.setValue('categoryId', parseInt(value))
                      }
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger className='w-full capitalize'>
                        <SelectValue placeholder='Seleccionar categoría' />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id!.toString()}
                            className='capitalize'
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name='colorId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color principal</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'w-[200px] justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? colors.find((color) => color.id === field.value)
                                  ?.name
                              : 'Seleccionar color'}
                            <Circle
                              className='h-4 w-4'
                              style={{
                                fill:
                                  colors.find(
                                    (color) => color.id === field.value
                                  )?.hex || '#000',
                              }}
                            />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Buscar color' />
                          <CommandList>
                            <CommandEmpty>
                              No se encontraron colores.
                              <div className='flex flex-col gap-2'>
                                <Separator className='mt-6' />
                                <CreateColorDialog />
                              </div>
                            </CommandEmpty>
                            <CommandGroup>
                              {colors.map((color) => (
                                <CommandItem
                                  value={color.name}
                                  key={color.id}
                                  onSelect={() =>
                                    form.setValue('colorId', color.id!)
                                  }
                                  className='flex items-center gap-2'
                                >
                                  <Circle
                                    className={cn(
                                      'h-4 w-4',
                                      color.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-90'
                                    )}
                                    style={{ fill: color.hex }}
                                  />
                                  <Label className='text-sm'>
                                    {color.name}
                                  </Label>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormDescription>
                      Color principal del producto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name='images'
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Imágenes</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      multiple
                      type='file'
                      accept='image/png, image/jpeg, image/jpg, image/avif'
                      onChange={(event) =>
                        onChange([...Array.from(event.target.files ?? [])])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-end'>
            <Button type='submit' size='lg' disabled={isSubmitting}>
              Guardar producto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
