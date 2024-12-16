// function to create standing frames
const makeStandingFrames = (rootFrame = 0) => {
    return {
        duration: 0,
        frames: [
            {
                time: 0,
                frame: rootFrame
            }
        ]
    }
}

// function to create walking frames
const makeWalkingFrames = (rootFrame = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrame + 1
            },
            {
                time: 100,
                frame: rootFrame
            },
            {
                time: 200,
                frame: rootFrame + 1
            },
            {
                time: 300,
                frame: rootFrame + 2
            }
        ]
    }
}

// export standing frame constants
export const STAND_DOWN = makeStandingFrames(0);
export const STAND_RIGHT = makeStandingFrames(3);
export const STAND_UP = makeStandingFrames(6);
export const STAND_LEFT = makeStandingFrames(9);

// export walking frame constants
export const WALK_DOWN = makeWalkingFrames(0);
export const WALK_RIGHT = makeWalkingFrames(3);
export const WALK_UP = makeWalkingFrames(6);
export const WALK_LEFT = makeWalkingFrames(9);
