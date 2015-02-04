
/// <reference path='vectorBase.ts' />


module mshell
{
    export class Vector3 extends VectorBase<Vector3> implements INotifyPropertyChanged
    {
        constructor(x: number = null, y: number = null, z: number = null, coordSys: CoordSys = null)
        {
            super(x, y, z, coordSys);   
        }
        
        static fromList(data: List<number>): Vector3
        {
            return new Vector3(data[0], data[1], data[2]);
        }
        
        
        static fromPoint(pt: Point): Vector3
        {
            return new Vector3(pt.x, pt.y, pt.z, pt.coordSys);
        }


        static get empty(): Vector3
        { 
            return new Vector3();
        }


        out(): Vector3
        {
            return new Vector3(this.x + this.coordSys.x, this.coordSys.y - this.y, this.z + this.coordSys.z);
        }
    }
}