import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // patient/user ID
  docId: { type: String, required: true }, // doctor ID
  slotDate: { type: String, required: true }, // appointment date
  slotTime: { type: String, required: true }, // appointment time
  userData: { type: Object, required: true }, // snapshot of user info
  docData: { type: Object, required: true }, // snapshot of doctor info
  amount: { type: Number, required: true }, // fee charged
  date: { type: Number, required: true }, // booking timestamp
  cancelled: { type: Boolean, default: false }, // cancellation flag
  payment: { type: Boolean, default: false }, // payment status
  isCompleted: { type: Boolean, default: false }, // completion status
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
