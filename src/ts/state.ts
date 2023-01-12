import { config } from "./config";

interface State {
    positions: {
        C0: { x: number; y: number }[];
        C1: { x: number; y: number }[];
    };
}

export let state: State = { positions: { C0: [{ x: 0, y: 0 }], C1: [{ x: 1, y: 0 }] } };

const defaultPositions = { C0: [{ x: 0, y: 0 }], C1: [{ x: 1, y: 0 }] };

export function update() {
    computeKangarooPositions();
}

function computeKangarooPositions() {
    state.positions = JSON.parse(JSON.stringify(defaultPositions));

    const maxIteration = 15;

    for (let t = 1; t <= maxIteration; t++) {
        const isC0TooFar = state.positions.C0[t - 1].x > state.positions.C1[t - 1].x;

        state.positions.C0[t] = {
            x: !isC0TooFar
                ? (state.positions.C0[t - 1]?.x ?? 0) + config.s
                : (state.positions.C0[t - 1]?.x ?? 0) - config.s,
            y: 0
        };
        state.positions.C1[t] = { x: config.C1(t), y: 0 };

        if (state.positions.C0[t].x === state.positions.C1[t].x) break;
    }
}
