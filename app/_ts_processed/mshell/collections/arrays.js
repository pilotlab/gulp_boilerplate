/// <reference path="collections.ts" />
var mshell;
(function (mshell) {
    var arrays = (function () {
        function arrays() {
        }
        /**
        * Returns the position of the first occurrence of the specified item
        * within the specified array.
        * @param {*} array the array in which to search the element.
        * @param {Object} item the element to search.
        * @param {function(Object,Object):boolean=} equalsFunction optional function used to
        * check equality between 2 elements.
        * @return {number} the position of the first occurrence of the specified element
        * within the specified array, or -1 if not found.
        */
        arrays.indexOf = function (array, item, equalsFunction) {
            var equals = equalsFunction || mshell.collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        };

        /**
        * Returns the position of the last occurrence of the specified element
        * within the specified array.
        * @param {*} array the array in which to search the element.
        * @param {Object} item the element to search.
        * @param {function(Object,Object):boolean=} equalsFunction optional function used to
        * check equality between 2 elements.
        * @return {number} the position of the last occurrence of the specified element
        * within the specified array or -1 if not found.
        */
        arrays.lastIndexOf = function (array, item, equalsFunction) {
            var equals = equalsFunction || mshell.collections.defaultEquals;
            var length = array.length;
            for (var i = length - 1; i >= 0; i--) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        };

        /**
        * Returns true if the specified array contains the specified element.
        * @param {*} array the array in which to search the element.
        * @param {Object} item the element to search.
        * @param {function(Object,Object):boolean=} equalsFunction optional function to
        * check equality between 2 elements.
        * @return {boolean} true if the specified array contains the specified element.
        */
        arrays.contains = function (array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        };

        /**
        * Removes the first ocurrence of the specified element from the specified array.
        * @param {*} array the array in which to search element.
        * @param {Object} item the element to search.
        * @param {function(Object,Object):boolean=} equalsFunction optional function to
        * check equality between 2 elements.
        * @return {boolean} true if the array changed after this call.
        */
        arrays.remove = function (array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        };

        /**
        * Returns the number of elements in the specified array equal
        * to the specified object.
        * @param {Array} array the array in which to determine the frequency of the element.
        * @param {Object} item the element whose frequency is to be determined.
        * @param {function(Object,Object):boolean=} equalsFunction optional function used to
        * check equality between 2 elements.
        * @return {number} the number of elements in the specified array
        * equal to the specified object.
        */
        arrays.frequency = function (array, item, equalsFunction) {
            var equals = equalsFunction || mshell.collections.defaultEquals;
            var length = array.length;
            var freq = 0;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    freq++;
                }
            }
            return freq;
        };

        /**
        * Returns true if the two specified arrays are equal to one another.
        * Two arrays are considered equal if both arrays contain the same number
        * of elements, and all corresponding pairs of elements in the two
        * arrays are equal and are in the same order.
        * @param {Array} array1 one array to be tested for equality.
        * @param {Array} array2 the other array to be tested for equality.
        * @param {function(Object,Object):boolean=} equalsFunction optional function used to
        * check equality between elemements in the arrays.
        * @return {boolean} true if the two arrays are equal
        */
        arrays.equals = function (array1, array2, equalsFunction) {
            var equals = equalsFunction || mshell.collections.defaultEquals;

            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        };

        /**
        * Returns shallow a copy of the specified array.
        * @param {*} array the array to copy.
        * @return {Array} a copy of the specified array
        */
        arrays.copy = function (array) {
            return array.concat();
        };

        /**
        * Swaps the elements at the specified positions in the specified array.
        * @param {Array} array The array in which to swap elements.
        * @param {number} i the index of one element to be swapped.
        * @param {number} j the index of the other element to be swapped.
        * @return {boolean} true if the array is defined and the indexes are valid.
        */
        arrays.swap = function (array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        };

        arrays.toString = function (array) {
            return '[' + array.toString() + ']';
        };

        /**
        * Executes the provided function once for each element present in this array
        * starting from index 0 to length - 1.
        * @param {Array} array The array in which to iterate.
        * @param {function(Object):*} callback function to execute, it is
        * invoked with one argument: the element value, to break the iteration you can
        * optionally return false.
        */
        arrays.forEach = function (array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        };
        return arrays;
    })();
    mshell.arrays = arrays;
})(mshell || (mshell = {}));
