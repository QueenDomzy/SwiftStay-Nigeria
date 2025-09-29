export const payWithPaystack = (amount: number, email: string) => {
  console.log(`Processing ₦${amount} with Paystack for ${email}`);
};

export const payWithFlutterwave = (amount: number, email: string) => {
  console.log(`Processing ₦${amount} with Flutterwave for ${email}`);
};
