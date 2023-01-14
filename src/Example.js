import React from "react";
import Worldview, {
  Cubes,
  Axes,
  Text,
  GLTFScene
} from "@foxglove/regl-worldview";
import duckModel from "./duck.glb";

function BasicExample() {
  const markers = [
    {
      pose: {
        orientation: { x: 0, y: 0, z: 0, w: 1 },
        position: { x: 0, y: 0, z: 0 }
      },
      scale: { x: 1, y: 1, z: 1 },
      color: { r: 1, g: 0, b: 1, a: 0.9 }
    }
  ];

  return (
    <Worldview>
      <Cubes>{markers}</Cubes>
      <Axes />
      {/* <Text autoBackgroundColor>
        {[
          {
            text: "Hello, WorldView!",
            pose: {
              orientation: { x: 0, y: 0, z: 0, w: 1 },
              position: { x: 0, y: 5, z: 10 }
            },
            scale: { x: 1, y: 1, z: 1 },
            color: { r: 0, g: 1, b: 1, a: 0.9 }
          }
        ]}
      </Text> */}
      <GLTFScene model={duckModel}>
        {{
          pose: {
            position: { x: 0, y: 0, z: 0 },
            orientation: { x: 0, y: 0, z: 0, w: 1 }
          },
          scale: { x: 8, y: 8, z: 8 }
        }}
      </GLTFScene>
    </Worldview>
  );
}

export default BasicExample;
