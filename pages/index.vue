<template lang="pug">
div
  .container
    .container__block
      p calculator
      div
        span 値：
        input(v-model="$data.inputValue", type="text")
      div
        p 演算
        button(@click="onAddButtonClick") +
        button(@click="onSubtractButtonClick") -
        button(@click="onMultiplyButtonClick") *
        button(@click="onDivideButtonClick") /
      p value: {{ $data.valueStore.getValue() }}
    .container__block
      p コマンド一覧
      ul.commands
        template(v-for="command in $data.commands")
          li.commands__item {{ command.showInfo() }}
</template>

<script lang="ts">
import Vue from 'vue';

import ValueStore from '~/modules/ValueStore';
import { ICommand, AddCommand, SubtractCommand, MultiplyCommand, DivideCommand } from '~/modules/Commands';

interface IData {
  inputValue: string;
  valueStore: ValueStore;
  commands: Array<ICommand>;
}

export default Vue.extend({
  components: {
  },
  data(): IData {
    return {
      inputValue: '',
      valueStore: new ValueStore(),
      commands: [],
    };
  },
  methods: {
    addCommandAndExecute(command: ICommand) {
      this.commands.unshift(command);
      command.execute();
    },
    onAddButtonClick() {
      this.addCommandAndExecute(new AddCommand(this.valueStore, Number(this.inputValue)));
    },
    onSubtractButtonClick() {
      this.addCommandAndExecute(new SubtractCommand(this.valueStore, Number(this.inputValue)));
    },
    onMultiplyButtonClick() {
      this.addCommandAndExecute(new MultiplyCommand(this.valueStore, Number(this.inputValue)));
    },
    onDivideButtonClick() {
      this.addCommandAndExecute(new DivideCommand(this.valueStore, Number(this.inputValue)));
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: 100vh;

  &__block {
    flex: 1 1 0;

    & + & {
      border-left: solid 1px black;
    }
  }
}

.commands {
  &__item {
    white-space: pre;
  }
}
</style>
