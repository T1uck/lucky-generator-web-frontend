import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, message, Row} from 'antd';

import {useModel} from "@@/exports";
import {getLoginUserUsingGet, updateMyUserUsingPost} from "@/services/backend/userController";
import TextArea from "antd/es/input/TextArea";
import AvatarView from "@/pages/User/UserInfo/components/Base/compents/AvatarView";

const BaseView: React.FC = () => {
    const {initialState, setInitialState} = useModel('@@initialState');
    const [currentUser, setCurrentUser] = useState(initialState?.currentUser);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const loadData = async () => {
        setLoading(true)
        const res = await getLoginUserUsingGet();
        if (res.data && res.code === 0) {
            if (currentUser && currentUser.userAvatar) {
                setInitialState((s:any) => ({...s,currentUser: res.data}));
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const updateInfo = async () => {
        if (!currentUser) return;
        const params: API.UserUpdateMyRequest = {
            userAvatar: currentUser.userAvatar,
            userName: form.getFieldValue('userName'),
            userProfile: form.getFieldValue('userProfile'),
        }
        const res = await updateMyUserUsingPost(params);
        if (res.code === 0) {
            message.success("更新成功");
            setInitialState({...initialState, currentUser: currentUser})
        }
    }

    return (
        <div>
          {!loading && (
            <Row>
              <Col span={14}>
                <Form layout='vertical' form={form} initialValues={{...currentUser}}>
                  <Form.Item label="昵称" name='userName' rules={[{required: true, message: '请输入您的昵称!',}]}>
                    <Input placeholder="请输入昵称"/>
                  </Form.Item>
                  <Form.Item label="个性签名" name='userProfile'>
                    <TextArea placeholder='请输入个性签名' rows={3}/>
                  </Form.Item>
                  {/*<Form.Item label="邮箱" name="email" rules={[{required: true, message: '请输入你的邮箱'}]}>*/}
                  {/*  <Input placeholder={"请输入你的邮箱"}/>*/}
                  {/*</Form.Item>*/}
                </Form>
                <Button onClick={updateInfo} type='primary'>更新基本信息</Button>
              </Col>
              <Col span={3}></Col>
              <Col span={7}>
                <AvatarView
                  userAvatar={currentUser?.userAvatar || ''}
                  onSave={(newAvatar: string)=>{
                    if(currentUser){
                      setCurrentUser({...currentUser, userAvatar: newAvatar})
                    }
                  }}/>
              </Col>
            </Row>
          )}
        </div>
    );
};

export default BaseView;
