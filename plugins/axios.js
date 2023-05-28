export default function({ $axios, redirect, error: nuxtError,store },inject) {
    $axios.defaults.timeout = 7200000;

    $axios.onError(error => {
        if(error.response.status === 401) {
          redirect('/login')
        }
      })
   
    
    // $axios.onRequest((config) => {
    //     config.headers = {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     // 'Authorization': store.state.auth.tokenlocal, // refers to nuxt.config.js->auth.token
    //     }
    // })
}