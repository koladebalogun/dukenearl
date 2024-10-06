"use client";
import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".whitespace",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: ".header-info",
      start: "top top",
      endTrigger: ".whitespace",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".header-info",
      end: "bottom bottom",
      onUpdate: (self) => {
        const rotation = self.progress * 360;
        gsap.to(".revealer", { rotation });
      },
    });

    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".header-info",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        const clipPath = `polygon(
          ${45 - 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${100 - 0 * progress}%,
          ${45 - 45 * progress}% ${100 - 0 * progress}%
        )`;
        gsap.to(".revealer-1, .revealer-2", {
          clipPath: clipPath,
          ease: "none",
          duration: 0,
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".header-info",
      start: "top top",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const left = 35 + 15 * progress;
        gsap.to(".revealer", {
          left: `${left}%`,
          ease: "none",
          duration: 0,
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".whitespace",
      start: "top 50%",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const scale = 1 + 12 * self.progress;
        gsap.to(".revealer", {
          scale: scale,
          ease: "none",
          duration: 0,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(gsap.ticker.lagSmoothing);
    };
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <h1>DUKE 'N EARLS</h1>
      </section>

      <section className="info">
        <div className="header-rows">
          <div className="header-row">
            <h1>DUKE 'N</h1>
          </div>
          <div className="header-row">
            <h1>EARLS</h1>
          </div>
        </div>
      </section>

      <section className="header-info">
        <p>
          Welcome to Duke n Earls, where fashion meets class. We are the epitome
          of African fashion, blending tradition and innovation seamlessly. We
          strive to be the go-to brand for those who appreciate the richness of
          African culture and the allure of high-class fashion.
        </p>

        <div className="header-images">
          <div className="img">
            <Image
              src="/images/img4.jpg"
              alt="Image 1"
              width={500}
              height={500}
            />
          </div>
          <div className="img">
            <Image
              src="/images/img5.jpg"
              alt="Image 2"
              width={500}
              height={500}
            />
          </div>
          <div className="img">
            <Image
              src="/images/img6.jpg"
              alt="Image 3"
              width={500}
              height={500}
            />
          </div>
          <div className="img">
            <Image
              src="/images/img7.jpg"
              alt="Image 4"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      <section className="whitespace"></section>

      <section className="pinned">
        <div className="revealer">
          <div className="revealer-1"></div>
          <div className="revealer-2"></div>
        </div>
      </section>

      <section className="website-content">
        <h1 className="about">About us</h1>
        <h1>
          At Duke n Earl, we're passionate about creating a fashion experience
          that goes beyond just clothing. From the moment you explore our
          collections to the moment you wear our designs, we want you to feel
          confident, valued, and proud of your choice. Every piece we offer is
          thoughtfully crafted with quality and style in mind, so you can
          express yourself with ease. Our team is always here to help, whether
          you need advice on styling or have questions about your order. We’re
          dedicated to making your journey with us memorable, because at Duke n
          Earl, it’s not just about fashion it’s about how you feel wearing it.
        </h1>
      </section>
    </div>
  );
}
