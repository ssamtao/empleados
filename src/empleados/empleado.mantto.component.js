import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Modal'
import DataTable from './DataTable'
import EmpleadoDataService from "../services/empleado.service";

class EmpleadoMantto extends Component {
constructor(props) {
    super(props);
     this.state = {
      empleados: []
    };
 }

  

  getItems(){
    var _this = this;
    EmpleadoDataService.getAll()
    .then(response => {
      this.setState({
        empleados: response.data
      });
    })
    .catch(e => {
      console.log(e);
    });
     

  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      empleados: [...prevState.empleados, item]
    }))
  }

  updateState = (item) => {
    var itemIndex = 0;
    var newArray = [];
    try {
      itemIndex = this.state.empleados.findIndex(data => data.id === item.id)
      newArray = [
        ...this.state.empleados.slice(0, itemIndex),
        item,
        ...this.state.empleados.slice(itemIndex + 1)
      ]
      this.setState({ empleados: newArray })
    }
    catch(e) {
      
      itemIndex = 0;
      newArray = []
      this.setState({ empleados: newArray })
      
    }
  }

  deleteItemFromState = (id) => {
    this.getItems();
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    const {empleados} = this.state;
   
    return (
      <Container className="App">
        <Row>
          <Col>
          <h1 style={{margin: "20px 0"}}>Empleados</h1>
          </Col>
        </Row>
    
        <Row>
        <Col>
            <DataTable items={this.state.empleados} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default EmpleadoMantto;