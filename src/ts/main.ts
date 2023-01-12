import * as config from "./config";
import * as state from "./state";

import * as graph from "./graph";
import * as table from "./table";

function update() {
    state.update();

    graph.render();
    table.update();
}

update();
config.addListener(update);
