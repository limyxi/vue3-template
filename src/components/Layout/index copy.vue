<template>
  <div>
    <Lang />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div>
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>
<script>
import Lang from './functionList/lang.vue';
export default {
  components: {
    Lang,
  },
};
</script>
<style scoped>
.fade-leave-active,
.fade-enter-active {
  transition: all 3.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
