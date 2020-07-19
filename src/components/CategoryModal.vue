<template>
  <div class="modal">
    <div class="modal-content">
      <input type="text" v-model="categoryCopy"
        placeholder="Name of category">
    </div>
    <div class="modal-footer">
      <a class="waves-effect waves-green btn" href="#" @click="onSave">Save</a>
      <a class="waves-effect waves-light btn" href="#" @click="onCancel">Cancel</a>
      <a class="waves-effect waves-red btn" href="#" @click="onDelete"
                                            :class="{red: clickDelete}">Delete</a>
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
  }
}
</script>

<style lang="scss">
div.modal div.modal-footer a.btn {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
</style>
