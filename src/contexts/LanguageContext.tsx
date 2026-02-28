import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type Language = 'en' | 'ca' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Hero Section
    'hero.title': 'Strategic language for storytelling, tech and AI environments',
    'hero.subtitle': 'I help organizations sound sharp, authentic and culturally intelligent across high-impact communication.',
    'hero.languages': 'English / French',
    'hero.arrow': '→',
    'hero.target': 'Catalan / Spanish',
    'hero.description': 'When nuance matters, wording is strategy.',
    'hero.cta': 'Let\'s talk!',
    
    // Value Proposition
    'value.subtitle': 'Filosofia',
    'value.title': 'Where language shapes performance',
    'value.problemTitle': 'The Problems',
    'value.problem1': 'Flat localisation ',
    'value.problem2': 'Poor subtitling ',
    'value.problem3': 'Imprecise terminology ',
    'value.problem4': 'Unrefined AI ',
    'value.result1': 'reduces engagement.',
    'value.result2': 'breaks emotion.',
    'value.result3': 'weakens reputation.',
    'value.result4': 'kills trust.',
    'value.solutionTitle': 'The Solution',
    'value.solution': 'I define how your content, product or brand should sound — across screens, platforms and markets.',
    
    // Services
    'services.heading': 'Three core areas',
    'services.1.title': 'Storytelling & Audiovisual',
    'services.1.description': 'Emotion travels through language. Finesse makes it land.',
    'services.1.bullet1': 'Cultural adaptation for international audiences',
    'services.1.bullet2': 'Script adaptation',
    'services.1.bullet3': 'Subtitling & surtitling (broadcast, streaming, live)',
    'services.1.bullet4': 'Dubbing & voice adaptation',
    'services.1.bullet5': 'Accessibility (SDH, audio description)',
    'services.1.sentence': 'For production companies, theatres, digital media and creative studios.',
    'services.2.title': 'Product, Tech & AI Language',
    'services.2.description': 'Your product speaks. It must speak clearly.',
    'services.2.bullet1': 'AI output review & fine-tuning',
    'services.2.bullet2': 'Software & product localisation',
    'services.2.bullet3': 'UX tone and microcopy refinement',
    'services.2.bullet4': 'Terminology systems',
    'services.2.bullet5': 'Technical & industrial communication',
    'services.2.bullet6': 'Linguistic QA & quality guidelines',
    'services.2.sentence': 'For SaaS, tech companies, digital product teams and AI-driven platforms.',
    'services.3.title': 'Strategic Communication & Transcreation',
    'services.3.description': 'When the message carries reputation, language must have soul.',
    'services.3.bullet1': 'Campaign adaptation',
    'services.3.bullet2': 'Brand messaging refinement',
    'services.3.bullet3': 'High-stakes presentations & scripts',
    'services.3.bullet4': 'Creative transcreation',
    'services.3.sentence': 'For brands that operate and resonate across cultures and markets.',

    // Partnership
    'partnership.subtitle': 'How I work',
    'partnership.title': 'Embedded, rigorous, accountable',
    'partnership.1.title': 'Integrated into your team when needed',
    'partnership.2.title': 'Focused on clarity, performance and cultural accuracy',
    'partnership.3.title': 'Fast when speed is critical — precise when nuance is non-negotiable',
    'partnership.portfolioTitle': '15+ years working with creative, technical and executive stakeholders across industries. More than translation. Strategic language execution.',

    // Testimonials
    'testimonials.subtitle': 'Testimonials',
    'testimonials.title': 'What Clients Say',
    'testimonial.1.quote': "If you're looking for more than just a straightforward translation—someone who combines expert localisation with strong copyright skills—Pau is the person to choose. He truly understands how to adapt content to suit Spanish-speaking audiences perfectly. Above all, he is always punctual and a pleasure to work with.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Story Designer',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.2.quote': "We've worked with Pau on several occasions for the adaptation of theatrical texts to surtitling requirements, as well as for live surtitles operation. He has always shown professionalism, efficiency, and excellent teamwork. We're very pleased with his work and fully recommend him.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Producer',
    'testimonial.2.company': 'Sala Beckett',
    'testimonial.3.quote': 'He is a pleasure to work with. He carries out subtitling work swiftly and professionally, and shows great willingness to assist with technical matters, demonstrating commitment at all times.',
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Post-production Coordinator',
    'testimonial.3.company': 'The Moff Audiovisual Production Company',
    
    // Contact
    'contact.subtitle': 'Contact',
    'contact.title': 'Let’s make your message move the world',
    'contact.description': 'If language carries risk, reputation or performance — let’s get it right.',
    'contact.rights': '© 2026 Pau Simó. All rights reserved.',
  },
  ca: {
    'hero.subtitle': 'Ajudo organitzacions a fer sonar el seu missatge de forma nítida, genuïna i ajustada al context cultural.',
    'hero.title': 'Llenguatge estratègic per a entorns audiovisuals, tech i narrativa',
    'hero.languages': 'anglès / francès',
    'hero.arrow': '→',
    'hero.target': 'català / castellà',
    'hero.description': 'Quan el matís és crucial, la llengua és estratègia.',
    'hero.cta': 'Parlem!',
    'value.subtitle': 'Filosofia',
    'value.title': 'Les paraules determinen l’impacte',
    'value.problemTitle': 'Els Problemes',
    'value.problem1': 'Una localització literal ',
    'value.problem2': 'Un subtitulat deficient ',
    'value.problem3': 'Una terminologia imprecisa ',
    'value.problem4': 'Una IA sense afinar ',
    'value.result1': 'redueix la immersió.',
    'value.result2': 'mata l\'emoció.',
    'value.result3': 'perjudica la reputació.',
    'value.result4': 'erosiona la confiança.',
    'value.solutionTitle': 'La Solució',
    'value.solution': 'Defineixo la veu dels teus continguts, el teu producte o la teva marca, sigui quin sigui el canal.',
    'value.cta': 'Parlem!',
    'services.subtitle': 'Experiència',
    'services.title': 'Comunicació Audiovisual, Cultural i Tècnica',
    'services.intro': 'Des de guions i espectacles fins a programari i agents d\'IA: cada detall està pensat per garantir una experiència i un rendiment òptims.',
    'services.heading': 'Tres àrees principals',
    'services.1.title': 'Narrativa i audiovisual',
    'services.1.description': 'L\'emoció viatja a través del llenguatge. La delicadesa fa que aterri.',
    'services.1.bullet1': 'Adaptació cultural per a públics internacionals',
    'services.1.bullet2': 'Traducció de guions',
    'services.1.bullet3': 'Subtitulació i sobretitulació (emissió, streaming, en directe)',
    'services.1.bullet4': 'Doblatge i veus superposades',
    'services.1.bullet5': 'Accessibilitat (SDH, audiodescripció)',
    'services.1.sentence': 'Per a productores, teatres, mitjans digitals i estudis creatius.',
    'services.2.title': 'Llenguatge per a producte, tecnologia i IA',
    'services.2.description': 'El teu producte parla. Fes-lo parlar amb claredat.',
    'services.2.bullet1': 'Revisió i ajust d\'IA',
    'services.2.bullet2': 'Localització de software i producte',
    'services.2.bullet3': 'Refinament del to UX i el microcopy',
    'services.2.bullet4': 'Sistemes terminològics',
    'services.2.bullet5': 'Continguts tècnics i industrials',
    'services.2.bullet6': 'QA lingüística i directrius de qualitat',
    'services.2.sentence': 'Per a empreses SaaS, tecnològiques, equips de producte digital i plataformes basades en IA.',
    'services.3.title': 'Comunicació estratègica i transcreació',
    'services.3.description': 'Quan la reputació va lligada al missatge, el llenguatge ha de tenir tota l\'ànima.',
    'services.3.bullet1': 'Adaptació de campanyes',
    'services.3.bullet2': 'Refinament del missatge de marca',
    'services.3.bullet3': 'Presentacions i guions decisius',
    'services.3.bullet4': 'Transcreació creativa',
    'services.3.sentence': 'Per a marques que pensen globalment.',
    'partnership.subtitle': 'Com treballo',
    'partnership.title': 'Encaix, rigor, compromís',
    'partnership.1.title': 'Integrat al teu equip quan calgui',
    'partnership.2.title': 'Centrat en la claredat, el resultat i la precisió cultural',
    'partnership.3.title': 'Ràpid quan la velocitat és crítica; precís quan el matís no admet negociació',
    'partnership.portfolioTitle': 'Més de 15 anys treballant estretament amb equips creatius, tècnics i directius. Més que traducció. Execució estratègica del llenguatge.',
    'testimonials.subtitle': 'Testimonis',
    'testimonials.title': 'Què Diuen els Clients',
    'testimonial.1.quote': "Si busques alguna cosa més que una traducció convencional —algú que combini localització experta amb solidesa en la redacció— el Pau és la persona indicada. Entén perfectament com adaptar continguts per al públic de parla hispana. A més a més, és sempre puntual i és un plaer treballar amb ell.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Story Designer',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.2.quote': "Hem comptat amb en Pau en diverses ocasions per a l'adaptació de textos teatrals al criteri de la sobretitulació, així com per a l'operació de sobretítols en directe. Sempre ha demostrat professionalitat, eficiència i una excel·lent col·laboració amb l'equip. Estem molt contents amb la seva feina i el recomanem plenament.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Productora',
    'testimonial.2.company': 'Sala Beckett',
    'testimonial.3.quote': 'És un plaer treballar amb ell. Realitza la subtitulació amb rapidesa i professionalitat. A més mostra una gran disposició per ajudar en la resolució de qüestions tècniques demostrant compromís en tot moment.',
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Coordinador de Postproducció',
    'testimonial.3.company': 'The Moff Producció Audiovisual',
    'contact.subtitle': 'Contacta',
    'contact.title': 'Fem que el teu missatge arribi al món',
    'contact.description': 'En el llenguatge estan en joc la reputació i l’impacte. Per això, l’excel·lència és una obligació.',
    'contact.rights': '© 2026 Pau Simó. Tots els drets reservats.',
  },
  es: {
    'hero.title': 'Lenguaje estratégico para entornos audiovisuales, tech y narrativa',
    'hero.subtitle': 'Ayudo a organizaciones comunicar de forma nítida, genuina y ajustada al contexto cultural.',
    'hero.languages': 'inglés / francés',
    'hero.arrow': '→',
    'hero.target': 'catalán / castellano',
    'hero.description': 'Cuando el matís es crucial, la lengua es estrategia.',
    'hero.cta': 'Hablemos!',
    'value.subtitle': 'Filosofia',
    'value.title': 'Las palabras determinan el impacto',
    'value.problemTitle': 'Los Problemas',
    'value.problem1': 'Una localización literal ',
    'value.problem2': 'Un subtitulado deficiente ',
    'value.problem3': 'Una terminología imprecisa ',
    'value.problem4': 'Una IA sin ajustar ',
    'value.result1': 'reduce la inmersión.',
    'value.result2': 'mata la emoción.',
    'value.result3': 'daña la reputación.',
    'value.result4': 'erosiona la confianza.',
    'value.solutionTitle': 'La solución',
    'value.solution': 'Defino la voz de tus contenidos, tu producto o tu marca, sea cual sea el canal.',
    'services.heading': 'Tres áreas principales',
    'services.1.title': 'Narrativa y audiovisual',
    'services.1.description': 'La emoción viaja a través del lenguaje. La delicadeza la aterriza.',
    'services.1.bullet1': 'Adaptación cultural para públicos internacionales',
    'services.1.bullet2': 'Traducción de guiones',
    'services.1.bullet3': 'Subtitulación y sobretitulación (emisión, streaming, en directo)',
    'services.1.bullet4': 'Doblaje y voces superpuestas',
    'services.1.bullet5': 'Accesibilidad (SDH, audiodescripción)',
    'services.1.sentence': 'Para productoras, teatros, medios digitales y estudios creativos.',
    'services.2.title': 'Lenguaje para producto, tecnología e IA',
    'services.2.description': 'Tu producto habla. Haz que hable con claridad.',
    'services.2.bullet1': 'Revisión y ajuste de IA',
    'services.2.bullet2': 'Localización de software y producto',
    'services.2.bullet3': 'Refinamiento del tono UX y el microcopy',
    'services.2.bullet4': 'Sistemas terminológicos',
    'services.2.bullet5': 'Contenidos técnicos e industriales',
    'services.2.bullet6': 'QA lingüística y directrices de calidad',
    'services.2.sentence': 'Para empresas SaaS, tecnológicas, equipos de producto digital y plataformas basadas en IA.',
    'services.3.title': 'Comunicación estratégica y transcreación',
    'services.3.description': 'Cuando la reputación va ligada al mensaje, el lenguaje debe tener toda el alma.',
    'services.3.bullet1': 'Adaptación de campañas',
    'services.3.bullet2': 'Refinamiento del mensaje de marca',
    'services.3.bullet3': 'Presentaciones y guiones decisivos',
    'services.3.bullet4': 'Transcreación creativa',
    'services.3.sentence': 'Para marcas que piensan globalmente.',
    'partnership.subtitle': 'Cómo trabajo',
    'partnership.title': 'Encaje, rigor, compromiso',
    'partnership.1.title': 'Integrado en tu equipo cuando hace falta',
    'partnership.2.title': 'Centrado en la claridad, el resultado y la precisión cultural',
    'partnership.3.title': 'Ágil cuando la velocidad es crítica; preciso cuando el matiz no admite negociación',
    'partnership.portfolioTitle': 'Más de 15 años trabajando codo con codo con equipos creativos, técnicos y directivos. Más que traducción. Ejecución estratégica del lenguaje.',
    'testimonials.subtitle': 'Testimonios',
    'testimonials.title': 'Qué dicen los clientes',
    'testimonial.1.quote': "Si buscas algo más que una traducción convencional —alguien que combine localización experta con solidez en la redacción— Pau es la persona indicada. Entiende perfectamente cómo adaptar contenidos para el público de habla hispana. además, siempre es puntual y es un placer trabajar con él.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Diseñadora de Historias',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.2.quote': "Hemos colaborado con Pau en varias ocasiones para la adaptación de textos teatrales al criterio de la sobretitulación, así como para la operación de sobretítulos en directo. Siempre ha demostrado profesionalidad, eficiencia y una excelente colaboración en equipo. estamos muy contentos con su trabajo y lo recomendamos plenamente.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Productora',
    'testimonial.2.company': 'Sala Beckett',
    'testimonial.3.quote': 'Es un placer trabajar con él. Realiza la subtitulación con rapidez y profesionalidad. Además demuestra una gran disposición por ayudar a resolver cuestiones técnicas y demuestra compromiso en todo momento.',
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Coordinador de Postproducción',
    'testimonial.3.company': 'The Moff Producción Audiovisual',
    'contact.subtitle': 'Contacta',
    'contact.title': 'Hagamos que tu mensaje llegue al mundo',
    'contact.description': 'En el lenguaje están en juego la reputación y el impacto. Por eso, la excelencia es una obligación.',
    'contact.rights': '© 2026 Pau Simó. Todos los derechos reservados.',
  },
};

// Map URL path prefix → language
export const PATH_TO_LANG: Record<string, Language> = {
  '':    'en',
  'cat': 'ca',
  'es':  'es',
};

export const LANG_TO_PATH: Record<Language, string> = {
  en: '/',
  ca: '/cat',
  es: '/es',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Derive language from the current URL
  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  const language: Language = PATH_TO_LANG[segment] ?? 'en';

  const setLanguage = (lang: Language) => {
    navigate(LANG_TO_PATH[lang]);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}