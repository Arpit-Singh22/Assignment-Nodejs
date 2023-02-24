const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        currentClass: { type: String, required: true },
        division: { type: Number, required: true }
    }
)

const Student = mongoose.model("initialData", studentSchema)

module.exports = Student