import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export const SECRETS = {
  dog: 'Pet a pixel dog',
  konami: 'Remember the Konami code',
  sudo: 'Try to get root',
  woof: 'Speak dog in the terminal',
  hidden: 'Find the hidden file',
  levelUp: 'Level up player 1',
  skip: 'Skip the intro with Esc',
} as const;

export type SecretId = keyof typeof SECRETS;

const STORAGE_KEY = 'lm-secrets';

interface SecretsState {
  found: Set<SecretId>;
  unlock: (id: SecretId) => void;
  toast: string | null;
}

const SecretsContext = createContext<SecretsState>({ found: new Set(), unlock: () => {}, toast: null });

function load(): Set<SecretId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(ids.filter((id): id is SecretId => id in SECRETS));
  } catch {
    return new Set();
  }
}

export function SecretsProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<Set<SecretId>>(load);
  const [toast, setToast] = useState<string | null>(null);

  const unlock = useCallback((id: SecretId) => {
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // Storage can be unavailable (private mode); secrets just won't persist.
      }
      setToast(`Secret found: ${SECRETS[id]}`);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  // Konami code anywhere on the page.
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === code[pos] ? pos + 1 : key === code[0] ? 1 : 0;
      if (pos === code.length) {
        pos = 0;
        unlock('konami');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [unlock]);

  return <SecretsContext.Provider value={{ found, unlock, toast }}>{children}</SecretsContext.Provider>;
}

export const useSecrets = () => useContext(SecretsContext);
