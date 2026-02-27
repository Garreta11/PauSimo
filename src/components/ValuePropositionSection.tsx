import { motion } from 'motion/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLanguage } from '../contexts/LanguageContext';



export function ValuePropositionSection() {
  const { t } = useLanguage();
  
  const problems = [
    { issue: t('value.problem1'), result: t('value.result1') },
    { issue: t('value.problem2'), result: t('value.result2') },
    { issue: t('value.problem3'), result: t('value.result3') },
    { issue: t('value.problem4'), result: t('value.result4') },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* <p className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-6">{t('value.subtitle')}</p> */}
          <h2 className="text-5xl lg:text-6xl leading-[1.1] max-w-4xl mx-auto" style={{fontFamily: 'Playfair Display, serif'}}>
            {t('value.title')}
          </h2>
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-12">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-sm tracking-[0.2em] uppercase text-slate-900 mb-6">{t('value.problemTitle')}</h3>
            {problems.map((problem, index) => (
              <motion.div 
                key={index}
                className="border-l-2 border-slate-300 pl-8 hover:border-slate-900 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-lg">
                  <span className="text-slate-900">{problem.issue}</span>
                  {/* <span className="text-slate-400 mx-3">→</span> */}
                  <span className="italic text-slate-600">{problem.result}</span>
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="border-l-2 border-slate-900 pl-8 py-6 bg-white/50">
              <h3 className="text-sm tracking-[0.2em] uppercase text-slate-900 mb-4">{t('value.solutionTitle')}</h3>
              <p className="text-xl text-slate-800 leading-relaxed">
                {t('value.solution')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
