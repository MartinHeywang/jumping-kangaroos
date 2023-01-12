import { state } from "./state";

const win = document.querySelector(".config__status__title")!;

export function update() {
    const C0Win = state.positions.C0.at(-1)?.x === state.positions.C1.at(-1)?.x;

    win.classList.remove("config__status__title--lose", "config__status__title--win");
    
    if (C0Win) {
        win.textContent = "C0 gagne!";
        win.classList.add("config__status__title--win");
    } else {
        win.textContent = "C0 perd";
        win.classList.add("config__status__title--lose");
    }
}
