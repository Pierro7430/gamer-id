import validator from 'validator';
import { HttpErrors } from '@loopback/rest';

export function validatePassword(password: string) {
  const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{12,}$',
  );

  if (!passwordRegex.test(password)) {
    throw new HttpErrors.BadRequest(
      'Le mot de passe doit contenir au moins 12 caractères, dont 1 majuscule, 1 minuscule, 1 caractère spécial et 1 chiffre.',
    );
  }
}

export function validateEmail(email: string) {
  if (!validator.isEmail(email)) {
    throw new HttpErrors.BadRequest('Adresse e-mail invalide');
  }
}
