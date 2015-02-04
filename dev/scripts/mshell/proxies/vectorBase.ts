
/// <reference path="pointBase.ts" />
/// <reference path="coordSys.ts" />


module mshell
{
    export class VectorBase<T> extends PointBase<VectorBase<T>> implements INotifyPropertyChanged
    {
        constructor(x: number = 0, y: number = 0, z: number = 0, coordSys: CoordSys = null)
        {
            super(x, y, z, coordSys);   
        }


        /*====================================================================*
        START: Methods
        *====================================================================*/
        /**
        * Get the scalar product of two VectorBase<T>
        */
        dot(v: VectorBase<T>): number
        {
            var v_data: List<number> = v.dataCopy;
            if (this.p_data.length != v_data.length) throw new Error('Vectors of different dimensions.');
            var erg: number = 0.0;
            for (var i: number = 0; i < this.p_data.length; i++) erg += this.p_data[i] * v_data[i];

            return erg;
        }


        /**
        * Returns the normalized version of the structure.
        */
        normalize(): VectorBase<T>
        {
            var m: number = this.magnitude;

            if (m <= ProxyBase.tolerance) m = 1.0;

            for (var i: number = 0; i < this.p_data.length; i++)
            {
                this.p_data[i] /= m;
                if (Math.abs(this.p_data[i]) < ProxyBase.tolerance) this.p_data[i] = 0.0;
            }

            this.propertyChanged.dispatch(new PropertyChangedEventArgs<List<number>>('data', this.p_data));
            return this;
        }
    }
}