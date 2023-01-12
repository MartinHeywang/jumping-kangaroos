import { initGraphSimulation } from "./graph";
import {addListener} from "./config";

addListener((config) => {
    console.log("config changed")
    console.log(config);
})

initGraphSimulation();
window.addEventListener("resize", initGraphSimulation);
