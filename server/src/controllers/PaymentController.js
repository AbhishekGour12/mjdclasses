
import Razorpay from 'razorpay';
import crypto from 'crypto'
import User from '../model/User.js';
const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY || "rzp_test_RhD1Z5e0jKdmWq",
  key_secret: process.env.RZP_SECRET || "J75TL5ody2B0pUVaBpyRINRC",
});

// Create order
export const createOrder = async (req, res) => {
  const { userId } = req.body;

  const options = {
    amount: 1000 * 100, // ₹1000
    currency: "INR",
    receipt: "receipt_" + Date.now()
  };

  const order = await razorpay.orders.create(options);
  res.json({ order });
};

// Verify payment & update user
export const verifyPayment = async (req, res) => {
  const { order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RZP_SECRET);
  hmac.update(order_id + "|" + razorpay_payment_id);
  const calculatedSignature = hmac.digest("hex");

  if (calculatedSignature === razorpay_signature) {
   const result =  await User.findByIdAndUpdate(userId, { payment: true });
  
    res.json({ success: true, message: "Payment Verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid Signature" });
  }
};
