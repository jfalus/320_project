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

  function unpackResults(results) {
    return results;
  }

  var vals = {}

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("/hello", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
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
