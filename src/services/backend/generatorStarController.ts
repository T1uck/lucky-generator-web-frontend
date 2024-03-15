// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** starGenerator POST /api/Generators/${param0}/star */
export async function starGeneratorUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.starGeneratorUsingPOSTParams,
  body: number[],
  options?: { [p: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseInt_>(`/api/generator/${param0}/star`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
