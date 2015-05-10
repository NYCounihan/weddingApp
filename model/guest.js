var mongoose = require( 'mongoose' );

var guestNames = new mongoose.Schema({
    GuestName : {type : String, default: ''},
    GuestFirstName : {type : String, default: ''},
    GuestLastName : {type : String, default: ''},
    GuestType : {type : String, default: ''},
    RehearsalAttending : Boolean,
    WeddingAttending : Boolean,
    ReceptionAttending : Boolean,
    NotAttending : Boolean
  });

module.exports = mongoose.model('Guest', {
  guestNames : [guestNames],
  Email : {type : String, default: ''},
  HotelName : {type : String, default: ''},
  PhoneNumber : {type : String, default: ''},
  FavoriteSong : {type : String, default: ''},
  Notes : {type : String, default: ''},
  GuestsAllowed : {type : Number, default: ''},
  GuestsAttending : {type : Number, default: ''},
  Updated : {type : Boolean, default: false},
  HomeAddress : {type : String, default: ''}
});
