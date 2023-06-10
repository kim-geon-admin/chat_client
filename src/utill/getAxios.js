import axios from 'axios'; // 액시오스
import {conf} from '../conf/conf.js'; // 


export default  function customAxiosPost(url, param,callback) {
  let token = sessionStorage.getItem("token");
 
  axios(
    {
      url: '/api' + url,
      method: 'post',
      data : param,

      /**
       * 개발 환경에서의 크로스 도메인 이슈를 해결하기 위한 코드로
       * 운영 환경에 배포할 경우에는 15~16행을 주석 처리합니다.
       * 
       * ※크로스 도메인 이슈: 브라우저에서 다른 도메인으로 URL 요청을 하는 경우 나타나는 보안문제
       */
      baseURL: 'http://localhost:8080',
      withCredentials: true,
    } 
  ).then(function (response) {
    callback(response.data);
  });
} 


export function axiosPost(url, param) {
  let token = sessionStorage.getItem("token");

 return  axios(
    {
      headers: {'token': token},
      url: '/api' + url,
      method: 'post',
      data : param,
      baseURL: 'http://localhost:8080',
      withCredentials: true,
    } 
  ).then(function (response) {
    console.log(response);
    return response.data;
  });

}

export function axiosFilePost(url, param) {
  let token = sessionStorage.getItem("token");

 return  axios.post('http://localhost:8080/api'+url,param,
 { 
  headers: {'token': token, 'Content-Type': 'multipart/form-data'},
   withCredentials: true
 }   
  ).then(function (response) {
    console.log(response);
    return response.data;
  });

}



export function axiosGet(url,parmObj) {
  //let token = sessionStorage.getItem("token");

  console.log(parmObj);
  return axios(
    {
    //  headers: {'token': token},
      url: '/api' + url,
      params : parmObj,
      method: 'get',
      //baseURL: 'https://nodechatserver.nayaguny.repl.co',
      //baseURL: 'http://localhost:4000', 
      baseURL: conf().CHAT_SERVER_URL, 
      withCredentials: true, // 쿠키를 헤더에 포함할지 여부
      
    } 
  ).then(function (response) {
    return response.data;
  }).catch(error => {
    if(error.response.status ='302'){
      window.location.href = conf().CLIENT_SERVER;
    }
});
}
// return new Promise(function(resove,reject){
    
// })