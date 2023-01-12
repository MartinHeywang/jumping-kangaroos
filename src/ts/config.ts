interface Config {
    s: number;

    C1: (t: number) => number;
}

// default values
export let config: Config = { s: 2, C1: t => 1 + t };

type Listener = (config: Config) => void;
const listeners: Listener[] = [];

type ParseFn<T> = (text: string) => T;

export function setConfig(newConfig: Partial<Config>) {
    config = { ...config, ...newConfig };

    listeners.forEach(cb => cb(config));
}

// info: where you left off
// create an option for a default value in setupVariable
// to replace the html one

function setupVariable<T extends keyof Config>(
    varName: T,
    varElementQuery: string,
    parseFunction: ParseFn<Config[T]>,
    toString: (val: Config[T]) => string,
    defaultValue: Config[T]
) {
    const variable = document.querySelector(varElementQuery)!;
    const input = variable.querySelector<HTMLInputElement>(".config__var-input")!;
    input.value = toString(defaultValue);

    const set = () => setConfig({ [varName]: parseFunction(input.value) });
    input.addEventListener("change", set);
    input.addEventListener("keydown", evt => {
        if (evt.key !== "Enter") return;
        set();
    });

    setConfig({ [varName]: defaultValue });
}

setupVariable("s", ".config__var[data-var=s]", parseFloat, v => v.toString(), 2);

export function addListener(listener: Listener) {
    listeners.push(listener);
}

export function removeListener(listener: Listener) {
    listeners.splice(listeners.indexOf(listener), 1);
}
