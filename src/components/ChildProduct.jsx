import React from 'react';

function ChildProduct({name, id ,  checkFilterChildProduct}) {
    return <>
    <div style = {{marginLeft : "2rem" }} className = "check">
        <input
          type="checkbox"
          onClick={(e) => {
            checkFilterChildProduct(id , e.target.checked)
          }}
        />
        <li>{name}</li>
        </div>
    </>
}

export default ChildProduct;