import React from 'react';
import MaterialTable from 'material-table';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content:center;
  margin-top: 80px;
`;

export default class UserTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      columns: [
        { title: 'Name', field: 'first_name' },
      ],
      data: [
        { name: 'Mehmet Abo Handi'},
        { name: 'Zerya Betül'},
      ]
    };
  }
  
render(){
  return (
    <Wrapper>
    <MaterialTable
      title="Users"
      columns={this.state.columns}
      data={query =>
          new Promise((resolve, reject) => {
            let url = 'https://reqres.in/api/users?'
            url += 'per_page=' + query.pageSize
            url += '&page=' + (query.page + 1)
            // let url = 'http://localhost:3001/users/getUsers?'
            // // url += 'per_page=' + query.pageSize
            // // url += '&page=' + (query.page + 1)
            fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  // data: result.userList,
                                    data: result.data,

                  page: result.page - 1,
                  // totalCount: result.userList.length,
                                    totalCount: result.total ,

                })
              })
          })
        }
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
    </Wrapper>
  );
    }
}