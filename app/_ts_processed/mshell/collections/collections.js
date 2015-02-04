// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos
/**
* @namespace Top level namespace for collections, a TypeScript data structure library.
*/
var mshell;
(function (mshell) {
    

    

    

    var collections = (function () {
        function collections() {
        }
        /**
        * Default function to compare element order.
        * @function
        */
        collections.defaultCompare = function (a, b) {
            if (a < b) {
                return -1;
            } else if (a === b) {
                return 0;
            } else {
                return 1;
            }
        };

        /**
        * Default function to test equality.
        * @function
        */
        collections.defaultEquals = function (a, b) {
            return a === b;
        };

        /**
        * Default function to convert an object to a string.
        * @function
        */
        collections.defaultToString = function (item) {
            if (item === null) {
                return 'COLLECTION_NULL';
            } else if (collections.isUndefined(item)) {
                return 'COLLECTION_UNDEFINED';
            } else if (collections.isString(item)) {
                return item;
            } else {
                return item.toString();
            }
        };

        /**
        * Joins all the properies of the object using the provided join string
        */
        collections.makeString = function (item, join) {
            if (typeof join === "undefined") { join = ","; }
            if (item === null) {
                return 'COLLECTION_NULL';
            } else if (collections.isUndefined(item)) {
                return 'COLLECTION_UNDEFINED';
            } else if (collections.isString(item)) {
                return item.toString();
            } else {
                var toret = "{";
                var first = true;
                for (var prop in item) {
                    if (item.hasOwnProperty(prop)) {
                        if (first)
                            first = false;
                        else
                            toret = toret + join;
                        toret = toret + prop + ":" + item[prop];
                    }
                }
                return toret + "}";
            }
        };

        /**
        * Checks if the given argument is a function.
        * @function
        */
        collections.isFunction = function (func) {
            return (typeof func) === 'function';
        };

        /**
        * Checks if the given argument is undefined.
        * @function
        */
        collections.isUndefined = function (obj) {
            return (typeof obj) === 'undefined';
        };

        /**
        * Checks if the given argument is a string.
        * @function
        */
        collections.isString = function (obj) {
            return Object.prototype.toString.call(obj) === '[object String]';
        };

        /**
        * Reverses a compare function.
        * @function
        */
        collections.reverseCompareFunction = function (compareFunction) {
            if (!collections.isFunction(compareFunction)) {
                return function (a, b) {
                    if (a < b) {
                        return 1;
                    } else if (a === b) {
                        return 0;
                    } else {
                        return -1;
                    }
                };
            } else {
                return function (d, v) {
                    return compareFunction(d, v) * -1;
                };
            }
        };

        /**
        * Returns an equal function given a compare function.
        * @function
        */
        collections.compareToEquals = function (compareFunction) {
            return function (a, b) {
                return compareFunction(a, b) === 0;
            };
        };
        return collections;
    })();
    mshell.collections = collections;
})(mshell || (mshell = {})); // End of module
