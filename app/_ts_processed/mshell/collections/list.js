/// <reference path="collections.ts" />
/// <reference path="arrays.ts" />
var mshell;
(function (mshell) {
    

    var List = (function () {
        /**
        * Creates an empty Linked List.
        * @class A linked list is a data structure consisting of a group of nodes
        * which together represent a sequence.
        * @constructor
        */
        function List() {
            /**
            * First node in the list
            * @type {Object}
            * @private
            */
            this.firstNode = null;
            /**
            * Last node in the list
            * @type {Object}
            * @private
            */
            this.lastNode = null;
            /**
            * Number of elements in the list
            * @type {number}
            * @private
            */
            this.nElements = 0;
        }
        /**
        * Adds an element to this list.
        * @param {Object} item element to be added.
        * @param {number=} index optional index to add the element. If no index is specified
        * the element is added to the end of this list.
        * @return {boolean} true if the element was added or false if the index is invalid
        * or if the element is undefined.
        */
        List.prototype.add = function (item, index) {
            if (mshell.collections.isUndefined(index)) {
                index = this.nElements;
            }
            if (index < 0 || index > this.nElements || mshell.collections.isUndefined(item)) {
                return false;
            }
            var newNode = this.createNode(item);
            if (this.nElements === 0) {
                // First node in the list.
                this.firstNode = newNode;
                this.lastNode = newNode;
            } else if (index === this.nElements) {
                // Insert at the end.
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            } else if (index === 0) {
                // Change first node.
                newNode.next = this.firstNode;
                this.firstNode = newNode;
            } else {
                var prev = this.nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            this.nElements++;
            return true;
        };

        Object.defineProperty(List.prototype, "first", {
            /**
            * Returns the first element in this list.
            * @return {*} the first element of the list or undefined if the list is
            * empty.
            */
            get: function () {
                if (this.firstNode !== null) {
                    return this.firstNode.element;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(List.prototype, "last", {
            /**
            * Returns the last element in this list.
            * @return {*} the last element in the list or undefined if the list is
            * empty.
            */
            get: function () {
                if (this.lastNode !== null) {
                    return this.lastNode.element;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns the element at the specified position in this list.
        * @param {number} index desired index.
        * @return {*} the element at the given index or undefined if the index is
        * out of bounds.
        */
        List.prototype.elementAtIndex = function (index) {
            var node = this.nodeAtIndex(index);
            if (node === null) {
                return undefined;
            }
            return node.element;
        };

        /**
        * Returns the index in this list of the first occurrence of the
        * specified element, or -1 if the List does not contain this element.
        * <p>If the elements inside this list are
        * not comparable with the === operator a custom equals function should be
        * provided to perform searches, the function must receive two arguments and
        * return true if they are equal, false otherwise. Example:</p>
        *
        * <pre>
        * var petsAreEqualByName = function(pet1, pet2) {
        *  return pet1.name === pet2.name;
        * }
        * </pre>
        * @param {Object} item element to search for.
        * @param {function(Object,Object):boolean=} equalsFunction Optional
        * function used to check if two elements are equal.
        * @return {number} the index in this list of the first occurrence
        * of the specified element, or -1 if this list does not contain the
        * element.
        */
        List.prototype.indexOf = function (item, equalsFunction) {
            var equalsF = equalsFunction || mshell.collections.defaultEquals;
            if (mshell.collections.isUndefined(item)) {
                return -1;
            }
            var currentNode = this.firstNode;
            var index = 0;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index++;
                currentNode = currentNode.next;
            }
            return -1;
        };

        /**
        * Returns true if this list contains the specified element.
        * <p>If the elements inside the list are
        * not comparable with the === operator a custom equals function should be
        * provided to perform searches, the function must receive two arguments and
        * return true if they are equal, false otherwise. Example:</p>
        *
        * <pre>
        * var petsAreEqualByName = function(pet1, pet2) {
        *  return pet1.name === pet2.name;
        * }
        * </pre>
        * @param {Object} item element to search for.
        * @param {function(Object,Object):boolean=} equalsFunction Optional
        * function used to check if two elements are equal.
        * @return {boolean} true if this list contains the specified element, false
        * otherwise.
        */
        List.prototype.contains = function (item, equalsFunction) {
            return (this.indexOf(item, equalsFunction) >= 0);
        };

        /**
        * Removes the first occurrence of the specified element in this list.
        * <p>If the elements inside the list are
        * not comparable with the === operator a custom equals function should be
        * provided to perform searches, the function must receive two arguments and
        * return true if they are equal, false otherwise. Example:</p>
        *
        * <pre>
        * var petsAreEqualByName = function(pet1, pet2) {
        *  return pet1.name === pet2.name;
        * }
        * </pre>
        * @param {Object} item element to be removed from this list, if present.
        * @return {boolean} true if the list contained the specified element.
        */
        List.prototype.remove = function (item, equalsFunction) {
            var equalsF = equalsFunction || mshell.collections.defaultEquals;
            if (this.nElements < 1 || mshell.collections.isUndefined(item)) {
                return false;
            }
            var previous = null;
            var currentNode = this.firstNode;

            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                    } else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    } else {
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    this.nElements--;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        };

        /**
        * Removes all of the elements from this list.
        */
        List.prototype.clear = function () {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        };

        /**
        * Returns true if this list is equal to the given list.
        * Two lists are equal if they have the same elements in the same order.
        * @param {List} other the other list.
        * @param {function(Object,Object):boolean=} equalsFunction optional
        * function used to check if two elements are equal. If the elements in the lists
        * are custom objects you should provide a function, otherwise
        * the === operator is used to check equality between elements.
        * @return {boolean} true if this list is equal to the given list.
        */
        List.prototype.equals = function (other, equalsFunction) {
            var eqF = equalsFunction || mshell.collections.defaultEquals;
            if (!(other instanceof List)) {
                return false;
            }
            if (this.length !== other.length) {
                return false;
            }
            return this.equalsAux(this.firstNode, other.firstNode, eqF);
        };

        /**
        * @private
        */
        List.prototype.equalsAux = function (n1, n2, eqF) {
            while (n1 !== null) {
                if (!eqF(n1.element, n2.element)) {
                    return false;
                }
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        };

        /**
        * Removes the element at the specified position in this list.
        * @param {number} index given index.
        * @return {*} removed element or undefined if the index is out of bounds.
        */
        List.prototype.removeElementAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return undefined;
            }
            var element;
            if (this.nElements === 1) {
                //First node in the list.
                element = this.firstNode.element;
                this.firstNode = null;
                this.lastNode = null;
            } else {
                var previous = this.nodeAtIndex(index - 1);
                if (previous === null) {
                    element = this.firstNode.element;
                    this.firstNode = this.firstNode.next;
                } else if (previous.next === this.lastNode) {
                    element = this.lastNode.element;
                    this.lastNode = previous;
                }
                if (previous !== null) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            this.nElements--;
            return element;
        };

        /**
        * Executes the provided function once for each element present in this list in order.
        * @param {function(Object):*} callback function to execute, it is
        * invoked with one argument: the element value, to break the iteration you can
        * optionally return false.
        */
        List.prototype.forEach = function (callback) {
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        };

        /**
        * Reverses the order of the elements in this linked list (makes the last
        * element first, and the first element last).
        */
        List.prototype.reverse = function () {
            var previous = null;
            var current = this.firstNode;
            var temp = null;
            while (current !== null) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = this.firstNode;
            this.firstNode = this.lastNode;
            this.lastNode = temp;
        };

        /**
        * Returns an array containing all of the elements in this list in proper
        * sequence.
        * @return {Array.<*>} an array containing all of the elements in this list,
        * in proper sequence.
        */
        List.prototype.toArray = function () {
            var array = [];
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                array.push(currentNode.element);
                currentNode = currentNode.next;
            }
            return array;
        };

        Object.defineProperty(List.prototype, "length", {
            /**
            * Returns the number of elements in this list.
            * @return {number} the number of elements in this list.
            */
            get: function () {
                return this.nElements;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(List.prototype, "isEmpty", {
            /**
            * Returns true if this list contains no elements.
            * @return {boolean} true if this list contains no elements.
            */
            get: function () {
                return this.nElements <= 0;
            },
            enumerable: true,
            configurable: true
        });

        List.prototype.toString = function () {
            return mshell.arrays.toString(this.toArray());
        };

        /**
        * @private
        */
        List.prototype.nodeAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return null;
            }
            if (index === (this.nElements - 1)) {
                return this.lastNode;
            }
            var node = this.firstNode;
            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        };

        /**
        * @private
        */
        List.prototype.createNode = function (item) {
            return {
                element: item,
                next: null
            };
        };
        return List;
    })();
    mshell.List = List;
})(mshell || (mshell = {}));
