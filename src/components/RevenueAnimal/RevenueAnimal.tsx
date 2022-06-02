import { FC, useState, useCallback } from "react";
import {
  Container,
  Sprite,
  Graphics,
  Text,
  useApp,
  useTick,
  _ReactPixi,
} from "@inlet/react-pixi";
import { Graphics as PIXIGraphics, TextStyle } from "pixi.js";

export interface SpriteAttributes extends _ReactPixi.ISprite {
  finalPosition: number;
}

export interface foodSpriteAttributes extends _ReactPixi.ISprite {}

export interface RectangleAttributes extends _ReactPixi.ISprite {
  color: number;
}

export interface ContainerAttributes extends _ReactPixi.IContainer {}

export interface TextAttributes extends _ReactPixi.IText {}

interface IRevenueAnimal {
  spriteAttributes: SpriteAttributes;
  foodSpriteAttributes: foodSpriteAttributes;
  containerAttributes: ContainerAttributes;
  rectangleAttributes: RectangleAttributes;
  textAttributes: TextAttributes;
}

const RevenueAnimal: FC<IRevenueAnimal> = ({
  spriteAttributes,
  foodSpriteAttributes,
  containerAttributes,
  rectangleAttributes,
  textAttributes,
}) => {
  // spriteAttributes.x will be the intial position
  const [spriteX, setSpriteX] = useState(spriteAttributes.x);
  // rectangleAttributes.drawAttributes.x will be the intial position
  const [rectX, setRectX] = useState(rectangleAttributes.x);

  const app = useApp();

  useTick((delta) => {
    if (spriteX && spriteX < spriteAttributes.finalPosition) {
      setSpriteX((prevX) => prevX && prevX + 3);
      setRectX((prevX) => prevX && prevX + 3);
    }
  });

  const { x, ..._spriteAttributes } = spriteAttributes;

  const rectG = new PIXIGraphics();

  rectG
    .clear()
    .beginFill(rectangleAttributes.color)
    .drawRect(
      rectangleAttributes.x!!,
      rectangleAttributes.y!!,
      rectangleAttributes.width!!,
      rectangleAttributes.height!!
    )
    .endFill();

  const graphicTexture = app.renderer.generateTexture(rectG);

  const style = new TextStyle({
    align: "center",
    fontFamily: "Helvetica",
    fontSize: 14,
    fontWeight: "bold",
    wordWrap: true,
    wordWrapWidth: 350,
  });

  return (
    /* @ts-ignore */
    <Container {...containerAttributes}>
      <Sprite
        texture={graphicTexture}
        anchor={0.5}
        x={rectX}
        y={rectangleAttributes.y}
      />
      <Sprite x={spriteX} {..._spriteAttributes} />
      <Text {...textAttributes} style={style} />
      <Text
        x={10}
        y={10}
        text={(spriteX!! / 1000).toFixed(2).toString()}
        style={style}
      />
      <Sprite {...foodSpriteAttributes} />
    </Container>
  );
};

export default RevenueAnimal;
