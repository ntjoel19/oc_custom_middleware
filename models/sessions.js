const mongoose = require("mongoose");

// schéma d'une sauce
const sessionSchema = mongoose.Schema(
    {
        sessions : [
            {
                projectLevel: { type: Number, required: true },
                projectTitle: { type: String, required: true },
                expert: {
                    type: {
                        displayableName: { type: String, required: true },
                        id: { type: Number, required: true },
                        profilePicture: { type: String, required: true },
                        publicId: { type: String, required: true }
                    },
                    required: true
                },
                recipient: {
                    type: {
                        displayableName: { type: String, required: true },
                        id: { type: Number, required: true },
                        profilePicture: { type: String, required: true },
                        publicId: { type: String, required: true }
                    },
                    required: true
                },
                sessionDate: { type: String, required: true },
                lifeCycleStatus: { type: String, required: true },
                status: { type: String, required: true },
                type: { type: String, required: true },
                videoConference: {
                    type: {
                        id: { type: String },
                        recordingReason: { type: String },
                        recordingStatus: { type: String },
                        title: { type: String, default: null },
                    },
                    required: true
                }
            }
        ]
    }

);

module.exports = mongoose.model("session", sessionSchema);