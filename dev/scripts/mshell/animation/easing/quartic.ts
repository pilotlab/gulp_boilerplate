module mshell
{
    export class AnimQuartic
    {
        static easeIn(t: number, b: number, c: number, d: number): number
        {
            return c * (t /= d) * t * t * t + b;
        }

        static easeOut(t: number, b: number, c: number, d: number): number
        {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        }

        static easeInOut(t: number, b: number, c: number, d: number): number
        {
            if ((t /= d * 0.5) < 1.0) return c * 0.5 * t * t * t * t + b;
            return -c * 0.5 * ((t -= 2) * t * t * t - 2) + b;
        }
    }
}