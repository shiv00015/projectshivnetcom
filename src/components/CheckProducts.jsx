import React,{useState} from 'react';
import ChildProduct from './ChildProduct';
import { BiChevronDown , BiChevronUp } from "react-icons/bi";

function CheckProducts({name , userId , childpro, checkFilterProduct , checkFilterChildProduct}){
    const [show, setShow] = useState(false);
    return<>
    <div className="check">
        <input
          type="checkbox"
          onClick={(e) =>{
            checkFilterProduct(userId , e.target.checked);
          }}
        />
        {!show ? (<BiChevronDown size={25} onClick = {()=>{
            setShow((prev) => !prev)
        }}/>) : (<BiChevronUp size={25} onClick = {()=>{
            setShow((prev) => !prev)
        }}/>)}
    
        <li>{name}</li>
    </div>
        <div style={{display:"flex", flexDirection:"column"}}>
        {!show ? ("") : (
        childpro.map((data , k)=>{
            return <ChildProduct name = {data.name} id = {data.id} checkFilterChildProduct={checkFilterChildProduct}/>
        })
        )}
        </div>
      
    </>
}

export default CheckProducts;