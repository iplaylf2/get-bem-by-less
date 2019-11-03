export const getCreateBlock = function(
  prefix: Prefix = {
    element: "__",
    modifier: "_",
    modifierValue: "_"
  }
) {
  return function(name: string) {
    return new Block(name, prefix);
  };
};

export const createBlock = getCreateBlock();

type Prefix = {
  element: string;
  modifier: string;
  modifierValue: string;
};

class Block {
  constructor(name: string, prefix: Prefix) {
    this.classNameText = name;
    this.prefix = prefix;
  }
  te(elementName: string) {
    return new Element(this.classNameText, this.prefix, elementName);
  }
  tm(modifierName: string): Modifier;
  tm(modifierName: string, effect: boolean): string;
  tm(modifierName: string, effect?: boolean) {
    if (arguments.length === 1) {
      return new Modifier(this.classNameText, this.prefix, modifierName);
    } else if (arguments.length === 2) {
      if (effect) {
        return new Modifier(
          this.classNameText,
          this.prefix,
          modifierName
        ).toString();
      } else {
        return this.toString();
      }
    }
  }
  toString() {
    return this.classNameText;
  }
  private classNameText: string;
  private prefix: Prefix;
}

class Element {
  constructor(parent: string, prefix: Prefix, name: string) {
    this.prefix = prefix;
    this.classNameText = `${parent}${this.prefix.element}${name}`;
  }
  tm(modifierName: string): Modifier;
  tm(modifierName: string, effect: boolean): string;
  tm(modifierName: string, effect?: boolean) {
    if (arguments.length === 1) {
      return new Modifier(this.classNameText, this.prefix, modifierName);
    } else if (arguments.length === 2) {
      if (effect) {
        return new Modifier(
          this.classNameText,
          this.prefix,
          modifierName
        ).toString();
      } else {
        return this.toString();
      }
    }
  }
  toString() {
    return this.classNameText;
  }
  private classNameText: string;
  private prefix: Prefix;
}

class Modifier {
  constructor(parent: string, prefix: Prefix, name: string) {
    this.prefix = prefix;
    this.classNameText = `${parent} ${parent}${this.prefix.modifier}${name}`;
  }
  tv(value: string) {
    return `${this.classNameText}${this.prefix.modifierValue}${value}`;
  }
  toString() {
    return this.classNameText;
  }
  private classNameText: string;
  private prefix: Prefix;
}
