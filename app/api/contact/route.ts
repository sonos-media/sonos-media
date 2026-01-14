import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Les champs nom, email et message sont requis' },
        { status: 400 }
      );
    }

    // Envoyer l'email
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Utilisez ce domaine en attendant de configurer votre domaine
      to: 'info@sonosmedia.fr',
      subject: `Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Ce message a été envoyé depuis le formulaire de contact de sonosmedia.fr</small></p>
      `,
      replyTo: email, // Pour pouvoir répondre directement
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message', details: error.message },
      { status: 500 }
    );
  }
}
