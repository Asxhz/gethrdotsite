import TextLoop from '../TextLoop';

const NODES = [
  { code: 'INT', label: 'Capture intent' },
  { code: 'SNP', label: 'Snapshot assets' },
  { code: 'ALC', label: 'Optimize allocation' },
  { code: 'VLD', label: 'Validate compliance' },
  { code: 'RTE', label: 'Route liquidity' },
  { code: 'STL', label: 'Final settlement' },
];

const LOOP_WORDS = [
  'cross-asset spending',
  'instant settlement',
  'global payments',
  'portfolio liquidity',
];

export default function Page3ComingSoon({ onContinue }) {
  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden">

      <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-10 w-full max-w-[1000px]">

        <h2
          className="text-center leading-[1.15] tracking-[-0.025em]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
          }}
        >
          <span className="text-white/50 font-light">Every payment runs through</span>
          <br />
          <span className="text-white font-bold">our real&#8209;time liquidity engine.</span>
        </h2>

        <div className="mt-14 sm:mt-16 md:mt-20 w-full">
          <div className="hidden md:flex items-start justify-center gap-1">
            {NODES.map((node, i) => (
              <div key={node.code} className="flex items-center">
                <div className="flex flex-col items-center" style={{ width: '120px' }}>
                  <div
                    className="flex items-center justify-center rounded-[6px] border font-mono font-bold"
                    style={{
                      width: '56px',
                      height: '34px',
                      fontSize: '0.8rem',
                      letterSpacing: '0.15em',
                      borderColor: 'rgba(212,175,55,0.25)',
                      color: 'rgba(212,175,55,0.8)',
                      background: 'rgba(212,175,55,0.04)',
                    }}
                  >
                    {node.code}
                  </div>
                  <span
                    className="font-mono text-center leading-tight font-medium"
                    style={{
                      marginTop: '10px',
                      fontSize: '0.68rem',
                      letterSpacing: '0.04em',
                      color: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {node.label}
                  </span>
                </div>

                {i < NODES.length - 1 && (
                  <div
                    className="rounded-full"
                    style={{
                      width: '28px',
                      height: '1px',
                      marginTop: '-20px',
                      background: 'linear-gradient(90deg, rgba(212,175,55,0.08), rgba(212,175,55,0.2), rgba(212,175,55,0.08))',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex md:hidden flex-col gap-0 mx-auto w-fit">
            {NODES.map((node, i) => (
              <div key={node.code}>
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center rounded-[5px] border font-mono font-bold flex-shrink-0"
                    style={{
                      width: '46px',
                      height: '28px',
                      fontSize: '0.7rem',
                      letterSpacing: '0.14em',
                      borderColor: 'rgba(212,175,55,0.25)',
                      color: 'rgba(212,175,55,0.8)',
                      background: 'rgba(212,175,55,0.04)',
                    }}
                  >
                    {node.code}
                  </div>
                  <span
                    className="font-mono font-medium"
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.04em',
                      color: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {node.label}
                  </span>
                </div>

                {i < NODES.length - 1 && (
                  <div
                    style={{
                      width: '1px',
                      height: '16px',
                      marginLeft: '22px',
                      marginTop: '4px',
                      marginBottom: '4px',
                      background: 'rgba(212,175,55,0.12)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="mx-auto"
          style={{
            marginTop: 'clamp(2.5rem, 5vh, 3.5rem)',
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
          }}
        />

        <div
          className="flex flex-col items-center"
          style={{ marginTop: 'clamp(1.8rem, 3vh, 2.5rem)', gap: '8px' }}
        >
          <p
            className="text-center"
            style={{
              fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
              letterSpacing: '0.01em',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Your portfolio <span className="font-semibold text-white/80">stays intact.</span>
          </p>
          <p
            className="text-center"
            style={{
              fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
              letterSpacing: '0.01em',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            The merchant <span className="font-semibold text-white/80">gets paid.</span>
          </p>
          <p
            className="text-center"
            style={{
              fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
              letterSpacing: '0.01em',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            The system <span className="font-semibold text-white/80">handles the rest.</span>
          </p>
        </div>

        <div className="flex items-center gap-2" style={{ marginTop: 'clamp(2rem, 4vh, 3rem)' }}>
          <span
            className="font-mono uppercase font-medium"
            style={{ color: 'rgba(212,175,55,0.4)', fontSize: 'clamp(0.58rem, 1.2vw, 0.68rem)', letterSpacing: '0.3em' }}
          >
            Built for
          </span>
          <TextLoop
            className="font-mono uppercase font-bold"
            interval={2.5}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {LOOP_WORDS.map((word) => (
              <span
                key={word}
                style={{ color: 'rgba(212,175,55,0.7)', fontSize: 'clamp(0.58rem, 1.2vw, 0.68rem)', letterSpacing: '0.3em' }}
              >
                {word}
              </span>
            ))}
          </TextLoop>
        </div>

        <div style={{ height: 'clamp(2rem, 5vh, 3.5rem)' }} />

        {onContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="flex flex-col items-center cursor-pointer group focus:outline-none focus-visible:ring-2 rounded"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ color: 'rgba(212,175,55,0.35)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
