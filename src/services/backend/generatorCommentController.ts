// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** publishComment POST /api/comment */
export async function publishCommentUsingPost(
  body: API.PostCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getChildrenOfRoot GET /api/comment/children */
export async function getChildrenOfRootUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChildrenOfRootUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChildrenCommentVo_>('/api/comment/children', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** likeComment POST /api/comment/like */
export async function likeCommentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.likeCommentUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/comment/like', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getRootCommentsOfGenerator GET /api/comment/root */
export async function getRootCommentsOfGeneratorUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRootCommentsOfGeneratorUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListRootCommentVo_>('/api/comment/root', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
