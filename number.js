
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
var nmbrSchema = new Schema({
  number: Number,
  message: JSON,
  time: { type: Date, default: Date.now }
});
const Nmbr = mongoose.model("Nmbr", nmbrSchema);

module.exports = {
  get: (where, limit) =>
    new Promise((resolve, reject) => {
      limit = limit || 20;
      where = where || {};
      Nmbr.find(where)
        .limit(limit)
        .exec((err, doc) => (err ? reject(err) : resolve(doc)));
    }),

  create: nmbrObj =>
    new Promise((resolve, reject) => {
      var nmbr = new Nmbr(nmbrObj);
      nmbr
        .save()
        .then(nmbr => resolve(nmbr))
        .catch(e => reject(e));
    }),
  search: (where) =>
    new Promise((resolve, reject) => {
      Nmbr.find(where)
        .exec((err, doc) => (err ? reject(err) : resolve(doc)));
    }),

  update: (update, where) =>
    new Promise((resolve, reject) => {
      Nmbr.where(where).updateOne(update, (err, count) => {
        err ? reject(err) : resolve(count);
      });
    }),
  nmbr: Nmbr
};