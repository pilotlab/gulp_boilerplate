
/// <reference path='pointBase.ts' />
/// <reference path='../events.ts' />
    
    
module mshell
{
    export class Point extends PointBase<Point> implements INotifyPropertyChanged
    {
        constructor(x: number = null, y: number = null, z: number = null, coordSys: CoordSys = null)
        {
            super(x, y, z, coordSys);   
        }
        
    
        static fromList(data: List<number>): Point
        {
            return new Point(data[0], data[1], data[2]);
        }
        
        
        static fromPoint(pt: Point): Point
        {
            return new Point(pt.x, pt.y, pt.z, pt.coordSys);
        }


        static get empty(): Point
        { 
            return new Point();
        }


        out(): Point
        {
            return new Point(this.x + this.coordSys.x, -1 * (this.coordSys.y + this.y), this.z + this.coordSys.z);
        }
    }
}