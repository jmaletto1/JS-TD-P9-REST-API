'use-strict';

// asyncHandler function. This helps cut down on the amount of try/catch blocks required in routes/index.js
exports.asyncHandler = (cb) => {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch(error) {
            next(error);
        }
        }
    }