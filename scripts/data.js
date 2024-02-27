"use strict";
exports.__esModule = true;
exports.data = void 0;
exports.data = {
    behaviours: [
        {
            type: 'Transform', properties: {
                x: 100,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                rotation: 0
            }
        },
        {
            type: 'Walkable', properties: {
                speed: 1
            }
        },
    ],
    children: [
        {
            behaviours: [
                {
                    type: 'Transform', properties: {
                        x: 100,
                        y: 100,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 45
                    }
                },
                {
                    type: 'TextRenderer', properties: {
                        text: '!!!!!!'
                    }
                },
                {
                    type: 'Rotatable', properties: {}
                }
            ]
        },
        {
            behaviours: [
                {
                    type: 'Transform', properties: {
                        x: 200,
                        y: 0,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 45
                    }
                },
                {
                    type: 'TextRenderer', properties: {
                        text: 'LiuYuan'
                    }
                },
            ]
        },
        {
            behaviours: [
                {
                    type: 'Transform', properties: {
                        x: 200,
                        y: 200,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0
                    }
                },
                {
                    type: 'TextRenderer', properties: {
                        text: 'bjut'
                    }
                },
            ]
        },
        {
            id: 'rect1',
            behaviours: [
                {
                    type: 'Transform', properties: {
                        x: 0,
                        y: 0,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0
                    }
                },
                {
                    type: "ShapeRectRenderer", properties: {
                        width: 100,
                        height: 100,
                        color: 'red'
                    }
                }
            ]
        },
        {
            behaviours: [
                {
                    type: 'Transform', properties: {
                        x: 0,
                        y: 0,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0
                    }
                },
                {
                    type: "ShapeRectRenderer", properties: {
                        width: 300,
                        height: 20,
                        color: 'blue'
                    }
                }
            ]
        }
    ]
};
