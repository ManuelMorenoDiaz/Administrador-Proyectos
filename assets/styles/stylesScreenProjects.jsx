import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headProjects: {
    borderBottomWidth: 2,
    borderBottomColor: '#A2A9B2',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: '#B781FB',
    borderRadius: 5,
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
  },
  addButton: {
    marginHorizontal: 10,
    backgroundColor: 'rgb(4, 255, 0)',
    borderRadius: 15,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
  },

  centerProjects: {
    margin: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#A2A9B2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textActivos: {
    marginHorizontal: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    fontSize: 30,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    display: 'flex',
  },
  textActivos1: {
    backgroundColor: '#1ABCFE',
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  textActivos2: {
    backgroundColor: '#F2841E',
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },

  activos: {
    textAlign: 'center',
    padding:20
  },
  inactivos:{padding:20},
  acordeon: {
    maxWidth: '100%',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title:{
    fontSize: 23,
    fontWeight: 'bold',
  }
  ,
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  flexRow: {
    backgroundColor: 'red',
  },
  activosTareas: {
    backgroundColor: '#1ABCFE',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    color: 'white',  
    fontWeight: 'bold',
    padding: 10,
  },
  optionesTareasAct: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  modalOpciones: {
    backgroundColor: 'white',
    height: 'auto',
    width: 200,
    display: 'flex',
    justifyContent: 'space-around',
    borderRadius: 10,
    padding: 10,
  },
  input:{
    width: '97%',
    height: 40,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  opcionesInput:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  opcionesInput:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  textInput:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    width:'97%',
    marginLeft:10

  },

  inactivosTareas: {
    backgroundColor: '#F2841E',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contenido: {
    maxHeight: 1000,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contDescripcion: {
    width: '80%',
    flexDirection: 'column',
  },
  h3: {
    borderWidth: 0.5,
    textAlign: 'center',
    borderColor: 'rgba(0, 0, 0, 0.333)',
  },
  p: {
    borderWidth: 0.3,
    borderColor: 'rgb(0, 0, 0)',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  conTareas: {
    width: '80%',
    marginTop: 5,
  },
  tarea: {
    height: 'auto',
    borderWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
    borderRadius: 2,
  },
  tareaLeft: {
    textAlign: 'start',
    color: '#2229C9',
  },
  h4: {
    textAlign: 'start',
    color: '#2229C9',
  },
});

export default styles;