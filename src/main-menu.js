import Menu from './menu/index';
import { createNode } from './utils';

export default class MainMenu extends Menu {
    constructor(editor, props, vueComponent, { items, allocate, rename }) {
        super(editor, props, vueComponent);
        
        const mouse = { x: 0, y: 0 };

        editor.on('mousemove', ({ x, y }) => {
            mouse.x = x;
            mouse.y = y;
        });
        
        editor.on('componentregister', component => {
            const path = allocate(component);
    
            // if (Array.isArray(path)) // add to the menu if path is array
            //     this.addItem(rename(component), async () => {
            //         editor.addNode(await createNode(component, mouse));
            //     },
            //     path);
        });
    
        items.forEach(item => {
            this.addItem(item.name, item.subtitle, item.function);
        });
    }
}