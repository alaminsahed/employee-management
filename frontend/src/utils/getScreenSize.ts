export const getDevice = () => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  let deviceType;
  if (screenWidth < 768) {
    deviceType = "mobile";
  } else if (screenWidth < 992) {
    deviceType = "tablet";
  } else {
    deviceType = "laptop/desktop";
  }

  return {
    width: screenWidth,
    height: screenHeight,
    deviceType: deviceType,
  };
};
