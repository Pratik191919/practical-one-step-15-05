export interface Product {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  description: string;
  image: string;
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  total: number;
}

export interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface CheckoutResponse {
  success: boolean;
  token?: string;
  message: string;
} 