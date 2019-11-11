
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
var nmbrMsgSchema = new Schema({
  number: Number,
  message: String
});
const NmbrMsg = mongoose.model("NmbrMsg", nmbrMsgSchema);

module.exports = {
  get: (where, limit) =>
    new Promise((resolve, reject) => {
      limit = limit || 20;
      where = where || {};
      NmbrMsg.find(where)
        .limit(limit)
        .exec((err, doc) => (err ? reject(err) : resolve(doc)));
    }),

  create: nmbrMsgObj =>
    new Promise((resolve, reject) => {
      var nmbrMsg = new NmbrMsg(nmbrMsgObj);
      nmbrMsg
        .save()
        .then(nmbrMsg => resolve(nmbrMsg))
        .catch(e => reject(e));
    }),
  search: (where) =>
    new Promise((resolve, reject) => {
      NmbrMsg.find(where)
        .exec((err, doc) => (err ? reject(err) : resolve(doc)));
    }),

  update: (update, where) =>
    new Promise((resolve, reject) => {
      NmbrMsg.where(where).updateOne(update, (err, count) => {
        err ? reject(err) : resolve(count);
      });
    }),
    nmbrMsg:NmbrMsg
};