Rete options menu plugin
====
#### Rete.js plugin

```js
import OptionsMenuPlugin, { Menu, Item, Search } from 'rete-options-menu-plugin';

editor.use(OptionsMenuPlugin, {
    searchBar: false, // true by default
    searchKeep: title => true, // leave item when searching, optional. For example, title => ['Refresh'].includes(title)
    delay: 100,
    allocate(component) {
        return ['Submenu'];
    },
    rename(component) {
        return component.name;
    },
    items: [],
    vueComponent: CustomVueComponent // extends Menu
});
```
| Options | Description | Default |
|-|-|-|
| `searchBar` | Showing search bar | `true`
| `delay` | Delay hide, ms | `1000`
| `allocate` | function for placing of components into submenu | `() => []`
| `rename` | function for renaming of items| `component => component.name`
| `items` | custom items (`Object` with nested objects and functions) | `{}`


You can arbitrarily put a component in a submenu. Examples: 

```js
allocate() { return ["Single submenu"] }
```

```js
allocate(component) { return component.path } // where path is a stack of menu for every component
```


```js
allocate(component) { return null } // exclude component from menu items
```

To change the items that create nodes, you may need to change the name.

```js
class MyComponent {
    constructor() {
        super("My comp");
        this.optionsMenuName = "Add My comp";
    }
}
///
rename(component) { return component.optionsMenuName || component.name }
```
