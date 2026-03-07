'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

// Schema with detailed error messages
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(formData: ContactFormData) {
  // Log incoming request for debugging (remove in production)
  console.log('Contact form submission received');

  try {
    // 1. Validate input
    const validated = contactSchema.parse(formData);

    // 2. Optional: add rate limiting here if needed (e.g., via Vercel KV)

    // 3. Insert into Supabase
    const supabase = await createClient();
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: validated.name,
        email: validated.email,
        company: validated.company || null,
        service: validated.service,
        message: validated.message,
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        success: false,
        error: 'We could not save your message. Please try again later.',
      };
    }

    // 4. (Optional) Send email notification via Resend if you have it
    // if (process.env.RESEND_API_KEY) { ... }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return first validation error to user
      return { success: false, error: error.errors[0].message };
    }

    // Unexpected error
    console.error('Unexpected error in submitContactForm:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}