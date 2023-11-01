import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cardNotificacion:{
        borderWidth: 2,
        borderColor: '#ddd',
        height:'auto',
        minHeight:80,
        width:'80%',
        borderRadius:10,
        marginTop:10,
    },
    topCard:{
        display:'flex',
        flexDirection:'row' ,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:5,
        borderBottomWidth: 1,
        borderBottomColor:'#ddd',
        padding:10
    },
    titulo:{
        fontSize:16,
        color:"#333",
        fontWeight:'bold',
        color:'white'
    },
    fecha:{
        color:'white'
    },
    botCard:{
        padding:10

    },
    descripcion:{
        color:'white',
    }
  });

  export default styles;