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
      <div className="py-20 max-w-4xl mx-auto">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <div className="relative overflow-hidden">
                <img
                  src={image.url}
                  alt={image.label}
                  className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-8 left-8">
                  <span className="text-6xl font-bold text-white/90 drop-shadow-2xl" style={{fontFamily: 'Playfair Display, serif'}}>
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