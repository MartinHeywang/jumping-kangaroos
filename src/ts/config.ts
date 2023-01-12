interface Config {
    s: number;
}

// default values
export let config: Config = { s: 2 };

type Listener = (config: Config) => void;
const listeners: Listener[] = [];

type ParseFn<T> = (text: string) => T;

export function setConfig(newConfig: Partial<Config>) {
    config = { ...config, ...newConfig };

    listeners.forEach(cb => cb(config));
}

function setupVariable<T extends keyof Config>(
    varName: T,
    varElementQuery: string,
    parseFunction: ParseFn<Config[T]>
) {
    const variable = document.querySelector(varElementQuery)!;
    const input = variable.querySelector<HTMLInputElement>(".config__var-input")!;

    const set = () =>
        setConfig({ [varName]: parseFunction(input.value) })
    ;

    input.addEventListener("change", set);
    input.addEventListener("keydown", (evt) => {
        if(evt.key !== "Enter") return;
        set();
    });
    
}

setupVariable("s", ".config__var[data-var=s]", parseFloat);

export function addListener(listener: Listener) {
    listeners.push(listener);
}

export function removeListener(listener: Listener) {
    listeners.splice(listeners.indexOf(listener), 1);
}
