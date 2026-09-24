import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    eventDate: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true },

    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },

    ownerEmailStatus: { type: String, enum: ['sent', 'failed', 'skipped'], default: 'skipped' },
    clientEmailStatus: { type: String, enum: ['sent', 'failed', 'skipped'], default: 'skipped' },
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', EnquirySchema);
