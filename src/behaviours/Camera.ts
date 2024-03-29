import { Matrix } from "../engine";
import { Behaviour } from "../engine/Behaviour";
import { invertMatrix, matrixAppendMatrix } from "../engine/math";
import { Transform } from "../engine/Transform";

export class Camera extends Behaviour {
    viewportWidth: number = 400;
    viewportHeight: number = 400;

    constructor() {
        super();
        console.log("初始化摄像机");
    }

    calculateViewportMatrix() {
        const cameraTransform = this.gameObject.getBehaviour(Transform);
        const offsetMatrix = new Matrix(1, 0, 0, 1, -this.viewportWidth / 2, -this.viewportHeight / 2);
        let viewportMatrix = invertMatrix(matrixAppendMatrix(cameraTransform.globalMatrix, offsetMatrix));
        return viewportMatrix;
    }
}
