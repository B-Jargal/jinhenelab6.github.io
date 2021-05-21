const { response } = require('express');
var Userdb=require('../model/model');

//create and save new user
exports.create=(req,res)=>{
    //
    if(!req.body){
        res.status(400).send({message:"Хоосон байж болохгүй!!!"});
        return;
    }

    //new user
    const user=new Userdb({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    })

    //save user in the db
    user
        .save(user)
        .then(data=>{
            /*res.send(data)*/
            res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Алдаа гарлаа!!!"
            });
        });
}

//retrieve and return all users

exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found user with id" +id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Erro retrieving user with id" +id})
            })
    }else{
        Userdb.find()
            .then(user=>{
                res.send(user)
            })
            .catch(err=>{
                res.status(500).send({message:err.message||"Алдаа гарлаа!!!"})
            })
    }
}

//update new identfied user
exports.update=(req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"Шинэчлэхийн тулд хоосон байж болохгүй!!!"})
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update user with ${id}.Хэрэглэгч олдсонгүй!`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Хэрэглэгчийн мэдээллийг шинэчлэхэд алдаа гарлаа!!!"})
    })
}


exports.delete=(req,res)=>{
    const id=req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Delete with id ${id}.Алдаа!!!`})
            }else{
                res.send({
                    message:"Амжилттай устгагдлаа!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete User with id=" +id
            });
        });
}