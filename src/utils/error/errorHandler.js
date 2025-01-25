

export const syncHandler = (fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            // return res.status(500).json({msg:"server error",error:err.message,stack:err.stack})
            return next(err)
        })
    }
}

export const globalErrorHandler = (err, req, res, next)=>{
    return res.status( err["cause"] || 500).json({
        message: "Something went wrong",
        error: err.message,
        stack: err.stack
    })
}