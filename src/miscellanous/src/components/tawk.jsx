import { useEffect } from "react";

const TAWK_SRC = "https://embed.tawk.to/644922ef31ebfa0fe7fa8b14/1guur0u4t";
const TAWK_SCRIPT_ID = "tawk-chat-script";

function getWidgetDimensions() {
  if (typeof window === "undefined") {
    return null;
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  if (isMobile) {
    return {
      width: Math.min(viewportWidth - 16, 360),
      height: Math.min(viewportHeight - 20, 560),
      bottom: 8,
      right: 8,
      launcherBottom: 16,
      launcherRight: 16,
      borderRadius: 18,
    };
  }

  if (isTablet) {
    return {
      width: 360,
      height: 580,
      bottom: 18,
      right: 18,
      launcherBottom: 22,
      launcherRight: 22,
      borderRadius: 20,
    };
  }

  return {
    width: 360,
    height: 600,
    bottom: 20,
    right: 20,
    launcherBottom: 24,
    launcherRight: 24,
    borderRadius: 20,
  };
}

function applyImportantStyles(element, styles) {
  if (!element) {
    return;
  }

  Object.entries(styles).forEach(([property, value]) => {
    element.style.setProperty(property, value, "important");
  });
}

function getChatFrame() {
  return (
    document.querySelector("iframe[title='chat widget']") ||
    document.querySelector("iframe[title='chat widget (powered by Tawk.to)']")
  );
}

function getLauncherFrame() {
  return (
    document.querySelector("iframe[title='chat widget button']") ||
    document.querySelector("iframe[title='chat widget button (powered by Tawk.to)']")
  );
}

function styleWidget() {
  const dimensions = getWidgetDimensions();

  if (!dimensions) {
    return;
  }

  const chatFrame = getChatFrame();
  const launcherFrame = getLauncherFrame();

  if (chatFrame) {
    const baseStyles = {
      width: `${dimensions.width}px`,
      minWidth: `${dimensions.width}px`,
      maxWidth: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      minHeight: `${dimensions.height}px`,
      maxHeight: `${dimensions.height}px`,
      bottom: `${dimensions.bottom}px`,
      right: `${dimensions.right}px`,
      left: "auto",
      borderRadius: `${dimensions.borderRadius}px`,
      overflow: "hidden",
      boxShadow: "0 24px 60px rgba(15, 23, 42, 0.22)",
    };

    applyImportantStyles(chatFrame, baseStyles);
    applyImportantStyles(chatFrame.parentElement, baseStyles);

    if (chatFrame.parentElement?.parentElement) {
      applyImportantStyles(chatFrame.parentElement.parentElement, {
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        bottom: `${dimensions.bottom}px`,
        right: `${dimensions.right}px`,
        left: "auto",
      });
    }
  }

  if (launcherFrame) {
    const launcherStyles = {
      bottom: `${dimensions.launcherBottom}px`,
      right: `${dimensions.launcherRight}px`,
      left: "auto",
    };

    applyImportantStyles(launcherFrame, launcherStyles);
    applyImportantStyles(launcherFrame.parentElement, launcherStyles);
  }
}

export function TawkChat() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    const existingApi = window.Tawk_API || {};

    window.Tawk_API = {
      ...existingApi,
      customStyle: {
        zIndex: 2147483000,
      },
      onLoad: () => {
        existingApi.onLoad?.();
        styleWidget();
      },
      onChatMaximized: () => {
        existingApi.onChatMaximized?.();
        styleWidget();
      },
      onChatMinimized: () => {
        existingApi.onChatMinimized?.();
        styleWidget();
      },
    };

    window.Tawk_LoadStart = new Date();

    const observer = new MutationObserver(() => {
      styleWidget();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    const handleResize = () => {
      styleWidget();
    };

    window.addEventListener("resize", handleResize);

    const intervalId = window.setInterval(() => {
      styleWidget();
    }, 500);

    if (!document.getElementById(TAWK_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = TAWK_SCRIPT_ID;
      script.async = true;
      script.src = TAWK_SRC;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      const firstScript = document.getElementsByTagName("script")[0];

      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.body.appendChild(script);
      }
    } else {
      styleWidget();
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.clearInterval(intervalId);
    };
  }, []);

  return null;
}
