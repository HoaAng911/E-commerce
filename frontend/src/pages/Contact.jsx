import React from "react";

const Contact = () => {
  return (
    <div className="font-outfit text-base pt-10 border-t">
      {/* CONTACT US căn giữa */}
      <div className="text-center">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500 text-2xl">
            CONTACT <span className="text-gray-700 font-medium">US</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {/* Nội dung căn trái */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src="/images/contact_img.png"
          alt="Contact"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station
            <br />
            Suite 350, Washington, USA
          </p>

          <p className="text-gray-500">
            Tel: (415) 555-0132
            <br />
            Email: admin@forever.com
          </p>

          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
