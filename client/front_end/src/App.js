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
            sender="UMass Amherst Libraries"
            subject="Undergraduate Sustainability Award"
            content="The Undergraduate Sustainability Award promotes"
          />
          <Section sender="John Doe" subject="Test 2" content="dsvdsa" />
        </div>
      </div>
    </>
  );
}
export default App;
