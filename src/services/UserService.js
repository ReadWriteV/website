import request from './index'
import MD5 from 'md5'

export default {
  register (data) {
    return {
      code: 320,
      error: 'connect error'
    }
  },
  async login (data) {
    const res = await request.post('https://f7738068-d24b-4420-84f6-1261ad093798.mock.pstmn.io/login')
    if (data.email === res.data.email && MD5(data.password) === res.data.password) {
      return {
        code: 200,
        token: res.data.token,
        user: {
          email: res.data.email,
          password: res.data.password
        }
      }
    } else {
      return {
        code: 403,
        error: 'username or password error'
      }
    }
  }
}
