# Next.js Payment Gateway UI

A modern checkout page implementation using Next.js, TypeScript, and Tailwind CSS.

## Features

- Dynamic product list with quantity management
- Real-time order summary with tax calculation
- Secure payment form with validation
- Simulated card tokenization
- Responsive design
- TypeScript for type safety
- Form validation using Zod
- Toast notifications for feedback

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- React Hot Toast

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd next-practical
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000/checkout](http://localhost:3000/checkout) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── products/
│   │   │   └── route.ts
│   │   └── checkout/
│   │       └── route.ts
│   ├── checkout/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── checkout/
│   │   ├── ProductList.tsx
│   │   ├── OrderSummary.tsx
│   │   └── PaymentForm.tsx
│   └── ui/
│       └── Input.tsx
├── lib/
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── tokenization.ts
│   └── validation/
│       └── schemas.ts
└── styles/
    └── globals.css
```

## Tokenization Logic

The project implements a simplified tokenization process for demonstration purposes:

1. Card information is collected and validated
2. Only the last 4 digits of the card number are used
3. A base64 encoded token is generated containing:
   - Last 4 digits of card number
   - Expiry date
   - Cardholder name
4. A timestamp is added to make the token unique
5. The final token is logged to the console

Note: This is a simplified simulation. In a production environment, you would:
- Use a secure payment processor (e.g., Stripe)
- Never handle raw card data
- Implement proper encryption
- Follow PCI compliance guidelines

## Known Limitations

- Mock API endpoints for products and checkout
- Simplified tokenization for demonstration
- No persistent storage
- No actual payment processing

## Future Improvements

- Add unit tests
- Implement error boundaries
- Add loading states
- Implement proper payment processing
- Add order history
- Implement user authentication
#   p r a c t i c a l - o n e - s t e p - 1 5 - 0 5  
 