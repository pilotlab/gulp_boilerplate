module mshell
{
    export class AnimLinear
    {
        static easeNone(t: number, b: number, c: number, d: number): number
        {
            t /= d;
            return b + c * (t);
        }

        static easeIn(t: number, b: number, c: number, d: number): number
        {
            return c * t / d + b;
        }

        static easeOut(t: number, b: number, c: number, d: number): number
        {
            return c * t / d + b;
        }

        static easeInOut(t: number, b: number, c: number, d: number): number
        {
            return c * t / d + b;
        }
    }
}