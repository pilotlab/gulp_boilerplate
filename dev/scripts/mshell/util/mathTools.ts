module mshell
{
    export class MathTools
    {
        static getRandomConstrained(min: number, max: number): number
        {
            return (Math.random() * (max - min)) + min;
        }


        static GetRandomIntConstrained(min: number, max: number): number
        {
            return Math.round(MathTools.getRandomConstrained(min, max));
        }


        static convertAngleToRadians(angleInDegrees: number): number
        {
            return ((1.0 / 180.0) * angleInDegrees) * Math.PI;
        }


        static convertAngleToDegrees(angleInRadians: number): number
        {
            return (angleInRadians / Math.PI) / (1.0 / 180.0);
        }


        static getAngle(x: number, y: number): number
        {
            if (x == 0)
            {
                if (y > 0) return Math.PI / 2.0;
                if (y == 0) return 0.0;
                if (y < 0) return Math.PI * 3.0 / 2.0;
            }
            var atan: number = Math.atan(y / x);
            if (x > 0 && y >= 0) return atan;
            if (x > 0 && y < 0) return 2 * Math.PI + atan;
            return Math.PI + atan;
        }


        static getAngleTheta(x: number, y: number): number
        {
            var dx: number;
            var dy: number;
            var ax: number;
            var ay: number;
            var t: number;
            dx = x; 
            ax = Math.abs(dx);
            dy = y; 
            ay = Math.abs(dy);
            t = (ax + ay == 0) ? 0 : dy / (ax + ay);
            if (dx < 0) t = 2 - t; 
            else if (dy < 0) t = 4 + t;
            return t * 90.0;
        }


        /*static isIntersect(PointBase p11, PointBase p12, PointBase p21, PointBase p22): boolean
        {
            return ccw(p11, p12, p21, true) * ccw(p11, p12, p22, true) <= 0
            && ccw(p21, p22, p11, true) * ccw(p21, p22, p12, true) <= 0;
        }
        static ccw(PointBase p0, PointBase p1, PointBase p2, bool plusOneOnZeroDegrees): number
        {
            dx1: number, dx2, dy1, dy2;
            dx1 = p1.x - p0.x; dy1 = p1.y - p0.y;
            dx2 = p2.x - p0.x; dy2 = p2.y - p0.y;
            if (dx1 * dy2 > dy1 * dx2) return 1.0;
            if (dx1 * dy2 < dy1 * dx2) return -1.0;
            if ((dx1 * dx2 < 0) || (dy1 * dy2 < 0)) return -1.0;
            if ((dx1 * dx1 + dy1 * dy1) < (dx2 * dx2 + dy2 * dy2) && plusOneOnZeroDegrees) return 1.0;
            return 0.0;
        }


        static intersectionPoint(PointBase p11, PointBase p12, PointBase p21, PointBase p22): Point
        {
            kx: number = p11.x, ky = p11.y, mx = p21.x, my = p21.y;
            lx: number = (p12.z - p11.x), ly = (p12.y - p11.y), nx = (p22.x - p21.x), ny = (p22.y - p21.y);
            a: number, b;
            if (lx == 0)
            {
              if (nx == 0) return new Point();
              b = (kx - mx) / nx;
            }
            else if (ly == 0)
            {
              if (ny == 0) return new Point();
              b = (ky - my) / ny;
            }
            else if (nx == 0)
            {
              if (lx == 0) return new Point();
              a = (mx - kx) / lx;
            }
            else if (ny == 0)
            {
              if (ly == 0) return new Point();
              a = (my - ky) / ly;
            }
            else
            {
              b = (ky + mx * ly / lx - kx * ly / lx - my) / (ny - nx * ly / lx);
            }
            if (!a.isNaN)
            {
              return new Point((kx + a * lx), (ky + a * ly));
            }
            if (!b.isNaN)
            {
              return new Point((mx + b * nx), (my + b * ny));
            }

            throw new Exception("Error in MathTools.intersectionPoint");
        }*/


        /*static intToHexString(n: number): string 
        {
            var hexString: string = "";

            var hex: string = n.toRadixString(16);
            hex = hex.length == 1 ? '0' + hex : hex;
            hexString += hex;

            return hexString;
        }


        static bytesToHexString(list: List<number>): string 
        {
            String hexString = "";

            list.forEach((n) {
              hexString += MathTools.intToHexString(n);
            });

            return hexString;
        }*/
    } // End class
} // End module