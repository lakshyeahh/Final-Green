import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Slidetile.css'; // Assuming you put your CSS in App.css

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    var img1 = document.getElementById("svg1");
    var img2 = document.getElementById("svg2");
    var img3 = document.getElementById("svg3");

    var imgCat = document.getElementById("img");
    var line1 = document.getElementById("line1");
    var line2 = document.getElementById("line2");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".overlap",
        start: "top top",
        end: "bottom+=3000px top",
        pin: true,
        scrub: true,
      },
    });

    tl.to(
      img1,
      {
        xPercent: 80,
        ease: "power1.out",
      },
      "sameTime"
    );

    tl.fromTo(
      img2,
      {
        x: "20%",
      },
      {
        x: "-80%",
        ease: "power1.out",
      },
      "sameTime"
    );

    tl.to(
      img3,
      {
        x: "80%",
        ease: "power1.out",
      },
      "<"
    );

    tl.from(imgCat, {
      yPercent: 200,
      ease: "power1.out",
    });

    tl.from(line1, {
      x: "-100%",
      opacity: 0,
      ease: "power1.out",
    });

    tl.from(line2, {
      x: "-200%",
      opacity: 0,
      ease: "power1.out",
    });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>Lorem Ipsum</h1>
      </div>
      <div className="overlap">
        <div className="container">
          <div id="svg1" className="img-wrapper-l">
            <img
              className="img-1"
              src="https://i.ibb.co/pXR0zdq/Lorem-Ipsum-dolor.png"
              alt=""
            />
          </div>
          <div id="svg2" className="img-wrapper-r">
            <img
              className="img-2"
              src="https://i.ibb.co/pXR0zdq/Lorem-Ipsum-dolor.png"
              alt=""
            />
          </div>
          <div id="svg3" className="img-wrapper-l">
            <img
              className="img-3"
              src="https://i.ibb.co/pXR0zdq/Lorem-Ipsum-dolor.png"
              alt=""
            />
          </div>
        </div>
        <div className="image-container">
          <img
            id="img"
            src="https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000"
            alt=""
          />
          <div className="text">
            <div id="line1" className="line-text-1">
              <p>Lorem Ipsum</p>
            </div>
            <div id="line2" className="line-text-2">
              <p>Lorem Ipsum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
