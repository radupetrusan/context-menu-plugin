export class OptionItem {
    title!: string;
    subtitle!: string;
    onclick!: Function;

    constructor(init?: Partial<OptionItem>) {
        Object.assign(this, init);
    }
}