var mongoose = require( 'mongoose' ),
    Guest = mongoose.model('Guest');

exports.create = function(GuestDetail, cb) {
    console.log('mongoose GuestAccess.js 1.3: entered create function');
    
    var fullName = GuestDetail.GuestFirstName + " " + GuestDetail.GuestLastName;
    var obj = [{GuestFirstName : GuestDetail.GuestFirstName, GuestLastName : GuestDetail.GuestLastName, GuestName : fullName}];
    console.log ('about to create' + obj);

    Guest.create({ guestNames : obj }, function(err) { 
      if (err) {
        console.log('GuestAccess.js 1.3: create function error ' + err); 
      }
      else {
        cb("success");
      } 
    });
};

exports.read = function(strName, cb) {
    console.log("mongoose GuestAccess.js : reading " + strName);
    // var query = Guest.findOne({GuestName: strName}).select({GuestName: strName, RSVInvestment : true, TotalRoundSize : true, _id : false});
    var query = Guest.findOne({'guestNames.GuestName' : strName});
    
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
    Guest.findOneAndRemove({'guestNames.GuestName': strName}, function (err) {
        if (err) { console.log('error getting Guest: ' + err); }
    });
}

exports.update = function(GuestDetails, cb) {
    console.log('mongoose GuestAccess: entered into update in mongoose Guest schema');
    console.log('updating ' + GuestDetails.guestNames[0].GuestName);

    var updates = GuestDetails;

    for(i=0;i<updates.guestNames.length;i++){
      console.log(updates.guestNames[i].GuestFirstName + " " + updates.guestNames[i].GuestLastName);
      updates.guestNames[i].GuestName = updates.guestNames[i].GuestFirstName + " " + updates.guestNames[i].GuestLastName;
    }

    //updates.updated = true;

    //console.log(updates);

    Guest.findOneAndUpdate({'_id' : GuestDetails._id}, updates, function(err, doc) {
      if (err) {
          console.log('error updating guest in guestAccess.js : ' + err);
          cb(err);
      }
      else {
          doc.Updated = true;
          doc.save( function (err){console.log(doc);});
          cb(true);
      };
    });

}
