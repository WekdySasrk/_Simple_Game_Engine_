import { Camera } from "../../behaviours/Camera";
import { ShapeRectRenderer } from "../../behaviours/ShapeRectRenderer";
import { GameObject, getGameObjectById } from "../../engine";
import { AnimationRenderer } from "../AnimationRenderer";
import { Behaviour } from "../Behaviour";
import { BitmapRenderer } from "../BitmapRenderer";
import { matrixAppendMatrix } from "../math";
import { TextRenderer } from "../TextRenderer";
import { Transform } from "../Transform";
import { System } from "./System";

export class CanvasContextRenderingSystem extends System {

    private context: CanvasRenderingContext2D
    constructor(context: CanvasRenderingContext2D) {
        super();
        this.context = context;
    }


    onAddComponent(gameObject: GameObject, component: Behaviour): void {
        if (component instanceof ShapeRectRenderer || component instanceof TextRenderer || component instanceof BitmapRenderer || component instanceof AnimationRenderer) {
            gameObject.renderer = component;
        }
    }

    onRemoveComponent(gameObject: GameObject, component: Behaviour): void {
        if (component instanceof ShapeRectRenderer || component instanceof TextRenderer || component instanceof BitmapRenderer || component instanceof AnimationRenderer) {
            gameObject.renderer = null;
        }
    }

    onUpdate(): void {

        const context = this.context;

        const cameraGameObject = this.gameEngine.mode === 'play' ? getGameObjectById('camera') : this.gameEngine.editorGameObject;
        const camera = cameraGameObject.getBehaviour(Camera)
        const viewportMatrix = camera.calculateViewportMatrix()

        const self = this;

        function visitChildren(gameObject: GameObject) {
            for (const child of gameObject.children) {
                if (child.renderer) {
                    const transform = child.getBehaviour(Transform);
                    const matrix = matrixAppendMatrix(transform.globalMatrix, viewportMatrix);
                    context.setTransform(
                        matrix.a,
                        matrix.b,
                        matrix.c,
                        matrix.d,
                        matrix.tx,
                        matrix.ty
                    )
                    if (child.renderer instanceof TextRenderer) {
                        const renderer = child.renderer as TextRenderer
                        context.fillText(renderer.text, 0, 40);
                        renderer.measuredTextWidth = context.measureText(renderer.text).width
                    }
                    else if (child.renderer instanceof ShapeRectRenderer) {
                        const renderer = child.renderer as ShapeRectRenderer;
                        context.save();
                        context.fillStyle = renderer.color;
                        context.fillRect(0, 0, renderer.width, renderer.height);
                        context.restore();
                    }
                    else if (child.renderer instanceof BitmapRenderer) {
                        const renderer = child.renderer as BitmapRenderer;
                        context.save();
                        const img = self.gameEngine.resourceManager.getImage(renderer.source)
                        context.drawImage(img, 0, 0)

                        context.restore();
                    }
                    else if (child.renderer instanceof AnimationRenderer) {
                        const renderer = child.renderer as AnimationRenderer;
                        context.save();
                        const img = self.gameEngine.resourceManager.getImage(renderer.source)
                        const sourceRect = renderer.sourceRect;
                        const destinationRect = renderer.getBounds();
                        context.drawImage(img, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
                            destinationRect.x, destinationRect.y, destinationRect.width, destinationRect.height)
                        context.restore();
                    }
                }
                visitChildren(child)
            }
        }
        visitChildren(this.rootGameObject);


    }
}