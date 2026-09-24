import React from "react";
import {review, reviewMain} from '../assets/assets.js'
const TESTIMONIALS = [
  {
    id: 1,
    name: "Asmita Shakya",
    role: "Customers",
    text: "Thank you for making our baby shower and pasni so magical! The décor was gorgeous, the coordination was flawless, and everything was perfectly organized. We truly appreciate your hard work and dedication. Highly recommended!",
    position: "top-left",
    rotate: "10deg",
    green: false,
    img: review.R1
  },
  {
    id: 2,
    name: "Biswas Ghotane",
    role: "Customers",
    text: "One of the finest wedding decor company till date for your  big day🌸.Thank you Royal wedding and event for turning our dream into reality 🙏🏻.",
    position: "bottom-left",
    rotate: "-3deg",
    green: false,
    img: review.R2
  },
  {
    id: 4,
    name: "Sila khadka",
    role: "Customers",
    text: "Highly recommend Royal wedding and events! We showed them a picture of the decor we wanted for my brother’s wedding, and they executed it flawlessly. The team is so humble, professional, and does truly excellent work!🩷",
    position: "top-right",
    rotate: "10deg",
    green: true,
    img: review.R3
  },
  {
    id: 3,
    name: "santosh acharya",
    role: "Customers",
    text: "My family and I chose Royal Wedding and Events for my sister’s engagement and wedding decoration, and we are truly happy with their work. The decoration was beautifully done and exactly how we had hoped—everything looked elegant.",
    position: "top-center",
    rotate: "-10deg",
    green: false,
    img: review.R4
  },
  {
    id: 5,
    name: "Suechha Sunam",
    role: "Customers",
    text: "Thank you for making our event so special! Every little detail was thoughtfully planned, and the atmosphere you created was beyond beautiful. Your team’s dedication, creativity, and hard work truly showed. We received so many compliments from our guests. I’m so grateful and would definitely choose you again! Royal wedding team 🙏🏼.",
    position: "bottom-right",
    rotate: "-2deg",
    green: true,
    img: review.R5
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-[1px] rounded-full bg-white px-2 py-[3px] shadow-sm">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="text-[9px] leading-none text-[#f5bd24] sm:text-[10px]"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div
      className={`
        testimonial-card
        block
        w-full
        rounded-[9px]
        px-3
        py-3
        shadow-[0_5px_18px_rgba(0,0,0,0.12)]

        sm:px-4
        sm:py-3.5

        md:absolute
        md:w-65

        lg:w-90

        ${testimonial.green ? "bg-[#c5f8e9]" : "bg-white"}

        ${testimonial.position === "top-left"
          ? "md:-left-[2%] md:top-[25%]"
          : ""
        }

${testimonial.position === "bottom-left"
          ? "md:-left-[6%] md:bottom-[15%]"
          : ""
        }

${testimonial.position === "top-center"
          ? "md:left-1/2 md:top-[6%] md:-translate-x-1/2"
          : ""
        }

${testimonial.position === "top-right"
          ? "md:right-[7%] md:top-[30%]"
          : ""
        }

${testimonial.position === "bottom-right"
          ? "md:right-[15%] md:bottom-[-30px] md:z-30"
          : ""
        }
      `}
      style={{
        "--rotation": testimonial.rotate,
      }}
    >
      {/* Header */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="Montserrat flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0a624b] text-[9px] font-semibold text-white">
            <img src={testimonial.img} alt="" />
          </div>

          <div className="leading-tight">
            <p className="Montserrat text-[9px] font-bold text-[#006044] sm:text-[10px]">
              {testimonial.name}
            </p>

            <p className="Montserrat text-[7px] text-gray-500 sm:text-[8px]">
              {testimonial.role}
            </p>
          </div>
        </div>

        <StarRating />
      </div>

      {/* Testimonial */}
      <p className="Montserrat text-[8px] leading-[1.45] text-[#12614f] sm:text-[9px]">
        {testimonial.text}
      </p>

      {/* Signature */}
      <p className="Montserrat mt-2 text-right text-[8px] text-gray-700 sm:text-[9px]">
        -{testimonial.name}
      </p>
    </div>
  );
}

export default function Review() {
  return (
    <section
      id="review"
      className="relative w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20"
    >
      {/* Heading */}
      <h2 className="text-center font-serif text-[38px] font-bold uppercase leading-none tracking-tight text-[#006044] sm:text-[48px] lg:text-[52px]">
        What Our Clients Say
      </h2>

      {/* Main testimonial area */}
      <div
        className="
          relative mx-auto mt-5
          flex w-full max-w-[1100px]
          flex-col
          gap-5

          md:block
          md:h-[650px]

          lg:mt-15
          lg:h-[600px]
        "
      >
        {/* Central Image */}
        <div
          className="
            relative
            order-first
            mx-auto
            h-[380px]
            w-full
            max-w-[430px]

            sm:h-[450px]
            sm:max-w-[500px]

            md:absolute
            md:left-1/2
            md:top-[15%]
            md:z-10
            md:h-[520px]
            md:w-[500px]
            md:-translate-x-1/2

            lg:top-[12%]
            lg:h-[530px]
            lg:w-[530px]
          "
        >
          <img
            src={reviewMain.reviewPic}
            alt="Happy couple"
            className="
              relative
              z-20
              h-full
              w-full
              scale-175
              object-contain
              grayscale
              transition-all
              duration-500
              hover:grayscale-0
              sm:scale-180
              md:scale-200
            "
          />

          {/* Bottom fade */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              h-[100px]
              w-full
              bg-gradient-to-t
              from-white
              via-white/70
              to-transparent
              md:h-[130px]
            "
          />
        </div>

        {/* Testimonials */}
        <div
          className="
            flex
            flex-col
            gap-4
            md:contents
          "
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}