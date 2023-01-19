import React, { useState, useEffect, useContext, useCallback } from "react";
import { Worldview, Axes, Cubes, Overlay, Spheres, getCSSColor } from "@foxglove/regl-worldview";

export default function Example() {
    const numberToColor = (number, max, a = 1) => {
        const i = (number * 255) / max;
        const r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128) / 255;
        const g = Math.round(Math.sin(0.024 * i + 0) * 127 + 128) / 255;
        const b = Math.round(Math.sin(0.024 * i + 0) * 127 + 128) / 255;
        return { r, g, b, a };
    };
    const [clickedId, setClickedId] = useState(7);
    const [cameraState, setCameraState] = useState({
        distance: 45,
        phi: 122,
        thetaOffset: 0
    });
    const objectMap = {};
    const count = 20;
    const cubeGap = 5;
    let idCounter = 1;
    const cubes = new Array(count).fill(0).map((v, idx) => {
        const totalLen = count * cubeGap;
        const posX = -totalLen / 2 + idx * cubeGap;
        const posY = Math.sin(posX) * 30;
        const posZ = Math.cos(posX) * 20;
        const id = idCounter++;
        const isClicked = clickedId === id;
        const scale = isClicked ? { x: 10, y: 10, z: 10 } : { x: 5, y: 5, z: 5 };
        const alpha = isClicked ? 1 : 0.2 + idx / count;
        return {
            id,
            pose: {
                orientation: { x: 0, y: 0, z: 0, w: 1 },
                position: { x: posX, y: posY, z: posZ }
            },
            scale,
            color: numberToColor(idx, count, alpha),
            info: {
                description: "Hello Cube",
                objectId: id + 10000
            }
        };
    });
    const spheres = new Array(count).fill(0).map((v, idx) => {
        const totalLen = count * cubeGap * 1.1;
        const posX = -totalLen / 2 + idx * cubeGap * 1.1;
        const posY = -Math.sin(posX) * 30;
        const posZ = -Math.cos(posX) * 20;

        const id = idCounter++;
        const isClicked = clickedId === id;
        const scale = isClicked ? { x: 10, y: 10, z: 10 } : { x: 5, y: 5, z: 5 };
        const alpha = isClicked ? 1 : 0.2 + idx / count;
        return {
            id,
            pose: {
                orientation: { x: 0, y: 0, z: 0, w: 1 },
                position: { x: posX, y: posY, z: posZ }
            },
            scale,
            color: numberToColor(count - idx - 1, count, alpha),
            info: {
                description: "Hello Sphere",
                objectId: id + 1000
            }
        };
    });
    cubes.forEach((object) => {
        if (object.id) {
            objectMap[object.id] = {
                object,
                type: "cube"
            };
        }
    });
    sphere.forEach((object) => {
        if (object.id) {
            objectMap[object.id] = {
                object,
                type: "sphere"
            };
        }
    });
    const textMarkers = [];
    if (clickedId !== undefined) {
        const clickObj = objectMap[clickedId];
        if (clickObj) {
            const {
                object: {
                    id,
                    pose: { orientation, position },
                    info,
                    color
                },
                type
            } = clickObj;
            let text = `
                id: ${id}\n
                x: ${position.x}\n
                y:${position.y}\n
                z:${position.z}\n
            `;
            if (info) {
                text += `
                description: ${info.description}\n
                objectId: ${info.objectId}
                `;
            }

            const idTextMarker = textMarkers.length;
            textMarkers.push({
                id: idTextMarker,
                text,
                color: { r: 1, g: 1, b: 1, a: 1 },
                pose: {
                    orientation,
                    position: {
                        x: position.x + 2,
                        y: position.y,
                        z: position.z
                    }
                },
                scale: { x: 1, y: 1, z: 1 },
                info: {
                    title: type,
                    color
                }
            });
        }
    }
}
