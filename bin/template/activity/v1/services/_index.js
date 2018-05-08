import Axios from 'axios'
import { Toast } from 'antd-mobile'


const axiosInstance = Axios.create()

axiosInstance.interceptors.response.use(resp => {
  if (resp.data.code === 0 || resp.data.r) {
    return resp.data.data
  } else {
    if (resp.data.msg) {
      Toast.fail(resp.data.msg)
    }
    return Promise.reject(resp)
  }
})

let URLS = {
  getQuestions: '/activities/2017/questions',         // 获取题目信息
  postAnswers: '/activities/2017/slide',              // 提交问题答案
}

/**
 * 获取题目信息
 */
export const getQuestions = () => {
  return axiosInstance.get(URLS.getQuestions)
}

/**
 * 提交问题答案
 */
export const postAnswers = (param) => {
  return axiosInstance.post(URLS.postAnswers, JSON.stringify(param))
}
