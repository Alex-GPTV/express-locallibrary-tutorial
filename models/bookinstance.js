const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

BookInstanceSchema
.virtual("formdb")
.get(function () {

    rawDate = "" + this.due_back;

    let date = (rawDate.slice(rawDate.indexOf(" ", 8), (rawDate.indexOf(" ", 8) + 5))).trim() + "-";

    switch (rawDate.slice(4, 7)) {
      case "Jan":
        date += "01";
        break;
      case "Feb":
        date += "02";
        break;
        case "Mar":
        date += "03";
        break;
      case "Apr":
        date += "04";
        break;
        case "May":
        date += "05";
        break;
      case "Jun":
        date += "06";
        break;
        case "Jul":
        date += "07";
        break;
      case "Aug":
        date += "08";
        break;
        case "Sep":
        date += "09";
        break;
      case "Oct":
        date += "10";
        break;
        case "Nov":
        date += "11";
        break;
      case "Dec":
        date += "12";
        break;
      default:
        date += "Er";
    }

    day = rawDate.slice(8, 10).trim();
    date += "-" + ((day.length == 1) ? ("0" + day) : day);

    return date;
});

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);