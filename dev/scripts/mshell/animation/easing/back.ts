module mshell
{
    export class AnimBack
    {
        static easeIn(t: number, b: number, c: number, d: number): number
        {
            return AnimBack.easeInExtended(t, b, c, d, 1.70158);
        }

        static easeInExtended(t: number, b: number, c: number, d: number, s: number): number
        {
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        }

        static easeOut(t: number, b: number, c: number, d: number): number
        {
            return AnimBack.easeOutExtended(t, b, c, d, 1.70158);
        }

        static easeOutExtended(t: number, b: number, c: number, d: number, s: number): number
        {
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        }

        static easeInOut(t: number, b: number, c: number, d: number): number
        {
            return AnimBack.easeInOutExtended(t, b, c, d, 1.70158);
        }

        static easeInOutExtended(t: number, b: number, c: number, d: number, s: number): number
        {
            if ((t /= d * 0.5) < 1) return c * 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;

            return c * 0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    }
}