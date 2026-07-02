import { Bolt, Diamond } from "./icons";

type MarqueeProps = {
  items: string[];
  className?: string;
  duration?: number;
};

export default function Marquee({ items, className = "", duration = 36 }: MarqueeProps) {
  const doubled = [...items, ...items];

  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {doubled.map((item, i) => (
        <div key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-lg font-extrabold italic sm:px-8 sm:text-[21px]">
            {item}
          </span>
          {i % 2 === 0 ? <Bolt className="size-5 shrink-0" /> : <Diamond className="size-3.5 shrink-0" />}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden rounded-[22px] py-3.5 ${className}`}>
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
