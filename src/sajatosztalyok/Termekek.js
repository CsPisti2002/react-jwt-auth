import React from 'react';
import { StyleSheet,FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native-web';


export default class Anime extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
/*
  kattintas=(sorszam, nev, mufaj, datum, evad, leiras)=>{
    //alert(sorszam)
    //alert(nev)
   
    this.props.navigacio.navigate('Seged',{aktid:sorszam, aktnev:nev, aktmufaj:mufaj, aktdatum:datum, aktevad:evad, aktleiras:leiras })
    
  }
*/
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
     

      <View style={{flex:1, paddingTop:20, backgroundColor:"F0F8FF"}}>
        <FlatList
        style={{flexDirection:'row'}}
          data={this.state.dataSource}
          renderItem={({item}) => 

        /*  borderWidth:1,margin:20,backgroundColor:"#367588",paddingLeft:10,paddingRight:10,borderRadius:10 */
          
          
      <View elevation={5} style={styles.container}>
       
         
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Név: {item.termek_nev} </Text>
          <Image  source={{uri:'http://localhost:8080/'+item.kep_id}}   style={{ width:225, height:314 ,marginLeft:"auto",marginRight:"auto", borderRadius:10}} />  
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Típus: {item.termek_tipus} </Text>


          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Információ: {item.termek_info} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Ára: {item.termek_ar} Ft</Text>
          
         
          </View>

        
        }

        
        
      
        
         
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    marginBottom:100,
     padding:20,
     backgroundColor:'#d9d9d9',
     shadowColor: "#000000",
     shadowOpacity: 30,
     shadowRadius: 50,
     shadowOffset: {
       height: 20,
       width: 15
     }
    },
  });
  
  
