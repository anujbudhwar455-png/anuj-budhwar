import { cn } from '@/lib/cn';

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-10 md:mb-14 max-w-2xl', className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
          {eyebrow}
        </p>
      )}
      <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base text-slate-400 md:text-lg">{description}</p>}
    </div>
  );
}
