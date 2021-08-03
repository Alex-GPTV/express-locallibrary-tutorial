var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return (DateTime.fromJSDate(this.date_of_birth)).toLocaleString(DateTime.DATE_MED) + " - " + ((this.date_of_death) ? ((DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED))) : "present");
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual("formdob")
.get(function () {

    rawDate = "" + this.date_of_birth;

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

AuthorSchema
.virtual("formdod")
.get(function () {

    rawDate = "" + this.date_of_death;

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

/*
AuthorSchema
.virtual("formdate")
.get(function (rawDate) {

    let date = rawDate.slice(rawDate.indexOf(",") + 2);

    switch (rawDate(0, 3)) {
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

    day = rawDate.slice(4, rawDate.indexOf(","));
    date += "-" + ((day.length == 1) ? ("0" + day) : day);

    return date;
});
*/
/*
AuthorSchema
.virtual
.get(function (date) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[Number(date.slice(5, 7)) + 1] + " " + date.slice(8, 10) + ", " + date.slice(0, 4);
});
*/

//Export model
module.exports = mongoose.model('Author', AuthorSchema);