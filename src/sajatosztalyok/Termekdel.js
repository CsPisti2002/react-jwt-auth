import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native-web';

export default class FetchExample extends React.Component {




  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch("http://localhost:8080/termekdel", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    return fetch('http://localhost:8080/termekek')
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



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
        <View style={styles.body} >
        
      <View  style={{ paddingTop:5}}>
        <FlatList
        style={{}}
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View elevation={5} style={styles.container} /*style={{flexDirection:'row', flex:1}}*/>
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:10,marginBottom:10 }}   >{item.termek_nev}   </Text>
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:10,marginBottom:10 }}   > {item.termek_info} </Text>
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:10,marginBottom:10 }}   >{item.termek_tipus}  </Text>
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:10,marginBottom:10 }}   > {item.termek_ar} Ft </Text>
          <Image  source={{uri: 'http://localhost:8080/'+item.kep_id}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto",marginBottom:50}} />  


          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.szavazat(item.termek_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15, flex:6}}  >Törlés</Text>
      </TouchableOpacity>
          </View>
        
        }

        
          keyExtractor={({termek_id}, index) => termek_id}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  
    container:{
      flexDirection:'column',
       
      marginBottom:100,
       padding:20,
       backgroundColor:'#87ecec',
       shadowColor: "#000000",
       shadowOpacity: 30,
       shadowRadius: 50,
       shadowOffset: {
         height: 20,
         width: 15
       }
      },
    


  kekgomb: {
    alignItems: "center",
    backgroundColor: "grey",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:10,
  }




});