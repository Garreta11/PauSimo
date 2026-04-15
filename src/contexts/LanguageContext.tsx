import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const ADMIN_STORAGE_KEY = 'pausimo_content';

export type Language = 'en' | 'ca' | 'es' | 'fr';

function readOverrides(): Partial<Record<Language, Record<string, string>>> {
  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const defaultTranslations: Record<Language, Record<string, string>> = {
  en: {
    // Hero Section
    'hero.title': 'Strategic language<br/>for narrative,<br/>product & AI',
    'hero.subtitle': 'I help organizations sound sharp, authentic and culturally intelligent across screens, stages and markets.',
    'hero.languages': 'English · French',
    'hero.arrow': '→',
    'hero.target': 'Spanish · Catalan',
    'hero.description': '15+ years working with creative, technical and executive stakeholders across industries. More than translation. Strategic language execution.',
    'hero.cta': 'Tell me about your project',
    
    // Value Proposition
    'value.subtitle': 'Filosofia',
    'value.title': 'Where language shapes performance',
    'value.problemTitle': 'The Problem',
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
    'services.heading-text': 'I’ve worked with global brands, product teams and stage creators. Very different contexts, with one shared demand: that their voice, in whatever language, conveys their true essence.',
    'services.1.title': 'Narrative & Audiovisual',
    'services.1.description': 'Emotion travels through language. Finesse makes it land.',
    'services.1.bullet1': 'Cultural adaptation for international audiences',
    'services.1.bullet2': 'Script adaptation',
    'services.1.bullet3': 'Subtitling & surtitling (broadcast, streaming, live)',
    'services.1.bullet4': 'Dubbing & voice-over',
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
    'partnership.portfolioTitle': 'When nuance matters, wording is strategy.',

    // Testimonials
    'testimonials.subtitle': 'Testimonials',
    'testimonials.title': 'What Clients Say',
    'testimonial.1.description': "Ongoing EN→ES localisation of children's stories reimagining classic tales for contemporary issues. Beyond translation: active involvement in tone decisions, audience fit and brand consistency. A working example of strategic language support from the inside out.",
    'testimonial.1.quote': "If you're looking for more than just a straightforward translation—someone who combines expert localisation with strong copyright skills—Pau is the person to choose. He truly understands how to adapt content to suit Spanish-speaking audiences perfectly. Above all, he is always punctual and a pleasure to work with.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Story Designer',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.1.link': 'https://twistedtales.tv/',
    'testimonial.2.description': "Live surtitling in English for a fast-paced comedy with overlapping dialogue and near-simultaneous exchanges. The challenge: keeping anglophone audiences engaged and reading comfortably when the stage tempo leaves no room for error. The result: a seamless performance and an accessible experience from start to finish.",
    'testimonial.2.quote': "We've worked with Pau on several occasions for the adaptation of theatrical texts to surtitling requirements, as well as for live surtitles operation. He has always shown professionalism, efficiency, and excellent teamwork. We're very pleased with his work and fully recommend him.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Producer',
    'testimonial.2.company': 'Sala Beckett',
    'testimonial.2.link': 'https://www.salabeckett.cat/',
    'testimonial.3.description': "Translation and subtitling into Spanish for a documentary on a medical foundation's work in Africa. Adapted for a general audience, balancing concision with the emotional weight of personal testimonies. Precision and sensitivity, in equal measure.",
    'testimonial.3.quote': 'He is a pleasure to work with. He carries out subtitling work swiftly and professionally, and shows great willingness to assist with technical matters, demonstrating commitment at all times.',
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Post-production Coordinator',
    'testimonial.3.company': 'The Moff Audiovisual Production Company',
    'testimonial.3.link': 'https://www.themoff.es/',
    
    // Contact
    'contact.subtitle': 'Contact',
    'contact.title': 'Tell me about your project. I’ll get back to you within 1 hour.',
    'contact.description': 'If language carries risk, reputation or performance<br/>— let’s get it right.<br/><br/>Let’s make your message move the world.',
    'contact.rights': '© 2026 Pau Simó. All rights reserved.',
  },
  ca: {
    // Hero Section
    'hero.subtitle': 'Ajudo organitzacions a fer sonar el seu missatge de forma nítida, genuïna i ajustada al context cultural.',
    'hero.title': 'Llenguatge estratègic<br/>per a narrativa,<br/>producte i IA',
    'hero.languages': 'anglès · francès',
    'hero.arrow': '→',
    'hero.target': 'català · castellà',
    'hero.description': 'Més de 15 anys treballant estretament amb equips creatius, tècnics i directius. Més que traducció. Execució estratègica del llenguatge.',
    'hero.cta': 'Explica\'m el teu projecte',
    
    // Value Proposition
    'value.subtitle': 'Filosofia',
    'value.title': 'Les paraules determinen l’impacte',
    'value.problemTitle': 'El Problema',
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
    'services.heading-text': 'He treballat amb marques globals, equips de producte i creadors escènics. Contextos molt diferents, amb una exigència compartida: que la seva veu, sigui en l’idioma que sigui, comuniqui la seva veritable essència.',
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
    'services.3.description': 'Quan la reputació va lligada al missatge,<br/>el llenguatge ha de tenir tota l\'ànima.',
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
    'partnership.portfolioTitle': 'Quan el matís és crucial, la llengua és estratègia.',
    
    // Testimonials
    'testimonials.subtitle': 'Testimonis',
    'testimonials.title': 'Què Diuen els Clients',
    'testimonial.1.description': "Col·laboració continuada en la localització de l’anglès al castellà de contes infantils amb relectures de clàssics. Més que traducció: implicació en decisions de to, adequació al públic i coherència de marca. Un exemple de com el llenguatge estratègic acompanya un projecte des de dins.",
    'testimonial.1.quote': "Si busques alguna cosa més que una traducció convencional —algú que combini localització experta amb solidesa en la redacció— el Pau és la persona indicada. Entén perfectament com adaptar continguts per al públic de parla hispana. A més a més, és sempre puntual i és un plaer treballar amb ell.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Story Designer',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.1.link': 'https://twistedtales.tv/',
    'testimonial.2.description': "Adaptació i operació en directe dels sobretítols en anglès d'una comèdia de ritme trepidant, amb diàleg superposat i intervencions simultànies. El repte: mantenir la llegibilitat i la complicitat del públic anglòfon en una obra on el tempo escènic no perdona. Resultat: una funció fluida i una experiència accessible sense interrupcions.",
    'testimonial.2.quote': "Hem comptat amb en Pau en diverses ocasions per a l'adaptació de textos teatrals al criteri de la sobretitulació, així com per a l'operació de sobretítols en directe. Sempre ha demostrat professionalitat, eficiència i una excel·lent col·laboració amb l'equip. Estem molt contents amb la seva feina i el recomanem plenament.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Productora',
    'testimonial.2.company': 'Sala Beckett',
    'testimonial.2.link': 'https://www.salabeckett.cat/',
    'testimonial.3.description': "Traducció i subtitulació al castellà d'un documental sobre el treball d'una fundació mèdica a l'Àfrica. Adaptació pensada per a un públic no especialitzat, amb criteris de síntesi que preserven l'impacte emocional dels testimonis. Un projecte on la precisió i la sensibilitat van de la mà.",
    'testimonial.3.quote': 'És un plaer treballar amb ell. Realitza la subtitulació amb rapidesa i professionalitat. A més mostra una gran disposició per ajudar en la resolució de qüestions tècniques demostrant compromís en tot moment.',
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Coordinador de Postproducció',
    'testimonial.3.company': 'The Moff Producció Audiovisual',
    'testimonial.3.link': 'https://www.themoff.es/',
    
    // Contact
    'contact.subtitle': 'Contacta',
    'contact.title': 'Explica’m el teu projecte. Tindràs resposta en 1 hora.',
    'contact.description': 'En el llenguatge estan en joc la reputació i l’impacte.<br/>Per això, l’excel·lència és una obligació.<br/><br/>Fem que el teu missatge arribi al món.',
    'contact.rights': '© 2026 Pau Simó. Tots els drets reservats.',
  },
  es: {
    // Hero Section
    'hero.title': 'Lenguaje estratégico<br/>para narrativa,<br/>producto e IA',
    'hero.subtitle': 'Ayudo a organizaciones a comunicar de forma nítida, genuina y ajustada al contexto cultural.',
    'hero.languages': 'inglés · francés',
    'hero.arrow': '→',
    'hero.target': 'español · catalán',
    'hero.description': 'Más de 15 años trabajando codo con codo con equipos creativos, técnicos y directivos. Más que traducción. Ejecución estratégica del lenguaje.',
    'hero.cta': 'Explícame tu proyecto',
    
    // Value Proposition
    'value.subtitle': 'Filosofia',
    'value.title': 'Las palabras determinan el impacto',
    'value.problemTitle': 'El Problema',
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
    
    // Services
    'services.heading': 'Tres áreas principales',
    'services.heading-text': 'He trabajado con marcas globales, equipos de producto y creadores escénicos. Contextos muy diferentes, con una exigencia compartida: que su voz, sea en el idioma que sea, comunique su verdadera esencia.',
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
    
    // Partnership
    'partnership.subtitle': 'Cómo trabajo',
    'partnership.title': 'Encaje, rigor, compromiso',
    'partnership.1.title': 'Integrado en tu equipo cuando hace falta',
    'partnership.2.title': 'Centrado en la claridad, el resultado y la precisión cultural',
    'partnership.3.title': 'Ágil cuando la velocidad es crítica; preciso cuando el matiz no admite negociación',
    'partnership.portfolioTitle': 'Cuando el matiz es crucial, la lengua es estrategia.',
    
    // Testimonials
    'testimonials.subtitle': 'Testimonios',
    'testimonials.title': 'Qué dicen los clientes',
    'testimonial.1.description': "Colaboración continuada en la localización del inglés al español de cuentos infantiles con relecturas de clásicos. Más que traducción: implicación en decisiones de tono, adecuación al público y coherencia de marca. Un ejemplo de cómo el lenguaje estratégico acompaña un proyecto desde dentro.",
    'testimonial.1.quote': "Si buscas algo más que una traducción convencional —alguien que combine localización experta con solidez en la redacción— Pau es la persona indicada. Entiende perfectamente cómo adaptar contenidos para el público de habla hispana. además, siempre es puntual y es un placer trabajar con él.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Diseñadora de Historias',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.1.link': 'https://twistedtales.tv/',

    'testimonial.2.description': "Adaptación y operación en directo de los sobretítulos en inglés de una comedia de ritmo trepidante, con diálogo superpuesto e intervenciones simultáneas. El reto: mantener la legibilidad y la complicidad del público anglófono en una obra donde el tempo escénico no perdona. Resultado: una función fluida y una experiencia accesible sin interrupciones.",
    'testimonial.2.quote': "Hemos colaborado con Pau en varias ocasiones para la adaptación de textos teatrales al criterio de la sobretitulación, así como para la operación de sobretítulos en directo. Siempre ha demostrado profesionalidad, eficiencia y una excelente colaboración en equipo. estamos muy contentos con su trabajo y lo recomendamos plenamente.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Productora',
    'testimonial.2.company': 'Sala Beckett',
    'testimonial.2.link': 'https://www.salabeckett.cat/',
    'testimonial.3.description': 'Traducción y subtitulación al español de un documental sobre el trabajo de una fundación médica en África. Adaptación pensada para un público no especializado, con criterios que preservan el impacto emocional de los testimonios. Un proyecto donde la precisión y la sensibilidad van de la mano.',
    'testimonial.3.quote': 'Es un placer trabajar con él. Realiza la subtitulación con rapidez y profesionalidad. Además demuestra una gran disposición por ayudar a resolver cuestiones técnicas y demuestra compromiso en todo momento.',
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Coordinador de Postproducción',
    'testimonial.3.company': 'The Moff Producción Audiovisual',
    'testimonial.3.link': 'https://www.themoff.es/',
    
    // Contact
    'contact.subtitle': 'Contacta',
    'contact.title': 'Explícame tu proyecto. Tendrás respuesta en 1 hora.',
    'contact.description': 'En el lenguaje están en juego la reputación y el impacto.<br/>Por eso, la excelencia es una obligación.<br/><br/>Hagamos que tu mensaje llegue al mundo.',
    'contact.rights': '© 2026 Pau Simó. Todos los derechos reservados.',
  },
  fr: {
    // Hero Section
    'hero.title': "Langage stratégique<br/>pour la narration,<br/>le produit et l'IA",
    'hero.subtitle': "J’aide les organisations à faire résonner leur message avec justesse, authenticité et intelligence culturelle à travers écrans, scènes et marchés.",
    'hero.languages': 'anglais · français',
    'hero.arrow': '→',
    'hero.target': 'espagnol · catalan',
    'hero.description': 'Plus de 15 ans aux côtés d’équipes créatives, techniques et de direction, tous secteurs confondus. Bien plus que de la traduction. Une exécution stratégique du langage.',
    'hero.cta': 'Parlez-moi de votre projet',
    
    // Value Section
    'value.subtitle': 'Philosophie',
    'value.title': "Les mots déterminent l’impact",
    'value.problemTitle': 'Le problème',
    'value.problem1': 'Une localisation plate ',
    'value.problem2': 'Un sous-titrage médiocre ',
    'value.problem3': 'Une terminologie imprécise ',
    'value.problem4': 'Une IA non affinée ',
    'value.result1': "réduit l’immersion.",
    'value.result2': "brise l'émotion.",
    'value.result3': 'affaiblit la réputation.',
    'value.result4': 'érode la confiance.',
    'value.solutionTitle': 'La solution',
    'value.solution': 'Je définis la voix de vos contenus, de votre produit ou de votre marque, quel que soit le canal.',
    
    // Services Section
    'services.heading': 'Trois domaines clés',
    'services.heading-text': 'J’ai travaillé avec des marques internationales, des équipes produit et des créateurs de scène. Des contextes très différents, avec une exigence commune : que leur voix, quelle que soit la langue, transmette leur véritable essence.',
    'services.1.title': 'Narrative et audiovisuel',
    'services.1.description': "L’émotion voyage à travers le langage. La délicatesse la fait atterrir",
    'services.1.bullet1': 'Adaptation culturelle pour des publics internationaux',
    'services.1.bullet2': 'Traduction de scripts',
    'services.1.bullet3': 'Sous-titrage et surtitrage (diffusion, streaming, direct)',
    'services.1.bullet4': 'Doublage et voix off',
    'services.1.bullet5': 'Accessibilité (SME, audiodescription)',
    'services.1.sentence': 'Pour les sociétés de production, les théâtres, les médias numériques et les studios créatifs.',

    'services.2.title': 'Langage produit, tech et IA',
    'services.2.description': 'Votre produit parle. Faites-le parler avec clarté.',
    'services.2.bullet1': 'Révision et ajustement de l’IA',
    'services.2.bullet2': 'Localisation de logiciels et de produits',
    'services.2.bullet3': 'Affinage du ton UX et du microcopy',
    'services.2.bullet4': 'Systèmes terminologiques',
    'services.2.bullet5': 'Contenus techniques et industriels',
    'services.2.bullet6': 'QA linguistique et directives qualité',
    'services.2.sentence': "Pour les entreprises SaaS, technologiques, les équipes produit et les plateformes pilotées par l’IA.",

    'services.3.title': 'Communication stratégique et transcréation',
    'services.3.description': 'Quand le message engage la réputation, le langage doit avoir toute son âme.',
    'services.3.bullet1': 'Adaptation de campagnes',
    'services.3.bullet2': 'Affinage du message de marque',
    'services.3.bullet3': 'Présentations et scripts décisifs',
    'services.3.bullet4': 'Transcréation créative',
    'services.3.sentence': "Pour les marques qui pensent à l’échelle mondiale.",
    
    // Partnership Section
    'partnership.subtitle': 'Ma méthode',
    'partnership.title': 'Intégration, rigueur, engagement',
    'partnership.1.title': "Intégré à votre équipe quand il le faut",
    'partnership.2.title': 'Centré sur la clarté, le résultat et la précision culturelle',
    'partnership.3.title': 'Rapide quand la vitesse est critique ; précis quand la nuance n’admet aucune négociation',
    'partnership.portfolioTitle': "Quand la nuance est cruciale, la langue est stratégie.",
    
    // Tetsimonials Section
    'testimonials.subtitle': 'Témoignages',
    'testimonials.title': 'Ce que disent les clients',
    
    'testimonial.1.description': "Collaboration continue pour la localisation EN→ES de contes pour enfants revisitant des classiques. Bien plus que de la traduction : implication dans les décisions de ton, l’adéquation au public et la cohérence de marque. Un exemple de la façon dont le langage stratégique accompagne un projet de l’intérieur.",
    'testimonial.1.quote': "Si vous cherchez plus qu'une simple traduction — quelqu'un qui allie une localisation experte à une vraie maîtrise de l'écriture —, Pau est la personne qu'il vous faut. Il comprend parfaitement comment adapter les contenus pour un public hispanophone. Il est toujours ponctuel et très agréable à côtoyer.",
    'testimonial.1.author': 'Sara Božanić',
    'testimonial.1.role': 'Story Designer',
    'testimonial.1.company': 'Twisted Tales TV',
    'testimonial.1.link': 'https://twistedtales.tv/',
    
    'testimonial.2.description': "Adaptation et opération en direct des surtitres en anglais d’une comédie au rythme effréné, avec dialogues qui se chevauchent et répliques quasi simultanées. Le défi : maintenir la lisibilité et la complicité du public anglophone dans une œuvre où le tempo scénique ne pardonne pas. Le résultat : une représentation fluide et une expérience accessible sans interruption.",
    'testimonial.2.quote': "Nous avons fait appel à Pau à plusieurs reprises pour l'adaptation de textes théâtraux aux exigences du surtitrage, ainsi que pour l'opération de surtitres en direct. Il a toujours fait preuve de professionnalisme, d'efficacité et d'un excellent esprit d'équipe. Nous sommes très satisfaits de son travail et le recommandons chaleureusement.",
    'testimonial.2.author': 'Àlex Batlle',
    'testimonial.2.role': 'Producteur',
    'testimonial.2.company': 'Sala Beckett',
    'testimonial.2.link': 'https://www.salabeckett.cat/',
    
    'testimonial.3.description': "Traduction et sous-titrage en espagnol d’un documentaire sur le travail d’une fondation médicale en Afrique. Adaptation pour un public non spécialisé, avec des critères de synthèse qui préservent l’impact émotionnel des témoignages. Un projet où précision et sensibilité vont de pair.",
    'testimonial.3.quote': "C'est un vrai plaisir de travailler avec lui. Il réalise les sous-titrages avec rapidité et professionnalisme, et fait preuve d'une grande disponibilité pour résoudre les questions techniques, en s'impliquant à chaque instant.",
    'testimonial.3.author': 'Roger Padrós',
    'testimonial.3.role': 'Coordinateur de postproduction',
    'testimonial.3.company': 'The Moff Audiovisual Production Company',
    'testimonial.3.link': 'https://www.themoff.es/',
    
    // Contact Section
    'contact.subtitle': 'Contact',
    'contact.title': 'Parlez-moi de votre projet. Je vous réponds sous 1 heure.',
    'contact.description': "Quand le langage engage la réputation et l'impact,<br/>l'excellence n'est pas une option.<br/><br/>Faisons que votre message touche le monde.",
    'contact.rights': '© 2026 Pau Simó. Tous droits réservés.',
  },
};

// Map URL path prefix → language
export const PATH_TO_LANG: Record<string, Language> = {
  '':    'en',
  'cat': 'ca',
  'es':  'es',
  'fr':  'fr',
};

export const LANG_TO_PATH: Record<Language, string> = {
  en: '/',
  ca: '/cat',
  es: '/es',
  fr: '/fr',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [overrides, setOverrides] = useState(readOverrides);

  useEffect(() => {
    const refresh = () => setOverrides(readOverrides());
    window.addEventListener('pausimo:content-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('pausimo:content-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  // Derive language from the current URL
  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  const language: Language = PATH_TO_LANG[segment] ?? 'en';

  const setLanguage = (lang: Language) => {
    navigate(LANG_TO_PATH[lang]);
  };

  const t = (key: string): string => {
    return overrides[language]?.[key] ?? defaultTranslations[language]?.[key] ?? defaultTranslations['en'][key] ?? key;
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