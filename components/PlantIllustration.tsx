/* Ilustración decorativa original: planta con maceta-casita. */

export default function PlantIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 300" fill="none" className={className} aria-hidden>
      {/* tallos */}
      <g stroke="#0cb14e" strokeWidth={10} strokeLinecap="round" fill="none">
        <path d="M130 240c-2-60 4-104 26-138" />
        <path d="M128 242c-6-52-22-84-52-104" />
        <path d="M132 240c8-44 26-70 58-84" />
      </g>

      {/* hojas (monstera estilizada) */}
      <g fill="#0cb14e">
        <path d="M156 96c-26-30-20-64 12-78 34-15 62 8 58 42-3 28-28 46-54 44l-8 22-12-6 4-24Z" />
        <path d="M74 136c-34-8-50-38-36-64 15-28 50-30 66-4 14 22 4 50-18 62l2 22h-14v-16Z" />
        <path d="M192 152c30-12 58 2 60 30 2 30-26 48-52 40-22-7-32-30-24-52l-18-10 8-12 26 4Z" />
        {/* nervaduras cream */}
        <path d="M170 84c10-16 24-26 40-28" stroke="#f1e8e0" strokeWidth={6} strokeLinecap="round" fill="none" />
        <path d="M66 112c-10-10-14-24-12-38" stroke="#f1e8e0" strokeWidth={6} strokeLinecap="round" fill="none" />
        <path d="M206 176c14-2 26 2 34 12" stroke="#f1e8e0" strokeWidth={6} strokeLinecap="round" fill="none" />
      </g>

      {/* flor squiggle */}
      <path
        d="M116 118c-16-8-18-30-4-40s34-4 38 12c5-18 28-22 40-10"
        stroke="#f1e8e0"
        strokeWidth={9}
        strokeLinecap="round"
        fill="none"
      />

      {/* maceta casita */}
      <g>
        <path d="M84 238h92l-8 56H92l-8-56Z" fill="#0e6be8" />
        <path d="M78 238h104v14H78z" fill="#0e6be8" stroke="#141414" strokeWidth={0} />
        <path d="M130 208l34 30H96l34-30Z" fill="#141414" />
        <rect x={122} y={252} width={16} height={20} rx={2} fill="#141414" />
      </g>
      {/* sombra */}
      <ellipse cx={130} cy={297} rx={64} ry={5} fill="#141414" opacity={0.25} />
    </svg>
  );
}
