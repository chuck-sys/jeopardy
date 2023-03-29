import { Vue } from 'vue-property-decorator';
import M from 'materialize-css';

export function openModal(m: Vue) {
  const instance = M.Modal.init(m.$el, {});
  instance.open();
}

export function closeModal(m: Vue) {
  const modal = M.Modal.getInstance(m.$el);
  modal.close();
}
