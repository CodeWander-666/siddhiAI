'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate
    const validated = contactSchema.parse(formData);

    // Insert into Supabase
    const supabase = await createClient();
    const { error } = await supabase.from('contact_submissions').insert({
      name: validated.name,
      email: validated.email,
      company: validated.company || null,
      service: validated.service,
      message: validated.message,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: 'Database error. Please try again.' };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error('Server action error:', error);
    return { success: false, error: 'Internal server error.' };
  }
}