import { config } from "./config";

interface State {
    positions: {
        C0: { x: number; y: number }[];
        C1: { x: number; y: number }[];
    };
    distances: { x: number; y: number }[];
}

export let state: State = {
    positions: { C0: [{ x: 0, y: 0 }], C1: [{ x: 1, y: 0 }] },
    distances: [{ x: 1, y: 0 }],
};

const defaultPositions = { C0: [{ x: 0, y: 0 }], C1: [{ x: 1, y: 0 }] };
const defaultDistances = [{ x: 1, y: 0 }];

export function update() {
    computeKangarooPositions();

    console.log(state.positions);

    // info: where you left off
    // you were adding support for deltaT but somehow it felt wrong with the number of iterations
}

function computeKangarooPositions() {
    state.positions = JSON.parse(JSON.stringify(defaultPositions));
    state.distances = JSON.parse(JSON.stringify(defaultDistances));

    const maxIteration = 1000; // random number here

    for (let t = 1; t <= maxIteration; t++) {
        const isC0TooFar = state.positions.C0[t - 1].x > state.positions.C1[t - 1].x;

        state.positions.C0[t] = {
            x: !isC0TooFar
                ? (state.positions.C0[t - 1]?.x ?? 0) + config.s * config.deltaT
                : (state.positions.C0[t - 1]?.x ?? 0) - config.s * config.deltaT,
            y: 0,
        };
        state.positions.C1[t] = { x: config.C1(t * config.deltaT), y: 0 };

        const distance = { x: state.positions.C1[t].x - state.positions.C0[t].x, y: 0 };
        console.log(distance.x);

        if(state.distances.some(dis => Math.abs(dis.x - distance.x) <= 0.01)) break;

        state.distances[t] = distance;

        if(state.distances[t].x === 0) break;
    }
}
