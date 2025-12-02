import React from "react";
import {Link} from 'react-router-dom';

const Hero = () => {
  return (
    <div className="max-w-8xl mx-auto flex flex-col gap-y-10 lg:flex-row items-center gap-x-10 justify-center lg:py-15">
      <div className="lg:w-[650px] lg:px-5 flex flex-col gap-y-5">
        <h1 className="text-4xl md:text-5xl xl:text-[50px] leading-[1.2] md:max-w-xl md:mx-auto md:text-center lg:text-left lg:mx-0 lg:max-w-full font-semibold dark:text-pink-600">
          Discover, read, and share amazing books.
        </h1>
        <p className="text-md md:max-w-xl md:mx-auto lg:mx-0 lg:max-w-full md:text-center lg:text-left dark:text-gray-700">
          With efficient services available online, you can simplify your tasks
          and save valuable time.
        </p>
        <div className="flex gap-x-5 flex-col gap-y-2.5 lg:flex-row">
          <Link
            to="#"
            className="flex w-full lg:w-fit items-center text-white justify-center rounded-lg bg-[#1053F3] px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
          >
            <span>Get started</span>
          </Link>
          <Link
            to="#"
            className="flex w-full lg:w-fit items-center text-[#1053F3] justify-center rounded-lg border border-[#6A65FF] px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200 bg-[#5138EE]/10 dark:text-white dark:bg-gray-500 dark:border-gray-500/50"
          >
            <span>Learn more</span>
          </Link>
        </div>
      </div>
      <div className="hero-image md:px-5 lg:px-0 w-full lg:w-1/2 rounded-3xl md:pt-2 lg:pt-0 relative isolate z-10">
        <img
          className="rounded-3xl w-full"
          src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8c2VydmljZXxlbnwwfDB8fHwxNzEyMjIyNjQ3fDA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Hero Image"
        />
      </div>
    </div>
  );
};

export default Hero;
