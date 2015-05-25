"use strict";
var cuid = require("cuid");

module.exports.plugin = function (schema, options) {
  var cuidPath, cuidProps;
  options = options || {};

  cuidPath = options.path || "cuid";

  cuidProps = {
    cuidPath: {
      type: String,
      required: true
    }
  };

  if (options.autoIndex === true) {
    cuidProps[cuidPath] = {
      index: {
        unique: true
      }
    };
  }

  schema.add(cuidProps);

  schema.pre("validate", function(next) {
    if (this.isNew) {
      this[cuidPath] = options.slug === true ? cuid.slug() : cuid();
    }
    next();
  });
}
