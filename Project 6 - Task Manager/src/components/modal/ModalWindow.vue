<script setup>
import { useTasksStore } from '../../stores/tasksStore';
import ModalCloseButton from './ModalCloseButton.vue';

const store = useTasksStore();
</script>

<template>
    <div class="modal-wrapper" aria-modal="true"
          role="dialog" tabindex="-1">
        <div class="inner">
            <ModalCloseButton @click="store.closeModal()"/>
            <slot></slot>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 500;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: grid;
    place-items: center;
    color: var(--black-color);
  
    .inner {
      background-color: white;
      padding: 30px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      position: relative;
      max-width: 600px;
      width: 90%;
  
      h3 {
        font-size: 16px;
        font-weight: 700;
        line-height: 21px;
        margin-bottom: 20px;
      }
  
      .close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        background-color: var(--white-color);
      }
    }
  }
</style>