import {bind, BindingScope, inject} from '@loopback/core';
import nodemailer from 'nodemailer';

@bind({scope: BindingScope.TRANSIENT})
export class EmailService {
  constructor() {}

  async sendMail(to: string, subject: string, html: string) {
    // Configuration pour Nodemailer avec gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Paramètres de l'e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    // Envoyer l'e-mail
    await transporter.sendMail(mailOptions);
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {

    const confirmationLink = `${process.env.APP_URL}/users/verify-email?token=${token}`;

    const emailContent = `
      <h1>Bienvenue sur GamerId</h1>
      <p>Pour confirmer votre adresse e-mail, veuillez cliquer sur le lien suivant:</p>
      <a href="${confirmationLink}">Confirmer mon adresse e-mail</a>
    `;

    await this.sendMail(email, 'Confirmez votre adresse e-mail', emailContent);
  }
}
