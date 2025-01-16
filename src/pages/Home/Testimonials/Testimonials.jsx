import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import '@smastrom/react-rating/style.css'; // Import rating styles

const Testimonials = () => {

    // Static testimonial data
    const testimonials = [
        {
            name: "John Doe",
            photo: "https://i.ibb.co/8rWSgPF/face-smiling-indian-man-130568-534.jpg",
            review: "This is the best service I've ever used. Highly recommend to everyone!",
            rating: 5
        },
        {
            name: "Jane Smith",
            photo: "https://i.ibb.co/5RS2ytQ/man-perfect-brilliant-smile-unshaven-face-defocused-background-guy-happy-emotional-expression-outdoo.webp",
            review: "An incredible experience from start to finish. Amazing customer support!",
            rating: 4
        },
        {
            name: "Samuel Lee",
            photo: "https://i.ibb.co/W0N9772/istockphoto-1205742669-612x612.jpg",
            review: "Fast and reliable. Would definitely use the service again.",
            rating: 4.5
        }
    ];

    return (
        <section className="container mx-auto px-5 md:px-10 lg:px-14 mb-10 md:mb-24">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-indigo-500 mb-3">TESTIMONIALS</h2>
                <p className="text-lg text-gray-500">Here's what some of our happy clients have to say!</p>
            </div>

            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                spaceBetween={50}
                slidesPerView={1}
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} className="flex flex-col items-center text-center px-5 py-7 bg-indigo-50 rounded-lg shadow-lg">
                        <div className="flex justify-center mb-6 mt-4">
                            <img 
                                src={testimonial.photo} 
                                alt={`${testimonial.name} photo`} 
                                className="w-24 h-24 object-cover rounded-full border-4 border-indigo-500"
                            />
                        </div>
                       <div className="w-full flex justify-center">
                       <p className="text-4xl text-gray-600 mt-4 mb-8">
                            <FaQuoteLeft className="text-center"></FaQuoteLeft>
                        </p>
                       </div>
                        <p className="text-lg text-gray-700 mb-3">{testimonial.review}</p>
                        <h3 className="text-2xl font-semibold text-indigo-500">{testimonial.name}</h3>
                        {/* Updated Rating */}
                        <div className="w-full flex justify-center mt-4 mb-4">
                            
                        <Rating
                            style={{ maxWidth: 150 }}
                            value={testimonial.rating}
                            readOnly
                        />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;
