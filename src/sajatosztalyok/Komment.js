import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native-web';





export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

        nev: '',
        komment:''

    };
  }

  ujratoltes=()=>{
    //alert(szam)
    this.setState({})

    return fetch('http://localhost:8080/tema')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });

  }




felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.nev=="" || this.state.komment=="")
    {
      alert("Add meg a nevet és a kommmentet!")
      return
    }
    let bemenet={
      bevitel1:this.state.nev,
      bevitel2:this.state.komment,
      bevitel3:this.props.tema_bevitel
    }

    fetch('http://localhost:8080/kommentfelvitel',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
       
    )
    .then((response) => response.text())
    .then((szoveg) => {

    alert(szoveg)
     this.props.frissit() 

})
    
}


  render() {
    return (
    <View style = {{backgroundColor:'#87ecec',width:'100%',borderRadius:30,borderWidth:8,alignSelf:'center',shadowColor: "#000000",
    shadowOpacity: 25,
    shadowRadius: 30,}}>
      <View style={{padding: 40 }}>
          <Text style={{padding: 15, fontSize: 25,color:'black',textAlign:'center'}}>
              Név:
          </Text>
        <TextInput
          placeholderTextColor="black"
          style={{height: 50,width:'80%',alignSelf:'center',backgroundColor:'#ec8787',borderColor:'black',color:"white",borderWidth:3, borderRadius:4}}
          placeholder="Add meg a neved:"
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />

        <Text style={{paddingTop: 10, fontSize: 22,color:'#black',textAlign:'center'}}>
              Komment:
          </Text>
        <TextInput
          placeholderTextColor="black"
          style={{height: 120, width:'80%',alignSelf:'center',backgroundColor:'#ec8787',marginBottom:5,textAlignVertical:'top',color:'#635320',borderWidth:3, borderRadius:4}}
          placeholder="Add meg a kommentet:"
          onChangeText={(komment) => this.setState({komment})}
          value={this.state.komment}
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
            color:'black',
            marginTop:'auto',
            marginBottom:'auto',
            fontSize:25
    },
    gomb:{
            height:45,
            backgroundColor:'#ec8787',
            width:'45%',
            alignSelf:'center',
            borderRadius:10,
            borderWidth:2
    },
});