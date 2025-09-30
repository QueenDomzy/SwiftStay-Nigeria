import express from "express";
import axios from "axios";

const router = express.Router();

// ✅ Paystack Payment Init
router.post("/paystack/init", async (req, res) => {
  const { email, amount, bookingId } = req.body;
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { email, amount: amount * 100, callback_url: `${process.env.FRONTEND_URL}/booking-success/${bookingId}` },
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Paystack Webhook
router.post("/paystack/webhook", (req, res) => {
  const event = req.body;
  if (event.event === "charge.success") {
    // TODO: Update booking/payment in DB
    console.log("Paystack Payment Success:", event.data.reference);
  }
  res.sendStatus(200);
});

// ✅ Flutterwave Payment Init
router.post("/flutterwave/init", async (req, res) => {
  const { email, amount, bookingId } = req.body;
  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: bookingId,
        amount,
        currency: "NGN",
        redirect_url: `${process.env.FRONTEND_URL}/booking-success/${bookingId}`,
        customer: { email }
      },
      { headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Flutterwave Webhook
router.post("/flutterwave/webhook", (req, res) => {
  const event = req.body;
  if (event.event === "charge.completed" && event.data.status === "successful") {
    // TODO: Update booking/payment in DB
    console.log("Flutterwave Payment Success:", event.data.tx_ref);
  }
  res.sendStatus(200);
});

export default router;
