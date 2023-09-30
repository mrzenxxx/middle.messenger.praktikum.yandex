import Handlebars, { HelperOptions } from 'handlebars';
import Block from '../Block';

export function registerComponent(name: string, Component: typeof Block) {
  if (name in Handlebars.helpers) {
    throw new Error(`The ${name} component is already registered!`);
  }

  Handlebars.registerHelper(name, function (this: unknown, { hash, data, fn }: HelperOptions) {
    const component = new Component(hash);
    const dataAttribute = `data-id="${component.id}"`;

    if ('ref' in hash) {
      // eslint-disable-next-line no-param-reassign
      (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
    }

    // eslint-disable-next-line no-param-reassign
    (data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`);

        if (!stub) {
          return;
        }

        component.element?.append(...Array.from(stub.childNodes));

        stub.replaceWith(component.element!);
      },
    });

    const contents = fn ? fn(this) : '';

    return `<div ${dataAttribute}>${contents}</div>`;
  });
}
