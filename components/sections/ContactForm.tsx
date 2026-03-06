'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { toast } from 'sonner';
import { useState } from 'react';
import { submitContactForm } from '@/lib/actions/contact';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const services = ['AI SEO', 'Programmatic Advertising', 'Content Generation', 'Predictive Analytics', 'Social Media AI', 'Email Marketing AI', 'Other'] as const;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { service: '' },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        toast.success('Message sent!');
        reset();
      } else {
        toast.error(result.error || 'Something went wrong.');
      }
    } catch {
      toast.error('Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
        <Input id="name" {...register('name')} placeholder="Your name" error={!!errors.name} disabled={isSubmitting} />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
        <Input id="email" type="email" {...register('email')} placeholder="you@example.com" error={!!errors.email} disabled={isSubmitting} />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>
      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
        <Input id="company" {...register('company')} placeholder="Your company" disabled={isSubmitting} />
      </div>
      {/* Service */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-2">Service *</label>
        <select id="service" {...register('service')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50" disabled={isSubmitting}>
          <option value="">Select a service</option>
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className="text-sm text-red-500 mt-1">{errors.service.message}</p>}
      </div>
      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
        <Textarea id="message" {...register('message')} placeholder="Tell us about your project..." rows={5} error={!!errors.message} disabled={isSubmitting} />
        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
      </div>
      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <LoadingSpinner /> : 'Send Message'}
      </Button>
    </form>
  );
}