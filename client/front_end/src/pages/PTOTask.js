import Header from "../components/Header";
import Section from "../components/collapsible_list";
import Sidebar from "../components/Sidebar";
import "../index.css";
import React from "react";

function PTOTask() {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "0px",
      width: "100%",
      backgroundColor: "005151",
    },
  };

  function unpackResults(results) {
    return results;
  }

  var vals = {}

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    credentials: 'include'
  };
  
  fetch("/hello", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/empTasks/ptoRequests", requestOptions)
      .then(res => res.json())
      .then(res => setData(res));
  }, []);
  console.log(data);

  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) => 
    <li>{number}</li>
  );

  // const listItems = data.map((task) =>
  //   <li>{task.title}</li>
  // );

  // console.log(listItems)

  console.log(data);

  return (
    <>
      <Header />
      <div style={styles.contentDiv}>
        <Sidebar />
        <div className="Main-section">
          <Section
            /* PTOTask (start_date, end_date)*/
            category="Paid Time Off Request"
            title="[Sick Time Off] Covid-19 Quarantine"
            dueDate="04/10/2022"

            assigner="Bossman"
            createdDate="04/09/2022"
            start_date="04/11/2022"
            end_date="04/18/2022"
            description="I got covid. A close contact is someone who was less than 6 feet away from an infected person (laboratory-confirmed or a clinical diagnosis) for a cumulative total of 15 minutes or more over a 24-hour period. For example, three individual 5-minute exposures for a total of 15 minutes. People who are exposed to someone with COVID-19 after they completed at least 5 days of isolation are not considered close contacts."
            approval="True"
            progress= "COMPLETED"
          />
        </div>
      </div>
      <div>
        <ul>
          {listItems}
        </ul>
      </div>
    </>
  );
}
export default PTOTask;
