const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        minLength: 10,
        maxLength: 10,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})
//hashing the password
userSchema.pre("save", async function (next) {
    //agar password baad me modified kara hai ya phli baar set horha hai tab hi hash hoga
    if (!this.isModified("password")) return;
    try {
        this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
        console.log("error while bcrypting password", error)
        throw error;
    }
})
//comparing the password 
userSchema.methods.comparePassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password)
}
//genrating tokens
userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, { expiresIn: "1h" })
}


const userModel = mongoose.model("User", userSchema)
module.exports = userModel
