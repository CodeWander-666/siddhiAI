// lib/error-handling.ts
export async function logError(details: { message: string; context?: any; level?: string }) {
  // Log to console (in production you could integrate with Sentry)
  console.error(`[${details.level || 'error'}] ${details.message}`, details.context);
  
  // Optional: log to Supabase job_errors table
  try {
    const { supabase } = await import('./supabase/client');
    await supabase.from('job_errors').insert({
      job_name: 'client_error',
      error_message: details.message,
      error_details: details.context,
    });
  } catch (e) {
    // Silently fail – logging should not break the app
  }
}