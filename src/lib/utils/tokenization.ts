import { PaymentFormData } from '../types';

export const tokenizeCard = (cardData: PaymentFormData): string => {

  const cardInfo = {
    number: cardData.cardNumber.slice(-4), 
    expiry: cardData.expiryDate,
    name: cardData.cardholderName,
  };

 
  const token = btoa(JSON.stringify(cardInfo));
  
  
  const timestamp = Date.now();
  
  const finalToken = `${token}.${timestamp}`;
  
  return finalToken;
}; 