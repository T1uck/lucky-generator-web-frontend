import React, {createElement, useState} from 'react';
import {Avatar, Button, Col, Form, Input, message, Row, Tooltip} from "antd";
import {DownOutlined, LikeFilled, LikeOutlined, UpOutlined} from '@ant-design/icons';
import {Comment} from "@ant-design/compatible";
import {useModel, useParams} from "@@/exports";
import {history} from '@umijs/max';
import moment from "moment";
import {getChildrenOfRootUsingGet, publishCommentUsingPost} from "@/services/backend/generatorCommentController";

type RootCommentProps = {
  replyId: string;
  setReplyId: (newReplyId: string | undefined) => void;
  rootComment: API.RootCommentVo;
}

/**
 * 评论
 */
const RootComment: React.FC<RootCommentProps> = ({replyId, setReplyId, rootComment}) => {
  const {id, content, fromId, userAvatar, fromUsername, likeCount, createTime, replyCount} = rootComment;

  const {initialState} = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const generatorId = useParams().id;

  const [likes, setLikes] = useState(likeCount || 0);
  const [action, setAction] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [targetId, setTargetId] = useState<string | undefined>();
  const [targetUsername, setTargetUsername] = useState<string | undefined>();
  const [targetCommentId, setTargetCommentId] = useState<string | undefined>("-1");

  const [replies, setReplies] = useState(replyCount);
  const [isFold, setIsFold] = useState(true);
  const [childrenComments, setChildrenComments] = useState<API.ChildrenCommentVo[]>([]);

  /**
   * 评论点赞功能
   * @param targetCommentId
   */
  const like = (targetCommentId: string | undefined) => {
    message.info("点赞功能代完善");
    if (targetCommentId === id) {
      setLikes(likes + 1);
      setAction('liked');
    }
  };

  // 在根评论下增加一条子评论
  const onFinish = async () => {
    const res = await publishCommentUsingPost({
      content: form.getFieldValue('content'),
      generatorId,
      rootId: id,
      toId: targetId,
      toCommentId: targetCommentId
    })
    if (res.code === 0) {
      message.success("发表成功");

      const newChildrenComment: API.ChildrenCommentVo = {
        id: res.data,
        generatorId: generatorId,
        rootId: id,
        content: form.getFieldValue('content'),
        fromId: currentUser?.id,
        userAvatar: currentUser?.userAvatar,
        fromUsername: currentUser?.userName,
        toId: targetId,
        toUsername: targetUsername,
        toCommentId: targetCommentId,
        likeCount: 0,
        createTime: new Date(),
      }
      setChildrenComments([...childrenComments, newChildrenComment]);
      setReplies((replies || 0) + 1)
      setTargetCommentId("-1")
      setReplyId("-1")
      form.setFieldValue('content', '');
    }
  }

  /**
   * 展示子评论
   */
  const showChildrenComments = () => {
    if (!id) {
      return;
    }
    setIsFold(!isFold);
    if (childrenComments.length > 0 && replies === childrenComments.length) {
      return;
    }
    getChildrenOfRootUsingGet({id}).then((res: any) => {
      if (res.data) {
        setChildrenComments(res.data);
      }
    })
  }


  return (

    <Comment
      actions={
        [
          <Tooltip key="comment-basic-like" title="Like">
            <span onClick={() => like(id)}>
              {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
              <span className="comment-action">{likes}</span>
            </span>
          </Tooltip>,
          <span
            onClick={() => {
              if (currentUser) {
                setTargetCommentId(id);
                setReplyId(id);
                setTargetId(rootComment.fromId);
                setTargetUsername(rootComment.fromUsername);
              } else {
                message.info("请先登录！");
              }
            }}
            key="comment-basic-reply-to">
            回复</span>,
          <>
            {currentUser?.id === fromId && <span style={{fontSize: 13}} key={"comment-basic-delete"}>删除</span>}
          </>,
          <>
            {replies !== undefined && replies > 0 &&
              <span onClick={showChildrenComments} style={{fontSize: 13}} key={"comment-open"}>
               {isFold ? <>展开{replies}条回复<DownOutlined/></> : <>折叠{replies}条回复<UpOutlined/></>}
              </span>}
          </>
        ]
      }
      author={<a href={`/user/${rootComment.fromId}`}>{rootComment.fromUsername}</a>}
      avatar={<Avatar onClick={() => history.push(`/user/${rootComment.fromId}`)} src={userAvatar} alt={fromUsername}/>}
      content={<p>{content}</p>}
      datetime={
        <Tooltip title={rootComment.createTime}>
          <span>{moment(new Date(createTime).toISOString()).format('YYYY-MM-DD HH:mm')}</span>
        </Tooltip>
      }
    >
      {/*子评论*/}
      {!isFold && childrenComments.map(child =>
        <Comment
          key={child.id}
          actions={[
            <Tooltip key="comment-basic-like" title="Like">
                <span onClick={() => like(id)}>
                  {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                  <span className="comment-action">{child.likeCount}</span>
                </span>
            </Tooltip>,
            <span
              onClick={() => {
                if (currentUser) {
                  setTargetCommentId(child.id);
                  setReplyId(id);
                  setTargetId(child.fromId);
                  setTargetUsername(child.fromUsername);
                } else {
                  message.info("请先登录！");
                }
              }}
              key="comment-basic-reply-to">
                  回复</span>,
            <>
              {currentUser?.id === fromId && <span style={{fontSize: 13}} key={"comment-basic-delete"}>删除</span>}
            </>
          ]}
          avatar={<Avatar onClick={() => history.push(`/user/${child.id}`)} src={child.userAvatar}/>}
          author={<>
            <a href={`/user/${child.fromId}`}>{child.fromUsername}</a>
            {
              child.toCommentId !== rootComment.id && <>
                <b>回复</b>
                <a href={`/user/${child.toId}`}>{child.toUsername}</a>
              </>
            }
          </>}
          content={<p>{child.content}</p>}
          datetime={
            <Tooltip title={child.createTime}>
              <span>{moment(new Date(child.createTime).toISOString()).format('YYYY-MM-DD HH:mm')}</span>
            </Tooltip>
          }
        />
      )}

      {/*对根评论或者根评论下的子评论发表评论*/}
      {id === replyId &&
        <Row>
          <Col flex="42px">
            <Avatar src={currentUser?.userAvatar}/>
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
                    <Input.TextArea rows={2} maxLength={1000} placeholder={'回复' + (targetUsername || '层主')}/>
                  </Form.Item>
                </Col>
                <Col flex="48px">
                  <Form.Item style={{marginLeft: 12}}>
                    <Button type="primary" htmlType="submit" style={{float: 'right', height: 54}}>发布</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      }
    </Comment>
  );
};

export default RootComment;
