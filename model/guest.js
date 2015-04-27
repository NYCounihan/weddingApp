var mongoose = require( 'mongoose' );

module.exports = mongoose.model('Guest', {
  GuestName : {type : String, default: ''},
  GuestFirstName : {type : String, default: ''},
  GuestLastName : {type : String, default: ''},
  Email : {type : String, default: ''},
  HotelName : {type : String, default: ''},
  PhoneNumber : {type : String, default: ''},
  FavoriteSong : {type : String, default: ''},
  Notes : {type : String, default: ''},
  GuestsAllowed : {type : Number, default: ''},
  GuestsAttending : {type : Number, default: ''},
  RehearsalAttending : Boolean,
  WeddingAttending : Boolean,
  ReceptionAttending : Boolean,
  Attending : Boolean
});
