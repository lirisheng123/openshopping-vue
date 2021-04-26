import { login, logout ,getInfo} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'


const user = {
  state: {
    token: getToken(),
    userId:'',
    name: '',
    roles:[],
    avatar: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if(response.code!=200){
            //登录失败
            reject(response.message)
            return 
          }
          const tokenStr =  response.data.tokenHead+ response.data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          //获取用户的信息
          getInfo().then(resp=>{
             if(resp.data==null){
                 //获取信息失败
                //删除掉用户的登录状态
                commit('SET_TOKEN', '')
                removeToken()
                reject("登录失败,获取用户信息失败")
                return 
             }
             //成功
             commit('SET_NAME', resp.data.username)
             commit('SET_USERID', resp.data.userId)
             commit('SET_ROLES', resp.data.roles)
             resolve()
          })
         
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo().then(response => {
    //       const data = response.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.username)
    //       commit('SET_AVATAR', data.icon)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
         
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_NAME', '')
          commit('SET_USERID', '')
          removeToken()
          resolve()   
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      }).catch(error => {
        reject(error)
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
