import Header from "./components/Header";
import Section from "./components/Collapsible_list";
import Sidebar from "./components/Sidebar";
import "./index.css";

function App() {
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
          <Section
            sender="Hans Barton"
            category="Training request"
            title="Training request for Shannon"
            description="This is a training request from Hans [...]"
            dueDate="05/09/2022"
            createdDate="03/22/2022"
          />
          <Section
            sender="Jordan Levine"
            category="Performance Review Request"
            title="[Performance Review Request] Need your evaluation"
            description="Hi, I need your evaluation on my performance in the last quarter [...]"
            dueDate="04/12/2022"
            createdDate="03/22/2022"
          />
        </div>
      </div>
    </>
  );
}
export default App;
