import { useState, useCallback } from 'react';
import { defaultTranslations, ADMIN_STORAGE_KEY } from '../contexts/LanguageContext';
import type { Language } from '../contexts/LanguageContext';

// ─── Password ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'pausimo2026';
const SESSION_KEY = 'pausimo_admin_auth';

// ─── Section / field definitions ─────────────────────────────────────────────
interface Field {
  key: string;
  label: string;
  multiline?: boolean;
}

interface Section {
  id: string;
  title: string;
  fields: Field[];
}

const SECTIONS: Section[] = [
  {
    id: 'hero',
    title: 'Top banner',
    fields: [
      { key: 'hero.title', label: 'Main headline', multiline: true },
      { key: 'hero.subtitle', label: 'Tagline below headline', multiline: true },
      { key: 'hero.languages', label: 'Source languages (left of →)' },
      { key: 'hero.target', label: 'Target languages (right of →)' },
      { key: 'hero.description', label: 'Short description paragraph', multiline: true },
      { key: 'hero.cta', label: 'Contact button text' },
    ],
  },
  {
    id: 'value',
    title: 'Philosophy',
    fields: [
      { key: 'value.subtitle', label: 'Small tag above title' },
      { key: 'value.title', label: 'Section title', multiline: true },
      { key: 'value.problemTitle', label: '"The Problem" heading' },
      { key: 'value.problem1', label: 'Problem 1 — bold phrase' },
      { key: 'value.result1', label: 'Problem 1 — consequence' },
      { key: 'value.problem2', label: 'Problem 2 — bold phrase' },
      { key: 'value.result2', label: 'Problem 2 — consequence' },
      { key: 'value.problem3', label: 'Problem 3 — bold phrase' },
      { key: 'value.result3', label: 'Problem 3 — consequence' },
      { key: 'value.problem4', label: 'Problem 4 — bold phrase' },
      { key: 'value.result4', label: 'Problem 4 — consequence' },
      { key: 'value.solutionTitle', label: '"The Solution" heading' },
      { key: 'value.solution', label: 'Solution paragraph', multiline: true },
    ],
  },
  {
    id: 'services',
    title: 'My services',
    fields: [
      { key: 'services.heading', label: 'Section heading' },
      { key: 'services.heading-text', label: 'Section intro paragraph', multiline: true },
      { key: 'services.1.title', label: 'Service 1 — Title' },
      { key: 'services.1.description', label: 'Service 1 — Short description', multiline: true },
      { key: 'services.1.bullet1', label: 'Service 1 — Item 1' },
      { key: 'services.1.bullet2', label: 'Service 1 — Item 2' },
      { key: 'services.1.bullet3', label: 'Service 1 — Item 3' },
      { key: 'services.1.bullet4', label: 'Service 1 — Item 4' },
      { key: 'services.1.bullet5', label: 'Service 1 — Item 5' },
      { key: 'services.1.sentence', label: 'Service 1 — "For…" closing line', multiline: true },
      { key: 'services.2.title', label: 'Service 2 — Title' },
      { key: 'services.2.description', label: 'Service 2 — Short description', multiline: true },
      { key: 'services.2.bullet1', label: 'Service 2 — Item 1' },
      { key: 'services.2.bullet2', label: 'Service 2 — Item 2' },
      { key: 'services.2.bullet3', label: 'Service 2 — Item 3' },
      { key: 'services.2.bullet4', label: 'Service 2 — Item 4' },
      { key: 'services.2.bullet5', label: 'Service 2 — Item 5' },
      { key: 'services.2.bullet6', label: 'Service 2 — Item 6' },
      { key: 'services.2.sentence', label: 'Service 2 — "For…" closing line', multiline: true },
      { key: 'services.3.title', label: 'Service 3 — Title' },
      { key: 'services.3.description', label: 'Service 3 — Short description', multiline: true },
      { key: 'services.3.bullet1', label: 'Service 3 — Item 1' },
      { key: 'services.3.bullet2', label: 'Service 3 — Item 2' },
      { key: 'services.3.bullet3', label: 'Service 3 — Item 3' },
      { key: 'services.3.bullet4', label: 'Service 3 — Item 4' },
      { key: 'services.3.sentence', label: 'Service 3 — "For…" closing line', multiline: true },
    ],
  },
  {
    id: 'partnership',
    title: 'How I work',
    fields: [
      { key: 'partnership.subtitle', label: 'Small tag above title' },
      { key: 'partnership.title', label: 'Section title' },
      { key: 'partnership.1.title', label: 'Card 1 text', multiline: true },
      { key: 'partnership.2.title', label: 'Card 2 text', multiline: true },
      { key: 'partnership.3.title', label: 'Card 3 text', multiline: true },
      { key: 'partnership.portfolioTitle', label: 'Divider quote', multiline: true },
    ],
  },
  {
    id: 'testimonials',
    title: 'Client testimonials',
    fields: [
      { key: 'testimonials.subtitle', label: 'Small tag above title' },
      { key: 'testimonials.title', label: 'Section title' },
      { key: 'testimonial.1.description', label: 'Testimonial 1 — Project context', multiline: true },
      { key: 'testimonial.1.quote', label: 'Testimonial 1 — Quote', multiline: true },
      { key: 'testimonial.1.author', label: 'Testimonial 1 — Author name' },
      { key: 'testimonial.1.role', label: 'Testimonial 1 — Author role' },
      { key: 'testimonial.1.company', label: 'Testimonial 1 — Company name' },
      { key: 'testimonial.1.link', label: 'Testimonial 1 — Company website URL' },
      { key: 'testimonial.2.description', label: 'Testimonial 2 — Project context', multiline: true },
      { key: 'testimonial.2.quote', label: 'Testimonial 2 — Quote', multiline: true },
      { key: 'testimonial.2.author', label: 'Testimonial 2 — Author name' },
      { key: 'testimonial.2.role', label: 'Testimonial 2 — Author role' },
      { key: 'testimonial.2.company', label: 'Testimonial 2 — Company name' },
      { key: 'testimonial.2.link', label: 'Testimonial 2 — Company website URL' },
      { key: 'testimonial.3.description', label: 'Testimonial 3 — Context', multiline: true },
      { key: 'testimonial.3.quote', label: 'Testimonial 3 — Quote', multiline: true },
      { key: 'testimonial.3.author', label: 'Testimonial 3 — Author' },
      { key: 'testimonial.3.role', label: 'Testimonial 3 — Role' },
      { key: 'testimonial.3.company', label: 'Testimonial 3 — Company name' },
      { key: 'testimonial.3.link', label: 'Testimonial 3 — Company website URL' },
    ],
  },
  {
    id: 'contact',
    title: 'Get in touch',
    fields: [
      { key: 'contact.subtitle', label: 'Small tag above title' },
      { key: 'contact.title', label: 'Section title', multiline: true },
      { key: 'contact.description', label: 'Body text (use <br/> for line breaks)', multiline: true },
      { key: 'contact.rights', label: 'Copyright line at the bottom' },
    ],
  },
];

const LANG_LABELS: Record<Language, string> = { en: 'EN', ca: 'CA', es: 'ES', fr: 'FR' };
const LANGS: Language[] = ['en', 'ca', 'es', 'fr'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildInitialDraft(): Record<Language, Record<string, string>> {
  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    const overrides: Partial<Record<Language, Record<string, string>>> = stored
      ? JSON.parse(stored)
      : {};
    const result = {} as Record<Language, Record<string, string>>;
    for (const lang of LANGS) {
      result[lang] = { ...defaultTranslations[lang], ...overrides[lang] };
    }
    return result;
  } catch {
    return { ...defaultTranslations } as Record<Language, Record<string, string>>;
  }
}

// ─── Password screen ──────────────────────────────────────────────────────────
function PasswordScreen({ onAuth }: { onAuth: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = () => {
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onAuth();
    } else {
      setError(true);
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="logo" className="w-10 h-auto mx-auto mb-4" />
          <h1 className="text-2xl text-slate-800" style={{ fontFamily: 'Playfair Display, serif' }}>
            Content Manager
          </h1>
          <p className="text-sm text-slate-400 mt-1">Enter your password to continue</p>
        </div>
        <div
          className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-transform ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}
        >
          <input
            type="password"
            placeholder="Password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && submit()}
            autoFocus
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
              error
                ? 'border-red-300 bg-red-50 text-red-700'
                : 'border-slate-200 bg-slate-50 text-slate-800 focus:border-slate-400'
            }`}
          />
          {error && (
            <p className="text-xs text-red-500 mt-2 text-center">Incorrect password</p>
          )}
          <button
            onClick={submit}
            className="mt-3 w-full py-3 rounded-xl bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Enter
          </button>
        </div>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeLang, setActiveLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [draft, setDraft] = useState(buildInitialDraft);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [dirty, setDirty] = useState(false);

  const updateField = useCallback((key: string, value: string) => {
    setDraft(prev => ({ ...prev, [activeLang]: { ...prev[activeLang], [key]: value } }));
    setDirty(true);
  }, [activeLang]);

  const save = () => {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(draft));
    window.dispatchEvent(new CustomEvent('pausimo:content-updated'));
    setSavedAt(new Date());
    setDirty(false);
  };

  const resetLang = () => {
    if (!window.confirm(`Reset all ${LANG_LABELS[activeLang]} content to defaults?`)) return;
    setDraft(prev => ({ ...prev, [activeLang]: { ...defaultTranslations[activeLang] } }));
    setDirty(true);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translations.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentSection = SECTIONS.find(s => s.id === activeSection)!;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-7 h-auto" />
          <span className="text-base font-medium text-slate-700" style={{ fontFamily: 'Playfair Display, serif' }}>
            Content Manager
          </span>
          {dirty && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
              Unsaved changes
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {savedAt && !dirty && (
            <span className="text-xs text-slate-400">
              Saved at {savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            View site ↗
          </a>
          <button
            onClick={exportJson}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Export JSON
          </button>
          <button
            onClick={resetLang}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Reset {LANG_LABELS[activeLang]}
          </button>
          <button
            onClick={save}
            className={`text-xs px-4 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              dirty
                ? 'bg-slate-800 text-white hover:bg-slate-700'
                : 'bg-slate-100 text-slate-400 cursor-default'
            }`}
            disabled={!dirty}
          >
            Save
          </button>
          <button
            onClick={onLogout}
            className="text-xs px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className=" h-full sticky top-0 w-48 bg-white border-r border-slate-100 flex flex-col py-4 sticky top-[57px] h-[calc(100vh-57px)]">
          {/* Language tabs */}
          <div className="px-3 mb-4">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Language</p>
            <div className="grid grid-cols-4 gap-1 bg-slate-100 rounded-xl p-1">
              {LANGS.map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`text-xs py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeLang === lang
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {LANG_LABELS[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Section nav */}
          <div className="px-3 flex-1 overflow-y-auto">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Sections</p>
            <nav className="space-y-0.5">
              {SECTIONS.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                    activeSection === section.id
                      ? 'bg-slate-100 text-slate-800 font-medium'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Save shortcut at bottom */}
          <div className="px-3 mt-4 border-t border-slate-100 pt-4">
            <button
              onClick={save}
              disabled={!dirty}
              className={`w-full text-sm py-2.5 rounded-xl font-medium transition-colors cursor-pointer ${
                dirty
                  ? 'bg-slate-800 text-white hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-400 cursor-default'
              }`}
            >
              Save changes
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="text-xl text-slate-800"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {currentSection.title}
              </h2>
              <span
                className="text-sm px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {LANG_LABELS[activeLang]}
              </span>
            </div>

            <div className="space-y-5">
              {currentSection.fields.map(field => {
                const currentValue = draft[activeLang]?.[field.key] ?? '';
                const defaultValue = defaultTranslations[activeLang]?.[field.key] ?? defaultTranslations['en']?.[field.key] ?? '';
                const isModified = currentValue !== defaultValue;
                const isMissing = !defaultTranslations[activeLang]?.[field.key];

                return (
                  <div key={field.key}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        {field.label}
                      </label>
                      {isMissing && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400">
                          EN only
                        </span>
                      )}
                      {isModified && !isMissing && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-500 border border-amber-100">
                          modified
                        </span>
                      )}
                    </div>
                    {field.multiline ? (
                      <textarea
                        value={currentValue}
                        onChange={e => updateField(field.key, e.target.value)}
                        rows={3}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 outline-none focus:border-slate-400 transition-colors resize-y leading-relaxed"
                      />
                    ) : (
                      <input
                        type="text"
                        value={currentValue}
                        onChange={e => updateField(field.key, e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 outline-none focus:border-slate-400 transition-colors"
                      />
                    )}
                    {isModified && (
                      <p className="text-[11px] text-slate-400 mt-1 truncate">
                        Default: {defaultValue || <em>empty</em>}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export function AdminDashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  if (!authed) return <PasswordScreen onAuth={() => setAuthed(true)} />;
  return <Dashboard onLogout={logout} />;
}