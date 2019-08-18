import ValueStore from './ValueStore';

/**
 * コマンドのインターフェース
 */
export interface ICommand {
  execute(): void;
  undo(): void;

  showInfo(): string;
}

/**
 * 加算するコマンド
 */
export class AddCommand implements ICommand {
  private restoreValue?: number;

  constructor(private valueStore: ValueStore, private value: number) {
  }

  execute() {
    const value = this.valueStore.getValue();
    this.restoreValue = value;
    this.valueStore.setValue(value + this.value);
  }

  undo() {
    if (this.restoreValue != null) {
      this.valueStore.setValue(this.restoreValue);
    }
  }

  showInfo() {
    return [
      `operator: add`,
      `value: ${this.value}`,
      `restore value: ${this.restoreValue}`
    ].join('\n');
  }
}

/**
 * 減算するコマンド
 */
export class SubtractCommand implements ICommand {
  private restoreValue?: number;

  constructor(private valueStore: ValueStore, private value: number) {
  }

  execute() {
    const value = this.valueStore.getValue();
    this.restoreValue = value;
    this.valueStore.setValue(value - this.value);
  }

  undo() {
    if (this.restoreValue != null) {
      this.valueStore.setValue(this.restoreValue);
    }
  }

  showInfo() {
    return [
      `operator: subtract`,
      `value: ${this.value}`,
      `restore value: ${this.restoreValue}`
    ].join('\n');
  }
}

/**
 * 乗算するコマンド
 */
export class MultiplyCommand implements ICommand {
  private restoreValue?: number;

  constructor(private valueStore: ValueStore, private value: number) {
  }

  execute() {
    const value = this.valueStore.getValue();
    this.restoreValue = value;
    this.valueStore.setValue(value * this.value);
  }

  undo() {
    if (this.restoreValue != null) {
      this.valueStore.setValue(this.restoreValue);
    }
  }

  showInfo() {
    return [
      `operator: multiply`,
      `value: ${this.value}`,
      `restore value: ${this.restoreValue}`
    ].join('\n');
  }
}

/**
 * 除算するコマンド
 */
export class DivideCommand implements ICommand {
  private restoreValue?: number;

  constructor(private valueStore: ValueStore, private value: number) {
  }

  execute() {
    const value = this.valueStore.getValue();
    this.restoreValue = value;
    this.valueStore.setValue(value / this.value);
  }

  undo() {
    if (this.restoreValue != null) {
      this.valueStore.setValue(this.restoreValue);
    }
  }

  showInfo() {
    return [
      `operator: divide`,
      `value: ${this.value}`,
      `restore value: ${this.restoreValue}`
    ].join('\n');
  }
}
