import {createSlice} from '@reduxjs/toolkit';

const numberSlice = createSlice({
    name:'number',
    initialState:{
        total:1,
        arr:[],
        border:[],
        color:[],
        change:[]
    },
    reducers:{
        updataArr:(state,action)=>{
            state.arr=(action.payload);
            state.total=state.arr.length-1;
        },
        addToArr:(state,action)=>{
            state.total++;
            state.arr.push(action.payload);
        },
        removeFromArr:(state,action)=>{
            state.total--;
            state.arr.splice(action.payload,1);
            state.border.splice(action.payload,1);
            state.color.splice(action.payload,1);
        },
        addBorder:(state,action)=>{
            state.border[action.payload]=5;
        },
        addColor:(state,action)=>{
            state.color[action.payload]="red";
        },
        moveToTop:(state,action)=>{
            var a= state.arr[action.payload];
            state.arr.splice(action.payload,1);
            state.arr.unshift(a);
            var b= state.border[action.payload];
            state.border.splice(action.payload,1);
            state.border.unshift(b);
            var c= state.color[action.payload];
            state.color.splice(action.payload,1);
            state.color.unshift(c);
        },
        editArr:(state,action)=>{
            var a=state.arr.findIndex((item)=> item==action.payload[0]);
            state.arr[a]=action.payload[1];
        }
    }

});


export const {updataArr,addToArr,removeFromArr,addBorder,addColor,moveToTop,editArr,arr,border,color} = numberSlice.actions;

export default  numberSlice.reducer;