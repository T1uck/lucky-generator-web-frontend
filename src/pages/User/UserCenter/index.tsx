import {Card, Col, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './Center.less';
import {getUserVoByIdUsingGet} from "@/services/backend/userController";
import Generators from "@/pages/User/UserCenter/components/Generators";
// @ts-ignore
import {useParams} from "@@/exports";

export type tabKeyType = 'generator' | 'star';

const operationTabList = [
  {
    key: 'generator',
    tab: (
      <span>
        项目
      </span>
    ),
  },
  {
    key: 'star',
    tab: (
      <span>
        收藏
      </span>
    ),
  },
];


const Center: React.FC = () => {
    const params = useParams();
    const [tabKey, setTabKey] = useState<tabKeyType>('generator');
    const [loading, setLoading] = useState<boolean>(false);
    const [targetUser, setTargetUser] = useState<API.UserVO>();


    const loadData = async () => {
      setLoading(true)
      const res = await getUserVoByIdUsingGet({id: params.id});
      if (res.data && res.code === 0) {
        setTargetUser(res.data);
      }
      setLoading(false)
    }

    useEffect(() => {
      loadData();
    }, [params.id])

    // 渲染tab切换
    const renderChildrenByTabKey = (tabValue: tabKeyType) => {
      if (tabValue === 'star') {
        return <div></div>
        // return <Projects/>;
      }
      if (tabValue === 'generator') {
        // return <div></div>
        // @ts-ignore
        return <Generators currentUser={targetUser}/>;
      }
      return null;
    };

    return (
      <div>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{marginBottom: 24}} loading={loading}>
              {!loading && targetUser && (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={targetUser.userAvatar}/>
                    <div className={styles.name}>{targetUser.userName}</div>
                    <div>{targetUser?.userProfile}</div>
                  </div>
                </div>
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={(_tabKey: string) => {
                setTabKey(_tabKey as tabKeyType);
              }}
            >
              {renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
;
export default Center;
