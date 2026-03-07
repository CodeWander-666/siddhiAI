import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { ContactForm } from '@/components/sections/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with SiddhiAI. Let’s discuss how AI can transform your marketing.',
};

// Fetch site settings on the server
async function getSiteSettings() {
  const supabase = await createClient();
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  if (!tenantId) {
    console.warn('NEXT_PUBLIC_TENANT_ID not set, using default contact info');
    return null;
  }
  const { data, error } = await supabase
    .from('site_settings')
    .select('contact_email, social_links')
    .eq('tenant_id', tenantId)
    .single();
  if (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
  return data;
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  // Fallback values
  const email = settings?.contact_email || 'hello@siddhi.ai';
  // We could also get phone and address from settings if you add columns
  const phone = '+91 98765 43210';
  const address = (
    <>
      123, AI Street, Tech Park<br />
      Bengaluru, Karnataka 560001<br />
      India
    </>
  );

  return (
    <>
      <section className="section-padding bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-animated text-glow">
              Let's Talk
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to grow your business with AI? Reach out and we'll get back to you within 24 hours.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn>
              <div className="glass p-8 rounded-3xl gradient-border">
                <h2 className="text-2xl font-semibold mb-6 text-gradient-primary">Send us a message</h2>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-gradient-accent">Get in Touch</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Office</p>
                        <p className="text-muted-foreground">{address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="h-64 bg-secondary rounded-2xl overflow-hidden gradient-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.976785684889!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}