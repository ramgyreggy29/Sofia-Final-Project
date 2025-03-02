import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login dahulu"});
    }
    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    req.userId = user.id;
    next();
}

export const isAdmin = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login dahulu"});
    }
    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    if(user.role !== "admin") return res.status(403).json({msg: "Akses Dilarang"})
    next();
}