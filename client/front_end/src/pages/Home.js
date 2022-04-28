import Header from "../components/Header";
import Section from "../components/collapsible_list";
import Sidebar from "../components/Sidebar";
import "../index.css";
import React, { Component } from 'react'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      search: "",
      category: "",
      progress: "",
      sort: "",
    }
  this.handleSearchChange = this.handleSearchChange.bind(this)
  this.updateCategory = this.updateCategory.bind(this);
  this.updateFilter = this.updateFilter.bind(this);
  }

  async componentDidMount() {
    this.getAllTasksSmooth(true, undefined, undefined);
    if (false) {
      this.pushtask({
        "category":"Paid Time Off Request",
        "title":"[Sick Time Off] Covid-19 Quarantine",
        "date_due":"04-10-2022",
        "pto_id":"-1",
        "date_created":"04-09-2022",
        "start_date":"04-11-2022",
        "end_date":"04-18-2022",
        "description":"I got covid. A close contact is someone who was less than 6 feet away from an infected person (laboratory-confirmed or a clinical diagnosis) for a cumulative total of 15 minutes or more over a 24-hour period. For example, three individual 5-minute exposures for a total of 15 minutes. People who are exposed to someone with COVID-19 after they completed at least 5 days of isolation are not considered close contacts.",
        "approval":"True",
        "progress":"completed"
      });
    }
  }

  async testing(){
    return "test successful"
  }

  // Accesses a GET endpoint for the current user, returns array of JSON objects
  // ex: getKind("assignedTrainings")
  async getKind(url_kind, request_options={method: 'GET'}, debug=false)
  {
    var ret;
    await fetch("/api/empTasks/" + url_kind, request_options)
        .then(res => {
          if (res.redirected) {
            window.location.href = res.url;
          }
          return res;
        })
        .then(response => response.json())
        .then(result => {
          if(debug) {console.log(url_kind + " assigned to self:\n"); result.forEach(t => console.log(t));}
          ret = result;
        })
        .catch(error => console.log('error', error));
    return ret;
  }

  // Accesses all task GET endpoints for the current user, returns object: {assigned_trainings:[JSON objects], performance_reviews:[JSON objects], pto_requests:[JSON objects], general_tasks:[JSON objects]}
  // ex: getAllTasks()
  async getAllTasks(request_options={method: 'GET'}, debug=false)
  {
    const ret = {};
    const tasks = await Promise.all([this.getKind("assignedTrainings", request_options, debug),
      this.getKind("performanceReviews", request_options, debug),
      this.getKind("ptoRequests", request_options, debug),
      this.getKind("generalTasks", request_options, debug)]);
    ret.assigned_trainings = tasks[0] || [];
    ret.performance_reviews = tasks[1] || [];
    ret.pto_requests = tasks[2] || [];
    ret.general_tasks = tasks[3] || [];
    // ret.assignedTrainings = await getKind("assignedTrainings", employee_id, request_options, debug);
    // ret.performance_reviews = await getKind("performanceReviews", employee_id, request_options, debug);
    // ret.pto_requests = await getKind("ptoRequests", employee_id, request_options, debug);
    // ret.general_tasks = await getKind("generalTasks", employee_id, request_options, debug);
    return ret;
  }

  pushtask(ret) {
    this.setState({
      tasks: this.state.tasks.concat(ret)
    }, () => console.log(this.state.tasks))
  }

  // Accesses all task GET endpoints for current user, returns singular array of JSON objects
  // ex: getAllTasksSmooth()
  async getAllTasksSmooth(category_strings=false, request_options={method: 'GET'}, debug=false)
  {
    const tasks = await this.getAllTasks(request_options, debug=true);
    tasks.assigned_trainings.forEach(e => {if(category_strings){e.category = "Assigned Training";} this.pushtask(e)});
    tasks.performance_reviews.forEach(e => {if(category_strings){e.category = "Performance Review";} this.pushtask(e);});
    tasks.pto_requests.forEach(e => {if(category_strings){e.category = "Paid Time Off Request";} this.pushtask(e);});
    tasks.general_tasks.forEach(e => {if(category_strings){e.category = "General Task";} this.pushtask(e);});
  }

  // Accesses directManagedEmployees endpoint (gets direct subordinates of current user), returns array of JSON objects
  // ex: getDirectSubordinateEmployees()
  async getDirectSubordinateEmployees(request_options={method: 'GET'}, debug=false)
  {
    var ret;
    await fetch("/api/directManagedEmployees", request_options)
        .then(res => {
          if (res.redirected) {
            window.location.href = res.url;
          }
          return res;
        })
        .then(response => response.json())
        .then(result => {
          if(debug) {console.log("Direct Subordinate Employees:\n"); result.forEach(t => console.log(t));}
          ret = result;
        })
        .catch(error => console.log('error', error));
    return ret;
  }

  // Accesses allManagedEmployees endpoint (gets all subordinates of current user), returns array of JSON objects
  // ex: getAllSubordinateEmployees()
  async getAllSubordinateEmployees(request_options={method: 'GET'}, debug=false)
  {
    var ret;
    await fetch("/api/allManagedEmployees", request_options)
        .then(res => {
          if (res.redirected) {
            window.location.href = res.url;
          }
          return res;
        })
        .then(response => response.json())
        .then(result => {
          if(debug) {console.log("All Subordinate Employees:\n"); result.forEach(t => console.log(t));}
          ret = result;
        })
        .catch(error => console.log('error', error));
    return ret;
  }

  UPDATE_ASSIGNED_TRAINING = "AssignedTraining";
  UPDATE_GENERAL_TASK = "GeneralTask";
  UPDATE_PERFORMANCE_REVIEW = "PerformanceReview";
  UPDATE_PTO_REQUEST = "PtoRequest";

  // Accesses an UPDATE endpoint, returns boolean
  // ##################################################################################################################
  // IMPORTANT: See 320_PROJECT/server/endpoints/<taskType>/update<taskType>.js for required body fields for <taskType>
  // ##################################################################################################################
  // task_kind should be one of the above Strings.
  // bodyFields should be an array. Each element is another array of length 2, where element 0 is the name of the body field (String) and element 1 is the value of that body field.
  async updateTask(task_kind, bodyFields, debug=false)
  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    bodyFields.forEach(f => {
      urlencoded.append(f[0], f[1]);
    })
    var request_options = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'error'
    };
    var ret;
    await fetch("/api/empTasks/update" + task_kind, request_options)
        .then(res => {
          if (res.redirected) {
            window.location.href = res.url;
          }
          return res;
        })
        .then(response => response.text())
        .then(result => {
          if(debug) {console.log("Update " + task_kind + ":\n" + result);}
          ret = result === "true";
        })
        .catch(error => console.log('error', error));
    return ret;
  }

  handleSearchChange(event) {
    this.setState({search: event.target.value});
  }

  // Filters tasks according to some field of the json, such as progress or category
  // Inputs: tasks json array, field to filter by, array of values to filter by
  // ex: filterTasks(tasks, "category", ["Assigned Training", "PTO Request"])
  filterTasks(tasks, key, values) {
    return tasks.filter(e => values.includes(e[key]));
  }

  // Filters tasks if any of its fields contains query as substring
  // Inputs: tasks json array, query string
  // ex: searchTasks(tasks, "sick")
  searchTasks(tasks, query) {
    return tasks.filter(e => Object.keys(e).some(k => e[k].toString().toLowerCase().includes(query.toLowerCase())));
  }

  // Sorts tasks according to some field of the json
  // Inputs: tasks json array, field to sort by
  // ex: sortTasks(tasks, "category")
  sortTasks(tasks, key) {
    if (tasks.every(e => Number.isFinite(e[key]))) {
      return tasks.sort((a, b) => a[key] - b[key]);
    } else if (tasks.every(e => !Number.isNaN(Date.parse(e[key])))) {
      return tasks.sort((a, b) => Date.parse(a[key]) - Date.parse(b[key]));
    } else {
      return tasks.sort((a, b) => a[key].localeCompare(b[key]));
    }
  }

  applyFilters() {
    let filteredTasks = this.state.tasks;
    if (this.state.category.length > 0) {
      // console.log("Filtering by category");
      // console.log(this.state.category);
      // console.log("Tasks before filtering: ", this.state.tasks);
      filteredTasks = this.filterTasks(filteredTasks, "category", this.state.category);
      // console.log("Tasks after filtering: ", filteredTasks);
    }
    if (this.state.progress.length > 0) {
      // console.log("Filtering by progress");
      // console.log(this.state.progress);
      filteredTasks = this.filterTasks(filteredTasks, "progress", this.state.progress);
    }
    if (this.state.search !== "") {
      // console.log("Searching for " + this.state.search);
      filteredTasks = this.searchTasks(filteredTasks, this.state.search);
    }
    if (this.state.sort !== "") {
      // console.log("Sorting by " + this.state.sort);
      filteredTasks = this.sortTasks(filteredTasks, this.state.sort);
    }
    return filteredTasks;
  }

  updateCategory(category) {
    if (this.state.category === category) {
      this.setState((state) => {
        return {category: ""};
      });
    }
    else {
      this.setState((state) => {
        return {category: category};
      });
    }
  }

  updateFilter(filter) {
    if (this.state.progress === filter) {
      this.setState((state) => {
        return {progress: ""};
      });
    }
    else {
      this.setState((state) => {
        return {progress: filter};
      });
    }
  } 

  render()
  {
    let filteredTasks = this.applyFilters();
    return (
        <>
          <Header handler={this.handleSearchChange}/>
          <div style={{
            contentDiv: {
              display: "flex",
            },
            contentMargin: {
              marginLeft: "0px",
              width: "100%",
              backgroundColor: "005151",
            },
          }.contentDiv}>
            <Sidebar updateCategory={this.updateCategory} updateFilter={this.updateFilter} counts = {["Paid Time Off Request", "Performance Review", "Assigned Training", "General Task"].map(e => (this.filterTasks(filteredTasks, "category", e).length))}/>
            <div className="Main-section">
              {filteredTasks.map(e => {
                if (e.category === "General Task") {
                  return (<Section
                      category={e.category}
                      title={e.title}
                      dueDate={e.date_due}
                      id={e.task_id}
                      description={e.description}
                      createdDate={e.date_created}
                      progress={e.progress}
                  />);
                }
                else if (e.category === "Assigned Training") {
                  return (<Section
                      category={e.category}
                      title={e.title}
                      dueDate={e.date_due}
                      id={e.at_id}
                      link={e.link}
                      createdDate={e.date_created}
                      description={e.description}
                      progress={e.progress}
                  />);
                }
                else if (e.category === "Performance Review") {
                  return (<Section
                      category={e.category}
                      title={e.title}
                      dueDate={e.date_due}
                      id={e.pr_id}
                      createdDate={e.date_created}
                      overallcomments={e.overall_comments}
                      growth_feedback={e.growth_feedback}
                      kindness_feedback={e.kindness_feedback}
                      delivery_feedback={e.delivery_feedback}
                      progress={e.progress}
                  />);
                }
                else if (e.category === "Paid Time Off Request") {
                  return (<Section
                      pto_id={e.pto_id}
                      category={e.category}
                      title={e.title}
                      dueDate={e.date_due}
                      id={e.pto_id}
                      createdDate={e.date_created}
                      start_date={e.start_date}
                      end_date={e.end_date}
                      description={e.description}
                      approval={e.approval}
                      progress={e.progress}
                  />);
                }
              })}
            </div>
          </div>
        </>
    );
  }
}

export {Home};
