import mongoose from 'mongoose';

const SelectionSchema = new mongoose.Schema(
  {
    day: { type: String, required: true }, // haldi | mehendi | wedding | reception
    imgId: { type: String, required: true },
    cat: { type: String, required: true }, // signage | entrance | stage | mandap | haldimehendi | photobooth
    src: { type: String, default: '' }, // path inside server/src/Imgs, e.g. 'Haldi/Entrance/HE1.jpeg'
    note: { type: String, default: '' },
  },
  { _id: false }
);

const ReferenceImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true }, // Cloudinary secure_url
    publicId: { type: String, required: true }, // Cloudinary public_id (needed to delete later)
    note: { type: String, default: '' },
  },
  { _id: false }
);

const PlannerBriefSchema = new mongoose.Schema(
  {
    details: {
      client: { type: String, trim: true },
      partner: { type: String, trim: true },
      date: { type: String, trim: true },
      venue: { type: String, trim: true },
      guests: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
    },
    pkg: { type: String, default: '' }, // package id, e.g. 'gold'

    selections: { type: [SelectionSchema], default: [] },
    references: { type: [ReferenceImageSchema], default: [] },

    status: {
      type: String,
      enum: ['new', 'reviewing', 'quoted', 'booked', 'closed'],
      default: 'new',
    },

    ownerEmailStatus: { type: String, enum: ['sent', 'failed', 'skipped'], default: 'skipped' },
    clientEmailStatus: { type: String, enum: ['sent', 'failed', 'skipped'], default: 'skipped' },
  },
  { timestamps: true }
);

export default mongoose.model('PlannerBrief', PlannerBriefSchema);
