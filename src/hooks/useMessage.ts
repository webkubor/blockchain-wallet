import { createApp } from "vue";
import MessageComponent from "@/components/Message.vue"; // 导入消息组件

let queue = []; // message 队列，用于管理多个消息实例
const defaultTop = 10; // 默认的顶部距离

// Message 函数，用于创建消息
export function Message(option) {
  const dom = document.createElement("div"); // 创建一个 div 元素作为消息容器
  const id = `message-${queue.length}`; // 根据队列长度生成唯一 ID
  document.body.appendChild(dom); // 将该元素添加到 body 中

  // 判断 option 是对象还是字符串，统一处理为对象形式
  if (typeof option === "object") {
    option = {
      modelValue: true,
      ...option
    };
  } else {
    option = {
      modelValue: true,
      content: option
    };
  }

  // 创建并挂载消息组件实例
  const app = createApp(MessageComponent, {
    destroy: () => {
      // 移除队列中的第一个消息
      queue = queue.slice(1); 
      const el = dom.firstElementChild; // 获取当前消息的 DOM 元素
      if (el) {
        el.style.transform = `translateX(${2 * defaultTop}px)`; // 设置消失动画
        el.style.opacity = "0"; // 淡出效果
        setTimeout(() => {
          app.unmount(dom); // 卸载 Vue 实例
          if (document.body.contains(dom)) {
            document.body.removeChild(dom); // 从 DOM 中移除元素
          }
        }, 300); // 300ms 后完成动画并移除
      }
    },
    ...option // 传递其他选项参数
  });

  const vm = app.mount(dom); // 将实例挂载到新创建的 DOM 上
  vm.$el.setAttribute("id", id); // 为消息元素设置唯一 ID

  // 延时设置消息初始的 margin-top 位置
  setTimeout(() => {
    vm.$el.style.marginTop = `${defaultTop}px`;
  });

  // 如果存在其他消息，则将队列中之前的消息依次向下移动
  if (queue.length > 0) {
    moveDownMessages(queue.length); 
  }

  // 将当前消息 DOM 元素加入队列
  queue.push(vm.$el);

  // 下移消息的逻辑
  function moveDownMessages(end) {
    for (let index = 0; index < end; index++) {
      const el = queue[index]; // 获取消息 DOM 元素
      const rect = el.getBoundingClientRect(); // 动态获取每个消息的高度
      const distance = rect.height + 15; // 消息高度 + 15px 间距
      // 动态调整消息的 margin-top 值，使其向下排列
      el.style.marginTop = `${(index + 1) * distance + defaultTop}px`;
    }
  }
}

// 提供不同类型的消息调用方式
Message.success = function(content) {
  Message({ type: "success", content });
};
Message.warning = function(content) {
  Message({ type: "warning", content });
};
Message.error = function(content) {
  Message({ type: "error", content });
};
Message.info = function(content) {
  Message({ type: "info", content });
};
