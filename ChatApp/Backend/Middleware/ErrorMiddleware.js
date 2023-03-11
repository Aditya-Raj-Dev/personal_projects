const NotFound=(req,res,next)=>{
    const err= new Error(`Not Found - ${req.url}`)
    res.status(404)
    next(err)
}

module.exports={NotFound}