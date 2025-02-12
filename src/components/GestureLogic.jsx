import React, { useEffect, useRef, useState } from 'react';

const GestureLogic = ({ handleSeek, setPlaying, onNextVideo, setIsCommentOpen }) => {
  const touchStartTime = useRef(0);
  const touchCount = useRef(0);
  const touchTimer = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e) => {
    // Ignore if touch started on controls
    if (e.target.closest('.gestureControls') || e.target.closest('.actionButtons')) {
      return;
    }

    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;

    const now = Date.now();
    if (now - touchStartTime.current < 300) {
      // Within double/triple tap window
      touchCount.current++;
    } else {
      // New tap sequence
      touchCount.current = 1;
    }
    touchStartTime.current = now;

    // Clear existing timer
    if (touchTimer.current) {
      clearTimeout(touchTimer.current);
    }

    // Set timer to process the gesture
    touchTimer.current = setTimeout(() => {
      processTaps(touchStartX.current);
      touchCount.current = 0;
    }, 300);
  };

  const processTaps = (x) => {
    const screenWidth = window.innerWidth;
    const leftThird = screenWidth / 3;
    const rightThird = (screenWidth * 2) / 3;

    const isLeftSide = x < leftThird;
    const isRightSide = x > rightThird;
    const isMiddle = !isLeftSide && !isRightSide;

    switch (touchCount.current) {
      case 1: // Single tap
        if (isMiddle) {
          setPlaying(prev => !prev);
        }
        break;
      case 2: // Double tap
        if (isRightSide) {
          handleSeek(10);
        } else if (isLeftSide) {
          handleSeek(-10);
        }
        break;
      case 3: // Triple tap
        if (isMiddle) {
          onNextVideo();
        } else if (isRightSide) {
          window.close();
        } else if (isLeftSide) {
          setIsCommentOpen(true);
        }
        break;
      default:
        break;
    }
  };

  const handleTouchEnd = (e) => {
    // Prevent default only if not on controls
    if (!e.target.closest('.gestureControls') && !e.target.closest('.actionButtons')) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    return () => {
      if (touchTimer.current) {
        clearTimeout(touchTimer.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% - 100px)', // Leave space for controls at bottom
        zIndex: 2,
        touchAction: 'none',
        pointerEvents: 'auto',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default GestureLogic;