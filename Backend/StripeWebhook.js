import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
//queue (rabbit mq)
// Load environment variables
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.WEBHOOK_SECRET_KEY;
//  app.use(express.json());
 app.use(cors({ origin:  ["http://localhost:3000", "http://localhost:5174"],  methods: ['GET', 'POST'] ,credentials: true,  })); // Specify the frontend URL
 
// Stripe requires the raw body to validate the signature
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed.`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle the event
  console.log('✅ Event received:', event.type);

  switch (event.type) {
    case 'invoice.payment_failed':
      console.log('Payment failed. Add retry or notify user.');
      break;
    case 'invoice.payment_succeeded':
      console.log('Payment succeeded. Fulfill order.');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Start the server
app.listen(6000, () => console.log('Webhook server running at http://localhost:6000'));
