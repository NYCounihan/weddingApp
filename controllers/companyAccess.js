var mongoose = require( 'mongoose' ),
    Company = mongoose.model('Company');

exports.create = function(strName, intInvestment, intTotalRoundSize) {
    console.log('mongoose companyAccess.js : entered create function');
    Company.create({
        CompanyName : strName,
        RSVInvestment: intInvestment,
        TotalRoundSize: intTotalRoundSize},
    
        function(err) { if (err) { console.log(err); } });
};

exports.read = function(strName, cb) {
    console.log("mongoose CompanyAccess.js : reading " + strName);
    // var query = Company.findOne({CompanyName: strName}).select({CompanyName: strName, RSVInvestment : true, TotalRoundSize : true, _id : false});
    var query = Company.findOne({CompanyName: strName});
    
    query.exec(function (err, companies) {
        if (err) {
            console.log('error getting company: ' + err);
        }
        else {
            cb(err, companies);
        }
    });
}

exports.readAll = function(cb) {

    //query with mongoose
    var query = Company.find({}).select({CompanyName : true, RSVInvestment : true, TotalRoundSize : true, _id : false });

    query.exec(function (err, companies) {
        if (err) {
            console.log('error getting company: ' + err);
        }
        else {  
            cb(err, companies);

        }
    });
}

exports.delete = function(strName) {
    console.log('mongoose companyAccess: entered into delete in mongoose company schema');
    Company.findOneAndRemove({CompanyName: strName}, function (err) {
        if (err) { console.log('error getting company: ' + err); }
    });
}

exports.update = function(params) {
    console.log('params is ' + params.RSVInvestment);
    Company.findOne({'CompanyName' : params.CompanyName}, function(err, company) {

            company.RSVInvestment = params.RSVInvestment;  // update the bears info
            company.TotalRoundSize = params.TotalRoundSize;  // update the bears info

            // save the bear
            company.save(function(err) {
                console.log(err)});
            });
}
