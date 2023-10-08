declare global {

    type Nullable<T> = T | null | {};

    type Indexed<T = any> = {
        [k in (string | symbol)]: T;
    };

    type PlainObject<T = any> = {
        [k in string]: T;
    };

    type StringIndexed = Record<string, any>;

    type Keys<T extends Record<string, unknown>> = keyof T;

    type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

export {};
