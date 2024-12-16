/**
 * Enum for character directions
 * @readonly
 * @enum {number}
 */
const Direction = {
    DOWN: 0,
    RIGHT: 3,
    UP: 6,
    LEFT: 9
};

/**
 * Creates frame data for standing animations
 * @param {number} rootFrame - The base frame number for the animation
 * @returns {Object} Frame data for standing animation
 */
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

/**
 * Creates frame data for walking animations
 * @param {number} rootFrame - The base frame number for the animation
 * @returns {Object} Frame data for walking animation
 */
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
export const STAND_DOWN = makeStandingFrames(Direction.DOWN);
export const STAND_RIGHT = makeStandingFrames(Direction.RIGHT);
export const STAND_UP = makeStandingFrames(Direction.UP);
export const STAND_LEFT = makeStandingFrames(Direction.LEFT);

// export walking frame constants
export const WALK_DOWN = makeWalkingFrames(Direction.DOWN);
export const WALK_RIGHT = makeWalkingFrames(Direction.RIGHT);
export const WALK_UP = makeWalkingFrames(Direction.UP);
export const WALK_LEFT = makeWalkingFrames(Direction.LEFT);

export const PICK_UP_DOWN = {
    duration: 400,
    frames: [
        {
            time: 0,
            frame:12
        }
    ]
}
