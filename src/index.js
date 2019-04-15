import MainMenu from './main-menu';
import NodeMenu from './node-menu';
import VueItem from './menu/Item.vue';
import VueMenu from './menu/Menu.vue';
import VueSearch from './menu/Search.vue';

function install(editor, {
    searchBar = true,
    searchKeep = () => false,
    delay = 1000,
    items = [],
    allocate = () => [],
    rename = component => component.name,
    vueComponent = null
}) {
    if (!editor.exist('hidecontextmenu')) {
        editor.bind('hidecontextmenu');
    }

    const mainMenu = new MainMenu(editor, {
        searchBar,
        searchKeep,
        delay
    }, vueComponent, {
        items,
        allocate,
        rename
    });
    const nodeMenu = new NodeMenu(editor, {
        searchBar: false,
        delay
    }, vueComponent);

    editor.on('hidecontextmenu', () => {
        mainMenu.hide();
        nodeMenu.hide();
    });

    editor.on('click optionsmenu', () => {
        editor.trigger('hidecontextmenu');
    });

    editor.on('optionsmenu', ({
        e,
        node
    }) => {
        e.preventDefault();
        e.stopPropagation();

        const [x, y] = [e.clientX, e.clientY];
        const menu = node ? nodeMenu : mainMenu;

        menu.show(x, y, {
            node
        });
    });
}

export const Menu = VueMenu;
export const Item = VueItem;
export const Search = VueSearch;

export default {
    name: 'options-menu',
    install
}