import {getNotificationVoByDomainUsingGet} from "@/services/backend/notificationController";
import Swal from 'sweetalert2';


const Notification: () => void = () => {
  const fetchNotification = function (domain: string) {
    // 发起请求获取通知信息的逻辑
    getNotificationVoByDomainUsingGet({domain})
      .then((response) => {
        const data = response.data;
        const id  = data?.id;
        const updateTime = data?.updateTime;
        // @ts-ignore
        if (!localStorage.getItem(id + updateTime) && data?.title && data?.content) {
          // 使用 SweetAlert2显示弹窗
          Swal.fire({
            title: data?.title,
            text: data?.content,
            icon: "info",
            confirmButtonText: "知道了",
          });

          // 存储到 localStorage
          // @ts-ignore
          localStorage.setItem(id + updateTime, "id");
        }
      })
      .catch((error) => {
        console.error("Fetch request error:",error);
      });
  };

  const url = new URL(location.href);
  const domain = url.hostname;
  fetchNotification(domain)
};
export default Notification;
