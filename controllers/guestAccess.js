var mongoose = require( 'mongoose' ),
    Guest = mongoose.model('Guest');

exports.create = function(GuestDetails) {
    console.log('mongoose GuestAccess.js 1.3: entered create function ' + GuestDetails.GuestFirstName + '' + GuestDetails.GuestLastName );
    Guest.create({
          GuestName : GuestDetails.GuestFirstName + ' ' + GuestDetails.GuestLastName,
          GuestFirstName : GuestDetails.GuestFirstName,
          GuestLastName : GuestDetails.GuestLastName,
          Email : GuestDetails.Email,
          HotelName : GuestDetails.HotelName,
          PhoneNumber : GuestDetails.PhoneNumber,
          FavoriteSong : GuestDetails.Song,
          Notes : GuestDetails.Notes,
          GuestsAllowed : GuestDetails.GuestsAllowed,
          GuestsAttending : GuestDetails.GuestsAttending,
          RehearsalAttending : GuestDetails.RehearsalAttending,
          WeddingAttending : GuestDetails.WeddingAttending,
          ReceptionAttending : GuestDetails.ReceptionAttending,
          Attending : GuestDetails.Attending
        },
    
        function(err) { if (err) { console.log(err); } });
};

exports.read = function(strName, cb) {
    console.log("mongoose GuestAccess.js : reading " + strName);
    // var query = Guest.findOne({GuestName: strName}).select({GuestName: strName, RSVInvestment : true, TotalRoundSize : true, _id : false});
    var query = Guest.findOne({GuestName: strName});
    
    query.exec(function (err, guests) {
        if (err) {
            console.log('error getting Guest: ' + err);
        }
        else {
            console.log('in mongoose schema read : ' + guests);
            cb(err, guests);
        }
    });
}

exports.readAll = function(cb) {
    //query with mongoose
    var query = Guest.find({}).select();

    query.exec(function (err, guests) {
        if (err) {
            console.log('error getting Guest: ' + err);
        }
        else {  
            cb(err, guests);

        }
    });
}

exports.delete = function(strName) {
    console.log('mongoose GuestAccess: entered into delete in mongoose Guest schema');
    console.log('deleting ' + strName);
    Guest.findOneAndRemove({GuestName: strName}, function (err) {
        if (err) { console.log('error getting Guest: ' + err); }
    });
}

exports.update = function(GuestDetails, cb) {
    console.log('mongoose GuestAccess: entered into update in mongoose Guest schema');
    console.log('updating ' + GuestDetails.GuestName);

    var updates = GuestDetails;

    Guest.findOneAndUpdate({'GuestName' : GuestDetails.GuestName}, updates, function(err) {
      if (err) {
          console.log('error updating guest in guestAccess.js : ' + err);
          cb(err);
      }
      else {
          cb(true);
      };
    });


      //if (doc == undefined) {console.log('no name found for update'); return;}

     /* doc.GuestName = GuestDetails.GuestFirstName + ' ' + GuestDetails.GuestLastName;
      doc.GuestFirstName = GuestDetails.GuestFirstName;
      doc.GuestLastName = GuestDetails.GuestLastName;
      doc.Email = GuestDetails.Email;
      doc.HotelName = GuestDetails.HotelName;
      doc.PhoneNumber = GuestDetails.PhoneNumber;
      doc.FavoriteSong = GuestDetails.Song;
      doc.Notes = GuestDetails.Notes;
      doc.GuestsAllowed = GuestDetails.GuestsAllowed;
      doc.GuestsAttending = GuestDetails.GuestsAttending;
      doc.RehearsalAttending = GuestDetails.RehearsalAttending;
      doc.WeddingAttending = GuestDetails.WeddingAttending;
      doc.ReceptionAttending = GuestDetails.ReceptionAttending;
      doc.Attending = GuestDetails.Attending;

      doc.save(function(err) {
        console.log(err)});

    }); */

}
