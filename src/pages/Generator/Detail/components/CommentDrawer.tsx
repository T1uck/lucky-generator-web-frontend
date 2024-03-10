import {Avatar, Button, Card, Col, Divider, Form, Input, message, Row} from "antd";
import React, {useEffect, useState} from "react";
import {history, useModel} from "@@/exports";
import {
  getRootCommentsOfGeneratorUsingGet,
  publishCommentUsingPost
} from "@/services/backend/generatorCommentController";
import RootComment from "@/pages/Generator/Detail/components/RootComment";

type CommentDrawerProps = {
  generatorId: string;
  userId: string;
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({generatorId, userId}) => {
  const {initialState} = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [form] = Form.useForm();
  const [rootComments, setRootComments] = useState<API.RootCommentVo[]>([]);
  const [replyId, setReplyId] = useState("-1");
  const [isComment,setIsComment] = useState(false)

  //首先获取根评论信息
  useEffect(() => {
    getRootCommentsOfGeneratorUsingGet({id: generatorId}).then(res => {
      if (res.code === 0 && res.data) {
        setRootComments(res.data);
        setIsComment(true)
      }
    })
  }, [])

  const onFinish = async () => {
    const data = {
      content: form.getFieldValue('content'),
      generatorId: generatorId,
      rootId: "-1",
      toId: userId,
    }
    const res = await publishCommentUsingPost({...data})
    if (res.code === 0) {
      message.success('发布成功');
      const newRootComment: API.RootCommentVo = {
        id: res.data,
        content: data.content,
        fromId: currentUser?.id,
        userAvatar: currentUser?.userAvatar,
        fromUsername: currentUser?.userName,
        likeCount: 0,
        createTime: new Date(),
        replyCount: 0
      };
      setRootComments([...rootComments, newRootComment]);
    }
  }

  return (
    <div>
      <Row>
        <Col flex="42px">
          <Avatar
            src={currentUser?.userAvatar || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}/>
        </Col>
        <Col flex="auto">
          <Form
            form={form}
            name="comment"
            onFinish={onFinish}
          >
            <Row>
              <Col flex="auto">
                <Form.Item name="content">
                  {
                    currentUser ?
                      <Input.TextArea rows={3} maxLength={1000} placeholder="与其赞同别人的话，不如自己畅所欲言"/> :
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: 76,
                          cursor: 'pointer',
                          borderRadius: 6,
                          color: '#9499A0',
                          backgroundColor: '#f1f2f3'
                        }}
                        onClick={() => history.push('/user/login')}
                      >
                        <span>请先</span>
                        <Button type='primary' style={{margin: '0 4px'}} size='small'>登录</Button>
                        <span>后发表评论 (・ω・)</span>
                      </div>
                  }
                </Form.Item>
              </Col>

              <Col flex="48px">
                <Form.Item style={{marginLeft: 12}}>
                  <Button disabled={!currentUser} type="primary" htmlType="submit"
                          style={{float: 'right', height: 76}}>发布</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {
        isComment &&
        <div>
          <Divider style={{margin: '12px 0'}}/>
          {rootComments.map(rootComment =>
            <RootComment
              key={rootComment.id}
              replyId={replyId}
              setReplyId={(newReplyId: any) => setReplyId(newReplyId || "-1")}
              rootComment={rootComment}
            />)}
        </div>
      }
    </div>
  );
};

export default CommentDrawer;
