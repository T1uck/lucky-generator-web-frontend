import React, {useRef} from "react";
import {message, Modal} from "antd";
import {ProFormText} from "@ant-design/pro-components";
import {MobileOutlined} from "@ant-design/icons";
import {Divider} from "antd/lib";
import {ProForm, ProFormInstance} from "@ant-design/pro-form/lib";
import {useModel} from "@@/exports";
import {userBindPhoneUsingPost} from "@/services/backend/userController";

type PhoneModalProps = {
  visible: boolean;
  onCancel: ()=>void;
  onOk: (newPhone: string)=>void;
}

const PhoneModal: React.FC<PhoneModalProps> = ({visible, onCancel, onOk}) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const formRef = useRef<
    ProFormInstance<{
      phone: string;
    }>
  >();

  const updatePhone = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then(async (values) => {
      const res = await userBindPhoneUsingPost(values);
      if(res.data && res.code === 0){
        message.success('绑定成功！');
        if(initialState && initialState.currentUser){
          setInitialState({...initialState, currentUser: {...initialState.currentUser, phone: values.phone}});
        }
        onOk?.(values.phone);
        onCancel?.();
      }
    });
  }


  return (
    <Modal open={visible} title='绑定手机' centered={true} okText='提交' onCancel={()=>onCancel?.()} onOk={updatePhone}>
      <Divider/>
      <ProForm<{
        phone: string;
      }>
        submitter={false}
        formRef={formRef}
        autoFocusFirstInput
      >
        <ProFormText
          fieldProps={{
            prefix: <MobileOutlined />,
          }}
          name="phone"
          placeholder={'请输入手机号'}
          rules={[
            {
              required: true,
              message: '手机号是必填项！',
            },
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]{9}/,
              message: '不合法的手机号！',
            },
          ]}
        />
      </ProForm>
    </Modal>
  )
}
export default PhoneModal;
