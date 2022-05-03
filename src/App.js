import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import CheckRole from "./components/CheckRole";
import CheckLevel from "./components/CheckLevel";
import CheckProducts from "./components/CheckProducts";

export default function App() {

  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [levels, setLevels] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [course, setCourse] = useState("");
  const [filterRole,  setFilterRoleList] = useState("");
  const [roleData , setRoleData] = useState([]);
  const [products , setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [filterProduct , setFilterProduct] = useState("");

  useEffect(() => {
    fetch(`https://docs.microsoft.com/api/learn/catalog/?locale=en-us`)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setFilterData(res.modules);
        setData(res.modules);
        setRoles(res.roles);
        setLevels(res.levels);
        setRoleData(res.roles);
        setProducts(res.products);
        setProductData(res.products);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const temp = [...data];
    const res = temp.filter((data) => {
      return data.title.includes(course);
    });
    setFilterData(res);
  }, [course]);

  useEffect(()=>{
    const temp = products;
    const res = temp.filter((data)=>{
      return data.name.includes(filterProduct)
    })
    setProductData([...res]);

  },[filterProduct])

  useEffect(()=>{
    const temp = roles;
    const res = temp.filter((data)=>{
      return data.name.includes(filterRole)
    })
    setRoleData([...res]);

  },[filterRole])

  const loadMoreData = () => {
    filterData.sort(() => {
      return Math.random() - 0.5;
    });
    setFilterData([...filterData]);
  };

  function checkFilterProduct(id , c){
    if (!c) {
      setFilterData(data);
      return;
    }
    const temp = data.filter((i) => {
      return i.products.includes(id);
    });
    setFilterData(temp);
  }

  function checkFilterChildProduct(id , c){
    if (!c) {
      setFilterData(data);
      return;
    }
    const temp = data.filter((i) => {
      return i.products.includes(id);
    });
    setFilterData(temp);
  }

  function checkFilterRole(id, c) {
    if (!c) {
      setFilterData(data);
      return;
    }
    const temp = data.filter((i) => {
      return i.roles.includes(id);
    });
    setFilterData(temp);
  }



  function checkFilterLevel(id , c){
    if(!c){
      setFilterData(data);
      return;
    }

    const temp = data.filter((i)=>{
      return i.levels.includes(id);
    })

    setFilterData(temp);
  }

  

  return (
    <div>
      <div className="parenInputField">
      <div className="inputField">
        <input
          placeholder="Search for course"
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
          }}
        />
      </div>
      </div>
      <div className = "container">
      <div className="main">
        <div className="filterItems">
        <div className="Heading">
            <h1>Poducts</h1>
            <input placeholder="Find a produts" value={filterProduct} onChange={(e)=>{
              setFilterProduct(e.target.value)
            }}/>
          </div>
          <div className="list">
            {productData.map((item, k) => {
              return (
                <CheckProducts 
                key = {k} 
                name ={item.name} 
                userId = {item.id}  
                childpro = {item.children} 
                checkFilterProduct={checkFilterProduct} 
                checkFilterChildProduct={checkFilterChildProduct}
                />
              );
            })}
          </div>
          <div className="Heading">
            <h1>Roles</h1>
            <input placeholder="Find role" value = {filterRole} onChange={(e)=>{
              setFilterRoleList(e.target.value)
            }} />
          </div>
          <div className="list">
            {roleData.map((item, k) => {
              return (
                <CheckRole
                  key={k}
                  userId={item.id}
                  name={item.name}
                  checkFilterRole={checkFilterRole}
                />
              );
            })}
          </div>
          <div className="Heading">
            <h1>Levels</h1>
          </div>
          <div className="list">
            {levels.map((item, k) => {
              return (
                <CheckLevel
                  key={k}
                  userId={item.id}
                  name={item.name}
                  checkFilterLevel={checkFilterLevel}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="App">
            {!filterData.length ? (
              <div>
              <h3>Data Not Found </h3>
              </div>
            ) : (
              filterData.slice(0, 10).map((item, index) => {
                return (
                  <Card
                    key={index}
                    title={item.title}
                    time={item.duration_in_minutes}
                    levels={item.levels}
                    products={item.products}
                    roles={item.roles}
                  />
                );
              })
            )}
            
          </div>
          <div className="btn">
            <button onClick={loadMoreData}>Load More</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}