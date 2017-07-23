let bcrypt = global.variables.bcrypt,
    mongoose = global.variables.mongoose,
    uuid = global.variables.uuid,
    Schema = mongoose.Schema,
    salt_round = 10;

let User = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => {
            return mongoose.Types.ObjectId();
        }
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    cards: {
        type: Schema.Types.Array
    },
    notes: {
        type: Schema.Types.Array
    }
});

User.pre("save", function(next) {
    var user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(salt_round, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (e, hash) => {
            if (e) return next(e);

            user.password = hash;
            next(); 
        });
    });
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

global.User = mongoose.model("user", User);