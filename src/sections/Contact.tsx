import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Icon } from '../components/Pixel';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { CONTACTS, EMAIL, LINKS, PROJECTS, SKILLS } from '../data';
import { SECRETS, useSecrets, type SecretId } from '../secrets';

type Line = { kind: 'in' | 'out' | 'ok' | 'err'; text: ReactNode };

const HELP = [
  'help        list commands',
  'whoami      who is lucas',
  'projects    what I built',
  'open <name> open a project',
  'skills      what I use',
  'contact     how to reach me',
  'email       write me an email',
  'clear       clear the screen',
];

const WELCOME: Line[] = [
  { kind: 'out', text: "Hi. This is Lucas's terminal." },
  { kind: 'out', text: 'Type a command and press enter, or use the buttons below.' },
];

function run(raw: string, unlock: (id: SecretId) => void): Line[] | 'clear' {
  const input = raw.trim();
  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(' ').toLowerCase();

  switch (cmd.toLowerCase()) {
    case '':
      return [];
    case 'help':
      return HELP.map((text) => ({ kind: 'out', text }));
    case 'whoami':
      return [
        { kind: 'out', text: 'Lucas Martinez. Junior software developer, Manchester, UK.' },
        { kind: 'out', text: 'DAM graduate (RQF Level 5). English / Spanish. Available now.' },
      ];
    case 'projects':
    case 'ls':
      if (arg === '-a' || arg === '-la' || arg === '-al') {
        unlock('hidden');
        return [{ kind: 'out', text: '.  ..  .byte-treats  ' + PROJECTS.map((p) => p.id).join('  ') }];
      }
      return PROJECTS.map((p) => ({ kind: 'out', text: `${p.id.padEnd(13)}${p.stat}` }));
    case 'cat':
      if (arg === '.byte-treats') return [{ kind: 'ok', text: '3 treats left. Byte says thanks for looking around.' }];
      return [{ kind: 'err', text: `cat: ${arg || '?'}: no such file` }];
    case 'open': {
      const project = PROJECTS.find((p) => p.id === arg || p.name.toLowerCase() === arg);
      if (!project) return [{ kind: 'err', text: `open: try one of ${PROJECTS.map((p) => p.id).join(', ')}` }];
      window.open(project.live ?? project.code, '_blank', 'noopener');
      return [{ kind: 'ok', text: `opening ${project.name}…` }];
    }
    case 'skills':
      return SKILLS.map((s) => ({ kind: 'out', text: `${s.name}: ${s.stack.join(', ')}` }));
    case 'contact':
      return CONTACTS.map((c) => ({ kind: 'out', text: `${c.label.padEnd(10)}${c.handle}` }));
    case 'email':
    case 'mail':
      window.location.href = LINKS.email;
      return [{ kind: 'ok', text: `opening your mail app for ${EMAIL}…` }];
    case 'sudo':
      unlock('sudo');
      if (arg.includes('hire')) return [{ kind: 'ok', text: `Permission granted. Send the offer to ${EMAIL} :)` }];
      return [{ kind: 'err', text: 'lucas is not in the sudoers file. Try: sudo hire lucas' }];
    case 'woof':
    case 'bark':
      unlock('woof');
      return [{ kind: 'ok', text: 'Byte: woof woof! (that means "hire him")' }];
    case 'secrets':
      return [{ kind: 'out', text: `There are ${Object.keys(SECRETS).length} secrets on this page. No spoilers.` }];
    case 'date':
      return [{ kind: 'out', text: new Date().toString() }];
    case 'echo':
      return [{ kind: 'out', text: args.join(' ') }];
    case 'clear':
      return 'clear';
    case 'exit':
      return [{ kind: 'out', text: "You can't leave that easily. Try 'email' instead." }];
    default:
      return [{ kind: 'err', text: `command not found: ${cmd}. Type 'help'.` }];
  }
}

const LINE_COLORS: Record<Line['kind'], string> = {
  in: 'text-cream',
  out: 'text-cream/80',
  ok: 'text-leaf',
  err: 'text-ember',
};

function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const { unlock } = useSecrets();

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const execute = (command: string) => {
    const result = run(command, unlock);
    if (command.trim()) setHistory((h) => [command, ...h].slice(0, 30));
    setCursor(-1);
    if (result === 'clear') {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, { kind: 'in', text: <Prompt>{command}</Prompt> }, ...result]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    execute(value);
    setValue('');
  };

  return (
    <div className="panel flex h-full min-h-[380px] flex-col">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 bg-ember" />
          <span className="h-2 w-2 bg-line" />
          <span className="h-2 w-2 bg-line" />
        </span>
        <span className="label">guest@lucasmarjua-ui.github.io</span>
      </div>

      <div
        ref={screenRef}
        className="max-h-[320px] flex-1 overflow-y-auto px-4 py-4 text-[0.7rem] uppercase leading-loose tracking-[0.05em]"
        onClick={() => inputRef.current?.focus()}
        aria-live="polite"
      >
        {lines.map((line, i) => (
          <p key={i} className={`whitespace-pre-wrap break-words ${LINE_COLORS[line.kind]}`}>
            {line.text}
          </p>
        ))}
        <form onSubmit={onSubmit} className="flex items-center">
          <Prompt />
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp' && history.length) {
                e.preventDefault();
                const next = Math.min(cursor + 1, history.length - 1);
                setCursor(next);
                setValue(history[next]);
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const next = cursor - 1;
                setCursor(Math.max(next, -1));
                setValue(next >= 0 ? history[next] : '');
              }
            }}
            placeholder="type a command"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="ml-2 min-w-0 flex-1 bg-transparent uppercase text-cream caret-leaf placeholder:text-muted focus:outline-none"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line p-3">
        <a href={LINKS.email} className="btn btn-primary !px-3 !py-1.5 !text-[0.65rem]">
          Email me
        </a>
        <button type="button" onClick={() => execute('projects')} className="btn btn-ghost !px-3 !py-1.5 !text-[0.65rem]">
          Projects
        </button>
        <button type="button" onClick={() => execute('help')} className="btn btn-ghost !px-3 !py-1.5 !text-[0.65rem]">
          Help
        </button>
      </div>
    </div>
  );
}

function Prompt({ children }: { children?: ReactNode }) {
  return (
    <span>
      <span className="text-ember">guest</span> <span className="text-leaf">~ $</span>
      {children !== undefined && <span className="ml-2 text-cream">{children}</span>}
    </span>
  );
}

export default function Contact() {
  return (
    <section aria-labelledby="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle id="contact" sub="Available immediately for full-time Junior Developer roles. I'd love to hear from you.">
        Contact
      </SectionTitle>
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <ul>
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 border-b-2 border-line py-5 transition-colors hover:border-cream"
                >
                  <span className="text-xl uppercase tracking-[0.08em] sm:text-2xl">{c.label}</span>
                  <span className="flex min-w-0 items-center gap-3 text-[0.6rem] uppercase tracking-[0.06em] text-muted group-hover:text-leaf sm:text-[0.65rem]">
                    <span className="truncate">{c.handle}</span>
                    <Icon name="arrowUpRight" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
