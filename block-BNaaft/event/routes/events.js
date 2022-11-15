var express = require('express');
var router = express.Router();

var Event=require('../models/event')
var Remark=require('../models/remark');



// add events
router.get('/new',(req,res,next)=>{
  res.render('newEvent')
});

// create Event
router.post('/new',(req,res,next)=>{
  Event.create(req.body,(err,createdEvent)=>{
    if(err) return next(err);
    res.redirect('/events')
  })
})

/* GET users listing. */
router.get('/', (req, res, next) =>{
  // res.send('respond with a resource');
  Event.find({},(err,events)=>{
      if(err) return next(err)
      res.render('eventList',{events:events})
  })

});

// deatils page(1)
// router.get('/:id',(req,res,next)=>{
//   var id=req.params.id;
//   Event.findById(id,(err,event)=>{
//     if(err) return next(err);
//     res.render('eventDetails',{event:event})
//   })
// })

// details(3)
// router.get('/:id',(req,res,next)=>{
//   var id=req.params.id;
//   Event.findById(id,(err,event)=>{
//     if(err) return next(err)
//   Remark.find({eventid:id},(err,remarks)=>{
//     res.render('eventDetails',{event,remarks})
//   })
//   })
// })


// deatils page(2)
router.get('/:id',(req,res,next)=>{
  var id=req.params.id;
  Event.findById(id).populate('remarks').exec((err,event)=>{
    if(err) return next(err)
    res.render('eventDetails',{event})
  })
})


// likes
router.get('/:id/likes',(req,res,next)=>{
  var id = req.params.id;
  Event.findByIdAndUpdate(id,{$inc: {likes: 1}},(err,event)=>{
    if (err) return next(err);
    res.redirect('/events/' + id)
  })
})
// edit
router.get('/:id/edit',(req,res,next)=>{
  var id=req.params.id;
  Event.findById(id,(err,event)=>{
    if(err) return next(err)
    res.render('editEvent',{event})
  })
})
// update edit
router.post('/:id',(req,res,next)=>{
  var id=req.params.id;
  Event.findByIdAndUpdate(id,req.body,(err,updatedEvent)=>{
    if(err) return next(err)
    res.redirect('/events/' + id)
  })
})


// delete
router.get('/:id/delete',(req,res,next)=>{
  var id=req.params.id;
  Event.findByIdAndDelete(id,(err,event)=>{
    if(err) return next(err)
     res.redirect('/events')
  })
})


// add remarks
router.post('/:id/remarks',(req,res,next)=>{
  var eventId=req.params.id;
  req.body.eventId = eventId;
  Remark.create(req.body,(err,remark)=>{
    if(err) return next(err);
    // update event with remarks id into reamrks
    Event.findByIdAndUpdate(eventId,{$push: {remarks: remark._id}},(err,updatedRemark)=>{
      
      if(err) return next (err)
      res.redirect('/events/' + eventId)
    })
  })
})

module.exports = router;
