"use client";
import { useEffect } from "react";
import Styles from "./styles.module.css";
import { titles } from "@/data";

export default function Page() {
  useEffect(() => {
    const initializeSlider = async () => {
      const { gsap } = await import("gsap");
      const { CustomEase } = await import("gsap/CustomEase");

      gsap.registerPlugin(CustomEase);
      CustomEase.create("hop", "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1");

      const sliderNav = document.querySelector(`.${Styles.sliderNav}`);
      const slidesContainer = document.querySelector(`.${Styles.slides}`);
      const bgOverlay = document.querySelector(`.${Styles.bgOverlay}`);
      const slideTitle = document.querySelector(`.${Styles.slideTitle}`);

      // Clear existing elements to prevent duplicates
      sliderNav.innerHTML = '';
      slidesContainer.innerHTML = '';

      const numberOfItems = titles.length;
      let currentIndex = 0;

      function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      function updateTitle(newIndex, color) {
        const title = titles[newIndex];
        const titleRows = slideTitle.querySelectorAll(`.${Styles.slideTitleRow}`);

        titleRows.forEach((row, rowIndex) => {
          row.querySelectorAll(`.${Styles.letter}`).forEach((letter, letterIndex) => {
            const existingSpan = letter.querySelector("span");

            if (existingSpan) {
              letter.removeChild(existingSpan);
            }

            const newSpan = document.createElement("span");
            const direction = newIndex > currentIndex ? 150 : -150;
            gsap.set(newSpan, {
              x: direction,
              color: color,
            });

            newSpan.textContent = title[rowIndex][letterIndex] || "";
            letter.appendChild(newSpan);
            gsap.to(newSpan, {
              x: 0,
              duration: 1,
              ease: "hop",
              delay: 0.125,
              color: color,
            });
          });
        });
      }

      // Create navigation and slides only once
      for (let i = 0; i < numberOfItems; i++) {
        // Create navigation item
        const navItemWrapper = document.createElement("div");
        navItemWrapper.classList.add(Styles.nav_item_wrapper);

        if (i === 0) {
          navItemWrapper.classList.add(Styles.active);
        }

        const navItem = document.createElement("div");
        navItem.classList.add(Styles.nav_item);

        navItemWrapper.appendChild(navItem);
        sliderNav.appendChild(navItemWrapper);

        navItemWrapper.addEventListener("click", () => {
          if (i === currentIndex) {
            return;
          }

          document.querySelectorAll(`.${Styles.nav_item_wrapper}`).forEach((nav) => nav.classList.remove(Styles.active));
          navItemWrapper.classList.add(Styles.active);

          const translateXValue = -i * 100;
          gsap.to(slidesContainer, {
            x: `${translateXValue}%`,
            duration: 1.5,
            ease: "hop",
          });

          const newColor = getRandomColor();
          gsap.to(bgOverlay, {
            background: newColor,
            duration: 1.5,
            ease: "hop",
          });

          updateTitle(i, newColor);
          currentIndex = i;
        });

        // Create slide
        const slide = document.createElement("div");
        slide.classList.add(Styles.slide);

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add(Styles.imgWrapper);

        const img = document.createElement("img");
        img.src = `/images/img${i + 1}.jpg`;
        img.alt = `Slide image ${i + 1}`;

        imgWrapper.appendChild(img);
        slide.appendChild(imgWrapper);
        slidesContainer.appendChild(slide);
      }

      updateTitle(0, getComputedStyle(bgOverlay).backgroundColor);
    };

    initializeSlider();
  }, []);

  return (
    <div className={Styles.container}>
      <nav className={Styles.nav}>
        <a href="#" id="logo">Duke 'n Earls</a>
      </nav>
      <div className={Styles.bgOverlay}></div>
      <div className={Styles.sliderNav}></div>
      <div className={Styles.slides}></div>
      <div className={Styles.slideTitle}>
        <div className={Styles.slideTitleRow}>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
        </div>
        <div className={Styles.slideTitleRow}>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
          <div className={Styles.letter}></div>
        </div>
      </div>
    </div>
  );
}
