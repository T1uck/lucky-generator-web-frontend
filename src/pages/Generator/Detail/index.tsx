import AuthorInfo from '@/pages/Generator/Detail/components/AuthorInfo';
import FileConfig from '@/pages/Generator/Detail/components/FileConfig';
import ModelConfig from '@/pages/Generator/Detail/components/ModelConfig';
import {downloadGeneratorByIdUsingGet, getGeneratorVoByIdUsingGet,} from '@/services/backend/generatorController';
// @ts-ignore
import {Link, useModel, useParams} from '@@/exports';
import {DownloadOutlined, EditOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons';
import {PageContainer} from '@ant-design/pro-components';
import {Button, Card, Col, Image, message, Row, Space, Tabs, Tag, Typography} from 'antd';
import {saveAs} from 'file-saver';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import CommentDrawer from "@/pages/Generator/Detail/components/CommentDrawer";
import {likeGeneratorUsingPost} from "@/services/backend/generatorLikeController";
import StarModal from './components/StarModal/StarModal';


/**
 * 生成器详情页
 * @constructor
 */
const GeneratorDetailPage: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<API.GeneratorVO>({});
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isStar,setIsStar] = useState<boolean>(false)
  const [starModalVisible, setStarModalVisible] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const my = currentUser?.id === data?.userId;


  /**
   * 加载数据
   */
  const loadData = async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const res = await getGeneratorVoByIdUsingGet({
        id,
      });
      setData(res.data || {});
    } catch (error: any) {
      message.error('获取数据失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  /**
   * 标签列表视图
   * @param tags
   */
  const tagListView = (tags?: string[]) => {
    if (!tags) {
      return <></>;
    }

    return (
      <div style={{ marginBottom: 8 }}>
        {tags.map((tag: string) => {
          return <Tag key={tag}>{tag}</Tag>;
        })}
      </div>
    );
  };

  /**
   * 下载按钮
   */
  const downloadButton = data.distPath && currentUser && (
    <Button
      icon={<DownloadOutlined />}
      onClick={async () => {
        const blob = await downloadGeneratorByIdUsingGet(
          {
            id: data.id,
          },
          {
            responseType: 'blob',
          },
        );
        // 使用 file-saver 来保存文件
        const fullPath = data.distPath || '';
        saveAs(blob, fullPath.substring(fullPath.lastIndexOf('/') + 1));
      }}
    >
      下载
    </Button>
  );

  /**
   * 编辑按钮
   */
  const editButton = my && (
    <Link to={`/generator/update?id=${data.id}`}>
      <Button icon={<EditOutlined />}>编辑</Button>
    </Link>
  );

  /**
   * 使用按钮
   */
  const useButton = () => {
    if (currentUser) {
      return (
        <Link to={`/generator/use/${id}`}>
          <Button type="primary">立即使用</Button>
        </Link>
      )
    } else {
      return <Button type={"primary"} disabled>登陆后使用</Button>
    }
  }

  // 点赞功能实现
  const clickLike =  async () => {
    if (!currentUser) {
      message.info("请先登陆！");
      return;
    }
    if (data) {
      const res = await likeGeneratorUsingPost({id: data.id})
      if (res.data && res.code === 0) {
        message.success("点赞成功！")
        // @ts-ignore
        setData({...data, likeCount: Number(data.likeCount) + 1})
        setIsLike(true);
      }
      else {
        message.error("点赞失败！");
      }
    }
  }

  /**
   * 点赞按钮
   */
  const likeButton =  (
    <Button
      onClick={clickLike}
      style={{border: 'none', outline: 'none', cursor: "pointer"}}
      disabled={isLike}
    >
      <span><LikeOutlined /> {data.likeCount}</span>
    </Button>
  );

  //点击收藏按钮
  const starArticle = () => {
    if(!currentUser){
      message.info('请先登录');
      return;
    }
    setStarModalVisible(true);
    setIsStar(true);
  }

  /**
   * 收藏按钮
   */
  const starButton = (
    <Button
      onClick={starArticle}
      style={{border: 'none', outline: 'none', cursor: "pointer"}}
    >
      {isStar ?
        <span><StarOutlined style={{color: "red"}}/> {data.starCount}</span> :
        <span><StarOutlined /> {data.starCount}</span>
      }
    </Button>
  )
  // @ts-ignore
  return (
    <PageContainer title={<></>} loading={loading}>
      <Card>
        <Row justify="space-between" gutter={[32, 32]}>
          <Col flex="auto">
            <Space size="large" align="center">
              <Typography.Title level={4}>{data.name}</Typography.Title>
              {tagListView(data.tags)}
            </Space>
            <Typography.Paragraph>{data.description}</Typography.Paragraph>
            <Typography.Paragraph type="secondary">
              创建时间：{moment(data.createTime).format('YYYY-MM-DD hh:mm:ss')}
            </Typography.Paragraph>
            <Typography.Paragraph type="secondary">基础包：{data.basePackage}</Typography.Paragraph>
            <Typography.Paragraph type="secondary">版本：{data.version}</Typography.Paragraph>
            <Typography.Paragraph type="secondary">作者：{data.author}</Typography.Paragraph>
            <div style={{ marginBottom: 24 }} />
            <Space size="middle">
              {useButton()}
              {downloadButton}
              {editButton}
              {likeButton}
              {starButton}

              {/*收藏Modal*/}
              {
                starModalVisible &&
                <StarModal
                  generatorId={data.id || ""}
                  visible={starModalVisible}
                  onCancel={()=>setStarModalVisible(false)}
                  onOver={()=>{
                    setStarModalVisible(false);
                    // @ts-ignore
                    setData({...data, starCount: Number(data.starCount) + 1})
                  }}
                />
              }
            </Space>
          </Col>
          <Col flex="320px">
            <Image src={data.picture} />
          </Col>
        </Row>
      </Card>
      <div style={{ marginBottom: 24 }} />
      <Card>
        <Tabs
          size="large"
          defaultActiveKey={'fileConfig'}
          onChange={() => {}}
          items={[
            {
              key: 'fileConfig',
              label: '文件配置',
              children: <FileConfig data={data} />,
            },
            {
              key: 'modelConfig',
              label: '模型配置',
              children: <ModelConfig data={data} />,
            },
            {
              key: 'userInfo',
              label: '作者信息',
              children: <AuthorInfo data={data} />,
            },
            {
              key: 'comment',
              label: '评论',
              children: <CommentDrawer key={id} generatorId={id || ""} userId={data?.userId || ""}/>
            },
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default GeneratorDetailPage;
