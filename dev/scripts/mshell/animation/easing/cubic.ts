module mshell
{
    export class AnimCubic
    {
        static easeIn(t: number, b: number, c: number, d: number): number
        {
            var tc: number = (t/=d)*t*t;
            return b+c*(tc);
        }

        static easeOut(t: number, b: number, c: number, d: number): number
        {
            var ts: number = (t /= d) * t;
            var tc: number = ts * t;
            return b+c*(tc + -3*ts + 3*t);
        }

        static easeInOut(t: number, b: number, c: number, d: number): number
        {
            var ts: number = (t /= d) * t;
            var tc: number = ts * t;
            return b+c*(4*tc + -6*ts + 3*t);
        }
    }
}