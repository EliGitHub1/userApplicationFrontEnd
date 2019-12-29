
import axios from 'axios'
import querystring from 'querystring'


 export const deleteUser = oldData => new Promise(resolve =>  {
  let url = 'http://localhost:3001/users/deleteUser?'
  url += 'id=' + oldData.id
  axios.delete(url).then(response =>{  
      resolve();                  
    }).catch(err=>{
      console.log(err)
  });
})

export const updateUser = (newData, oldData) =>new Promise(resolve => {
  let url = 'http://localhost:3001/users/updateUser?'
  url += 'id=' + oldData.id
  url += '&newData=' + newData.name
    if (oldData) {
        axios.put(url).then(response => {
          resolve();
        }).catch(err=>{
          console.log(err)
        });
    }else{
      console.log("Empty data")
    }
})


export const addUser = (newData)=>new Promise((resolve, reject) => {
  axios.post('http://localhost:3001/users/addUser', querystring.stringify({
       name:newData.name, 
    }),{
      headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(response =>{  
          resolve();                  
      }
    ).catch(err=>{
      console.log(err)
    });
})



export const fetchData=(query)=>new Promise((resolve, reject) => {
  let url = 'http://localhost:3001/users/getUsers?'
  url += 'per_page=' + query.pageSize
  url += '&page=' + (query.page + 1)
  fetch(url)
    .then(response => response.json())
    .then(result => {
      resolve({
        data: result.data,
        page: result.page - 1,
        totalCount: result.total ,
      })
    }).catch(err=>{
        console.log(err)
    });
})


