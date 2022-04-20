import React from 'react';
import { Row } from 'react-bootstrap';
import { StyleSheet,FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native-web';


export default class Anime extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, 
    termekek0:[],
    vegosszeg:0,
    
    }
  }
/*
  kattintas=(sorszam, nev, mufaj, datum, evad, leiras)=>{
    //alert(sorszam)
    //alert(nev)
   
    this.props.navigacio.navigate('Seged',{aktid:sorszam, aktnev:nev, aktmufaj:mufaj, aktdatum:datum, aktevad:evad, aktleiras:leiras })
    
  }
*/


beviteltorles=async(id)=>{
var tomb3 =[]
  var tomb2 =this.state.termekek0
  for(var elem of tomb2){
    if(elem.termek_id!=id){
      tomb3.push(elem)
    }
  }


  this.setState( { termekek0:tomb3 })

  var osszeg=0
  for( var elem of tomb3){
    osszeg+=elem.termek_ar
  }
  this.setState({vegosszeg:osszeg})

}


kosarAdd=(termek)=>{
  

  var tomb =this.state.termekek0
  tomb.push(termek)
  this.setState({termekek0:tomb})
  var osszeg=0
  for( var elem of tomb){
    osszeg+=elem.termek_ar
  }
  this.setState({vegosszeg:osszeg})

/*
  fetch('http://localhost:8080/kosar',{
    method: "GET",
    body: JSON.stringify(bemenet),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }
     
 
  )


  .then((response) => response.JSON())
  .then((szoveg) => {

  alert(szoveg)
   this.state({termek_id:''})
 
  

})
*/
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
     

      <View style={{addingTop:20, backgroundColor:"F0F8FF"}}>
<Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>Árkalkulátor</Text>
<FlatList
style={{flex:1, margin:30,borderColor: 'black', borderWidth:5}}
          data={this.state.termekek0}
          renderItem={({item}) => 

 <View style={{margin:'auto',borderColor: 'gray', borderWidth:5, borderRadius:10}}>
         
           
         
        <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Termék neve:{item.termek_nev} </Text>
        <Image  source={{uri:'http://localhost:8080/'+item.kep_id}}   style={{ width:100, height:150 ,marginLeft:"auto",marginRight:"auto", borderRadius:10}} />
        <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Termék ára:{item.termek_ar} Ft</Text>
        <TouchableOpacity
        style={{backgroundColor:"brown",width:60,height:60,borderRadius:10, marginRight:"auto"}}
        onPress={async()=>this.beviteltorles(item.termek_id)}
        
      >
        <Text style={{textAlign:"center", marginTop: "auto", marginBottom: "auto", fontWeight:"bold"}}>Mégse</Text>
      </TouchableOpacity>    
      
   
        </View>
        
        }
    
          keyExtractor={({termek_id}, index) => termek_id}
        />
 <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Végösszeg:{this.state.vegosszeg} Ft</Text>


      


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
          
         <button onClick={async ()=>this.kosarAdd(item)} style={{background:"blue"}}>Kosárba</button>
          </View>

        
        }

        
        
      
        
         
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    
    marginBottom:40,
     padding:20,
     backgroundColor:'#87ecec',
     borderWidth:3,
     shadowColor: "#000000",
     shadowOpacity: 30,
     shadowRadius: 30,
     borderRadius:20
   
    },
  });
  
  
