"use client";
import { useState, useMemo } from "react";

import { get } from "lodash";
import { Carousel, CarouselItem } from "reactstrap";
import { MEDIA_BASE_URL } from "@/lib/constants";

const Hero = ({ hero }) => {
  const images = (get(hero, "images.data") || []).map(
    (item) => `url(${MEDIA_BASE_URL}${get(item, "attributes.url")})`
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = images.map((img, inx) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      style={{ backgroundImage: img }}
      key={img + inx}
    >
      <div style={{ backgroundImage: img }} className={"image"}></div>
    </CarouselItem>
  ));

  return (
    <section id="hero" className="hero">
      <div className="info d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h2>{get(hero, "title")}</h2>
              <p>{get(hero, "description")}</p>
              <a href="#properties" className="btn-get-started">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      <Carousel
        id="hero-carousel"
        interval={5000}
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        {slides}

        <a className="carousel-control-prev" onClick={previous}>
          <span
            className="carousel-control-prev-icon bi bi-chevron-left"
            aria-hidden="true"
          ></span>
        </a>

        <a className="carousel-control-next" onClick={next}>
          <span
            className="carousel-control-next-icon bi bi-chevron-right"
            aria-hidden="true"
          ></span>
        </a>
      </Carousel>
    </section>
  );
};

export default Hero;
