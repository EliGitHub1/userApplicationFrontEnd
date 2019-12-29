import React from 'react';
import MaterialTable from 'material-table';
import styled from 'styled-components';
import {  deleteUser,updateUser, addUser,fetchData } from "../apiFunctions";

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
        { title: 'Name', field: 'name' },
      ],
    };
  }
  
render(){
  return (
    <Wrapper>
      <MaterialTable
        title="Users"
        columns={this.state.columns}
        data={query => fetchData(query)}
        editable={{
          onRowAdd: newData => addUser(newData),
          onRowUpdate: (newData, oldData) => updateUser(newData, oldData),
          onRowDelete: oldData=>deleteUser(oldData)
        }}
        options ={{search: false}}
      />
    </Wrapper>
  );
    }
}