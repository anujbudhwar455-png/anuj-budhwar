import { withBase } from '@/lib/paths';

export default function NotFound() {
  return (
    <div className="section-pad flex min-h-[70vh] items-center pt-28">
      <div className="container-max text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">404</p>
        <h1 className="heading-display mt-4 text-4xl">Page not found</h1>
        <p className="mt-3 text-slate-400">That route isn&apos;t part of this portfolio.</p>
        <a href={withBase('/')} className="btn-primary mt-8 inline-flex">
          Back home
        </a>
      </div>
    </div>
  );
}
