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
      filter: {
        category: [],
        progress: [],
      },
      sort: "",
    }
  }

  async componentDidMount() {
    this.getAllTasksSmooth(true, undefined, undefined);
  }

  // Accesses a GET endpoint for the current user, returns array of JSON objects
  // ex: getKind("assignedTrainings")
  async getKind(url_kind, request_options={method: 'GET', redirect: 'error'}, debug=false)
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
  async getAllTasks(request_options={method: 'GET', redirect: 'error'}, debug=false)
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
  async getAllTasksSmooth(category_strings=false, request_options={method: 'GET', redirect: 'error'}, debug=false)
  {
    const tasks = await this.getAllTasks(request_options, debug=true);
    tasks.assigned_trainings.forEach(e => {if(category_strings){e.category = "Assigned Training";} this.pushtask(e)});
    tasks.performance_reviews.forEach(e => {if(category_strings){e.category = "Performance Review";} this.pushtask(e);});
    tasks.pto_requests.forEach(e => {if(category_strings){e.category = "Paid Time Off Request";} this.pushtask(e);});
    tasks.general_tasks.forEach(e => {if(category_strings){e.category = "General Task";} this.pushtask(e);});
  }

  // Accesses directManagedEmployees endpoint (gets direct subordinates of current user), returns array of JSON objects
  // ex: getDirectSubordinateEmployees()
  async getDirectSubordinateEmployees(request_options={method: 'GET', redirect: 'error'}, debug=false)
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
  async getAllSubordinateEmployees(request_options={method: 'GET', redirect: 'error'}, debug=false)
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
  // See 320_PROJECT/server/endpoints/<taskType>/update<taskType>.js for required body fields
  // Syntax:
  //    var myHeaders = new Headers();
  //    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  //    var urlencoded = new URLSearchParams();
  //    urlencoded.append("bodyParam1Name", bodyParam1Val);
  //    urlencoded.append("bodyParam2Name", "bodyParam2Val");
  //    //etc.                              value or "value"; either one works
  //    var requestOptions = {
  //      method: 'PUT',
  //      headers: myHeaders,
  //      body: urlencoded,
  //      redirect: 'error'
  //    };
  //    updateTask(UPDATE_GENERAL_TASK, requestOptions, true)
  async updateTask(url_kind, request_options, debug=false)
  {
    var ret;
    await fetch("/api/empTasks/update" + url_kind, request_options)
        .then(res => {
          if (res.redirected) {
            window.location.href = res.url;
          }
          return res;
        })
        .then(response => response.text())
        .then(result => {
          if(debug) {console.log("Update " + url_kind + ":\n" + result);}
          ret = result === "true";
        })
        .catch(error => console.log('error', error));
    return ret;
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
    if (this.state.filter.category.length > 0) {
      console.log("Filtering by category");
      console.log(this.state.filter.category);
      filteredTasks = this.filterTasks(filteredTasks, "category", this.state.filter.category);
    }
    if (this.state.filter.progress.length > 0) {
      console.log("Filtering by progress");
      console.log(this.state.filter.progress);
      filteredTasks = this.filterTasks(filteredTasks, "progress", this.state.filter.progress);
    }
    if (this.state.search !== "") {
      console.log("Searching for " + this.state.search);
      filteredTasks = this.searchTasks(filteredTasks, this.state.search);
    }
    if (this.state.sort !== "") {
      console.log("Sorting by " + this.state.sort);
      filteredTasks = this.sortTasks(filteredTasks, this.state.sort);
    }
    return filteredTasks;
  }

  render()
  {
    let filteredTasks = this.applyFilters();
    return (
        <>
          <Header />
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
            <Sidebar />
            <div className="Main-section">
              {filteredTasks.map(e => {
                if (e.category === "General Task") {
                  return (<Section
                      category={e.category}
                      title={e.title}
                      dueDate={e.date_due}
                      assignedto={e.assigned_to}
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
                      assignedto={e.assigned_to}
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
                      category={e.category}
                      title={e.title}
                      dueDate={e.date_due}
                      assignedto={e.assigned_to}
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
