import { z } from 'zod';

export const paymentFormSchema = z.object({
  cardNumber: z
    .string()
    .transform(val => val.replace(/\s/g, ''))
    .pipe(
      z.string()
        .min(16, 'Card number must be 16 digits')
        .max(16, 'Card number must be 16 digits')
        .regex(/^\d+$/, 'Card number must contain only digits')
    ),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date format (MM/YY)'),
  cvv: z
    .string()
    .min(3, 'CVV must be 3 digits')
    .max(4, 'CVV must be 4 digits')
    .regex(/^\d+$/, 'CVV must contain only digits'),
  cardholderName: z
    .string()
    .min(3, 'Cardholder name must be at least 3 characters')
    .max(50, 'Cardholder name must be less than 50 characters'),
}); 