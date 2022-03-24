import Header from "../components/Header";
import Section from "../components/Collapsible_list";
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
  return (
    <>
      <Header />
      <div style={styles.contentDiv}>
        <Sidebar />
        <div className="Main-section">
          <Section
            sender="Hans Barton"
            subject="Training request"
            message="This is a request from Hans"
            dueDate="05/09/2022"
          />
          <Section
            sender="Jordan Levine"
            subject="Performance Review Request"
            message="This is a request from Jordan"
            dueDate="N/A"
          />
        </div>
      </div>
    </>
  );
}
export default Home;
