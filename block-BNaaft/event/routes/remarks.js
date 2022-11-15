var express=require('express');
var router=express.Router();

var Event=require('../models/event');
var Remark=require('../models/remark');

router.get('/:id/edit',(req,res,next)=>{
  var id=req.params.id;
  Remark.findById(id,(err,remark)=>{
    if(err) return next(err)
    res.render('updateRemark',{remark:remark})
  })
})
router.post('/:id',(req,res,next)=>{
  var id=req.params.id;
  Remark.findByIdAndUpdate(id,req.body,(err,updatedReamrk)=>{
      if(err) return next (err)
      res.redirect('/events/' + updatedReamrk.eventId);
  })
})
router.get('/:id/delete',(req,res,next)=>{
   var remarkId=req.params.id;
   Remark.findByIdAndDelete(remarkId,(err,remark)=>{
     if(err) return next(err)
     Event.findByIdAndUpdate(remark.eventId,{$pull:{remarks:remark.id}},(err,event)=>{
       res.redirect('/events/' + remark.eventId)
     })
   })
})

module.exports=router;