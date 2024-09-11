<script setup>
import { init } from "ityped";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const content = ref(null);
onMounted(() => {
  init(content.value, {
    showCursor: false,
    disableBackTyping: true,
    strings: [" is not found!"],
  });
});

const router = useRouter();
const back = () => router.push("/home");
</script>

<template>
  <div class="page">
    <div class="desc">
      <div class="code">404</div>
      <div class="content" ref="content">The Page</div>
      <button @click="back" active="transform" class="rounded-lg transition">
        👉 Go Home
      </button>
    </div>

    <img src="@/assets/404/32.svg" class="cover" alt="page not found" />
  </div>
</template>

<style lang="less" scoped>
.page {
  display: flex;
  .cover {
    height: auto;
    width: 36.4583vw /* 700px -> 36.4583vw */;
    margin:  50px;
    max-width: 100%;
    max-height: 100%;
  }

  .desc {
    flex: 1;
    width: 300px;
  }
  .code {
    font-size: 80px;
    line-height: 1;
    margin-top: 20vh;
  }

  .content {
    font-size: 46px;
    line-height: 180px;
  }
  .rounded-lg {
    font-size: 20px;
    padding:10px  40px;
  }
}
</style>
