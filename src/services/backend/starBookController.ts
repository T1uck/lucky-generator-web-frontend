// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** createStarBook POST /api/starBook */
export async function createStarBookUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createStarBookUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/starBook', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getStarBooks GET /api/starBook/${param0} */
export async function getStarBooksUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStarBooksUsingGETParams,
  options?: { [key: string]: any },
) {
  const { generatorId: param0, ...queryParams } = params;
  return request<API.BaseResponseListStarBookBoolVo_>(`/api/starBook/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getGeneratorsInStarBook POST /api/starBook/generators */
export async function getGeneratorsInStarBookUsingPost(
  body: API.StarBookQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageGeneratorVO_>('/api/starBook/generators', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getStarBooksById GET /api/starBook/of/${param0} */
export async function getStarBooksByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStarBooksByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseListStarBookBoolVo_>(`/api/starBook/of/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
