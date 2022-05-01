import "./styles.css";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import CheckRole from "./components/CheckRole";
import CheckLevel from "./components/CheckLevel";
export default function App() {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [levels, setLevels] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [course, setCourse] = useState("");

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

  const loadMoreData = () => {
    filterData.sort(() => {
      return Math.random() - 0.5;
    });
    setFilterData([...filterData]);
  };

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
      
      <div className="inputField">
        <input
          placeholder="Search for course"
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
          }}
        />
      </div>
      <div className = "container">
      <div className="main">
        <div className="filterItems">
          <div className="rolesHeading">
            <h1>Roles</h1>
            <input placeholder="Find role" />
          </div>
          <div className="roles">
            {roles.map((item, k) => {
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
          <div className="rolesHeading">
            <h1>Levels</h1>
          </div>
          <div className="roles">
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
            {!filterData ? (
              <h1>Data Not Found </h1>
            ) : (
              filterData.slice(1, 11).map((item, index) => {
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
            {/* {data.slice(1, 11).map((item, index) => {
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
            })} */}
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