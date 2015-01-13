var mongoose = require( 'mongoose' );

module.exports = mongoose.model('Company', {
  CompanyName : {type : String, default: ''},
  RSVInvestment : Number,
  TotalRoundSize : Number
});
