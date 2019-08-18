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
    .container__block
      p コマンド一覧
      div
        button(@click="undoButtonClick", :disabled="$data.commandIndex >= $data.commands.length") undo
        button(@click="redoButtonClick", :disabled="$data.commandIndex <= 0") redo
      p now value: {{ $data.valueStore.getValue() }}
      ul.commands
        template(v-for="command, index in $data.commands")
          li.commands__item(:class="{ '-selected': index === $data.commandIndex }")
            span {{ command.showInfo() }}
</template>

<script lang="ts">
import Vue from 'vue';

import ValueStore from '~/modules/ValueStore';
import { ICommand, AddCommand, SubtractCommand, MultiplyCommand, DivideCommand } from '~/modules/Commands';

export default Vue.extend({
  components: {
  },
  data() {
    return {
      /** 入力テキスト */
      inputValue: '',
      /** データストア */
      valueStore: new ValueStore(),
      /** コマンドリスト */
      commands: [] as Array<ICommand>,
      /** 実行したコマンドのindex値 */
      commandIndex: 0,
    };
  },
  methods: {
    addCommandAndExecute(command: ICommand) {
      this.commands = [
        command,
        ...this.commands.slice(this.commandIndex),
      ];
      this.commandIndex = 0;
      command.execute();
    },
    undoButtonClick() {
      if (this.commandIndex >= this.commands.length) {
        return;
      }
      this.commands[this.commandIndex].undo();
      this.commandIndex += 1;
    },
    redoButtonClick() {
      if (this.commandIndex <= 0) {
        return;
      }
      this.commandIndex -= 1;
      this.commands[this.commandIndex].execute();
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
  padding: 0 0 0 20px;

  &__item {
    position: relative;
    padding: 5px 0;
    list-style: none;
    white-space: pre;

    &.-selected {
      &::before {
        position: absolute;
        top: 4px;
        left: -20px;
        font-size: 20px;
        color: #f00;
        content: '>';
      }
    }

    & + & {
      border-top: solid 1px #000;
    }
  }
}
</style>
