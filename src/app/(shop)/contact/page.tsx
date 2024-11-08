'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Linkedin } from 'lucide-react';
import { titleFont } from '@/config/fonts';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mb-5'>
      {/* Header */}
      <div className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-gray-900'>Contacto</h1>
          <span
            className={`${titleFont.className} antialiased font-bold text-3xl animate-pulse`}
          >
            RozPay
          </span>
          <span className='text-3xl font-bold'>| Shop</span>
        </div>
      </div>

      <main className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Information */}
          <div className='space-y-8'>
            <div className='bg-white rounded-2xl shadow-lg p-8 space-y-6'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                Información de contacto
              </h2>
              <p className='text-gray-600'>
                ¿Tenés preguntas o deseas contactarnos? Estamos para ayudarte.
              </p>

              <div className='space-y-4'>
                <div className='flex items-center space-x-4'>
                  <div className='bg-blue-50 p-3 rounded-full'>
                    <MapPin className='w-6 h-6 text-blue-600' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900'>Dirección</h3>
                    <p className='text-gray-600'>
                      123 Tech Street, Digital City, TC 12345
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='bg-blue-50 p-3 rounded-full'>
                    <Phone className='w-6 h-6 text-blue-600' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900'>Teléfono</h3>
                    <p className='text-gray-600'>+54 (555) 123-4567</p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='bg-blue-50 p-3 rounded-full'>
                    <Mail className='w-6 h-6 text-blue-600' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900'>Email</h3>
                    <p className='text-gray-600'>support@email.com</p>
                  </div>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='bg-blue-50 p-3 rounded-full'>
                    <Clock className='w-6 h-6 text-blue-600' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900'>Horario</h3>
                    <p className='text-gray-600'>
                      Lun-Vier: 9AM - 6PM Argentina
                    </p>
                  </div>
                </div>
              </div>

              <div className='pt-6'>
                <h3 className='font-medium text-gray-900 mb-4'>
                  Nuestras Redes
                </h3>
                <div className='flex space-x-4'>
                  <a
                    href='#'
                    className='text-gray-600 hover:text-blue-600 transition-colors'
                  >
                    <FaFacebook className='w-6 h-6' />
                  </a>
                  <a
                    href='#'
                    className='text-gray-600 hover:text-blue-600 transition-colors'
                  >
                    <FaTwitter className='w-6 h-6' />
                  </a>
                  <a
                    href='#'
                    className='text-gray-600 hover:text-blue-600 transition-colors'
                  >
                    <FaInstagram className='w-6 h-6' />
                  </a>
                  <a
                    href='#'
                    className='text-gray-600 hover:text-blue-600 transition-colors'
                  >
                    <Linkedin className='w-6 h-6' />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className='bg-white rounded-2xl shadow-lg p-8 h-64 relative overflow-hidden'>
              <img
                src='https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600'
                alt='Location Map'
                className='absolute inset-0 w-full h-full object-cover rounded-xl'
              />
              <div className='absolute inset-0 bg-blue-900/10'></div>
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='bg-blue-600 text-white p-3 rounded-full shadow-lg'>
                  <MapPin className='w-6 h-6' />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              Envíanos un mensaje
            </h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <Label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Tu nombre
                </Label>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Correo Electrónico
                </Label>
                <Input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Asunto
                </Label>
                <Input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Mensaje
                </Label>
                <Textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none'
                  required
                ></Textarea>
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium'
              >
                <Send className='w-5 h-5' />
                <span>Enviar Mensaje</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
