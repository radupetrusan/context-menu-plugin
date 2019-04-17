import 'rete';
import { OptionItem } from './menu/models/option-item';

declare module 'rete/types/events' {
    interface EventsTypes {
        optionsmenu: {
            e: MouseEvent,
            items?: OptionItem[]
        };
        hideoptionsmenu: {};
    }
}