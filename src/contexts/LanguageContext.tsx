import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'ca' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Hero Section
    'hero.subtitle': 'Translation Consultant',
    'hero.title': 'Precision in every word. Impact in every message.',
    'hero.languages': 'English / French',
    'hero.arrow': '→',
    'hero.target': 'Spanish / Catalan',
    'hero.tag1': 'Audiovisual Media',
    'hero.tag2': 'Cultural Translation',
    'hero.tag3': 'Tech Linguistics',
    'hero.description': 'Over a decade of delivering language solutions that connect cultures, drive performance, and power cutting-edge technology.',
    
    // Value Proposition
    'value.subtitle': 'Philosophy',
    'value.title': 'Where Culture Meets Technology to Move, Connect & Perform',
    'value.problemTitle': 'The Problem',
    'value.problem1': 'Sloppy subtitles',
    'value.problem2': 'Imprecise terminology',
    'value.problem3': 'Literal adaptations',
    'value.result1': 'Kill emotion',
    'value.result2': 'Kills performance',
    'value.result3': 'Kill engagement',
    'value.solutionTitle': 'The Solution',
    'value.solution': 'I transform your content so every message lands with full strength, resonates deeply with audiences, and integrates seamlessly with AI-driven platforms and technical systems.',
    'value.cta': "Let's Talk!",
    
    // Services
    'services.subtitle': 'Expertise',
    'services.title': 'Audiovisual, Cultural & Technical Communication',
    'services.intro': 'From scripts and shows to software and AI agents—every detail is crafted to ensure optimal experience and performance.',
    'services.heading': 'What You Get',
    'services.1.title': 'Subtitle Translation',
    'services.1.description': 'Fine-tuned timing, tone, and message to preserve emotional impact and narrative flow.',
    'services.2.title': 'Full Accessibility',
    'services.2.description': 'Live surtitling, audio description, and deaf-friendly subtitles—ensuring inclusive content for all audiences.',
    'services.3.title': 'Dubbing & Voice-Over',
    'services.3.description': 'Script adaptation and voice direction that capture every nuance and emotion authentically.',
    'services.4.title': 'Localization & Transcreation',
    'services.4.description': 'Cultural, digital, and technical adaptation that maintains brand voice while resonating locally.',
    'services.5.title': 'Language Engineering',
    'services.5.description': 'Specialized solutions for AI linguistics, software localization, industrial documentation, and technical communication.',
    
    // Partnership
    'partnership.subtitle': 'Partnership Approach',
    'partnership.title': 'Your Strategic Language Partner',
    'partnership.1.title': 'Personalized & Embedded',
    'partnership.1.description': "Seamless integration into your team's workflow and culture.",
    'partnership.2.title': 'Quality & Impact',
    'partnership.2.description': 'Precision-driven results that balance emotion with technical accuracy.',
    'partnership.3.title': 'Flexible & Fast',
    'partnership.3.description': 'Agile adaptation to tight deadlines and last-minute changes.',
    'partnership.4.title': 'Creative & Adaptive',
    'partnership.4.description': 'Innovative solutions that are both technically sound and culturally resonant.',
    'partnership.portfolioTitle': 'Complete Service Portfolio',
    'partnership.detail1.title': 'Language for Screen & Storytelling',
    'partnership.detail1.description': 'Scripts, films, series, documentaries, and digital media content.',
    'partnership.detail2.title': 'Subtitling & Accessibility',
    'partnership.detail2.description': 'Live surtitling, creative captions, SDH (deaf-friendly subtitles), and comprehensive audio descriptions.',
    'partnership.detail3.title': 'Dubbing & Voice-Over',
    'partnership.detail3.description': 'Script adaptation, precise dubbing, lip-sync matching for any audio-visual format.',
    'partnership.detail4.title': 'Transcreation & Ad Adaptation',
    'partnership.detail4.description': 'Marketing campaigns, artistic content, and creative messaging with cultural and emotional impact.',
    'partnership.detail5.title': 'Tech Linguistics',
    'partnership.detail5.description': 'AI agent training, software localization, AI fine-tuning, automotive interfaces, engineering documentation, energy sector communication.',
    
    // Testimonials
    'testimonials.subtitle': 'Testimonials',
    'testimonials.title': 'What Clients Say',
    'testimonial.1.quote': "If you're looking for more than just a straightforward translation—someone who combines expert localization with strong copyright skills—Pau is the person to choose. He truly understands how to adapt content to suit Spanish-speaking audiences perfectly. Above all, he is always punctual and a pleasure to work with.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Story Designer',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.2.quote': "We've worked with Pau on several occasions for the adaptation of theatrical texts to surtitling requirements, as well as for live surtitles operation. He has always shown professionalism, efficiency, and excellent teamwork. We're very pleased with his work and fully recommend him.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Producer',
    'testimonial.2.company': 'Sala Beckett Theatre',
    'testimonial.3.quote': 'He is a pleasure to work with. He carries out subtitling work swiftly and professionally, and shows great willingness to assist with technical matters, demonstrating commitment at all times.',
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Post-production Coordinator',
    'testimonial.3.company': 'The Moff Audiovisual Production',
    
    // Contact
    'contact.subtitle': 'Get In Touch',
    'contact.title': "Let's Create Something Exceptional",
    'contact.description': "Ready to elevate your content with precision, cultural intelligence, and technical excellence? Let's discuss how we can work together.",
    'contact.rights': '© 2026 Pau Simó. All rights reserved.',
  },
  ca: {
    // Hero Section
    'hero.subtitle': 'Ajudo organitzacions a fer sonar el seu missatge de forma nítida, genuïna i ajustada al context cultural.',
    'hero.title': 'Llenguatge estratègic per a entorns audiovisuals, tech i narrativa',
    'hero.languages': 'anglès / francès',
    'hero.arrow': '→',
    'hero.target': 'català / castellà',
    'hero.description': 'Quan el matís és crucial, la llengua és estratègia.',
    'hero.cta': 'Parlem!',
    
    // Value Proposition
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
    
    // Services
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
    'services.3.description': 'Quan la reputació va lligada al missatge, el llenguatge ha de tenir tota l’ànima.',
    'services.3.bullet1': 'Adaptació de campanyes',
    'services.3.bullet2': 'Refinament del missatge de marca',
    'services.3.bullet3': 'Presentacions i guions decisius',
    'services.3.bullet4': 'Transcreació creativa',
    'services.3.sentence': 'Per a marques que pensen globalment.',

    // Partnership
    'partnership.subtitle': 'Com treballo',
    'partnership.title': 'Encaix, rigor, compromís',
    'partnership.1.title': 'Integrat al teu equip quan calgui',
    'partnership.2.title': 'Centrat en la claredat, el resultat i la precisió cultural',
    'partnership.3.title': 'Ràpid quan la velocitat és crítica; precís quan el matís no admet negociació',
    'partnership.portfolioTitle': 'Més de 15 anys treballant estretament amb equips creatius, tècnics i directius. Més que traducció. Execució estratègica del llenguatge.',

    // Testimonials
    'testimonials.subtitle': 'Testimonis',
    'testimonials.title': 'Què Diuen els Clients',
    'testimonial.1.quote': "Si cerques més que una traducció directa —algú que combini localització experta amb sòlides habilitats de copyright— en Pau és la persona adequada. Entén de veritat com adaptar contingut per a les audiències de parla hispana. Sobretot, sempre és puntual i un plaer treballar amb ell.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Dissenyadora d\'Històries',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.2.quote': "Hem treballat amb en Pau en diverses ocasions per a l'adaptació de textos teatrals a requisits de sobretitulació, així com per a l'operació de sobretítols en directe. Sempre ha mostrat professionalitat, eficiència i excel·lent treball en equip. Estem molt contents amb la seva feina i el recomanem completament.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Productor',
    'testimonial.2.company': 'Sala Beckett',
    'testimonial.3.quote': 'És un plaer treballar amb ell. Realitza treballs de subtitulació de manera ràpida i professional, i mostra una gran disposició per ajudar en qüestions tècniques, demostrant compromís en tot moment.',
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Coordinador de Postproducció',
    'testimonial.3.company': 'The Moff Producció Audiovisual',
    
    // Contact
    'contact.subtitle': 'Contacta',
    'contact.title': 'Fem que el teu missatge arribi al món',
    'contact.description': 'En el llenguatge estan en joc la reputació i l’impacte. Per això, l’excel·lència és una obligació.',
    'contact.rights': '© 2026 Pau Simó. Tots els drets reservats.',
  },
  es: {
    // Hero Section
    'hero.subtitle': 'Consultor de Traducción',
    'hero.title': 'Precisión en cada palabra. Impacto en cada mensaje.',
    'hero.languages': 'Inglés / Francés',
    'hero.arrow': '→',
    'hero.target': 'Español / Catalán',
    'hero.tag1': 'Medios Audiovisuales',
    'hero.tag2': 'Traducción Cultural',
    'hero.tag3': 'Lingüística Técnica',
    'hero.description': 'Más de una década ofreciendo soluciones lingüísticas que conectan culturas, impulsan el rendimiento y potencian la tecnología más avanzada.',
    
    // Value Proposition
    'value.subtitle': 'Filosofía',
    'value.title': 'Donde la Cultura Encuentra la Tecnología para Emocionar, Conectar y Actuar',
    'value.problemTitle': 'El Problema',
    'value.problem1': 'Subtítulos descuidados',
    'value.problem2': 'Terminología imprecisa',
    'value.problem3': 'Adaptaciones literales',
    'value.result1': 'Matan la emoción',
    'value.result2': 'Matan el rendimiento',
    'value.result3': 'Matan el engagement',
    'value.solutionTitle': 'La Solución',
    'value.solution': 'Transformo tu contenido para que cada mensaje llegue con toda su fuerza, resuene profundamente con las audiencias y se integre perfectamente con plataformas impulsadas por IA y sistemas técnicos.',
    'value.cta': '¡Hablemos!',
    
    // Services
    'services.subtitle': 'Experiencia',
    'services.title': 'Comunicación Audiovisual, Cultural y Técnica',
    'services.intro': 'Desde guiones y shows hasta software y agentes de IA: cada detalle está pensado para garantizar una experiencia y rendimiento óptimos.',
    'services.heading': 'Qué Obtendrás',
    'services.1.title': 'Traducción de Subtítulos',
    'services.1.description': 'Sincronización precisa de tiempo, tono y mensaje para preservar el impacto emocional y el flujo narrativo.',
    'services.2.title': 'Accesibilidad Completa',
    'services.2.description': 'Sobretitulado en vivo, audiodescripción y subtítulos para personas sordas: garantizando contenido inclusivo para todas las audiencias.',
    'services.3.title': 'Doblaje y Voz en Off',
    'services.3.description': 'Adaptación de guiones y dirección de voz que capturan cada matiz y emoción de forma auténtica.',
    'services.4.title': 'Localización y Transcreación',
    'services.4.description': 'Adaptación cultural, digital y técnica que mantiene la voz de marca mientras resuena localmente.',
    'services.5.title': 'Ingeniería Lingüística',
    'services.5.description': 'Soluciones especializadas para lingüística de IA, localización de software, documentación industrial y comunicación técnica.',
    
    // Partnership
    'partnership.subtitle': 'Enfoque de Colaboración',
    'partnership.title': 'Tu Socio Lingüístico Estratégico',
    'partnership.1.title': 'Personalizado e Integrado',
    'partnership.1.description': 'Integración perfecta en el flujo de trabajo y la cultura de tu equipo.',
    'partnership.2.title': 'Calidad e Impacto',
    'partnership.2.description': 'Resultados impulsados por la precisión que equilibran emoción y exactitud técnica.',
    'partnership.3.title': 'Flexible y Rápido',
    'partnership.3.description': 'Adaptación ágil a plazos ajustados y cambios de último momento.',
    'partnership.4.title': 'Creativo y Adaptable',
    'partnership.4.description': 'Soluciones innovadoras que son técnicamente sólidas y culturalmente resonantes.',
    'partnership.portfolioTitle': 'Portafolio Completo de Servicios',
    'partnership.detail1.title': 'Lenguaje para Pantalla y Narrativa',
    'partnership.detail1.description': 'Guiones, películas, series, documentales y contenido de medios digitales.',
    'partnership.detail2.title': 'Subtitulado y Accesibilidad',
    'partnership.detail2.description': 'Sobretitulado en vivo, subtítulos creativos, SPS (subtítulos para personas sordas) y audiodescripciones completas.',
    'partnership.detail3.title': 'Doblaje y Voz en Off',
    'partnership.detail3.description': 'Adaptación de guiones, doblaje preciso, sincronización labial para cualquier formato audiovisual.',
    'partnership.detail4.title': 'Transcreación y Adaptación Publicitaria',
    'partnership.detail4.description': 'Campañas de marketing, contenido artístico y mensajes creativos con impacto cultural y emocional.',
    'partnership.detail5.title': 'Lingüística Técnica',
    'partnership.detail5.description': 'Entrenamiento de agentes de IA, localización de software, ajuste fino de IA, interfaces de automoción, documentación de ingeniería, comunicación del sector energético.',
    
    // Testimonials
    'testimonials.subtitle': 'Testimonios',
    'testimonials.title': 'Qué Dicen los Clientes',
    'testimonial.1.quote': "Si buscas más que una traducción directa —alguien que combine localización experta con sólidas habilidades de copyright— Pau es la persona adecuada. Entiende realmente cómo adaptar contenido para las audiencias de habla hispana. Por encima de todo, siempre es puntual y un placer trabajar con él.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Diseñadora de Historias',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.2.quote': "Hemos trabajado con Pau en varias ocasiones para la adaptación de textos teatrales a requisitos de sobretitulado, así como para la operación de sobretítulos en directo. Siempre ha mostrado profesionalidad, eficiencia y excelente trabajo en equipo. Estamos muy contentos con su trabajo y lo recomendamos completamente.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Productor',
    'testimonial.2.company': 'Sala Beckett',
    'testimonial.3.quote': 'Es un placer trabajar con él. Realiza trabajos de subtitulado de manera rápida y profesional, y muestra una gran disposición para ayudar en cuestiones técnicas, demostrando compromiso en todo momento.',
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Coordinador de Postproducción',
    'testimonial.3.company': 'The Moff Producción Audiovisual',
    
    // Contact
    'contact.subtitle': 'Contacta',
    'contact.title': 'Creemos Algo Excepcional',
    'contact.description': '¿Listo para elevar tu contenido con precisión, inteligencia cultural y excelencia técnica? Hablemos de cómo podemos trabajar juntos.',
    'contact.rights': '© 2026 Pau Simó. Todos los derechos reservados.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

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
