import { cn } from '@/lib/cn';

const tones: Record<string, string> = {
  'closed-testing': 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  'in-development': 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
  experiment: 'border-violet-400/30 bg-violet-400/10 text-violet-300',
  published: 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300',
  default: 'border-white/15 bg-white/5 text-slate-300',
};

export function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <span className={cn('chip', tones[status] ?? tones.default)}>{label}</span>
  );
}
