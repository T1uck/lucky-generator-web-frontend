import {getHotUsingGet, listGeneratorVoByPageFastUsingPost} from '@/services/backend/generatorController';
import {LikeOutlined, MessageFilled, StarOutlined, UserOutlined} from '@ant-design/icons';
import {PageContainer, ProFormSelect, ProFormText, QueryFilter} from '@ant-design/pro-components';
import {Avatar, Card, Flex, Image, Input, List, message, Tabs, Tag, Typography} from 'antd';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
// @ts-ignore
import {Link} from "umi";
import Notification from "@/components/Notification";

/**
 * 默认分页参数
 */
const DEFAULT_PAGE_PARAMS: PageRequest = {
  current: 1,
  pageSize: 8,
  sortField: 'createTime',
  sortOrder: 'descend',
};

/**
 * 主页
 * @constructor
 */
const IndexPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<API.GeneratorVO[]>([]);
  const [total, setTotal] = useState<number>(0);
  // 搜索条件
  // @ts-ignore
  const [searchParams, setSearchParams] = useState<API.GeneratorQueryRequest>({
    ...DEFAULT_PAGE_PARAMS,
  });

  const updatePage = async (key: string) => {
    if (key !== "recommend") {
    } else {
      setLoading(true);
      const res = await getHotUsingGet();
      if (res.data) {
        setDataList(res.data.records ?? [])
        setTotal(Number(res.data.total ?? 0))
      }
      setLoading(false);
    }
    if (key === "newest") {
      setLoading(true);
      setSearchParams({ current: "1",
        pageSize: "8",
        sortField: 'createTime',
        sortOrder: 'descend',})
      setLoading(false);
    }
  }
  /**
   * 搜索
   */
  const doSearch = async () => {
    setLoading(true);
    try {
      const res = await listGeneratorVoByPageFastUsingPost(searchParams);
      setDataList(res.data?.records ?? []);
      setTotal(Number(res.data?.total) ?? 0);
    } catch (error: any) {
      message.error('获取数据失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    doSearch();
    Notification();
  }, [searchParams]);

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

  // 点赞，收藏图标
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon}  {text}
    </span>
  );

  return (
    <PageContainer title={<></>} key={"root"}>
      <Flex justify="center">
        <Input.Search
          style={{
            width: '40vw',
            minWidth: 320,
          }}
          placeholder="搜索代码生成器"
          allowClear
          enterButton="搜索"
          size="large"
          onChange={(e) => {
            searchParams.searchText = e.target.value;
          }}
          onSearch={(value: string) => {
            // @ts-ignore
            setSearchParams({
              ...searchParams,
              ...DEFAULT_PAGE_PARAMS,
              searchText: value,
            });
          }}
        />
      </Flex>
      <div style={{ marginBottom: 16 }} />

      <Tabs
        size="large"
        defaultActiveKey="newest"
        items={[
          {
            key: 'newest',
            label: '最新',
          },
          {
            key: 'recommend',
            label: '推荐',
          },
        ]}
        onChange={updatePage}
      />
      <Card>
        <QueryFilter
          span={12}
          labelWidth="auto"
          labelAlign="left"
          style={{ padding: '16px 0' }}
          onFinish={async (values: API.GeneratorQueryRequest) => {
            // @ts-ignore
            setSearchParams({
              ...DEFAULT_PAGE_PARAMS,
              ...values,
              searchText: searchParams.searchText,
            });
          }}
        >
          <ProFormSelect label="标签" name="tags" mode="tags" />
          <ProFormText label="名称" name="name" />
          <ProFormText label="描述" name="description" />
        </QueryFilter>
      </Card>

      <div style={{ marginBottom: 24 }} />

      <List<API.GeneratorVO>
        rowKey="id"
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
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
          <List.Item>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Link to={`/generator/detail/${data.id}`}>
              <Card hoverable cover={<Image alt={data.name} src={data.picture} />}>
                <Card.Meta
                  title={<a>{data.name}</a>}
                  description={
                    <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ height: 44 }}>
                      {data.description}
                    </Typography.Paragraph>
                  }
                />
                {tagListView(data.tags)}
                <Flex justify="space-between" align="center">
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {moment(data.createTime).fromNow()}
                  </Typography.Text>
                  <div>
                    <Avatar src={data.user?.userAvatar ?? <UserOutlined />} />
                  </div>
                </Flex>
                <Flex gap={"middle"}>
                  <IconText key="like" icon={<LikeOutlined/>} text={data.likeCount}/>
                  <IconText key="star" icon={<StarOutlined/>} text={data.starCount}/>
                  <IconText key="comment" icon={<MessageFilled/>} text={data.commentCount}/>
                </Flex>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </PageContainer>
  );
};

export default IndexPage;
