// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** likeGenerator POST /api/Generators/like/${param0} */
export async function likeGeneratorUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.likeGeneratorUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/generator/like/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
