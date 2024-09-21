"use client";

import { ReactEventHandler, useEffect, useRef, useState } from "react";
import classes from "./DataModal.module.css";
import { IconX } from "./\belements/IconX";

export interface IDataModalProps {
  open: boolean;
  onClose?: ReactEventHandler<HTMLDialogElement>;
  withCloseButton?: boolean;
  title?: string;
  children?: React.ReactNode;
}

export function DataModal({ open, onClose, withCloseButton, title, children }: IDataModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [dimensions, setDimensions] = useState({ width: 500, height: 300 });

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const initialX = (windowWidth - dimensions.width) / 2;
  const initialY = (windowHeight - dimensions.height) / 2;
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ offsetX: 0, offsetY: 0 });

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      const handleClickOutside = (event: MouseEvent) => {
        if (dialogRef.current) {
          const rect = dialogRef.current.getBoundingClientRect();
          const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (!isInDialog) {
            dialogRef.current.close();
          }
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const newX = e.clientX - dragOffset.offsetX;
          const newY = e.clientY - dragOffset.offsetY;
          setPosition({ x: newX, y: newY });
        }
      };

      document.addEventListener("click", handleClickOutside);

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("click", handleClickOutside);
      };
    } else {
      dialogRef.current?.close();
    }
  }, [open, dimensions.width, dimensions.height, isDragging, dragOffset]);

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const dialogRect = dialogRef.current?.getBoundingClientRect();
      if (dialogRect) {
        const newWidth = e.clientX - dialogRect.left;
        const newHeight = e.clientY - dialogRect.top;
        setDimensions({
          width: Math.max(newWidth, 200), // 최소 너비 200px
          height: Math.max(newHeight, 200), // 최소 높이 200px
        });
      }
    }
  };

  // 리사이징 시작 (우하단 모서리 클릭 시)
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // 드래그 시작 (헤더 클릭 시)
  const handleDragMouseDown = (e: React.MouseEvent) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (rect) {
      setIsDragging(true);
      setDragOffset({
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      });
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={classes.dialog}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "fixed",
      }}
    >
      {/* 헤더를 클릭하여 드래그 */}
      <div
        className={classes.modalHeader}
        onMouseDown={handleDragMouseDown}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <h2>{title}</h2>

        {withCloseButton && (
          <button onClick={handleCloseModal} className={classes.closeButton}>
            <IconX />
          </button>
        )}
      </div>

      <div className={classes.modalContent}>{children}</div>

      {/* 리사이즈 핸들 */}
      <div className={classes.resizeHandle} onMouseDown={handleResizeMouseDown} />
    </dialog>
  );
}