
/// <reference path='collections/list.ts' />
/// <reference path='../events.ts' />
/// <reference path='../util/mathTools.ts' />
    
    
module mshell
{
    export class ProxyBase<T> implements INotifyPropertyChanged
    {
        /*
        * Build a new ProxyBase<T> from a List<number>
        * @param {number} [dataIn]
        */
        constructor() 
        {
            this.p_data.add(0);
            this.p_data.add(0);
            this.p_data.add(0);
        }


        propertyChanged: Signal<PropertyChangedEventArgs<any>> = new Signal<PropertyChangedEventArgs<any>>();
   

        /**
        * Global precision for any calculation
        */
        static precision: number = 10;
        static tolerance: number = 0.0001;


        get dataCopy(): List<number>
        {
            //----- Return a copy of the data list, so the actual data list can't be 
            //----- modified directly.
            var d: List<number> = new List<number>();

            for (var i: number = 0; i < this.p_data.length; i++)
            {
                d[i] = this.p_data[i];
            }

            return d;
        }
        p_data: List<number> = new List<number>();


        get isEmpty(): boolean { return this.p_bEmpty; }
        p_bEmpty: boolean = true;


        /**
        * The dimension of the ProxyBase<T>
        */
        get dim(): number { return this.p_data.length; }


        get length(): number { return this.magnitude; }
        get magnitude(): number
        {
           var n: number = 0.0;
            for (var i: number = 0; i < this.p_data.length; i++)
            {
                n += this.p_data[i] * this.p_data[i];
            }

            return Math.sqrt(n);
        }


        copyTo(pt: ProxyBase<T>): ProxyBase<T>
        {
            try
            {
                var ptp_data: List<number> = pt.dataCopy;
                if (ptp_data == null || ptp_data.length != this.p_data.length) 
                {
                    return null;
                }

                for (var i: number = 0; i < this.p_data.length; i++)
                {
                    this.p_data[i] = ptp_data[i];
                }

                return this;
            }
            catch(e)
            {
                console.log('Exception in ProxyBase<T>.copyTo(): ' + e);
            }
        }


        /**
        * Scale all elements by a scalar value s
        */
        scale(s: number): ProxyBase<T>
        {
            for (var i: number = 0; i < this.p_data.length; i++)
            {
                this.p_data[i] *= s;
            }

            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
            return this;
        }  


        abs(): ProxyBase<T>
        {
            for (var i: number = 0; i < this.p_data.length; i++)
            {
                this.p_data[i] = this.p_data[i].abs();
            }

            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
            return this;
        }


        /**
        * Add a constant to all elements of the structure.
        */
        addConstant(c: number): ProxyBase<T>
        {
            for (var i: number = 0; i < this.p_data.length; i++)
            {
                this.p_data[i] += c;
            }

            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
            return this;
        }


        offset(c: number): ProxyBase<T>
        {
            return this.addConstant(c);
        }


        /**
        * Subtract a constant from all elements
        */
        subtractConstant(c: number): ProxyBase<T>
        {
            for (var i: number = 0; i < this.p_data.length; i++)
            {
                this.p_data[i] -= c;
            }

            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
            return this;
        }


        /**
        * Compares this ProxyBase<T> with another one
        */
        equals(obj: Object): boolean
        {
            if (obj == null) return false;

            var pt: ProxyBase<T> = <ProxyBase<T>>obj;
            var ptp_data: List<number> = pt.dataCopy;
            if (this.p_data.length != ptp_data.length) return false;

            for (var i: number = 0; i < this.p_data.length; i++)
            {
                if ((this.p_data[i] - Math.abs(ptp_data[i])) > 1e-10) return false;
            }

            return true;
        }


        /**
        * Subtract two ProxyBase<T>
        */
        subtractFrom(pt: ProxyBase<T>): ProxyBase<T>
        {
            var ptp_data: List<number> = pt.dataCopy;
            if (ptp_data == null || ptp_data.length != this.p_data.length) return null;

            for (var i: number = 0; i < this.p_data.length; i++)
            {
                this.p_data[i] -= ptp_data[i];
            }

            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
            return this;
        }


        /**
        * Add two ProxyBase<T>
        */
        add(pt: ProxyBase<T>): ProxyBase<T>
        {
            var ptp_data: List<number> = pt.dataCopy;
            if (ptp_data.length != this.p_data.length) return null;

            for (var i: number = 0; i < this.p_data.length; i++)
            {
                this.p_data[i] += ptp_data[i];
            }

            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
            return this;
        }


        /*
        * Compare two Points
        */
        compareTo(obj: Object): number
        {
            var a: ProxyBase<T> = this;
            var b: ProxyBase<T> = <ProxyBase<T>>obj;

            var ap_data: List<number> = a.dataCopy;
            var bp_data: List<number> = b.dataCopy;

            if (ap_data.length > bp_data.length) return null;

            var al: number;
            var bl: number;
            al = a.length * a.length;
            bl = b.length * b.length;

            if (al > bl) return 1;
            if (al < bl) return -1;

            for (var i: number = 0; i < ap_data.length; i++)
            {
                if (ap_data[i] > bp_data[i]) return 1;
                if (ap_data[i] < bp_data[i]) return -1;
            }

            return 0;
        }


        /**
        * Convert the ProxyBase<T> into a reconstructable string representation
        * @return {string} A string from which the ProxyBase<T> can be rebuilt.
        */
        toString(): string
        {
            var s: string ='(';
            for (var i: number = 0; i < this.p_data.length; i++)
            {
                s + this.p_data[i].toString();
                if (i < this.p_data.length - 1) s += ', ';
            }
            s += ')';
            return s;
        }
    } // End of class
} // End of module