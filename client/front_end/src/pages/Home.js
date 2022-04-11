import Header from "../components/Header";
import Section from "../components/collapsible_list";
import Sidebar from "../components/Sidebar";
import "../index.css";

function Home() {
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

  // Accesses a GET endpoint, returns array of JSON objects
  // ex: getKind("assignedTrainings", 43, {method:'GET', redirect:'follow'})
  async function getKind(url_kind, employee_id, request_options={method: 'GET', redirect: 'error'}, debug=false)
  {
    var ret;
    await fetch("/api/empTasks/" + url_kind + "?EID=" + employee_id, request_options)
    .then(response => response.json())
    .then(result => {
      if(debug)
      {
        var p = "";
        for(t in result)
        {
          p += t;
        }
        console.log(url_kind + ":\n" + p);
      }
      ret = result;
    })
    .catch(error => console.log('error', error));
    return ret;
  }

  // Accesses all task GET endpoints, returns object: {assigned_trainings:[JSON objects], performance_reviews:[JSON objects], pto_requests:[JSON objects], general_tasks:[JSON objects]}
  // ex: getAllTasks(43, {method:'GET', redirect:'follow'})
  async function getAllTasks(employee_id, request_options={method: 'GET', redirect: 'error'}, debug=false)
  {
    const ret = {};
    const tasks = await Promise.all([getKind("assignedTrainings", employee_id, request_options, debug),
                                     getKind("performanceReviews", employee_id, request_options, debug),
                                     getKind("ptoRequests", employee_id, request_options, debug),
                                     getKind("generalTasks", employee_id, request_options, debug)]);
    ret.assigned_trainings = tasks[0];
    ret.performance_reviews = tasks[1];
    ret.pto_requests = tasks[2];
    ret.general_tasks = tasks[3];
    return ret;
  }

  // Accesses all task GET endpoints, returns singular array of JSON objects
  // ex: getAllTasksSmooth(43)
  async function getAllTasksSmooth(employee_id, request_options={method: 'GET', redirect: 'error'}, debug=false, category_strings=false)
  {
    var ret = [];
    const tasks = await getAllTasks(employee_id, request_options, debug);
    tasks.assigned_trainings.forEach(e => {if(category_string){e.category = "Assigned Training";} ret.push(e);});
    tasks.performance_reviews.forEach(e => {if(category_string){e.category = "Performance Review";} ret.push(e);});
    tasks.pto_requests.forEach(e => {if(category_string){e.category = "PTO Request";} ret.push(e);});
    tasks.general_tasks.forEach(e => {if(category_string){e.category = "General Task";} ret.push(e);});
    return ret;
  }

  // MAY NOT BE ABLE TO TEST THIS YET (login doesn't seem to work properly yet)
  // Accesses directManagedEmployees endpoint (gets direct subordinates of current user), returns array of JSON objects
  // ex: getDirectSubordinateEmployees()
  async function getDirectSubordinateEmployees(request_options={method: 'GET', redirect: 'error'}, debug=false)
  {
    var ret;
    await fetch("/api/directManagedEmployees", request_options)
    .then(response => response.json())
    .then(result => {
      if(debug)
      {
        var p = "";
        for(t in result)
        {
          p += t;
        }
        console.log("Direct Subordinate Employees:\n" + p);
      }
      ret = result;
    })
    .catch(error => console.log('error', error));
    return ret;
  }

  // MAY NOT BE ABLE TO TEST THIS YET (login doesn't seem to work properly yet)
  // Accesses allManagedEmployees endpoint (gets all subordinates of current user), returns array of JSON objects
  // ex: getAllSubordinateEmployees()
  async function getAllSubordinateEmployees(request_options={method: 'GET', redirect: 'error'}, debug=false)
  {
    var ret;
    await fetch("/api/allManagedEmployees", request_options)
    .then(response => response.json())
    .then(result => {
      if(debug)
      {
        var p = "";
        for(t in result)
        {
          p += t;
        }
        console.log("All Subordinate Employees:\n" + p);
      }
      ret = result;
    })
    .catch(error => console.log('error', error));
    return ret;
  }

  // Filters tasks according to some field of the json, such as progress or category
  // Inputs: tasks json array, field to filter by, array of values to filter by
  // ex: filterTasks(tasks, "category", ["Assigned Training", "PTO Request"])
  function filterTasks(tasks, key, values) {
    return tasks.filter(e => values.include(e[key]));
  }

  // Filters tasks if any of its fields contains query as substring
  // Inputs: tasks json array, query string
  // ex: filterTasks(tasks, "sick")
  function searchTasks(tasks, query) {
    return tasks.filter(e => Object.keys(e).some(k => e[k].toLowerCase().includes(query.toLowerCase())));
  }

  // Sorts tasks according to some field of the json
  // Inputs: tasks json array, field to sort by
  // ex: sortTasks(tasks, "category")
  function sortTasks(tasks, key) {
    if (Number.isFinite(tasks[0][key])) {
      return tasks.sort((a, b) => a[key] - b[key]);
    } else {
      return tasks.sort((a, b) => a[key].localeCompare(b[key]));
    }
  }

  var requestOptions = {
    method: 'GET',
    redirect: 'error'
  };

  var tasks;
  getAllTasksSmooth(43, category_strings=true).then(a => tasks = a); // THIS IS ASYNC!!!!!!!!
                                                                    // If possible, make Home() async and just await the line above this one.
                                                                    // Otherwise, need to have the .then() update the return.

  return (
    <>
      <Header />
      <div style={styles.contentDiv}>
        <Sidebar />
        <div className="Main-section">
        <Section
            /* General Task*/
            category="General Task"
            title="[Task] Please create a model"
            dueDate="05/12/2022"

            assigner="George Tucker"
            description="Entity relationship diagrams are used in software engineering during the planning stages of the software project. They help to identify different system elements and their relationships with each other. It is often used as the basis for data flow diagrams or DFD’s as they are commonly known. For example, an inventory software used in a retail shop will have a database that monitors elements such as purchases, item, item type, item source and item price"
            createdDate="02/22/2022"
            progress= "COMPLETE"
          />
          <Section
            /* TrainingTask (has link)*/
            category="Training Request"
            title="[Training] Food Safety"
            dueDate="05/09/2022"

            link="http://localhost:3000/home"
            description="With food safety concerns over the alarming increase in food poisoning cases attributed to food eaten outside of the home, it is essential that every caterer takes steps to ensure that all food-handling staff are supervised and/or trained in food hygiene matters. Failure to comply with regulations can result in prosecution and lead to a substantial fine or, in extreme cases, imprisonment. Bad publicity can also ruin a food business, often affecting people’s livelihoods, but, ultimately, food poisoning can kill. Therefore, effective staff training and supervision is of paramount importance, especially in an industry with such a high staff turnover of semi-skilled and unskilled kitchen staff. Legislation regarding training encompasses food safety and hygiene, but you must not forget to make sure your staff are also aware of other issues. For example the use and storage guidelines for your cooking and refrigeration equipment - as storing and displaying food at too high a temperature is one of the most common causes of food poisoning."
            createdDate="03/22/2022"
            progress= "IN PROGRESS"
          />
          <Section
            /* PRTask (overallcomments, feedback)*/
            category="Performance Review Request"
            title="[Performance Review Request] Peer Evaluation"
            dueDate="04/12/2022"

            assigner="Jordan Levine"
            createdDate="03/22/2022"
            overallcomments="Great working with you! It's so nice to see you staying on top of your work. You never miss a deadline, and that is very important here at [COMPANY]. I can always count on you when I need something done immediately. Your communication skills are exceptional, and I appreciate the way you always get your point across clearly."
            growth_feedback="5"
            kindness_feedback="4"
            delivery_feedback="3"
            progress= "TODO"
          />
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
    </>
  );
}
export default Home;
