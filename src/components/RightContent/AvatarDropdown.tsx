import { userLogoutUsingPost } from '@/services/backend/userController';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Button, Space } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, {useCallback, useEffect} from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import Star from "@/components/Star";
import {useEmotionCss} from "@ant-design/use-emotion-css";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      alignItems: 'center',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      padding: '0 12px',
      gap: '0px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      margin: '0px',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await userLogoutUsingPost();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      if (key === 'settings') {
        history.push(`/account/${key}`);
        return;
      }
      if (key === 'center') {
        history.push(`/user/${currentUser?.id}`)
        return;
      }
    },
    [setInitialState],
  );


  useEffect(()=>{

  },[])

  if (!currentUser) {
    return (
      <Link to="/user/login">
        <Button type="primary" shape="round">
          登录
        </Button>
      </Link>
    );
  }

  const menuItems = [
    ...(menu
      ? [
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <>
      <span className={actionClassName}>
        <HeaderDropdown
          menu={{
            selectedKeys: [],
            onClick: onMenuClick,
            items: menuItems,
          }}
        >
        <Space>
          {currentUser?.userAvatar ? (
            <Avatar size="small" src={currentUser?.userAvatar} />
          ) : (
            <Avatar size="small" icon={<UserOutlined />} />
          )}
          <span className="anticon">{currentUser?.userName ?? '无名'}</span>
        </Space>
      </HeaderDropdown>
      </span>
      <span className={actionClassName}>
        <Star/>
      </span>
    </>
  );
};
