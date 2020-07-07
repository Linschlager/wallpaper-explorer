import React, { useEffect, useState } from "react";
import ImageContainer from "./ImageContainer";

const SPEED = 2;

const scrollDownByPosts = numPosts => {
  const desiredPosition = window.scrollY + window.innerHeight * numPosts; // Add page heights
  const paginatePosition = (pos, pageHeight) => pos - (pos % pageHeight); // desired positions can only be multiples of pageHeight
  window.scroll({
    top: paginatePosition(desiredPosition, window.innerHeight),
    behavior: "smooth"
  });
};

const ScrollingContainer = ({ loadNext, loading, items = {} }) => {
  const [tick, setTick] = useState(0);
  const [loadingCooldown, setLoadingCooldown] = useState(false);

  const [itemsAsArray, setItemsAsArray] = useState([]);

  useEffect(() => {
    const entries = Object.entries(items);
    const arr = entries.map(([key, value]) => ({
      id: key,
      title: value.title,
      url: value.url
    }));
    setItemsAsArray(arr);
  }, [items]);

  useEffect(() => {
    loadNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll after enough ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(current => current + 1);
      if (tick > 0 && tick % SPEED === 0) scrollDownByPosts(1);
    }, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  useEffect(() => {
    if (loadingCooldown === true) {
      setTimeout(() => {
        setLoadingCooldown(false);
      }, 5000);
    }
  }, [loadingCooldown]);

  // laod new data after scrolling down far enough
  useEffect(() => {
    const checkReload = e => {
      setTick(0);
      if (
        window.scrollY >
        document.body.scrollHeight - 5 * window.innerHeight
      ) {
        if (!loading && !loadingCooldown) {
          setLoadingCooldown(true);
          loadNext();
        }
      }
    };
    window.addEventListener("scroll", checkReload);
    return () => window.removeEventListener("scroll", checkReload);
  }, [loadNext, loading, loadingCooldown]);

  return (
    <div className="wallpaper-gallery">
      {loading && <span className="status">Loading...</span>}
      {itemsAsArray.map(singlePost => (
        <ImageContainer key={singlePost[0]} post={singlePost} />
      ))}
    </div>
  );
};

export default ScrollingContainer;
