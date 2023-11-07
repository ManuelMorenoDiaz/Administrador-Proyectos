import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  
  activos: {
    padding:20
  },
  inactivos:{padding:20},
  acordeon: {
    maxWidth: '100%',
    margin: 0,
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
    textAlign:'center',
    marginBottom:10
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    color: 'white',  
    fontWeight: 'bold',
    padding: 10,
  },
  colorAP:{backgroundColor: '#1ABCFE'},
  colorAT:{backgroundColor: '#B781FB'},
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
    width: '80%',
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
    maxHeight: 'auto',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contDescripcion: {
    marginTop:20,
    width: '100%',
    flexDirection: 'column',
  },
  h3: {
    fontSize:20,
    borderWidth: 0.5,
    textAlign: 'center',
    borderColor: 'rgba(0, 0, 0, 0.333)',
  },
  p: {
    borderWidth: 0.3,
    borderColor: 'rgb(0, 0, 0)',
    height: 'auto',
    margin:20,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
    color: '#2229C9',
  },
  h4: {
    color: '#2229C9',
  },
});

export default styles;