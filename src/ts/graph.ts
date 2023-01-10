const canvas = document.querySelector<HTMLCanvasElement>(".simulation__graphic")!;
const ctx = canvas.getContext("2d")!;

const minX = -1;
const maxX = 15;

const minY = -1;
const maxY = 15;

export function initGraphSimulation() {
    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;

    drawAxis();
}

function drawAxis() {
    const cw = canvas.width;
    const ch = canvas.height;

    const origin = { x: 0, y: 0 };
    const canvasOrigin = axisToCanvas(origin);

    const axisWidth = 2;

    // draw the actual axis
    ctx.fillStyle = "#222";
    ctx.fillRect(canvasOrigin.x, 0, axisWidth, ch);
    ctx.fillRect(0, canvasOrigin.y, cw, axisWidth);

    // draw the O for the origin
    ctx.font = "20px sans-serif";
    ctx.textBaseline = "top";
    ctx.textAlign = "right";

    const textOffset = 6;

    ctx.fillText(
        "0",
        canvasOrigin.x - textOffset,
        canvasOrigin.y + textOffset
    );

    // draw the grads
    const gradLength = 14;
    const gradThickness = 1;

    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    for (let x = Math.ceil(minX); x < maxX; x++) {
        if (x === 0) continue;

        const { x: canvasX } = axisToCanvas({ x });
        ctx.fillRect(canvasX, canvasOrigin.y - gradLength / 2, gradThickness, gradLength);

        ctx.fillText(x.toString(), canvasX, canvasOrigin.y + gradLength / 2 + textOffset);
    }

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let y = Math.ceil(minY); y < maxY; y++) {
        if (y === 0) continue;

        const { y: canvasY } = axisToCanvas({ y });
        ctx.fillRect(canvasOrigin.x - gradLength / 2, canvasY, gradLength, gradThickness);

        ctx.fillText(y.toString(), canvasOrigin.x - gradLength / 2 - textOffset, canvasY);
    }
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
