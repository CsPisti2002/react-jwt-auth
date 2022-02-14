import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native-web';



export default class Felvitelkomm extends Component {
  constructor(props) {
    super(props);
    this.state = {

        ido_datum:"",
        ido_nev:"",
        ido_elerhetoseg:""
        
       

        
        
    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.nev=="" || this.state.komment_szoveg==""|| this.state.komment_dt=="")
    {
      alert("toltsd ki!!")
      return
    }
    let bemenet={
      bevitel1:this.state.ido_nev,
      bevitel2:this.state.ido_datum,
      bevitel3:this.state.ido_elerhetoseg,
      
      
    }

    fetch('http://localhost:8080/adatfelvitel',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
       
   
    )

    

    .then((response) => response.text())
    .then((szoveg) => {

    alert(szoveg)
     
    this.setState({ido_nev:""})
    this.setState({ido_datum:""})
    this.setState({ido_elerhetoseg:""})
   
    

})
    
}


  render() {
    return (
      <View style = {{}}>
        <View style={{padding: 10, backgroundColor:'#dddddd'}}>

        

            <Text style={{color:'black'}}>
                Név
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Add meg a kérdést:"
            onChangeText={(ido_nev) => this.setState({ido_nev})}
            value={this.state.ido_nev}
          />
  
          <Text style={{color:'black'}}>
                A dátum amikor jó lenne:
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            
            onChangeText={(ido_datum) => this.setState({ido_datum})}
            value={this.state.ido_datum}
          />
          <Text style={{color:'black'}}>
                Elérhetőség
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder=" E-mail/telefonszám"
            onChangeText={(ido_elerhetoseg) => this.setState({ido_elerhetoseg})}
            value={this.state.ido_elerhetoseg}
          />
 <Text style={{color:'black'}}>
                Szöveg
            </Text>
<TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            
            onChangeText={(ido_datum) => this.setState({ido_datum})}
            value={this.state.ido_datum}
          />
         
         
           <TouchableOpacity
            onPress={async ()=>this.felvitel()}>
            <View style={styles.gomb}>
              <Text style={styles.gombSzoveg}>Küldés</Text>
            </View>
          </TouchableOpacity> 
  
          </View>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
    gombSzoveg:{
            textAlign:'center',
            color:'white',
            marginTop:'auto',
            marginBottom:'auto',
            fontSize:25
    },
    gomb:{
            height:45,
            backgroundColor:'blue',
            width:'45%',
            alignSelf:'center',
            borderRadius:10
    },
});