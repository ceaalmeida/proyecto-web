import { EmailTemplate } from '../../login/create-account/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_Um4sNDiR_63Pn6sqbPGbrUmrwDKdE6jnH');

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['zurita.diego0308@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log(error)
    
    return Response.json({ error }, { status: 500 });
  }
}
