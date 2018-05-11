import Axios from 'axios'
import { Toast } from 'antd-mobile'

const axiosInstance = Axios.create()

// Ajax请求返回拦截,统一处理错误信息
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
  getQuestions: '/activities/2017/questions', // 获取题目信息
  postAnswers: '/activities/2017/slide' // 提交问题答案
}

/**
 * 获取题目信息
 */
export const getQuestions = () => {
  return axiosInstance.get(URLS.getQuestions)
}

/**
 * 提交问题答案
 * Axios 默认传参是 JSON格式
 * 如果是Form格式的，需要把数据拼成 a=1&b=2&c=3 这样的形式
 */
export const postAnswers = param => {
  return axiosInstance.post(URLS.postAnswers, param)
}
