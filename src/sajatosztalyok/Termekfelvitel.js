import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native-web';
import FileUpload from "./upload"


export default class Felvitelkomm extends Component {
  constructor(props) {
    super(props);
    this.state = {

        termek_nev:"",
        termek_info:"",
        termek_ar:"",
        termek_tipus:"",
        
       

        
        
    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.termek_nev=="" ||this.state.termek_tipus==""|| this.state.termek_ar==""|| this.state.termek_info==""||this.kep_id)
    {
      alert("toltsd ki!!")
      return
    }
    let bemenet={
      bevitel1:this.state.termek_nev,
      bevitel2:this.state.termek_tipus,
      bevitel3:this.state.termek_info,
      bevitel4:this.state.termek_ar,
      
      bevitel5:this.state.kep_id,
      
      
    }

    fetch('http://localhost:8080/termekfelvitel',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
       
   
    )

    

    .then((response) => response.text())
    .then((szoveg) => {

    alert(szoveg)
     
    this.setState({termek_nev:""})
    this.setState({termek_tipus:""})
    this.setState({termek_info:""})
    this.setState({termek_ar:""})
    this.setState({kep_id:""})
   
    

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
            placeholder="Termék neve:"
            onChangeText={(termek_nev) => this.setState({termek_nev})}
            value={this.state.termek_nev}
          />

<Text style={{color:'black'}}>
                Típus
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Tipus:"
            onChangeText={(termek_tipus) => this.setState({termek_tipus})}
            value={this.state.termek_tipus}
          />

  
          <Text style={{color:'black'}}>
               Információ
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            
            onChangeText={(termek_info) => this.setState({termek_info})}
            value={this.state.termek_info}
          />
          <Text style={{color:'black'}}>
               Ára
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder=" Ár:"
            onChangeText={(termek_ar) => this.setState({termek_ar})}
            value={this.state.termek_ar}
          />
 


          <FileUpload  termek_nev={this.state.termek_nev} termek_tipus={this.state.termek_tipus} termek_ar={this.state.termek_ar} termek_info={this.state.termek_info} >
              
              </FileUpload>
         

          
          
  

         


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