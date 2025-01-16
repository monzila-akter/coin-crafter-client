import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";


const Hero = () => {
  const animationSettings = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  return (
    <div className="hero-section bg-indigo-500 text-white">
      <div className="">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={5000}
          transitionTime={1000}
        >
          {/* Slide 1 */}
          <div className="relative">
            <img
              src="https://i.ibb.co.com/YLpRwV7/1675240007668.jpg"
              alt="Empower Your Development"
              className="w-full h-96 md:h-[500px] object-cover rounded-lg"
            />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center"
              {...animationSettings}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-yellow-300">
                Empower Your Development
              </h1>
              <p className="text-lg md:text-xl text-white">
                Collaborate with developers and craft efficient projects.
              </p>
            </motion.div>
          </div>

          {/* Slide 2 */}
          <div className="relative">
            <img
              src="https://i.ibb.co.com/p4QF6yC/istockphoto-1053065032-612x612.jpg"
              alt="Unlock New Opportunities"
              className="w-full h-96 md:h-[500px] object-cover rounded-lg"
            />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center"
              {...animationSettings}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-yellow-300">
                Unlock New Opportunities
              </h1>
              <p className="text-lg md:text-xl text-white">
                Discover coins and contribute to exciting projects.
              </p>
            </motion.div>
          </div>

          {/* Slide 3 */}
          <div className="relative">
            <img
              src="https://i.ibb.co.com/7GS9cBP/images-28.jpg"
              alt="Join Our Developer Community"
              className="w-full h-96 md:h-[500px] object-cover rounded-lg"
            />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center"
              {...animationSettings}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-yellow-300">
                Join Our Developer Community
              </h1>
              <p className="text-lg md:text-xl text-white">
                Collaborate, share, and grow with a passionate community.
              </p>
            </motion.div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
