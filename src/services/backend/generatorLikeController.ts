// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** TestRedisToMySql POST /api/generator */
export async function testRedisToMySqlUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/generator', {
    method: 'POST',
    ...(options || {}),
  });
}

/** likeGeneratorRedis POST /api/generator/like */
export async function likeGeneratorRedisUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.likeGeneratorRedisUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/generator/like', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** likeGenerator POST /api/generator/like/${param0} */
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

/** getGeneratorLikeCount POST /api/generator/likeCount */
export async function getGeneratorLikeCountUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/generator/likeCount', {
    method: 'POST',
    ...(options || {}),
  });
}

/** unlikeGeneratorRedis POST /api/generator/unlike */
export async function unlikeGeneratorRedisUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unlikeGeneratorRedisUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/generator/unlike', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
