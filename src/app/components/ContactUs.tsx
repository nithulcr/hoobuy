"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useStaggeredFadeUp } from "./useStaggeredFadeUp";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
export default function ContactSection() {
  gsap.registerPlugin(ScrollTrigger);

  const fadeRef = useRef<HTMLHeadingElement>(null);
  useStaggeredFadeUp(fadeRef as React.RefObject<HTMLElement>);
  return (
    <>
      <section className="py-14 lg:py-24  rounded-3xl relative top-shape overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="relative flex justify-center  lg:flex h-full">

              <Image
                src="/about.jpg"
                alt="Business for Success"
                width={1000}
                height={1000}
                className="object-cover f-full w-full rounded-[16px] mx-auto max-w-[600px] max-h-[600px]"
              />


            </div>
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }} className="heading flex flex-col gap-4   mb-10">

                <div className="flex items-center gap-2 text-site mb-3 uppercase text-xs lg:text-sm justify-center md:justify-start">
                  <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.0742 0.86853L16.0966 5.58161L19.6848 0.86853H17.0742ZM24.7565 1.85392L18.6755 8.84619L24.7565 6.31989V1.85392ZM9.19522 4.23193C9.16211 4.23246 9.12956 4.23372 9.0968 4.23525C8.61387 4.2575 8.16395 4.37421 7.79238 4.63566C6.93093 5.24169 7.21881 6.59506 6.63559 7.96289C4.64293 12.636 2.62996 16.0252 0.851196 18.5263V23.9777C3.97841 22.8521 8.63611 21.6856 15.4428 21.4513C16.8711 21.4023 17.9681 22.1148 18.8246 21.5124C20.939 20.0249 20.1735 15.0541 17.1346 10.3953C16.9446 10.1042 16.7677 9.80785 16.5696 9.53342C14.193 6.24142 11.282 4.20287 9.19511 4.23203L9.19522 4.23193ZM8.92227 5.52392C8.57919 6.25656 8.90135 7.83685 9.73162 9.78222C9.46959 8.79999 9.49356 8.08723 9.86807 7.85083C10.6869 7.33392 12.8669 9.28388 14.7367 12.2064C16.6065 15.1287 17.4582 17.917 16.6395 18.4339C16.3026 18.6466 15.7351 18.4412 15.0541 17.923C16.4616 19.4045 17.732 20.2702 18.512 20.2252C18.4214 20.3924 18.3254 20.5545 18.1819 20.6554C16.8159 21.6165 13.5225 19.0602 10.8361 14.942C8.14973 10.8237 7.0849 6.69747 8.45092 5.73649C8.59092 5.63809 8.74463 5.55055 8.92227 5.52392ZM24.7565 11.6181L20.456 13.0649L24.7565 13.7423V11.6181Z" fill="#09424D" />
                  </svg>
                  Get in touch
                </div>
                <h2 ref={fadeRef} className="text-center md:text-left fade-up-stagger text-3xl lg:text-[36px] max-w-[600px] font-medium mb-1 leading-tight text-site">
                  Have Questions?<br></br>Our Team is Ready Anytime
                </h2>
                <p className="text-md  leading-snug  font-light  max-w-[560px]">
                  Got questions or need guidance? Our team is always ready to help you take the next step—whether it&apos;s a quick inquiry or a full project discussion.
                </p>
                  <ul className="grid xl:grid-cols-2 gap-4 mt-6">
                <li className="flex items-center  gap-4 bg-white rounded-2xl p-6 ">
                  <span className="border border-[var(--siteColor)] p-2 rounded-full  w-16 h-16 flex items-center justify-center">
                    <svg width="34" height="34" viewBox="0 0 39 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.4158 45.0905C16.7288 46.1738 18.0982 47.164 19.5 48.1303C20.9049 47.1768 22.2675 46.1626 23.5842 45.0905C25.779 43.2883 27.8446 41.3342 29.7657 39.2427C34.1943 34.4002 39 27.3802 39 19.5C39 16.9392 38.4956 14.4035 37.5157 12.0377C36.5357 9.67182 35.0993 7.52216 33.2886 5.71142C31.4778 3.90067 29.3282 2.46432 26.9623 1.48435C24.5965 0.504382 22.0608 0 19.5 0C16.9392 0 14.4035 0.504382 12.0377 1.48435C9.67182 2.46432 7.52216 3.90067 5.71142 5.71142C3.90068 7.52216 2.46432 9.67182 1.48435 12.0377C0.504382 14.4035 -3.81585e-08 16.9392 0 19.5C0 27.3802 4.80567 34.398 9.23433 39.2427C11.1553 41.335 13.2209 43.2876 15.4158 45.0905ZM19.5 26.5417C17.6324 26.5417 15.8414 25.7998 14.5208 24.4792C13.2002 23.1586 12.4583 21.3676 12.4583 19.5C12.4583 17.6324 13.2002 15.8414 14.5208 14.5208C15.8414 13.2002 17.6324 12.4583 19.5 12.4583C21.3676 12.4583 23.1586 13.2002 24.4792 14.5208C25.7998 15.8414 26.5417 17.6324 26.5417 19.5C26.5417 21.3676 25.7998 23.1586 24.4792 24.4792C23.1586 25.7998 21.3676 26.5417 19.5 26.5417Z" fill="#09424D" />
                    </svg>



                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-site text-lg">Our Location</span>
                    <span className="text-1 text-sm font-light">Chalod, Kannur, Kerala</span>
                  </div>
                </li>

                <li className="flex items-center  gap-4 bg-white rounded-2xl p-6 ">
                  <span className="border border-[var(--siteColor)] p-2 rounded-full  w-16 h-16 flex items-center justify-center">
                    <svg width="34" height="34" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M42.1663 14.442V32.5833C42.1664 34.0499 41.6061 35.4612 40.5999 36.5283C39.5937 37.5954 38.2178 38.2376 36.7537 38.3237L36.4163 38.3333H9.58301C8.11635 38.3333 6.7051 37.773 5.63801 36.7668C4.57091 35.7606 3.92864 34.3847 3.84259 32.9206L3.83301 32.5833V14.442L21.9359 26.5113L22.1583 26.6378C22.4203 26.7658 22.7081 26.8323 22.9997 26.8323C23.2913 26.8323 23.5791 26.7658 23.8411 26.6378L24.0634 26.5113L42.1663 14.442Z" fill="#09424D" />
                      <path d="M36.416 7.66663C38.486 7.66663 40.301 8.75913 41.313 10.4017L22.9993 22.6109L4.68555 10.4017C5.16623 9.62129 5.82652 8.96709 6.61136 8.49365C7.3962 8.02021 8.28285 7.74126 9.19738 7.68004L9.58263 7.66663H36.416Z" fill="#09424D" />
                    </svg>



                  </span>
                  <div className="flex flex-col gap-1 ">
                    <span className="text-site text-lg">Work with us</span>
                    <a href="mailto:Info@safeattestuae.com" className="text-1 text-sm font-light">Info@hoobuyrealtors.com</a>
                  </div>
                </li>
                <li className="flex items-center  gap-4 bg-white rounded-2xl p-6 ">
                  <span className="border border-[var(--siteColor)] p-2 rounded-full  w-16 h-16 flex items-center justify-center">
                    <svg width="34" height="34" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.8648 5.57815C20.0463 5.22193 21.3141 5.28111 22.4573 5.74584C23.6004 6.21057 24.5499 7.05281 25.1477 8.13235L25.3475 8.53465L27.1349 12.5064C27.6763 13.7121 27.8518 15.0502 27.6397 16.3548C27.4276 17.6593 26.8371 18.8729 25.9415 19.845L25.5824 20.2014L22.7663 22.8285C22.2587 23.3091 22.6394 25.1694 24.4754 28.35C26.1278 31.212 27.4724 32.5485 28.1339 32.6214H28.25L28.3931 32.5944L33.9281 30.9015C34.672 30.6733 35.4659 30.6643 36.2147 30.8754C36.9636 31.0866 37.6358 31.509 38.1509 32.0922L38.3966 32.4027L42.0605 37.4787C42.7786 38.4736 43.1364 39.6834 43.0751 40.9088C43.0137 42.1343 42.5369 43.3023 41.723 44.2206L41.3936 44.5608L39.9302 45.9486C38.6161 47.193 36.9723 48.034 35.1942 48.3714C33.416 48.7089 31.5784 48.5286 29.8997 47.8521C24.6752 45.7461 19.9286 40.9347 15.6167 33.4665C11.2967 25.9794 9.50124 19.4535 10.3031 13.8645C10.5458 12.175 11.2415 10.5828 12.3164 9.25689C13.3912 7.93103 14.8051 6.92103 16.4078 6.33415L16.9289 6.16135L18.8648 5.57815Z" fill="#09424D" />
                    </svg>

                  </span>
                  <div className="flex flex-col gap-1 ">
                    <span className="text-site text-lg">Call Us 24/7</span>
                    <span className="text-1 text-sm font-light">+91 9999 999 999</span>
                  </div>
                </li>
                <li className="flex items-center  gap-4 bg-white rounded-2xl p-6 ">
                  <span className="border border-[var(--siteColor)] p-2 rounded-full  w-16 h-16 flex items-center justify-center">
                    <svg width="34" height="34" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.8648 5.57815C20.0463 5.22193 21.3141 5.28111 22.4573 5.74584C23.6004 6.21057 24.5499 7.05281 25.1477 8.13235L25.3475 8.53465L27.1349 12.5064C27.6763 13.7121 27.8518 15.0502 27.6397 16.3548C27.4276 17.6593 26.8371 18.8729 25.9415 19.845L25.5824 20.2014L22.7663 22.8285C22.2587 23.3091 22.6394 25.1694 24.4754 28.35C26.1278 31.212 27.4724 32.5485 28.1339 32.6214H28.25L28.3931 32.5944L33.9281 30.9015C34.672 30.6733 35.4659 30.6643 36.2147 30.8754C36.9636 31.0866 37.6358 31.509 38.1509 32.0922L38.3966 32.4027L42.0605 37.4787C42.7786 38.4736 43.1364 39.6834 43.0751 40.9088C43.0137 42.1343 42.5369 43.3023 41.723 44.2206L41.3936 44.5608L39.9302 45.9486C38.6161 47.193 36.9723 48.034 35.1942 48.3714C33.416 48.7089 31.5784 48.5286 29.8997 47.8521C24.6752 45.7461 19.9286 40.9347 15.6167 33.4665C11.2967 25.9794 9.50124 19.4535 10.3031 13.8645C10.5458 12.175 11.2415 10.5828 12.3164 9.25689C13.3912 7.93103 14.8051 6.92103 16.4078 6.33415L16.9289 6.16135L18.8648 5.57815Z" fill="#09424D" />
                    </svg>

                  </span>
                  <div className="flex flex-col gap-1 ">
                    <span className="text-site text-lg">Whatsapp Us 24/7</span>
                    <span className="text-1 text-sm font-light">+91 9999 999 999</span>
                  </div>
                </li>

              </ul>

              </motion.div>
            

            </div>

          </div>
          {/* <div >

            <ul className="mt-10 lg:mt-20 grid lg:grid-cols-3 gap-4">
              <li className="flex items-center  gap-4 bg-white rounded-2xl p-6 ">
                <span className="border border-[var(--siteColor)] p-2 rounded-full  w-16 h-16 flex items-center justify-center">
                  <svg width="34" height="34" viewBox="0 0 39 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.4158 45.0905C16.7288 46.1738 18.0982 47.164 19.5 48.1303C20.9049 47.1768 22.2675 46.1626 23.5842 45.0905C25.779 43.2883 27.8446 41.3342 29.7657 39.2427C34.1943 34.4002 39 27.3802 39 19.5C39 16.9392 38.4956 14.4035 37.5157 12.0377C36.5357 9.67182 35.0993 7.52216 33.2886 5.71142C31.4778 3.90067 29.3282 2.46432 26.9623 1.48435C24.5965 0.504382 22.0608 0 19.5 0C16.9392 0 14.4035 0.504382 12.0377 1.48435C9.67182 2.46432 7.52216 3.90067 5.71142 5.71142C3.90068 7.52216 2.46432 9.67182 1.48435 12.0377C0.504382 14.4035 -3.81585e-08 16.9392 0 19.5C0 27.3802 4.80567 34.398 9.23433 39.2427C11.1553 41.335 13.2209 43.2876 15.4158 45.0905ZM19.5 26.5417C17.6324 26.5417 15.8414 25.7998 14.5208 24.4792C13.2002 23.1586 12.4583 21.3676 12.4583 19.5C12.4583 17.6324 13.2002 15.8414 14.5208 14.5208C15.8414 13.2002 17.6324 12.4583 19.5 12.4583C21.3676 12.4583 23.1586 13.2002 24.4792 14.5208C25.7998 15.8414 26.5417 17.6324 26.5417 19.5C26.5417 21.3676 25.7998 23.1586 24.4792 24.4792C23.1586 25.7998 21.3676 26.5417 19.5 26.5417Z" fill="#09424D" />
                  </svg>



                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-site text-lg">Our Location</span>
                  <span className="text-1 text-sm font-light">Chalod, Kannur, Kerala</span>
                </div>
              </li>

              <li className="flex items-center  gap-4 bg-white rounded-2xl p-6 ">
                <span className="border border-[var(--siteColor)] p-2 rounded-full  w-16 h-16 flex items-center justify-center">
                  <svg width="34" height="34" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42.1663 14.442V32.5833C42.1664 34.0499 41.6061 35.4612 40.5999 36.5283C39.5937 37.5954 38.2178 38.2376 36.7537 38.3237L36.4163 38.3333H9.58301C8.11635 38.3333 6.7051 37.773 5.63801 36.7668C4.57091 35.7606 3.92864 34.3847 3.84259 32.9206L3.83301 32.5833V14.442L21.9359 26.5113L22.1583 26.6378C22.4203 26.7658 22.7081 26.8323 22.9997 26.8323C23.2913 26.8323 23.5791 26.7658 23.8411 26.6378L24.0634 26.5113L42.1663 14.442Z" fill="#09424D" />
                    <path d="M36.416 7.66663C38.486 7.66663 40.301 8.75913 41.313 10.4017L22.9993 22.6109L4.68555 10.4017C5.16623 9.62129 5.82652 8.96709 6.61136 8.49365C7.3962 8.02021 8.28285 7.74126 9.19738 7.68004L9.58263 7.66663H36.416Z" fill="#09424D" />
                  </svg>



                </span>
                <div className="flex flex-col gap-1 ">
                  <span className="text-site text-lg">Work with us</span>
                  <a href="mailto:Info@safeattestuae.com" className="text-1 text-sm font-light">Info@HOOBUYREALTORS.com</a>
                </div>
              </li>
              <li className="flex items-center  gap-4 bg-white rounded-2xl p-6 ">
                <span className="border border-[var(--siteColor)] p-2 rounded-full  w-16 h-16 flex items-center justify-center">
                  <svg width="34" height="34" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.8648 5.57815C20.0463 5.22193 21.3141 5.28111 22.4573 5.74584C23.6004 6.21057 24.5499 7.05281 25.1477 8.13235L25.3475 8.53465L27.1349 12.5064C27.6763 13.7121 27.8518 15.0502 27.6397 16.3548C27.4276 17.6593 26.8371 18.8729 25.9415 19.845L25.5824 20.2014L22.7663 22.8285C22.2587 23.3091 22.6394 25.1694 24.4754 28.35C26.1278 31.212 27.4724 32.5485 28.1339 32.6214H28.25L28.3931 32.5944L33.9281 30.9015C34.672 30.6733 35.4659 30.6643 36.2147 30.8754C36.9636 31.0866 37.6358 31.509 38.1509 32.0922L38.3966 32.4027L42.0605 37.4787C42.7786 38.4736 43.1364 39.6834 43.0751 40.9088C43.0137 42.1343 42.5369 43.3023 41.723 44.2206L41.3936 44.5608L39.9302 45.9486C38.6161 47.193 36.9723 48.034 35.1942 48.3714C33.416 48.7089 31.5784 48.5286 29.8997 47.8521C24.6752 45.7461 19.9286 40.9347 15.6167 33.4665C11.2967 25.9794 9.50124 19.4535 10.3031 13.8645C10.5458 12.175 11.2415 10.5828 12.3164 9.25689C13.3912 7.93103 14.8051 6.92103 16.4078 6.33415L16.9289 6.16135L18.8648 5.57815Z" fill="#09424D" />
                  </svg>

                </span>
                <div className="flex flex-col gap-1 ">
                  <span className="text-site text-lg">Call Us 24/7</span>
                  <span className="text-1 text-sm font-light">+91 9999 999 999</span>
                </div>
              </li>

            </ul>
          </div> */}
        </div>
      </section>

      <section className=" ">

        <div className="overflow-hidden rounded-2xl ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.6352046956276!2d75.50005177453178!3d11.930455836849688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba43bf4e8424b29%3A0xb4a8e71b4553276f!2sHOOBUY%20REALTORS!5e0!3m2!1sen!2sin!4v1768391229098!5m2!1sen!2sin"
            className="w-full h-[450px]"
            loading="lazy"
            height={450}
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </section>

    </>
  );
}
