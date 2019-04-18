import { NodeEditor } from 'rete';
import MainMenu from './main-menu';
import VueItem from './menu/';
import VueMenu from './menu/';
import './events';

function install(editor: NodeEditor, {
    searchBar = true,
    searchKeep = () => false,
    items = [],
    vueComponent = null,
    rename = (component: any) => component.name,
    allocate = () => []
}) {
    if (!editor.exist('hideoptionsmenu')) {
        editor.bind('hideoptionsmenu');
    }

    if (!editor.exist('optionsmenu')) {
        editor.bind('optionsmenu');
    }

    const mainMenu = new MainMenu(
        editor,
        {
            searchBar,
            searchKeep,
        },
        vueComponent,
        {
            items,
            allocate,
            rename
        });

    editor.on('hideoptionsmenu', () => {
        mainMenu.hide();
    });

    editor.on('click' || 'optionsmenu', () => {
        editor.trigger('hideoptionsmenu');
    });

    editor.on('optionsmenu', ({ e, items }) => {
        e.preventDefault();
        e.stopPropagation();

        if (!!items) {
            mainMenu.setItems(items);
        }

        const [x, y] = [e.clientX, e.clientY];

        mainMenu.show(x, y);
    });
}

export const Menu = VueMenu;
export const Item = VueItem;
export { OptionItem } from './menu/models/option-item';

export default {
    name: 'options-menu',
    install
}