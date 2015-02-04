// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos

/**
 * @namespace Top level namespace for collections, a TypeScript data structure library.
 */
module mshell 
{
    /**
    * Function signature for comparing
    * <0 means a is smaller
    * = 0 means they are equal
    * >0 means a is larger
    */
    export interface ICompareFunction<T>{
        (a: T, b: T): number;
    }

    /**
    * Function signature for checking equality
    */
    export interface IEqualsFunction<T>{
        (a: T, b: T): boolean;
    }

    /**
    * Function signature for Iterations. Return false to break from loop
    */
    export interface ILoopFunction<T>{
        (a: T): boolean;
    }

    
    export class collections
    {
        constructor() {}
        
        
        /**
         * Default function to compare element order.
         * @function     
         */
        static defaultCompare<T>(a: T, b: T): number {
            if (a < b) {
                return -1;
            } else if (a === b) {
                return 0;
            } else {
                return 1;
            }
        }

        /**
         * Default function to test equality. 
         * @function     
         */
        static defaultEquals<T>(a: T, b: T): boolean {
            return a === b;
        }

        /**
         * Default function to convert an object to a string.
         * @function     
         */
        static defaultToString(item: any): string {
            if (item === null) {
                return 'COLLECTION_NULL';
            } else if (collections.isUndefined(item)) {
                return 'COLLECTION_UNDEFINED';
            } else if (collections.isString(item)) {
                return item;
            } else {
                return item.toString();
            }
        }

        /**
        * Joins all the properies of the object using the provided join string 
        */
        static makeString<T>(item: T, join: string = ","): string {
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
        }

        /**
         * Checks if the given argument is a function.
         * @function     
         */
        static isFunction(func: any): boolean {
            return (typeof func) === 'function';
        }

        /**
         * Checks if the given argument is undefined.
         * @function
         */
        static isUndefined(obj: any): boolean {
            return (typeof obj) === 'undefined';
        }

        /**
         * Checks if the given argument is a string.
         * @function
         */
        static isString(obj: any): boolean {
            return Object.prototype.toString.call(obj) === '[object String]';
        }

        /**
         * Reverses a compare function.
         * @function
         */
        static reverseCompareFunction<T>(compareFunction: ICompareFunction<T>): ICompareFunction<T> {
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
                return function (d: T, v: T) {
                    return compareFunction(d, v) * -1;
                };
            }
        }

        /**
         * Returns an equal function given a compare function.
         * @function
         */
        static compareToEquals<T>(compareFunction: ICompareFunction<T>): IEqualsFunction<T> {
            return function (a: T, b: T) {
                return compareFunction(a, b) === 0;
            };
        }
    }
}// End of module 