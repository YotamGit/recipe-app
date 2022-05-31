import "../styles/ScrollToTop.css";
import { useState, useEffect } from "react";

//mui
import Fab from "@mui/material/Fab";

//mui icons
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

//types
import { FC } from "react";

const ScrollToTop: FC = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 400) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);
  return (
    <>
      {showScrollToTop && (
        <Fab
          aria-label="scroll to top"
          className="scroll-to-top-btn"
          onClick={scrollToTop}
        >
          <ArrowUpwardRoundedIcon className="icon" />
        </Fab>
      )}
    </>
  );
};

export default ScrollToTop;