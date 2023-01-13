import { state } from "./state";
import { config } from "./config";

const canvas = document.querySelector<HTMLCanvasElement>(".simul__graphic")!;
const ctx = canvas.getContext("2d")!;

let minX = -1;
let maxX = 15;
let minY = -1;
let maxY = 15;

export function render() {
    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;

    // adjust graph visible domain
    const allPositions = state.positions.C0.concat(state.positions.C1);
    maxX = Math.ceil(
        allPositions.reduce((previous, pos) => {
            return previous.x > pos.x ? previous : pos;
        }).x +
            1
    );
    maxY = state.positions.C0.length * config.deltaT; // both C0 and C1 have the same number of positions
    minX = Math.min(Math.round(maxX / 15), -1);
    minY = Math.min(Math.round(minY / 15), -1);

    drawAxis();
    drawKangaroos();
}

function drawAxis() {
    const cw = canvas.width;
    const ch = canvas.height;

    const origin = { x: 0, y: 0 };
    const canvasOrigin = axisToCanvas(origin);

    const axisWidth = 1;

    // draw the actual axis
    ctx.strokeStyle = "#222";
    ctx.lineWidth = axisWidth;
    ctx.beginPath();
    ctx.moveTo(canvasOrigin.x, 0);
    ctx.lineTo(canvasOrigin.x, ch);
    ctx.moveTo(0, canvasOrigin.y);
    ctx.lineTo(cw, canvasOrigin.y);
    ctx.stroke();

    // draw the O for the origin
    ctx.font = "12px 'Consolas'";
    ctx.textBaseline = "top";
    ctx.textAlign = "right";

    const textOffset = 6;

    ctx.fillText("0", canvasOrigin.x - textOffset, canvasOrigin.y + textOffset);

    // draw the grads
    const gradLength = 14;

    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    ctx.beginPath();
    for (let x = Math.ceil(minX) + 1; x < maxX; x++) {
        if (x === 0) continue;

        const { x: canvasX } = axisToCanvas({ x });
        ctx.moveTo(canvasX, canvasOrigin.y - gradLength / 2);
        ctx.lineTo(canvasX, canvasOrigin.y + gradLength / 2);

        ctx.fillText(x.toString(), canvasX, canvasOrigin.y + gradLength / 2 + textOffset);
    }

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let y = Math.ceil(minY) + 1; y < maxY; y++) {
        if (y === 0) continue;

        const { y: canvasY } = axisToCanvas({ y });
        ctx.moveTo(canvasOrigin.x - gradLength / 2, canvasY);
        ctx.lineTo(canvasOrigin.x + gradLength / 2, canvasY);

        ctx.fillText(y.toString(), canvasOrigin.x - gradLength / 2 - textOffset, canvasY);
    }

    ctx.stroke();
}

function drawKangaroos() {
    if (!state.positions) return;

    const pointRadius = 6;
    const lineAlpha = 0.6;

    const C0Color = "184, 134, 11";
    const C1Color = "30, 144, 255";

    ctx.fillStyle = `rgb(${C1Color})`;
    ctx.setLineDash([5]);

    ctx.beginPath();
    state.positions.C1.forEach((pos, t) => {
        const { x: canvasX, y: canvasY } = axisToCanvas({
            x: pos.x,
            y: t * config.deltaT,
        });

        ctx.arc(canvasX, canvasY, pointRadius, 0, Math.PI * 2);
    });
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = `rgba(${C1Color}, ${lineAlpha})`;
    state.positions.C1.forEach((pos, t) => {
        const { x: canvasX, y: canvasY } = axisToCanvas({
            x: pos.x,
            y: t * config.deltaT,
        });
        ctx.lineTo(canvasX, canvasY);
    });
    ctx.stroke();

    ctx.fillStyle = `rgb(${C0Color})`;
    state.positions.C0.forEach((pos, t) => {
        ctx.beginPath();
        const { x: canvasX, y: canvasY } = axisToCanvas({
            x: pos.x,
            y: t * config.deltaT,
        });
        ctx.arc(canvasX, canvasY, pointRadius, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.beginPath();
    ctx.strokeStyle = `rgba(${C0Color}, ${lineAlpha})`;
    state.positions.C0.forEach((pos, t) => {
        const { x: canvasX, y: canvasY } = axisToCanvas({
            x: pos.x,
            y: t * config.deltaT,
        });
        ctx.lineTo(canvasX, canvasY);
    });
    ctx.stroke();
}

function axisToCanvas(coords: { x?: number; y?: number }) {
    const kx = canvas.width / (maxX - minX);
    const ky = canvas.height / (maxY - minY);

    // using Infinity here is quite odd
    // but the goal here is to have a type of number whether
    // we have passed a value or not
    // (Infinity only appears if we did not, so it's no big problem)

    return {
        x: coords.x !== undefined ? (coords.x - minX) * kx : Infinity,
        y: coords.y !== undefined ? canvas.height - (coords.y - minY) * ky : Infinity,
    };
}
