<template>
  <div class="modal">
    <div class="modal-content">
      <div class="jgrid">
        <span id="m-points">Points:</span>
        <input id="i-points" type="number" v-model="question.points">
        <span id="preview-heading">Preview (what this will look like)</span>
        <span id="m-hint">Hint:</span>
        <textarea id="i-hint" v-model="question.hint"></textarea>
        <div id="preview-hint" v-html="converter.makeHtml(question.hint)"></div>
        <span id="m-answer">Answer:</span>
        <textarea id="i-answer" v-model="question.answer"></textarea>
        <div id="preview-answer" v-html="converter.makeHtml(question.answer)"></div>
      </div>
    </div>
    <div class="modal-footer">
      <a href="#"
         class="danger btn"
         :class="{'danger-confirm': clickDelete}"
         @click="onClickDelete">Delete</a>
      <a href="#" class="cancel btn"
                  @click="$emit('cancel-focus')">Cancel</a>
      <a href="#" class="affirm btn"
                  @click="$emit('save-question', catIndex)">Save</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import showdown from 'showdown';
import { Question, emptyQuestion } from '../question';

const converterConfig = {
  tables: true,
  smoothLivePreview: true,
};

@Component
export default class EditModal extends Vue {
  private readonly converter = new showdown.Converter(converterConfig);
  private question = emptyQuestion('');
  private clickDelete = false;
  private catIndex = -1;

  private onClickDelete() {
    if (this.clickDelete) {
      this.$emit('delete', this.catIndex);
    } else {
      this.clickDelete = true;
      setTimeout(() => {
        this.clickDelete = false;
      }, 1000);
    }
  }

  public init(catIndex: number, q: Question) {
    this.question = q;
    this.catIndex = catIndex;
    // We have to wait a bit before we can set the focus because reasons
    // unknown to me
    setTimeout(() => {
      const hintText = document.getElementById('i-hint');
      if (hintText) {
        hintText.focus();
      }
    }, 100);
  }
}
</script>

<style scoped lang="scss">
@use 'src/assets/theme.scss';

div.modal {
  width: 80%;
}

div.modal div.modal-footer a.btn {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

div.jgrid {
  display: grid;
  grid-template-columns: 10% 45% 45%;
  gap: 1rem 0.2rem;

  span {
    align-self: center;
  }
}

span#m-points {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
}

input#i-points {
  width: 4rem;
  height: unset;
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}

span#preview-heading {
  padding-left: 1rem;
  grid-column: 3 / span 1;
  grid-row: 1 / span 1;
}

span#m-hint {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
}

textarea#i-hint {
  height: 10rem;
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
}

div#preview-hint {
  padding-left: 1rem;
  grid-column: 3 / span 1;
  grid-row: 2 / span 1;
  border-top: 1px solid theme.$disabled;
}

span#m-answer {
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
}

textarea#i-answer {
  height: 5rem;
  grid-column: 2 / span 1;
  grid-row: 3 / span 1;
}

div#preview-answer {
  padding-left: 1rem;
  grid-column: 3 / span 1;
  grid-row: 3 / span 1;
  border-top: 1px solid theme.$disabled;
}

</style>
