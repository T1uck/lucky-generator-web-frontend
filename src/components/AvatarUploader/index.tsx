import React, {createRef, useState} from "react";
import {Button, Col, Divider, message, Modal, Row, Upload, UploadProps} from "antd";
import Cropper, {ReactCropperElement} from "react-cropper";
import {MinusOutlined, PlusOutlined, RotateLeftOutlined, RotateRightOutlined, UploadOutlined} from "@ant-design/icons";
import {useEmotionCss} from "@ant-design/use-emotion-css";
import "cropperjs/dist/cropper.css";
import {uploadFileUsingPost} from "@/services/backend/fileController";
import {COS_HOST} from "@/constants";

export type Props = {
  visible?: boolean;
  onCancel: () => void;
  biz: string;
  onSave: (newAvatar: string) => void
};

const AvatarUploader: React.FC<Props> = ({ visible, onCancel, biz,onSave}) => {
  const previewImage = useEmotionCss(() => {
    return {
      position: "absolute",
      top: "50%",
      transform: "translate(50%, -50%)",
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      boxShadow: "0 0 4px #ccc",
      overflow: "hidden",
      img: { width: "100%", height: "100%" }
    }
  });

  const [image, setImage] = useState('#');
  const [loading,setLoading] = useState<boolean>(false);
  const cropperRef = createRef<ReactCropperElement>();
  const [data,setData] = useState<File>()

  const props: UploadProps = {
    beforeUpload: (file) => {
      setData(file)
      let ext = file.name.substring(file.name.lastIndexOf('.'));
      if(ext === '.jpg' || ext === '.png'){
        const reader = new FileReader()
        // 把Array Buffer转化为blob 如果是base64不需要
        // 转化为base64以进行预览
        reader.readAsDataURL(file)
        reader.onload = () => {
          setImage(reader.result as any);
        }
      } else {
        message.error('请上传JPG或PNG格式的图片！');
      }
      return false
    },
    showUploadList: false,
  };

  const save = async () => {
    setLoading(true);
    if (cropperRef.current?.cropper.getCroppedCanvas()) {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob(async (blob) => {
        if (!blob) {
          message.error("请先选择图片");
          return;
        }
        try {
          const res = await uploadFileUsingPost(
            {
              biz,
            },
            {},
            data,
          );
          // 拼接完整图片路径
          const fullPath = COS_HOST + res.data;
          onSave(fullPath);
          message.success("上传图片成功！")
          onCancel?.();
        } catch (error: any) {
          message.error("图片上传失败" + error.message);
        }
      },"image/jpeg");
    } else {
      message.error("请先选择图片！");
    }
    setLoading(false);
  }

  const zoom = (ratio: number) => {
    cropperRef.current?.cropper.zoom(ratio);
  }
  const rotate = (degree: number) => {
    cropperRef.current?.cropper.rotate(degree);
  }

  return (
    <Modal title='修改头像' width={800} open={visible} onCancel={()=>onCancel?.()} footer={[]}>
      <Divider></Divider>
      <Row>
        <Col xs={24} md={12} style={{height: '350px'}}>
          <Cropper
            className='cropper-bg'
            ref={cropperRef}
            dragMode='move'
            aspectRatio={1}
            style={{ height: 350, width: 376 }}
            src={image}
            viewMode={1}
            minCropBoxHeight={100}
            minCropBoxWidth={100}
            autoCropArea={1}
            background={false}
            preview=".img-preview"
          />
        </Col>
        <Col xs={24} md={12} style={{height: '350px'}}>
          <div className={previewImage}>
            <div className="img-preview" style={{overflow: 'hidden',width: '100%',height: '100%'}}></div>
          </div>
        </Col>
      </Row>
      <br/>
      <Row gutter={24}>
        <Col span={4}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>选择图片</Button>
          </Upload>
        </Col>
        <Col span={2}>
          <Button onClick={()=>zoom(0.1)} icon={<PlusOutlined />}/>
        </Col>
        <Col span={2}>
          <Button onClick={()=>zoom(-0.1)} icon={<MinusOutlined />}/>
        </Col>
        <Col span={2}>
          <Button onClick={()=>{rotate(90)}} icon={<RotateRightOutlined />}/>
        </Col>
        <Col span={2}>
          <Button onClick={()=>{rotate(-90)}} icon={<RotateLeftOutlined />}/>
        </Col>
        <Col span={12}>
          <div>
            <Button loading={loading} onClick={save} style={{position: 'absolute', left: '40%'}}>保存</Button>
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default AvatarUploader
