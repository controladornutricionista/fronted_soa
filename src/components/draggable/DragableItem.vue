<template>
  <div
    ref="dragItem"
    class="draggable__container"
  >
    <slot name="content" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"

const dragItem = ref()

const pos = ref({ top: 0, left: 0, x: 0, y: 0 });

const mouseDownHandler = function (e) {
    pos.value = {
        // The current scroll
        left: dragItem.value.scrollLeft,
        top: dragItem.value.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    dragItem.value.style.cursor = 'grabbing';
    dragItem.value.style.userSelect = 'none';

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    dragItem.value.style.cursor = 'grab';
    dragItem.value.style.removeProperty('user-select');
};

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.value.x;
    const dy = e.clientY - pos.value.y;

    // Scroll the element
    dragItem.value.scrollTop = pos.value.top - dy;
    dragItem.value.scrollLeft = pos.value.left - dx;
};


onMounted(() => {
  dragItem.value.addEventListener("mousedown", mouseDownHandler)
})

</script>

<style>
.draggable__container {
  max-width: 100%;
  max-height: 100%;
  cursor: grabbing;
  overflow: auto;
}
</style>