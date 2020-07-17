<template>
  <div class="modal blue">
    <div class="modal-content">
      <input type="text" class="white-text" v-model="categoryCopy"
        placeholder="Name of category">
    </div>
    <div class="modal-footer blue darken-1">
      <a class="waves-effect waves-green btn" href="#" @click="onSave">Save</a>
      <a class="waves-effect waves-light btn" href="#" @click="onCancel">Cancel</a>
      <a class="waves-effect waves-red btn" href="#" @click="onDelete"
                                            :class="{red: clickDelete}">Delete</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component
export default class CategoryModal extends Vue {
  @Prop() private category!: string;

  private categoryCopy = this.category;
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
}
</script>

<style lang="scss">
div.modal div.modal-footer a.btn {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
</style>
