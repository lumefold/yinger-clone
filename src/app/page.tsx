'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Dither = dynamic(() => import('@/components/Dither'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black z-0" />,
});

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [dimensions, setDimensions] = useState({ width: 1024, height: 768 });
  const [fps, setFps] = useState(0);
  const [loading, setLoading] = useState(true);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track window dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // FPS Counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const countFrames = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round(frameCount * 1000 / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(countFrames);
    };

    animationFrameId = requestAnimationFrame(countFrames);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Hide loader after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Format time
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const displayHours = hours % 12 || 12;
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedTime = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  return (
    <main className="overflow-hidden">
      <Dither
        waveColor={[0.5, 0.5, 0.5]}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.3}
        colorNum={4}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />
      <div className="h-dvh py-4 sm:py-16 w-11/12 m-auto relative z-10 animate-z">
        {/* Logo */}
        <div className="absolute top-4 sm:top-16 left-0">
          <h1 className="font-heading text-[3rem] sm:text-[4rem] leading-none tracking-tighter text-primary">
            ABDYU
          </h1>
        </div>

        <div className="relative h-full w-full">
          {/* Main Content */}
          <div className="fadein absolute w-full bottom-0">
            <div className="text-2 max-w-[25ch] sm:max-w-[30ch]">
              {/* Time Display */}
              <p className="sr-only" suppressHydrationWarning>Local time in Fort Collins Colorado is {formattedTime} {ampm} (UTC-6:00)</p>
              <div className="text-n1 text-secondary font-body-digit uppercase mb-3">
                LOCAL TIME (UTC-6:00)
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="font-body-digit text-[5rem] sm:text-[6.5rem] leading-none tracking-tight font-bold" suppressHydrationWarning>
                  {formattedTime}
                </div>
                <div className="flex flex-col gap-1.5 mt-1" suppressHydrationWarning>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full border-2 transition-all ${hours < 12 ? 'bg-primary border-primary' : 'border-primary border-opacity-30 bg-transparent'}`} />
                    <span className="text-n1 font-body-digit">am</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full border-2 transition-all ${hours >= 12 ? 'bg-primary border-primary' : 'border-primary border-opacity-30 bg-transparent'}`} />
                    <span className="text-n1 font-body-digit">pm</span>
                  </div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="inline font-body text-2 leading-relaxed">
                <span className="sr-only">Abdyu Bedada is a</span>Software Engineer who{' '}
                <a
                  href="https://youtu.be/8GW6sLrK40k?si=1AuBZvlAbpbJbusv"
                  target="_blank"
                  rel="noreferrer"
                  className="link-animated rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50"
                >
                  resonance
                </a>{' '}
                in Realtime 3D ° Interaction ° Perf{' '}
                <span className="inline-block text-right font-body-digit text-secondary text-n1 select-none whitespace-nowrap" suppressHydrationWarning>
                  {String(dimensions.width).padStart(4, '0')} x {String(dimensions.height).padStart(4, '0')}{' '}
                  L.{String(fps).padStart(3, '0')} FPS
                </span>
              </h1>
            </div>

            <br />

            {/* Location and Job */}
            <p className="text-n1 text-secondary font-body-digit uppercase">
              Fort Collins, Colorado{' '}
              <span className="opacity-100">
                →{' '}
                <a
                  href="https://youtu.be/pQsF3pzOc54?si=-Fi0VBNWRFMblNeR"
                  target="_blank"
                  rel="noreferrer"
                  className="link-animated rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50"
                >
                  US of A
                </a>
              </span>
              <br />
              Design Engineer{' '}
              <a
                href="https://dev.to/lumefold/"
                target="_blank"
                rel="noreferrer"
                className="link-animated rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50"
              >
                <span className="opacity-100">@Lume</span>
              </a>
            </p>

            {/* Social Links */}
            <h2 className="sr-only">Social Links:</h2>
            <ul className="flex gap-1 sm:gap-2 justify-stretch sm:justify-start mt-4 sm:mt-0 sm:absolute sm:right-0 sm:bottom-0 sm:flex-col sm:items-end sm:gap-2 -translate-x-[3px] sm:translate-x-0">
              {[
                { label: 'Github', shortLabel: 'Gh', href: 'https://github.com/Lumefold', delay: 0 },
                { label: 'LinkedIn', shortLabel: 'Li', href: 'https://www.linkedin.com/in/Lumefold/', delay: 1 },
                { label: 'Twitter / 𝕏', shortLabel: '𝕏', href: 'https://twitter.com/Lumefold', delay: 2 },
                { label: 'Email', shortLabel: 'Email', href: 'mailto:hello@Lumefold.com', delay: 3 }
              ].map((link, i) => (
                <li
                  key={link.label}
                  className="block"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${0.5 + i * 0.1}s both`
                  }}
                >
                  <a
                    className={`social-button px-2 py-1 sm:px-3 text-0 sm:text-n1 rounded-full block border border-dashed hover:border-solid focus-visible:border-solid border-opacity-20 hover:border-opacity-100 transition-colors duration-0 hover:duration-500 focus-visible:duration-500 focus-visible:border-opacity-100 border-primary whitespace-nowrap relative group bg-dark-primary bg-opacity-40 backdrop-blur select-none font-body-digit tracking-tighter focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50 ${link.label === 'Email' ? '' : 'aspect-square h-[2em] px-0 py-0 sm:aspect-auto sm:h-auto sm:py-1'}`}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  >
                    <span className={link.label === 'Email' ? 'inline-block' : 'inline-block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 relative sm:top-auto sm:left-auto sm:translate-y-0 sm:translate-x-0'}>
                      <span className="hidden sm:inline">{link.label}</span>
                      <span className="sm:hidden">{link.shortLabel}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Loading Animation */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute font-body-digit text-n1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="border border-primary rounded-md p-1 flex gap-1 border-opacity-20">
              {[5, 3, 1, 0, 2, 4].map((delay, i) => (
                <div
                  key={i}
                  className="rounded-sm bg-primary h-6 w-4"
                  style={{
                    animation: `barPulse 1.5s ease-in-out ${delay * 0.15}s infinite`,
                    opacity: i < 3 ? 0.2 : 1
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 scrim sm:hidden" />
        </div>
      </div>
    </main>
  );
}
