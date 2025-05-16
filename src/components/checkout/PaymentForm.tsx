'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { PaymentFormData } from '@/lib/types';
import Input from '@/components/ui/Input';

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
  disabled?: boolean;
}

export default function PaymentForm({ onSubmit, disabled }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  const validateCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleaned)) {
      return 'Card number must be 16 digits';
    }
    return '';
  };

  const validateExpiryDate = (value: string) => {
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
      return 'Invalid expiry date format (MM/YY)';
    }
    const [month, year] = value.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return 'Card has expired';
    }
    return '';
  };

  const validateCVV = (value: string) => {
    if (!/^\d{3,4}$/.test(value)) {
      return 'CVV must be 3 or 4 digits';
    }
    return '';
  };

  const validateCardholderName = (value: string) => {
    if (value.length < 3) {
      return 'Name must be at least 3 characters';
    }
    if (value.length > 50) {
      return 'Name must be less than 50 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return 'Name can only contain letters and spaces';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substring(0, 5);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<PaymentFormData> = {};
    
    newErrors.cardNumber = validateCardNumber(formData.cardNumber);
    newErrors.expiryDate = validateExpiryDate(formData.expiryDate);
    newErrors.cvv = validateCVV(formData.cvv);
    newErrors.cardholderName = validateCardholderName(formData.cardholderName);

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Payment failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-black mb-2">
          Card Number
        </label>
        <Input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
          disabled={disabled}
          className="w-full"
          error={errors.cardNumber}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-black mb-2">
            Expiry Date
          </label>
          <Input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength={5}
            required
            disabled={disabled}
            className="w-full"
            error={errors.expiryDate}
          />
        </div>
        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-black mb-2">
            CVV
          </label>
          <Input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength={4}
            required
            disabled={disabled}
            className="w-full"
            error={errors.cvv}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cardholderName" className="block text-sm font-medium text-black mb-2">
          Cardholder Name
        </label>
        <Input
          type="text"
          id="cardholderName"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleChange}
          placeholder="Pratik Parmar"
          required
          disabled={disabled}
          className="w-full"
          error={errors.cardholderName}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        Pay Now
      </button>
    </form>
  );
} 