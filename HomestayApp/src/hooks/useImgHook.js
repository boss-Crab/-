import { useEffect } from 'react';
import { isEmpty } from 'project-libs'

/**
 * 1. 监听图片是否进入可视区域
 * 2. 将src属性的值替换为真实的图片地址, data-src
 * 3. 停止对当前节点的监听
 * @param {*} ele 
 * @param {*} callback 
 * @param {*} watch 
 */
let observer;
export default function useImgHook(ele, callback, watch = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll(ele);
    if (!isEmpty(nodes)) {
      observer = new IntersectionObserver((entries) => {
        callback && callback(entries);
        entries.forEach(item => {
          if (item.isIntersecting) {
            // 获取img节点的data-src网络图片地址
            const dataSrc = item.target.getAttribute('data-src');
            // 将网络图片地址传给src
            item.target.setAttribute('src', dataSrc);
            // 停止对img节点的监听
            observer.unobserve(item.target);
          }
        });
      });
      nodes.forEach(item => {
        observer.observe(item);
      });
    }

    return ()=>{
      if(!isEmpty(nodes) && observer){
        observer.disconnect();
      }
    }
  }, watch)
}