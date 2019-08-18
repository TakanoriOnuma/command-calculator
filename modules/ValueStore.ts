export default class ValueStore {
  private value = 0;

  getValue() {
    return this.value;
  }

  setValue(value: number) {
    this.value = value;
  }
}
