
/// <reference path='easing/back.ts' />
/// <reference path='easing/bounce.ts' />
/// <reference path='easing/circular.ts' />
/// <reference path='easing/cubic.ts' />
/// <reference path='easing/elastic.ts' />
/// <reference path='easing/exponential.ts' />
/// <reference path='easing/linear.ts' />
/// <reference path='easing/quadratic.ts' />
/// <reference path='easing/quartic.ts' />
/// <reference path='easing/quintic.ts' />
/// <reference path='easing/sine.ts' />
    
    
module mshell
{
    //----- Resource: http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
    export enum AnimEaseCategory
    {
        LINEAR,
        QUADRATIC,
        CUBIC,
        QUARTIC,
        QUINTIC,
        SINE,
        EXPONENTIAL,
        CIRCULAR,
        ELASTIC,
        BACK,
        BOUNCE
    }


    export enum AnimEaseType
    {
      NONE,
      IN,
      OUT,
      INOUT
    }

    //----- t - the elapsed time.
    //----- b - the starting position. In a one dimensional setting this is the value you would get if t = 0.
    //----- c - the 'change' in position. So if you want to transition from 34 to 56 then c = (56-34) = 13. (more on this later)
    //----- d - duration of the transition. If you want the transition to last, for example, 2 seconds then d= 2.

    export class AnimEase
    {
      static getEasingFunction(easeCategory: AnimEaseCategory, easeType: AnimEaseType): Function
      {
        switch (easeCategory)
        {
          case AnimEaseCategory.LINEAR:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimLinear.easeIn;
              case AnimEaseType.OUT:
                return AnimLinear.easeOut;
              case AnimEaseType.INOUT:
                return AnimLinear.easeInOut;
              case AnimEaseType.NONE:
                return AnimLinear.easeNone;
            }
            break;
          case AnimEaseCategory.QUADRATIC:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimQuadratic.easeIn;
              case AnimEaseType.OUT:
                return AnimQuadratic.easeOut;
              case AnimEaseType.INOUT:
                return AnimQuadratic.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
          case AnimEaseCategory.CUBIC:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimCubic.easeIn;
              case AnimEaseType.OUT:
                return AnimCubic.easeOut;
              case AnimEaseType.INOUT:
                return AnimCubic.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
          case AnimEaseCategory.QUARTIC:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimQuartic.easeIn;
              case AnimEaseType.OUT:
                return AnimQuartic.easeOut;
              case AnimEaseType.INOUT:
                return AnimQuartic.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
          case AnimEaseCategory.QUINTIC:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimQuintic.easeIn;
              case AnimEaseType.OUT:
                return AnimQuintic.easeOut;
              case AnimEaseType.INOUT:
                return AnimQuintic.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
          case AnimEaseCategory.SINE:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimSine.easeIn;
              case AnimEaseType.OUT:
                return AnimSine.easeOut;
              case AnimEaseType.INOUT:
                return AnimSine.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
          case AnimEaseCategory.EXPONENTIAL:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimExponential.easeIn;
              case AnimEaseType.OUT:
                return AnimExponential.easeOut;
              case AnimEaseType.INOUT:
                return AnimExponential.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
          case AnimEaseCategory.CIRCULAR:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimCircular.easeIn;
              case AnimEaseType.OUT:
                return AnimCircular.easeOut;
              case AnimEaseType.INOUT:
                return AnimCircular.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
          case AnimEaseCategory.ELASTIC:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimElastic.easeIn;
              case AnimEaseType.OUT:
                return AnimElastic.easeOut;
              case AnimEaseType.INOUT:
                return AnimElastic.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
          case AnimEaseCategory.BACK:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimBack.easeIn;
              case AnimEaseType.OUT:
                return AnimBack.easeOut;
              case AnimEaseType.INOUT:
                return AnimBack.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
          case AnimEaseCategory.BOUNCE:
            switch (easeType)
            {
              case AnimEaseType.IN:
                return AnimBounce.easeIn;
              case AnimEaseType.OUT:
                return AnimBounce.easeOut;
              case AnimEaseType.INOUT:
                return AnimBounce.easeInOut;
              case AnimEaseType.NONE:
                break;
            }
            break;
        }

        return AnimLinear.easeNone;
      } 
    }
}