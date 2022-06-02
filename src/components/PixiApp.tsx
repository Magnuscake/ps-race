import React, { useState } from "react";
import { Container, Sprite, useTick } from "@inlet/react-pixi";
import { settings, SCALE_MODES } from "pixi.js";

settings.SCALE_MODE = SCALE_MODES.NEAREST;

const RotatingBunny = () => {
  const [rotation, setRotation] = useState(0);

  useTick((delta) => delta && setRotation(rotation + 0.1 * delta));

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      anchor={0.5}
      scale={4}
      rotation={rotation}
    />
  );
};

const PixiApp = () => {
  return (
    /* @ts-ignore */
    <Container position={[750, 250]}>
      <RotatingBunny />
    </Container>
  );
};

export default PixiApp;
