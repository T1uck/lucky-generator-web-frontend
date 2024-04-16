import {GithubOutlined, WechatOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import '@umijs/max';
import {Tooltip} from 'antd';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'LucyOne研发出品';
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      // @ts-ignore
      copyright={<>
        {`${currentYear} ${defaultMessage}`} |{' '}
        <img src='https://gigot-1315824716.cos.ap-chongqing.myqcloud.com/pictrue/beian.png' alt="beian"/><a target={'_blank'} href={"https://beian.miit.gov.cn/"} rel="noreferrer"> 粤ICP备2024232243号-1</a>
      </>}
      links={[
        {
          key: 'weChat',
          title: (
            <Tooltip title={<img src="https://lucky-generator-1308976426.cos.ap-guangzhou.myqcloud.com/Common/MyWeChat.jpg" alt="微信 code_nav" width="120"/>}>
              <WechatOutlined/> 联系作者
            </Tooltip>
          ),
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> LuckyOne GitHub </>,
          href: 'https://github.com/T1uck',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
