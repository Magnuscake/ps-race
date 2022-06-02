import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Stage, _ReactPixi } from "@inlet/react-pixi";

// import RevenueAnimal from "../components/RevenueAnimal/RevenueAnimal";

const PixiApp = dynamic(() => import("../components/PixiApp"), { ssr: false });
const RevenueAnimal = dynamic(
  () => import("../components/RevenueAnimal/RevenueAnimal"),
  { ssr: false }
);

const spriteMeta = [
  {
    animal: "croc",
    industry: "Financial Services",
    image:
      "/kenney_animalpackredux/PNG/Round without details (outline)/crocodile.png",
    rectColor: 0xffa726,
    finalPos: 1000,
  },
  {
    animal: "narwhal",
    industry: "Retail",
    image:
      "/kenney_animalpackredux/PNG/Round without details (outline)/narwhal.png",
    rectColor: 0xfdd835,
    finalPos: 800,
  },
  {
    animal: "giraffe",
    industry: "Growth Markets",
    image:
      "/kenney_animalpackredux/PNG/Round without details (outline)/giraffe.png",
    rectColor: 0x4fc3f7,
    finalPos: 700,
  },
  {
    animal: "penguin",
    industry: "Public Sector",
    image:
      "/kenney_animalpackredux/PNG/Round without details (outline)/penguin.png",
    rectColor: 0xe57373,
    finalPos: 350,
  },
  {
    animal: "sloth",
    industry: "Energy and \nCommodities",
    image:
      "/kenney_animalpackredux/PNG/Round without details (outline)/sloth.png",
    rectColor: 0xb39ddb,
    finalPos: 200,
  },
];

const Home: NextPage = () => {
  const [screenWindow, setScreenWindow] = useState<Window | undefined>();

  useEffect(() => {
    setScreenWindow(window);
  }, []);

  // the screen height  to give some space above and below divided by the number of items in the spriteMeta
  const $spacingDistance =
    (screenWindow?.innerHeight! - 120) / spriteMeta.length;

  return (
    <Stage
      width={screenWindow?.innerWidth}
      height={screenWindow?.innerHeight}
      options={{
        backgroundAlpha: 0,
        resizeTo: screenWindow as Window,
      }}
      style={{
        position: "absolute",
      }}
    >
      {/* <PixiApp /> */}
      {spriteMeta.map((item, idx) => {
        const spriteAttributes = {
          image: item.image,
          scale: 0.7,
          anchor: 0.5,
          x: 50,
          finalPosition: item.finalPos,
        };

        const containerAttributes = {
          position: [10, $spacingDistance * (idx + 1)],
        };

        const rectangleAttributes = {
          color: item.rectColor,
          x: -650,
          y: ($spacingDistance - 130) * (idx + 1),
          width: screenWindow?.innerWidth!!,
          height: 60,
        };

        const textAttributes = {
          text: item.industry,
          x: 50,
          y: 0,
          anchor: [0, 0.5],
        };

        const foodSpriteAttributes = {
          image: "/sushi.png",
          scale: 0.4,
          x: screenWindow?.innerWidth! - 200,
          anchor: 0.5,
        };

        return (
          <RevenueAnimal
            key={idx}
            spriteAttributes={spriteAttributes}
            /* @ts-ignore */
            containerAttributes={containerAttributes}
            rectangleAttributes={rectangleAttributes}
            /* @ts-ignore */
            textAttributes={textAttributes}
            foodSpriteAttributes={foodSpriteAttributes}
          />
        );
      })}
    </Stage>
  );
};

export default Home;
