import React, {useEffect, useState} from 'react';
import {LikeOutlined, MessageFilled, StarTwoTone} from '@ant-design/icons';
import {Avatar, List, message, Tag} from 'antd';
import styles from './index.less';
import {listGeneratorVoByPageUsingPost} from "@/services/backend/generatorController";
import moment from "moment";


/**
 * 默认分页参数
 */
const DEFAULT_PAGE_PARAMS: PageRequest = {
  current: 1,
  pageSize: 12,
  sortField: 'createTime',
  sortOrder: 'descend',
};

interface GeneratorsProps {
  currentUser: API.UserVO;
}

const Generators: React.FC<GeneratorsProps> = ({currentUser}: GeneratorsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<API.GeneratorVO[]>([]);
  const [total, setTotal] = useState<number>(0);

  // 搜索条件
  // @ts-ignore
  const [searchParams,setSearchParams] = useState<API.GeneratorQueryRequest>({
    ...DEFAULT_PAGE_PARAMS
  });

  // 初始化数据
  const oldData = async () => {
    setLoading(true);
    try {
      const res = await listGeneratorVoByPageUsingPost({...searchParams});
      setDataList(res.data?.records ?? [] );
      setTotal(Number(res.data?.total) ?? 0);
    } catch (error: any) {
      message.error('获取数据失败，' + error.message);
    }
    setLoading(false);
  };

  // 初始化
  useEffect(() => {
    oldData();
  }, [searchParams]);

  // 点赞，收藏图标
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );

  /**
   * 标签列表
   * @param tags
   */
  const tagListView = (tags?: string[]) => {
    if (!tags) {
      return <></>;
    }

    return (
      <div style={{ marginBottom: 8 }}>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    );
  };

  return (
    <List<API.GeneratorVO>
      size="large"
      className={styles.articleList}
      rowKey="id"
      loading={loading}
      itemLayout="vertical"
      dataSource={dataList}
      pagination={{
        // @ts-ignore
        current: searchParams.current,
        // @ts-ignore
        pageSize: searchParams.pageSize,
        total,
        onChange(current: number, pageSize: number) {
          // @ts-ignore
          setSearchParams({
            ...searchParams,
            // @ts-ignore
            current,
            // @ts-ignore
            pageSize,
          });
        },
      }}
      renderItem={(data) => (
        <List.Item
          key={data.id}
          actions={[
            <IconText key="like" icon={<LikeOutlined/>} text={data.likeCount}/>,
            <IconText key="star" icon={<StarTwoTone/>} text={data.starCount}/>,
            <IconText key="comment" icon={<MessageFilled/>} text={data.commentCount}/>,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={`/generator/detail/${data.id}`}>
                {data.name}
              </a>}
            description={tagListView(data.tags)}
          />

          <div className={styles.listContent}>
            <div className={styles.description}>{data.description}</div>
            <div className={styles.extra}>
              <Avatar src={currentUser.userAvatar} size="small"/>
              <a href={`/user/${currentUser.id}`}>{currentUser.userName}</a>
              <em>{moment(data.updateTime).format('YYYY-MM-DD HH:mm')}</em>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default Generators;
