


export const validation = (schema) => {
    return (req, res, next) => {
        let validationErrors = []
        for (const key of Object.keys(schema)) {
            const validationError = schema[key].validate(req[key], { abortEarly: false })
            if (validationError?.error) {
                validationErrors.push(validationError.error.details);
            }
        }
        if (validationErrors.length > 0) {
            // return next(new Error("Validation Error",validationErrors,{cause:400}))
            return res.status(400).json({ msg: "Validation Error", errors: validationErrors });
        }
        next()
    }
}