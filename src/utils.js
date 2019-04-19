export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export async function createNode(component, { data = {}, meta = {}, x = 0, y = 0 }) {
    const node = await component.createNode(deepCopy(data));

    node.meta = Object.assign(deepCopy(meta), node.meta);
    node.position[0] = x;
    node.position[1] = y;
    
    return node;
}

export function fitViewport([x, y], element) {
    return [
        Math.min(x, window.innerWidth - element.clientWidth),
        Math.min(y, window.innerHeight - element.clientHeight)
    ]
}