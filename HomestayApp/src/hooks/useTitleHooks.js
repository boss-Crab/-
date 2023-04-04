import { useLayoutEffect,useState } from "react";

export default function useTitleHook(title){
  const [state, setState] = useState();

  useLayoutEffect(()=>{
    console.log('改变标题了');
    document.title = title;
    setState(title);
  }, [title])

  return state
}