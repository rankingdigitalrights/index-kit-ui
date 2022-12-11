import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const showHelpSider: Ref<boolean> = ref(false);

  function toggleHelpSider() {
    showHelpSider.value = !showHelpSider.value;
  }

  function closeHelpSider() {
    showHelpSider.value = false;
  }

  function openHelpSider() {
    showHelpSider.value = true;
  }

  return { showHelpSider, toggleHelpSider, closeHelpSider, openHelpSider };
});
