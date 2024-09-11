<template>
  <transition name="slide-fade">
  <div v-if="modelValue" class="toast-message"  :style="{ background: backgroundColor , border: `0.2px solid ${themeColor}`, filter:`drop-shadow(0 0 10px ${themeColor})` }">
      <main class="toast-message-main">
        <section v-if="content" class="toast-message-content" v-html="content" />
        <section v-else class="toast-message-content">
          <slot />
        </section>
        <div v-if="showProgress" class="progress-bar-container" :style="{ backgroundColor: backgroundColor }">
          <div class="progress-bar" :style="{ width: `${progress}%`,backgroundColor: themeColor }"></div>
        </div>
      </main>
    </div>
  </transition>
</template>

<script>
import { watchEffect, onMounted, ref } from "vue";
export default {
  name: "Message",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: () => false
    },
    showProgress: {
      type: Boolean,
      default: () => true
    },
    content: {
      type: String,
      default: () => ""
    },
    time: {
      type: Number,
      default: () => 3000
    },
    destroy: {
      type: Function,
      default: () => { }
    },
    themeColor: {
      type: String,
      default: () => "#e42121" // 默认主题色
    },
    backgroundColor: {
      type: String,
      default: () => "linear-gradient(145deg, #e42121 2.89%, #23181E 20.36%)"
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    let timer = null;
console.log(`output->`,props)
    const progress = ref(100);
    const totalTime = props.time || 5000; // 接受外部传入的时间参数，默认为 5000 毫秒

    function onClose() {
      emit("update:modelValue", false);
      props.destroy();
    }
    
    onMounted(() => {
      startProgress();
    });

    watchEffect(() => {
      clearTimeout(timer);
      if (props.modelValue) {
        timer = setTimeout(() => {
          onClose();
        }, props.time);
      }
    });

    const startProgress = () => {
      const interval = setInterval(() => {
        progress.value -= (100 / totalTime) * 1000;
        if (progress.value <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    }

    return {
      progress,
      onClose
    };
  }
};
</script>

<style lang="less" scoped>
.progress-bar-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: var(--background-color,linear-gradient(145deg, #e42121 2.89%, #23181E 20.36%));
  border-radius: 4px;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 1s;
  background-color: var(--theme-color, #e42121);
}

.toast-message {
  display: flex;
  position: fixed;
  width: 320px;
  right: 64px;
  top: 96px;
  margin-left: -325px;
  background: var(--background-color,linear-gradient(145deg, #e42121 2.89%, #23181E 20.36%));
  box-shadow: 0px 10px 40px -4px rgba(#e42121, 0.4);
  filter: drop-shadow(0 0 10px var(--theme-color,#e42121));
  border-radius: 6px;
  z-index: 10000;
  transition: 0.3s;
  border: 0.2px solid var(--theme-color,#e42121);

  .toast-message-content {
    position: relative;
    color: aliceblue;
    padding: 0 10px;
    :deep(.message-link) {
      display: inline-block;
      text-decoration: underline;
      color: #d08fff;
      margin-top: 8px;
    }
  }
}

.toast-message-main {
  position: relative;
  flex: 1;
  padding: 15px;
}

.slide-fade-enter-active {
  opacity: 1;
  transition: all 0.3s;
}

.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
