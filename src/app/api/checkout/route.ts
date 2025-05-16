/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { tokenizeCard } from '@/lib/utils/tokenization';
import { paymentFormSchema } from '@/lib/validation/schemas';
import { PaymentFormData } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const paymentData = body as PaymentFormData;

    const validationResult = paymentFormSchema.safeParse(paymentData);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid payment data',
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const token = tokenizeCard(paymentData);

    return NextResponse.json({
      success: true,
      token,
      message: 'Payment processed successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing the payment',
      },
      { status: 500 }
    );
  }
} 