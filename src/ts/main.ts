import * as config from "./config";
import * as state from "./state";

import * as status from "./status";
import * as graph from "./graph";
import * as table from "./table";

function update() {
    state.update(); // state model

    status.update(); // status bar
    graph.render();
    table.update();
}

update();
config.addListener(update);
