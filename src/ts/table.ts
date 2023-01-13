import { state } from "./state";

const stopMessage = document.querySelector<HTMLParagraphElement>(".simul__stop-message")!;
const positions = document.querySelector<HTMLUListElement>(".simul__positions")!;

export function update() {
    stopMessage.textContent = state.stopMessage;

    positions.innerHTML = "";

    for (let t = 0; t < state.positions.C0.length; t++) {

        const c0Pos = state.positions.C0[t];
        const c1Pos = state.positions.C1[t];

        const position = document.createElement("li");
        position.classList.add("simul__position");

        const tSpan = document.createElement("span");
        const x0Span = document.createElement("span");
        const x1Span = document.createElement("span");

        tSpan.innerHTML = `${t}&Delta;t`;
        x0Span.innerHTML = `x<sub>0</sub> = ${c0Pos.x.toFixed(2)}`;
        x1Span.innerHTML = `x<sub>1</sub> = ${c1Pos.x.toFixed(2)}`;

        position.append(tSpan, x0Span, x1Span);

        positions.appendChild(position);
    }
}
