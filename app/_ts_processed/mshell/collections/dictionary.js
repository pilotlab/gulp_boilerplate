/// <reference path="collections.ts" />
var mshell;
(function (mshell) {
    

    var Dictionary = (function () {
        /**
        * Creates an empty dictionary.
        * @class <p>Dictionaries map keys to values; each key can map to at most one value.
        * This implementation accepts any kind of objects as keys.</p>
        *
        * <p>If the keys are custom objects a function which converts keys to unique
        * strings must be provided. Example:</p>
        * <pre>
        * function petToString(pet) {
        *  return pet.name;
        * }
        * </pre>
        * @constructor
        * @param {function(Object):string=} toStrFunction optional function used
        * to convert keys to strings. If the keys aren't strings or if toString()
        * is not appropriate, a custom function which receives a key and returns a
        * unique string must be provided.
        */
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || mshell.collections.defaultToString;
        }
        /**
        * Returns the value to which this dictionary maps the specified key.
        * Returns undefined if this dictionary contains no mapping for this key.
        * @param {Object} key key whose associated value is to be returned.
        * @return {*} the value to which this dictionary maps the specified key or
        * undefined if the map contains no mapping for this key.
        */
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table[this.toStr(key)];
            if (mshell.collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };

        /**
        * Associates the specified value with the specified key in this dictionary.
        * If the dictionary previously contained a mapping for this key, the old
        * value is replaced by the specified value.
        * @param {Object} key key with which the specified value is to be
        * associated.
        * @param {Object} value value to be associated with the specified key.
        * @return {*} previous value associated with the specified key, or undefined if
        * there was no mapping for the key or if the key/value are undefined.
        */
        Dictionary.prototype.setValue = function (key, value) {
            if (mshell.collections.isUndefined(key) || mshell.collections.isUndefined(value)) {
                return undefined;
            }

            var ret;
            var k = this.toStr(key);
            var previousElement = this.table[k];
            if (mshell.collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            } else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };

        /**
        * Removes the mapping for this key from this dictionary if it is present.
        * @param {Object} key key whose mapping is to be removed from the
        * dictionary.
        * @return {*} previous value associated with specified key, or undefined if
        * there was no mapping for key.
        */
        Dictionary.prototype.remove = function (key) {
            var k = this.toStr(key);
            var previousElement = this.table[k];
            if (!mshell.collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };

        Object.defineProperty(Dictionary.prototype, "keys", {
            /**
            * Returns an array containing all of the keys in this dictionary.
            * @return {Array} an array containing all of the keys in this dictionary.
            */
            get: function () {
                var array = [];
                for (var name in this.table) {
                    if (this.table.hasOwnProperty(name)) {
                        var pair = this.table[name];
                        array.push(pair.key);
                    }
                }
                return array;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Dictionary.prototype, "values", {
            /**
            * Returns an array containing all of the values in this dictionary.
            * @return {Array} an array containing all of the values in this dictionary.
            */
            get: function () {
                var array = [];
                for (var name in this.table) {
                    if (this.table.hasOwnProperty(name)) {
                        var pair = this.table[name];
                        array.push(pair.value);
                    }
                }
                return array;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        Dictionary.prototype.forEach = function (callback) {
            for (var name in this.table) {
                if (this.table.hasOwnProperty(name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };

        /**
        * Returns true if this dictionary contains a mapping for the specified key.
        * @param {Object} key key whose presence in this dictionary is to be
        * tested.
        * @return {boolean} true if this dictionary contains a mapping for the
        * specified key.
        */
        Dictionary.prototype.containsKey = function (key) {
            return !mshell.collections.isUndefined(this.getValue(key));
        };

        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };

        Object.defineProperty(Dictionary.prototype, "length", {
            /**
            * Returns the number of keys in this dictionary.
            * @return {number} the number of key-value mappings in this dictionary.
            */
            get: function () {
                return this.nElements;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Dictionary.prototype, "isEmpty", {
            /**
            * Returns true if this dictionary contains no mappings.
            * @return {boolean} true if this dictionary contains no mappings.
            */
            get: function () {
                return this.nElements <= 0;
            },
            enumerable: true,
            configurable: true
        });

        Dictionary.prototype.toString = function () {
            var toret = "{";
            this.forEach(function (k, v) {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        };
        return Dictionary;
    })();
    mshell.Dictionary = Dictionary;
})(mshell || (mshell = {}));
