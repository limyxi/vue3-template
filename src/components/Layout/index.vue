<template>
  <div :class="{ hideSidebar: collapse }" class="container-wrapper">
    <el-container>
      <Sider />
      <el-container class="main-container" direction="vertical">
        <div>
          <top-header>Header</top-header>
        </div>
        <el-scrollbar>
          <el-main class="main-body">
            <card-content>
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <div>
                    <component :is="Component" />
                  </div>
                </transition>
              </router-view>
            </card-content>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sider from './components/Sider/index.vue';
import TopHeader from './components/TopHeader/index.vue';
import CardContent from './components/CardContent/index.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  components: { Sider, TopHeader, CardContent },
  setup(props) {
    const store = useStore();

    const collapse = computed(() => {
      return store.getters.menuCollapse;
    });

    return {
      collapse,
    };
  },
};
</script>
<style lang="scss" scoped>
.container-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  background-color: var(--color-back);
}
.el-main {
  padding: 15px 0 0 15px;
}

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
