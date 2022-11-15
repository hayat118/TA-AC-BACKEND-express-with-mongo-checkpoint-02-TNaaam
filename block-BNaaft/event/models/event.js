var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var eventSchema= new Schema({
  title:{type:String,required:true},
  summary:{type:String},
  host:{type:String},
  start_date:{type:String},
  end_date:{type:String},
  event_category:[{type:String}],
  locations:{type:String},
  likes:{type:Number, default:0},
  remarks:[{type:Schema.Types.ObjectId, ref:"Remark"}]
},{timestamps:true});

var Event=mongoose.model('Event',eventSchema);

module.exports=Event;