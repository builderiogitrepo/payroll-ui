import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Create a simple animated scene using Lottie
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        // Using a simple animation data for a character working at desk
        animationData: {
          v: "5.7.4",
          fr: 30,
          ip: 0,
          op: 180,
          w: 400,
          h: 300,
          nm: "Payroll Character",
          ddd: 0,
          assets: [],
          layers: [
            {
              ddd: 0,
              ind: 1,
              ty: 4,
              nm: "Character",
              sr: 1,
              ks: {
                o: { a: 0, k: 100 },
                r: { a: 0, k: 0 },
                p: {
                  a: 1,
                  k: [
                    { t: 0, s: [200, 150, 0] },
                    { t: 90, s: [200, 140, 0] },
                    { t: 180, s: [200, 150, 0] },
                  ],
                },
                a: { a: 0, k: [0, 0, 0] },
                s: { a: 0, k: [100, 100, 100] },
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      d: 1,
                      ty: "el",
                      s: { a: 0, k: [60, 60] },
                      p: { a: 0, k: [0, 0] },
                    },
                    {
                      ty: "fl",
                      c: { a: 0, k: [1, 0.86, 0.67, 1] },
                    },
                  ],
                },
              ],
            },
            {
              ddd: 0,
              ind: 2,
              ty: 4,
              nm: "Desk",
              sr: 1,
              ks: {
                o: { a: 0, k: 100 },
                r: { a: 0, k: 0 },
                p: { a: 0, k: [200, 200, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: { a: 0, k: [100, 100, 100] },
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      d: 1,
                      ty: "rc",
                      s: { a: 0, k: [200, 20] },
                      p: { a: 0, k: [0, 0] },
                    },
                    {
                      ty: "fl",
                      c: { a: 0, k: [0.53, 0.81, 0.92, 1] },
                    },
                  ],
                },
              ],
            },
            {
              ddd: 0,
              ind: 3,
              ty: 4,
              nm: "Monitor",
              sr: 1,
              ks: {
                o: { a: 0, k: 100 },
                r: {
                  a: 1,
                  k: [
                    { t: 0, s: 0 },
                    { t: 90, s: 5 },
                    { t: 180, s: 0 },
                  ],
                },
                p: { a: 0, k: [150, 180, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: { a: 0, k: [100, 100, 100] },
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      d: 1,
                      ty: "rc",
                      s: { a: 0, k: [80, 60] },
                      p: { a: 0, k: [0, 0] },
                    },
                    {
                      ty: "fl",
                      c: { a: 0, k: [0.29, 0.56, 0.31, 1] },
                    },
                  ],
                },
              ],
            },
            {
              ddd: 0,
              ind: 4,
              ty: 4,
              nm: "Laptop",
              sr: 1,
              ks: {
                o: { a: 0, k: 100 },
                r: { a: 0, k: 15 },
                p: {
                  a: 1,
                  k: [
                    { t: 0, s: [250, 190, 0] },
                    { t: 90, s: [250, 185, 0] },
                    { t: 180, s: [250, 190, 0] },
                  ],
                },
                a: { a: 0, k: [0, 0, 0] },
                s: { a: 0, k: [100, 100, 100] },
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      d: 1,
                      ty: "rc",
                      s: { a: 0, k: [60, 40] },
                      p: { a: 0, k: [0, 0] },
                    },
                    {
                      ty: "fl",
                      c: { a: 0, k: [0.86, 0.08, 0.24, 1] },
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      return () => {
        anim.destroy();
      };
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full h-full max-w-sm"
        style={{
          background: "transparent",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
        }}
      />
    </div>
  );
};

export default LottieScene;
