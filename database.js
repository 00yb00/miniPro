import * as SQLite from 'expo-sqlite';
    const database = SQLite.openDatabase('ITEMS1.db');    
        var idArr=[];

export function Init()
{
      
    // Declare Tables model
    const prom = new Promise((resolve,reject)=>{
        database.transaction((tx=>{
            // create one time table
            tx.executeSql('CREATE TABLE IF NOT EXISTS Items(ID INTEGER PRIMARY KEY NOT NULL, ITEM TEXT NOT NULL)'
            ,[],()=>{
    
                console.log('Success from create table Items');
                resolve();
    
            },(_,error)=>{
                console.log('Error from create table Items');
                console.log(error);
                reject();
            });
        }));

        // success => resolve
        // fail => reject
    });
    
    return prom;
}

export function RemoveItem(id)
{ 
    const promise = new Promise((resolve,reject)=>{
        database.transaction((conn)=>{
            conn.executeSql('DELETE FROM Items WHERE ID =?',[idArr[id]],(_,result)=>{
                console.log('Result from delete'+id);
                console.log(result);
                idArr.splice(id,1);
                resolve(result);
    
            },(_,error)=>{
                console.log('Error delete: '+id);
                console.log(error);
                reject(error);
            });
        })
    

    });

    return promise;
   
}
export function AddNewItem(name)
{ 
    
    const promise = new Promise((resolve,reject)=>{
        database.transaction((conn)=>{
            conn.executeSql('INSERT INTO Items(ITEM) VALUES(?)',[name],(_,result)=>{
                console.log('Result from insert');
                resolve(result);
    
            },(_,error)=>{
                console.log('Error InsertItem');
                console.log(error);
                reject(error);
            });
        })
    

    });

    return promise;
   
}
export function SelectAll()
{
    var listItems=[];
    const promise = new Promise((resolve,reject)=>{
        database.transaction((conn)=>{
            conn.executeSql('select * from Items',[],(_,result)=>{
                    resolve(result.rows);
                    var len=result.rows.length;
                    console.log(result.rows);
                    for(let i=0; i<len; i++){
                     var row=result.rows.item(i).ITEM;
                     idArr.push(result.rows.item(i).ID);
                     listItems.push(row);
                    console.log(result.rows);
                    console.log(idArr);
                     }
            },(_,error)=>{

                reject(error);
            })
        });

    });
    return listItems;
   
}


