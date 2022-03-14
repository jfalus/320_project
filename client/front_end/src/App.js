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
            subject="Training request"
            content="This is a request from Hans"
          />
          <Section
            sender="Jordan Levine"
            subject="Performance Review Request"
            content="This is a request from Jordan"
          />
        </div>
      </div>
    </>
  );
}
export default App;
