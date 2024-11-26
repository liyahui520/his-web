import { customRef } from "vue";


export function debounceRef(value: any, delay: number=1000) {
    let timer:any;
    return customRef((track, trigger) => ({
        get() {
            track();
            return value;
        },
        set(val) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                value = val;
                trigger();
            }, delay);
        }
    }))
}