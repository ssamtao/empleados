import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Empleadoervice from '../services/empleado.service'


class AddEditForm extends Component {

  constructor(props) {
    super(props);
    this.saveEmpleado = this.saveEmpleado.bind(this);
    this.editEmpleado = this.editEmpleado.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentTutorial: {
        noempleado: 0,
        nombre: "",
        sueldo:0.0,
        empresa: ""
      },

      submitted: false
    };
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  saveEmpleado() {
    var data = {
      id:'',
      noempleado: this.state.noempleado,
      nombre:this.state.nombre,
      sueldo: this.state.sueldo,
      empresa: this.state.empresa
    };

    Empleadoervice.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          empresa: response.data.empresa,
          sueldo: response.data.sueldo,
          noempleado: response.data.noempleado,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  editEmpleado() {
   
    var data = {
      id:this.state.id,
      noempleado: this.state.noempleado,
      nombre:this.state.nombre,
      sueldo: this.state.sueldo,
      empresa: this.state.empresa
    };
   
    Empleadoervice.update(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        nombre: response.data.nombre,
        empresa: response.data.empresa,
        sueldo: response.data.sueldo,
        noempleado: response.data.noempleado,

        submitted: true
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  componentDidMount(){
    
    if(this.props.item){
      const { id, noempleado, nombre, sueldo, empresa } = this.props.item
      this.setState({ id, noempleado, nombre, sueldo, empresa })
    }
  }

  render() {
    console.log(this.props.item);
    return (
      
      <div className="submit-form">
      <Form onSubmit={this.props.item ? this.editEmpleado : this.saveEmpleado}>
        
        <FormGroup row>
        <Col sm={4} >
          <Label column for="nombre">Nombre:</Label>
        </Col>
        <Col  xs="auto" >
          <Input type="text" name="nombre" id="nombre"  onChange={this.handleChange} value={this.state.nombre === null ? '' : this.state.nombre} />
        </Col>
        </FormGroup>
        <FormGroup row>
        <Col  sm={4}>
          <Label for="noempleado" >No. Empleado:</Label>
        </Col>
        <Col xs="auto" >
          <Input type="number" name="noempleado" id="noempleado"  onChange={this.handleChange} value={this.state.noempleado === null ? '' : this.state.noempleado} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col  sm={4}>
            <Label for="noempleado" >Sueldo :</Label>
          </Col>
          <Col  xs="auto">
            <Input type="number" name="sueldo" id="sueldo" onChange={this.handleChange} value={this.state.sueldo === null ? '' : this.state.sueldo} />
          </Col>
        </FormGroup>
        <FormGroup row>
         <Col sm={4}>
          <Label for="empresa" >Empresa:</Label>
          </Col>
          <Col  xs="auto">
            <Input type="text" name="empresa" id="empresa"  onChange={this.handleChange} value={this.state.empresa === null ? '' : this.state.empresa} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Button>Submit</Button>
        </FormGroup>
      </Form>
      </div>
    );
  }
}

export default AddEditForm