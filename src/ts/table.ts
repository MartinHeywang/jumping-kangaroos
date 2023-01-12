import { state } from "./state";

const positionsList = document.querySelector<HTMLUListElement>(
    ".simul__positions-list"
)!;

export function update() {
    showPositionsInTable();
}

function showPositionsInTable() {
    positionsList.innerHTML = "";

    for (let t = 0; t < state.positions.C0.length; t++) {
        const li = document.createElement("li");
        li.classList.add("simul__position");

        li.innerHTML = `
            <span>t = ${t}&Delta;t</span
            ><span>x<sub>0</sub> = ${state.positions.C0[t].x.toFixed(
                3
            )}</span><span>x<sub>1</sub> = ${state.positions.C1[t].x}</span>
        `;

        positionsList.appendChild(li);
    }
}
