<template>
  <div class="modal">
    <div class="category-fields modal-content">
      <span id="m-category">Category:</span>
      <input id="i-category" type="text" v-model="categoryCopy"
        autofocus placeholder="Name of category" @keyup.13="onSave">
    </div>
    <div class="modal-footer">
      <a class="danger waves-effect waves-red btn" href="#" @click="onDelete"
                                            :class="{'danger-confirm': clickDelete}">Delete</a>
      <a class="cancel waves-effect waves-light btn" href="#" @click="onCancel">Cancel</a>
      <a class="affirm waves-effect waves-green btn" href="#" @click="onSave">Save</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CategoryModal extends Vue {
  private category = '';
  private categoryCopy = '';
  private clickDelete = false;

  private onSave() {
    this.$emit('save-category', this.category, this.categoryCopy);
  }

  private onCancel() {
    this.$emit('cancel-category');
  }

  private onDelete() {
    if (this.clickDelete) {
      this.$emit('delete-category', this.category);
    } else {
      this.clickDelete = true;
      setTimeout(() => {
        this.clickDelete = false;
      }, 1000);
    }
  }

  public init(category: string) {
    this.category = category;
    this.categoryCopy = category;

    // We have to wait a bit before we can set the focus because reasons
    // unknown to me
    setTimeout(() => {
      const catText = document.getElementById('i-category');
      if (catText) {
        catText.focus();
      }
    }, 100);
  }
}
</script>

<style lang="scss">
div.modal div.modal-footer a.btn {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

div.category-fields {
  display: flex;
  justify-content: space-evenly;

  span#m-category {
    margin-right: 0.5rem;
  }

  input#i-category {
    height: unset;
  }
}
</style>
