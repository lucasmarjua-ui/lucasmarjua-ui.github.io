import { useSecrets } from '../secrets';

export default function Toast() {
  const { toast } = useSecrets();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {toast && <p className="border-2 border-leaf bg-ink px-4 py-3 text-[0.65rem] uppercase tracking-[0.05em] text-leaf">{toast}</p>}
    </div>
  );
}
