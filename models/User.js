import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', UserSchema);

export default User; // Ekspor model dengan default
