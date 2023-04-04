import { MenuBar } from "@/components";
import { useLocation } from "umi";
import { StoreProvider } from 'think-react-store';
import * as store from '../stores';

function BasicLayout(props) {
  // 获取当前页面下的location信息
  const location = useLocation();
  const paths = ['/', '/order', '/user', '/business']

  return (
    <StoreProvider store={store}>
      <MenuBar
        show={paths.includes(location.pathname)}
        pathname={location.pathname}
      />
      {props.children}
    </StoreProvider>
  )
}

export default BasicLayout;