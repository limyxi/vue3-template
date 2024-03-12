// 基于element-plus Message的封装

// 用于简单的消息提示
import { ElMessage } from 'element-plus'

/**
 * 组装消息的提示
 * @param {Object} options - 消息对象
 * @param {String} type - 消息类型
 */
function getMessageOption(options, type = 'info') {
  let messageOption = {}
  if (typeof options === 'string') {
    messageOption.message = options
    messageOption.type = type
    messageOption.showClose = true
  } else {
    messageOption = { type: type, ...options }
  }
  return messageOption
}
/**
 * 失败消息提醒
 * @param {String||Object} message - 消息
 */
export function Error(message = '操作失败') {
  ElMessage(getMessageOption(message, 'error'))
}
/**
 * 成功消息提醒
 * @param {String||Object} message - 消息
 */
export function Success(message = '操作成功') {
  ElMessage(getMessageOption(message, 'success'))
}
/**
 * 提示消息提醒
 * @param {String||Object} message - 消息
 */
export function Info(message = '提示') {
  ElMessage(getMessageOption(message, 'info'))
}
/**
 * 提示消息提醒
 * @param {String||Object} message - 消息
 */
export function Warning(message = '操作警告') {
  ElMessage(getMessageOption(message, 'warning'))
}
