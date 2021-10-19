import service from '../util/service'
export function getAxios(url, params) {
  return service({
    url: url,
    method: 'get',
    params: params,
    showLoading: true // loading效果
  })
}
export function postAxios(url, params) {
  return service({
    url: url,
    method: 'post',
    data: JSON.stringify(params),
    showLoading: true // loading效果
  }).catch((e) => {

  })
}
