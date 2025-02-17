import mongoose from 'mongoose'

const weldingDataSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    weldingMachine: {
        model: {
            type: String,
            required: true
        },
        serial: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        group: {
            type: String,
            required: true
        }
    },
    weldingParameters: {
        current: {
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            },
            avg: {
                type: Number,
                required: true
            }
        },
        voltage: {
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            },
            avg: {
                type: Number,
                required: true
            }
        }

    },
    weldDurationMs: {
        preWeldMs: {
            type: Number,
            required: true
        },
        weldMs: {
            type: Number,
            required: true
        },
        postWeldMs: {
            type: Number,
            required: true
        },
        totalMs: {
            type: Number,
            required: true
        }
    },
    materialConsumption: {
        energyConsumptionAsWh: {
            type: Number,
            required: true
        },
        wireConsumptionInMeters: {
            type: Number,
            required: true
        },
        fillerConsumptionInGrams: {
            type: Number,
            required: true
        },
        gasConsumptionInLiters: {
            type: Number,
            required: true
        }
    }
});

weldingDataSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const WeldingData = mongoose.model('WeldingData', weldingDataSchema)
