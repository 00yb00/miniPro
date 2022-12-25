import { StyleSheet, Text, View,Button,TextInput,ScrollView } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import store from './redux';
import {updataArr,addToArr,removeFromArr,addBorder,addColor,moveToTop,editArr} from './slice';
import {useState,useEffect}from 'react';
import { Init,AddNewItem,SelectAll, RemoveItem} from  './database';

export function Item(){

    const count = useSelector(state=>state.reducerNumber.total);
    const arr = useSelector(state=>state.reducerNumber.arr);
    const border=useSelector(state=>state.reducerNumber.border);
    const color=useSelector(state=>state.reducerNumber.color);
    const dispatch = useDispatch();
    const [val,setVal]=useState("");
    const [change,setchange]=useState();
    const [id,setId]=useState(0);
   const [list,setList]=useState([]);
//פעולה חד פעמית
    useEffect(()=>{

     
      Init().then(()=>{
        console.log('db created well');
      }).catch(()=>{
        console.log('db created fail');
      });
      setList(SelectAll());
     },[]);

    return (<View>
    <TextInput value={val}  placeholder="type here..." onChangeText={(e)=>{setVal(e)}}></TextInput>
    {/* bring all the data from database */}
    <Button title="start" onPress={()=>{ dispatch(updataArr(list))}}></Button>
    {/* add to the list */}
    <Button title="add" onPress={()=>{var a=arr.findIndex((item)=> item==change);
          if(a>=0)dispatch(editArr([change,val])) ;else dispatch(addToArr(val)), AddNewItem(val).then((result)=>{
            console.log(result);
      
          }).catch(()=>{})}}></Button>
    <Text styles={styles.border}>list length:  {count}</Text>
    <ScrollView >
    {arr.map((o,i)=>{return <View key={i}><View style={styles.border={borderWidth:border[i],borderColor:color[i]}}><Text>{o}</Text></View>
    <View >
    <Button title='delete'onPress={()=>{dispatch(removeFromArr(i)),setId(i+1),RemoveItem(i).then((result)=>{
         console.log(result);}).catch(()=>{})}}></Button>
    <Button title='remark'onPress={()=>{dispatch(addBorder(i))}}></Button>
    <Button title='critical'onPress={()=>{dispatch(addColor(i))}}></Button>
    <Button title='top'onPress={()=>{dispatch(moveToTop(i));}}></Button>
    <Button title='edit'onPress={()=>{setchange(o),setVal(o)}}></Button>
   
    </View></View>})}
    </ScrollView>
</View>)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      top:100,
    },
    iText:{
      backgroundColor:'lightblue',
    },
    border:{
      borderWidth:0.5 ,
      borderColor:'blue',
      backgroundColor:'white',
    },

  });
  