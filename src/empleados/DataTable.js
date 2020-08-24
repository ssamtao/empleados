import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'
import EmpleadoDataService from "../services/empleado.service";

class DataTable extends Component {
  
 
  deleteItem(id) {
    let confirmDelete = window.confirm('¿Borrar definitivamente ?')
    if(confirmDelete){
      EmpleadoDataService.delete(id)
        .then(
          this.props.deleteItemFromState(id)
        )
        .catch(e => {
          console.log(e);
        });
    }
  }


  render() {
    var items =[];
    try {
      items = this.props.items.map(item => {
        return (
          <tr key={item.id}>
                <td>
                    <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
                    <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                
                </td>
                <td>{item.noempleado}</td>
                <td>{item.nombre}</td>
                <td>{item.sueldo}</td>
                <td>{item.empresa}</td>
              </tr>
          )
        });
      }
      catch(e) {
        console.log("Arreglo vacio");
        items=[];
      }

    

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>No Empleado</th>
            <th>Nombre</th>
            <th>Sueldo</th>
            <th>Empresa</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable