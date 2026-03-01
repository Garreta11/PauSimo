import { motion } from 'motion/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const carouselImages = [
  {
    url: "/culture.jpg",
    label: "Culture"
  },
  {
    url: "https://images.unsplash.com/photo-1587090564077-c7b8f2f1249e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwbWVkaWElMjBwcm9kdWN0aW9uJTIwc3R1ZGlvfGVufDF8fHx8MTc3MTU4MzE2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "Media"
  },
  {
    url: "/tech.jpg",
    label: "Tech"
  }
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export function CarouselSection() {
  return (
    <motion.div 
      className="mx-auto bg-[#fdf8ed]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <div className="relative overflow-hidden">
                <img
                  src={image.url}
                  alt={image.label}
                  className="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8">
                  <span
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 drop-shadow-2xl"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {image.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};