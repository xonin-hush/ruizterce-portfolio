import { useLocation } from "react-router-dom";
import Navbar from "./NavBar";
import Section from "./Section";
import Topbar from "./TopBar";
import useDarkMode from "../hooks/useDarkMode";
import useScrollNavigation from "../hooks/useScrollNavigation";
import Welcome from "./Welcome";
import CardSlideshow from "./CardSlideshow";
import SocialBar from "./SocialBar";
import Contact from "./Contact";
import Resume from "./Resume";
import CustomCursor from "./CustomCursor";
const sections = ["Welcome", "Projects", "Events", "Contact", "Resume"];

const FullPage = () => {
  // A work detail page hands back the section it was opened from.
  const { state } = useLocation();
  const { currentSectionIndex, scrollToSection } = useScrollNavigation(
    sections,
    state?.section ?? 0
  );
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <div
      className={
        "overflow-hidden nunitoSans" + (isDarkMode ? " dark-mode" : "")
      }
    >
      <CustomCursor />
      <Topbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <SocialBar
        currentSectionIndex={currentSectionIndex}
        isDarkMode={isDarkMode}
      />
      <Navbar
        sections={sections}
        currentSectionIndex={currentSectionIndex}
        scrollToSection={scrollToSection}
      />
      <Section id="Welcome">
        <Welcome
          isCurrentSection={currentSectionIndex === 0}
          isDarkMode={isDarkMode}
        />
      </Section>
      <Section id="Projects">
        <CardSlideshow
          isCurrentSection={currentSectionIndex === 1}
          isDarkMode={isDarkMode}
          category="work"
          headingKey="navBar_2"
        />
      </Section>
      <Section id="Events">
        <CardSlideshow
          isCurrentSection={currentSectionIndex === 2}
          isDarkMode={isDarkMode}
          category="event"
          headingKey="navBar_3"
        />
      </Section>
      <Section id="Contact">
        <Contact isCurrentSection={currentSectionIndex === 3} />
      </Section>
      <Section id="Resume">
        <Resume
          isCurrentSection={currentSectionIndex === 4}
          isDarkMode={isDarkMode}
        />
      </Section>
    </div>
  );
};

export default FullPage;
