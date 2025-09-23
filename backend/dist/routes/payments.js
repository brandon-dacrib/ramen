"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const joi_1 = __importDefault(require("joi"));
const Order_1 = __importDefault(require("../models/Order"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});
const paymentIntentSchema = joi_1.default.object({
    amount: joi_1.default.number().min(50).required(),
    currency: joi_1.default.string().default('usd'),
});
const confirmPaymentSchema = joi_1.default.object({
    paymentIntentId: joi_1.default.string().required(),
    orderId: joi_1.default.string().required(),
});
router.post('/create-intent', auth_1.authenticateToken, async (req, res) => {
    try {
        const { error, value } = paymentIntentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { amount, currency } = value;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId: req.user.userId,
            },
        });
        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        console.error('Create payment intent error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/confirm', auth_1.authenticateToken, async (req, res) => {
    try {
        const { error, value } = confirmPaymentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { paymentIntentId, orderId } = value;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ error: 'Payment not completed' });
        }
        const order = await Order_1.default.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        if (order.userId.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        order.paymentId = paymentIntentId;
        order.status = 'processing';
        await order.save();
        res.json({
            message: 'Payment confirmed successfully',
            order: order
        });
    }
    catch (error) {
        console.error('Confirm payment error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!endpointSecret) {
        return res.status(400).send('Webhook secret not configured');
    }
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment succeeded:', paymentIntent.id);
            break;
        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Payment failed:', failedPayment.id);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
});
exports.default = router;
//# sourceMappingURL=payments.js.map