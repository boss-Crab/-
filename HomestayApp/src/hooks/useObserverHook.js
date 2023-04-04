import { useEffect } from 'react';

let observer;
export default function useObserverHook(ele, callback, watch) {
  useEffect(() => {
    // 获取元素节点
    const node = document.querySelector(ele);
    if (node) {
      // 对节点进行监听
      observer = new IntersectionObserver(entries => {
        callback && callback(entries);
      });
      observer.observe(node);
    }

    return () => {
      if (node && observer) {
        // 解绑元素
        observer.unobserve(node);
        // 停止监听
        observer.disconnect();
      }
    }
  }, watch)
}