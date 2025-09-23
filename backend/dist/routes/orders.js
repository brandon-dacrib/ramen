"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const Order_1 = __importDefault(require("../models/Order"));
const Product_1 = __importDefault(require("../models/Product"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const orderSchema = joi_1.default.object({
    items: joi_1.default.array().items(joi_1.default.object({
        product: joi_1.default.string().required(),
        quantity: joi_1.default.number().min(1).required(),
    })).min(1).required(),
    shippingAddress: joi_1.default.object({
        street: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
        zipCode: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
    }).required(),
});
router.post('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const { error, value } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { items, shippingAddress } = value;
        let total = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await Product_1.default.findById(item.product);
            if (!product) {
                return res.status(400).json({ error: `Product ${item.product} not found` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: `Insufficient stock for ${product.name}. Available: ${product.stock}`
                });
            }
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
            });
            product.stock -= item.quantity;
            await product.save();
        }
        const order = new Order_1.default({
            userId: req.user.userId,
            items: orderItems,
            total,
            shippingAddress,
        });
        await order.save();
        await order.populate('items.product');
        res.status(201).json(order);
    }
    catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/user/:userId', auth_1.authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        if (req.user.role !== 'admin' && req.user.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const orders = await Order_1.default.find({ userId })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id).populate('items.product');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        if (req.user.role !== 'admin' && order.userId.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        res.json(order);
    }
    catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.patch('/:id/status', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const order = await Order_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('items.product');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const orders = await Order_1.default.find()
            .populate('items.product')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=orders.js.map