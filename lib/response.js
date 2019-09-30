"use strict";

// var data ={
//   success : "true/false",
//   data : {
//     datanya
//   },
//   values : [
//     {

//     }
//   ],
//   message : ""
// }

exports.ok = (values, res, msg) => {
  var data = {
    success: true,
    data: values,
    message: msg
  };
  //console.log(values);
  res.json(data);
  res.end();
};

exports.failed = (values, res, msg) => {
  var data = {
    success: false,
    data: [],
    message: msg
  };

  res.json(data);
  res.end();
};
