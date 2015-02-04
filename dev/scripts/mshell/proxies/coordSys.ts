
/// <reference path='proxyBase.ts' />
/// <reference path='pointBase.ts' />


module mshell
{
    /**
    * A Simple 3D Cartesian Coordinate System.
    */
    export class CoordSys extends ProxyBase<CoordSys> implements INotifyPropertyChanged
    {
        /*====================================================================*
          START: Constructor
         *====================================================================*/
        CoordSys(x: number = 0, y: number = 0, z: number = 0)
        {
            if (x != null) 
            {
                this.p_data[0] = x; 
                this.p_bEmpty = false;
            }

            if (y != null) this.p_data[1] = y; 
            if (z != null) this.p_data[2] = z;
        }

       /*CoordSys.fromList(List<num> dataIn) : super.fromList(dataIn) { }
        CoordSys.fromPoint(PointBase pt)
        { 
            this.copyTo(pt);
        }
        CoordSys.fromString(String s) : super.fromString(s) {}*/


        static empty: CoordSys = new CoordSys();


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


        /**
        * Return a CSPoint from screen coordinates
        */
        getPointFromScreenCoordinates(x: number, y: number, z: number): Point
        {
            return new Point(x - this.x, -1 * (y - this.y), z - this.z, this);
        }
        getPointFromScreenPoint(pt: Point): Point
        {
            return this.getPointFromScreenCoordinates(pt.x, pt.y, pt.z);
        }
    }
}