import Header from "../components/Header";
import Section from "../components/collapsible_list";
import Sidebar from "../components/Sidebar";
import "../index.css";
import React, { Component } from 'react'

class Home extends Component {

  constructor() {
    super()
    this.state = {
      tasks: []
    }
  }

  // Accesses a GET endpoint, returns array of JSON objects
  // ex: getKind("assignedTrainings", 43, {method:'GET', redirect:'follow'})
  async getKind(url_kind, employee_id, request_options={method: 'GET', redirect: 'error'}, debug=false)
  {
    var ret;
    await fetch("/api/empTasks/" + url_kind + "?EID=" + employee_id, request_options)
    .then(response => response.json())
    .then(result => {
      if(debug) {console.log(url_kind + " for employee " + employee_id + ":\n"); result.forEach(t => console.log(t));}
      ret = result;
    })
    .catch(error => console.log('error', error));
    return ret;
  }

  // Accesses all task GET endpoints, returns object: {assigned_trainings:[JSON objects], performance_reviews:[JSON objects], pto_requests:[JSON objects], general_tasks:[JSON objects]}
  // ex: getAllTasks(43, {method:'GET', redirect:'follow'})
  async getAllTasks(employee_id, request_options={method: 'GET', redirect: 'error'}, debug=false)
  {
    const ret = {};
    const tasks = await Promise.all([this.getKind("assignedTrainings", employee_id, request_options, debug),
                                     this.getKind("performanceReviews", employee_id, request_options, debug),
                                     this.getKind("ptoRequests", employee_id, request_options, debug),
                                     this.getKind("generalTasks", employee_id, request_options, debug)]);
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

  // Accesses all task GET endpoints, returns singular array of JSON objects
  // ex: getAllTasksSmooth(43, undefined, undefined, true)
  async getAllTasksSmooth(employee_id, request_options={method: 'GET', redirect: 'error'}, debug=false, category_strings=false)
  {
    const tasks = await this.getAllTasks(employee_id, request_options, debug=true);
    tasks.assigned_trainings.forEach(e => {if(category_strings){e.category = "Assigned Training";} this.pushtask(e)});
    tasks.performance_reviews.forEach(e => {if(category_strings){e.category = "Performance Review";} this.pushtask(e);});
    tasks.pto_requests.forEach(e => {if(category_strings){e.category = "Paid Time Off Request";} this.pushtask(e);});
    tasks.general_tasks.forEach(e => {if(category_strings){e.category = "General Task";} this.pushtask(e);});
  }

  // MAY NOT BE ABLE TO TEST THIS YET (login doesn't seem to work properly yet)
  // Accesses directManagedEmployees endpoint (gets direct subordinates of current user), returns array of JSON objects
  // ex: getDirectSubordinateEmployees()
  async getDirectSubordinateEmployees(request_options={method: 'GET', redirect: 'error'}, debug=false)
  {
    var ret;
    await fetch("/api/directManagedEmployees", request_options)
    .then(response => response.json())
    .then(result => {
      if(debug) {console.log("Direct Subordinate Employees:\n"); result.forEach(t => console.log(t));}
      ret = result;
    })
    .catch(error => console.log('error', error));
    return ret;
  }

  // MAY NOT BE ABLE TO TEST THIS YET (login doesn't seem to work properly yet)
  // Accesses allManagedEmployees endpoint (gets all subordinates of current user), returns array of JSON objects
  // ex: getAllSubordinateEmployees()
  async getAllSubordinateEmployees(request_options={method: 'GET', redirect: 'error'}, debug=false)
  {
    var ret;
    await fetch("/api/allManagedEmployees", request_options)
    .then(response => response.json())
    .then(result => {
      if(debug) {console.log("All Subordinate Employees:\n"); result.forEach(t => console.log(t));}
      ret = result;
    })
    .catch(error => console.log('error', error));
    return ret;
  }

  // does this before render
  async componentDidMount() {
    var temptask = [
      {
        "category":"General Task",
        "title":"[Task] Please create a model",
        "date_due":"05-12-2022",
        "assigned_to":"George Tucker",
        "description":"Entity relationship diagrams are used in software engineering during the planning stages of the software project. They help to identify different system elements and their relationships with each other. It is often used as the basis for data flow diagrams or DFD’s as they are commonly known. For example, an inventory software used in a retail shop will have a database that monitors elements such as purchases, item, item type, item source and item price",
        "date_created":"02-22-2022",
        "progress":"COMPLETE"
      },
      {
        "category":"Assigned Training",
        "title":"[Training] Food Safety",
        "date_due":"05-09-2022",
        "link":"https://www.statefoodsafety.com/",
        "description":"With food safety concerns over the alarming increase in food poisoning cases attributed to food eaten outside of the home, it is essential that every caterer takes steps to ensure that all food-handling staff are supervised and/or trained in food hygiene matters. Failure to comply with regulations can result in prosecution and lead to a substantial fine or, in extreme cases, imprisonment. Bad publicity can also ruin a food business, often affecting people’s livelihoods, but, ultimately, food poisoning can kill. Therefore, effective staff training and supervision is of paramount importance, especially in an industry with such a high staff turnover of semi-skilled and unskilled kitchen staff. Legislation regarding training encompasses food safety and hygiene, but you must not forget to make sure your staff are also aware of other issues. For example the use and storage guidelines for your cooking and refrigeration equipment - as storing and displaying food at too high a temperature is one of the most common causes of food poisoning.",
        "date_created":"03-22-2022",
        "progress":"IN PROGRESS"
      },
      {
        "category":"Performance Review",
        "title":"[Performance Review] Peer Evaluation",
        "date_due":"04-12-2022",
        "assigned_to":"Jordan Levine",
        "date_created":"03/22/2022",
        "overall_comments":"Great working with you! It's so nice to see you staying on top of your work. You never miss a deadline, and that is very important here at [COMPANY]. I can always count on you when I need something done immediately. Your communication skills are exceptional, and I appreciate the way you always get your point across clearly.",
        "growth_feedback":"5",
        "kindness_feedback":"4",
        "delivery_feedback":"3",
        "progress":"TODO"
      },
      {
        "category":"Paid Time Off Request",
        "title":"[Sick Time Off] Covid-19 Quarantine",
        "date_due":"04-10-2022",
        "assigned_to":"Bossman",
        "date_created":"04-09-2022",
        "start_date":"04-11-2022",
        "end_date":"04-18-2022",
        "description":"I got covid. A close contact is someone who was less than 6 feet away from an infected person (laboratory-confirmed or a clinical diagnosis) for a cumulative total of 15 minutes or more over a 24-hour period. For example, three individual 5-minute exposures for a total of 15 minutes. People who are exposed to someone with COVID-19 after they completed at least 5 days of isolation are not considered close contacts.",
        "approval":"True",
        "progress":"COMPLETED"
      }
    ]
    await this.getAllTasksSmooth(31, undefined, true, true);
    await this.getAllTasksSmooth(9, undefined, true, true);
    this.pushtask(temptask[0])
    this.pushtask(temptask[1])
    this.pushtask(temptask[2])
    this.pushtask(temptask[3])
  }

  render() {
    var requestOptions = {
      method: 'GET',
      redirect: 'error'
    };
  
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

    return (
      <>
        <Header />
        <div style={styles.contentDiv}>
          <Sidebar />
          <div className="Main-section">
            {this.state.tasks.map(e => {
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
