"use strict";

var webpack = require("webpack");

module.exports = {
    "entry": "./src/app/main.js",
    "module": {
        "loaders": [
            {
                "loader": "strict-loader"
            }
        ]
    },
    "output": {
        "filename": "./dist/dist.js",
        "library": "maze"
    },
    "watch": true,
    "watchOptions": {
        "aggregateTimeout": 100
    },
	"plugins": []
};
