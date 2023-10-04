import Block from "../Block";

export default function render(query: string, block: Block<StringIndexed>) {
    const root = document.querySelector(query);
  
    if (root === null) {
      throw new Error(`root not found by selector "${query}"`);
    }
  
    root.innerHTML = '';
  
    root.append(block.element!);
  
    return root;
  }
