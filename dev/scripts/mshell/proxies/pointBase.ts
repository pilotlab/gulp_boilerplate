
/// <reference path='proxyBase.ts' />


module mshell
{
    export class PointBase<T> extends ProxyBase<T> implements INotifyPropertyChanged
    {
        constructor(x: number = null, y: number = null, z: number = null, coordSys: CoordSys = null)
        {
            super();
            
            if (x != null) 
            {
              this.p_data[0] = x; 
              this.p_bEmpty = false;
            }
            else this.p_data[0] = 0;

            if (y != null) this.p_data[1] = y; 
            else this.p_data[1] = 0;
            
            if (z != null) this.p_data[2] = z;
            else this.p_data[2] = 0;
            
            if (coordSys != null) this.coordSys = coordSys;
        }


        /*====================================================================*
        START: Properties
        *====================================================================*/
        coordSys: CoordSys = new CoordSys();


        setValues(x: number, y: number = null, z: number = null): PointBase<T> 
        {
            if (x != null) 
            {
                this.p_data[0] = x; 
                this.p_bEmpty = false;
            }
            else return this;

            if (y != null) this.p_data[1] = y;
            if (z != null) this.p_data[2] = z;

            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));

            return this;
        }


        get x(): number { return this.p_data[0]; }
        set x(value: number)
        {
            this.p_data[0] = value; 
            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
        }
        get xInt(): number { return Math.round(this.p_data[0]); }


        get y(): number { return this.p_data[1]; }
        set y(value: number)
        {
            this.p_data[1] = value; 
            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
        }
        get yInt(): number { return Math.round(this.p_data[1]); }


        get z(): number
        {
            if (this.p_data.length > 2) return this.p_data[2];
            else return 0.0;
        }
        set z(value: number)
        { 
            if (this.p_data.length > 2) this.p_data[2] = value; 
            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
        }
        get zInt(): number { return Math.round(this.p_data[2]); }


        /*====================================================================*
        START: Static Methods
        *====================================================================*/
        /**
        * Get the distance between two Points or Vectors
        */
        distance(pt: PointBase<T>): number
        {
            var pt_data: List<number> = pt.dataCopy;

            if (this.p_data.length != pt_data.length) return -1.0;

            var e: number = 0.0;
            var d: number = 0.0;

            for (var i: number = 0; i < this.p_data.length; i++)
            {
                d = (this.p_data[i] - pt_data[i]);
                e += d * d;
            }

            return Math.sqrt(e);
        }


        /*====================================================================*
        START: public Methods
        *====================================================================*/
        rotateX(dAngle: number): PointBase<T>
        {
            dAngle = MathTools.convertAngleToRadians(dAngle);

            var y: number = this.p_data[1];
            var z: number = this.p_data[2];

            this.p_data[1] = (y * Math.cos(dAngle)) - (z * Math.sin(dAngle));
            this.p_data[2] = (z * Math.cos(dAngle)) + (y * Math.sin(dAngle));

            return this;
        }


        rotateY(dAngle: number): PointBase<T>
        {
            dAngle = MathTools.convertAngleToRadians(dAngle);

            var x: number = this.p_data[0];
            var z: number = this.p_data[2];

            this.p_data[0] = (x * Math.cos(dAngle)) + (z * Math.sin(dAngle));
            this.p_data[2] = (z * Math.cos(dAngle)) - (x * Math.sin(dAngle));

            return this;
        }


        rotateZ(dAngle: number): PointBase<T>
        {
            dAngle = MathTools.convertAngleToRadians(dAngle);

            var x: number = this.p_data[0];
            var y: number = this.p_data[1];

            this.p_data[0] = (x * Math.cos(dAngle)) - (y * Math.sin(dAngle));
            this.p_data[1] = (y * Math.cos(dAngle)) + (x * Math.sin(dAngle));

            return this;
        }
    }
}